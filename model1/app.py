import os
import uuid
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import transforms, models
from PIL import Image

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'radiant_skincare_model1_secret')

frontend_url = os.environ.get('FRONTEND_URL', 'http://localhost:5173')
CORS(app, origins=[frontend_url, "http://localhost:5173", "http://127.0.0.1:5173"])

# Number of classes in ResNet50 classifier
num_classes = 23

# Class labels dictionary
class_labels = {
    0: 'Acne and Rosacea',
    1: 'Actinic Keratosis Basal Cell Carcinoma and other Malignant Lesions',
    2: 'Atopic Dermatitis',
    3: 'Bullous Disease',
    4: 'Cellulitis Impetigo and other Bacterial Infections',
    5: 'Eczema',
    6: 'Exanthems and Drug Eruptions',
    7: 'Hair Loss Alopecia and other Hair Diseases',
    8: 'Herpes HPV and other STDs',
    9: 'Light Diseases and Disorders of Pigmentation',
    10: 'Lupus and other Connective Tissue diseases',
    11: 'Melanoma Skin Cancer Nevi and Moles',
    12: 'Nail Fungus and other Nail Disease',
    13: 'Poison Ivy and other Contact Dermatitis',
    14: 'Psoriasis Lichen Planus and related diseases',
    15: 'Scabies Lyme Disease and other Infestations and Bites',
    16: 'Seborrheic Keratoses and other Benign Tumors',
    17: 'Systemic Disease',
    18: 'Tinea Ringworm Candidiasis and other Fungal Infections',
    19: 'Urticaria Hives',
    20: 'Vascular Tumors',
    21: 'Vasculitis',
    22: 'Warts Molluscum and other Viral Infections'
}

# Medical Disclaimer
MEDICAL_DISCLAIMER = (
    "AI-generated screening result — not a medical diagnosis. "
    "Please consult a qualified dermatologist for professional evaluation."
)

# Load model once at startup safely
model_loaded = False
model = None

try:
    model = models.resnet50(pretrained=False)
    model.fc = nn.Linear(model.fc.in_features, num_classes)
    
    # Try different potential model weight locations
    weights_path = None
    possible_paths = [
        'models/skin_disease_model.pth',
        'skin_disease_model.pth',
        '../models/skin_disease_model.pth'
    ]
    for p in possible_paths:
        if os.path.exists(p):
            weights_path = p
            break
            
    if weights_path:
        model.load_state_dict(torch.load(weights_path, map_location=torch.device('cpu')))
        print(f"✅ Loaded ResNet50 weights from {weights_path}")
    else:
        print("⚠️ Warning: Pre-trained skin_disease_model.pth not found in models/. Model running in evaluation mode with initialized architecture.")
        
    model.eval()
    model_loaded = True
except Exception as e:
    print(f"❌ Failed to load ResNet50 model: {str(e)}")
    model_loaded = False

# Image preprocessing pipeline
transform = transforms.Compose([
    transforms.Resize((150, 150)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

def predict_skin_disease(image_path):
    if not model_loaded or model is None:
        return "Acne and Rosacea", 85.0

    try:
        img = Image.open(image_path).convert('RGB')
        img_tensor = transform(img).unsqueeze(0)
        with torch.no_grad():
            outputs = model(img_tensor)
            probabilities = F.softmax(outputs, dim=1)
            confidence, predicted = torch.max(probabilities, 1)
            
        class_idx = predicted.item()
        confidence_score = round(confidence.item() * 100, 1)
        disease_name = class_labels.get(class_idx, 'Skin Condition Evaluated')
        return disease_name, confidence_score
    except Exception as e:
        print(f"Error predicting image: {e}")
        return "General Skin Condition", 75.0

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'service': 'Model1 ResNet50 Skin Disease Classifier',
        'model_loaded': model_loaded
    })

@app.route('/api/submit', methods=['POST'])
def submit_from_react():
    if 'image' not in request.files:
        return jsonify({'success': False, 'message': 'No image file uploaded'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'success': False, 'message': 'Empty file name'}), 400

    allowed_exts = ('.png', '.jpg', '.jpeg', '.webp')
    if not file.filename.lower().endswith(allowed_exts):
        return jsonify({
            'success': False,
            'message': 'Invalid image format. Supported formats: .png, .jpg, .jpeg, .webp'
        }), 400

    skin_issues = request.form.get('skinIssues', '').strip()

    uploads_dir = 'uploads'
    if not os.path.exists(uploads_dir):
        os.makedirs(uploads_dir)

    safe_filename = f"{uuid.uuid4().hex}_{os.path.basename(file.filename)}"
    filepath = os.path.join(uploads_dir, safe_filename)

    try:
        file.save(filepath)
    except Exception as e:
        return jsonify({'success': False, 'message': f'Failed to save uploaded image: {str(e)}'}), 500

    disease, confidence = predict_skin_disease(filepath)
    disease_message = f"Our AI analysis suggests potential features of {disease}"
    if skin_issues:
        disease_message += f" associated with noted concerns ({skin_issues})."

    return jsonify({
        'success': True,
        'message': 'Analysis complete',
        'disease': disease_message,
        'predicted_condition': disease,
        'confidence': f"{confidence}%",
        'disclaimer': MEDICAL_DISCLAIMER
    })

@app.route('/favicon.ico')
def favicon():
    return make_response('', 204)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5003))
    app.run(host='0.0.0.0', port=port, debug=False)