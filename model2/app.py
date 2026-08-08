import os
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import pandas as pd
import pickle

app = Flask(__name__)

frontend_url = os.environ.get('FRONTEND_URL', 'http://localhost:5173')
CORS(app, origins=[frontend_url, "http://localhost:5173", "http://127.0.0.1:5173"])

# Load dataset and trained model safely
df = None
model = None
le_concern = None
le_skin = None
le_product = None

try:
    if os.path.exists('test.csv'):
        df = pd.read_csv('test.csv')
        print("✅ test.csv loaded successfully.")
    else:
        print("⚠️ Warning: test.csv not found.")

    if os.path.exists('model.pkl'):
        with open('model.pkl', 'rb') as f:
            model, le_concern, le_skin, le_product = pickle.load(f)
        print("✅ model.pkl loaded successfully.")
    else:
        print("⚠️ Warning: model.pkl not found.")
except Exception as e:
    print(f"❌ Error loading model2 dependencies: {e}")

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'service': 'Model2 Skincare Product Recommender',
        'data_loaded': df is not None,
        'model_loaded': model is not None
    })

@app.route('/options', methods=['GET'])
def get_options():
    if df is None or df.empty:
        return jsonify({
            'success': True,
            'concerns': ['Acne', 'Aging', 'Dryness', 'Redness', 'Hyperpigmentation'],
            'skin_types': ['Oily', 'Dry', 'Combination', 'Sensitive', 'Normal']
        })

    concerns = sorted(df['Skin Concern'].dropna().unique().tolist())
    skin_types = sorted(df['Skin Type'].dropna().unique().tolist())
    
    return jsonify({
        'success': True,
        'concerns': concerns,
        'skin_types': skin_types
    })

@app.route('/api/recommend', methods=['POST'])
@app.route('/', methods=['POST'])
def recommend():
    # Handle both JSON and form data seamlessly
    req_data = request.get_json(silent=True) or request.form

    concern = req_data.get('concern') or req_data.get('Skin Concern')
    skin_type = req_data.get('skin_type') or req_data.get('Skin Type')

    if not concern or not skin_type:
        return jsonify({
            'success': False,
            'message': 'Both concern and skin_type are required.'
        }), 400

    try:
        if model is not None and le_concern is not None and le_skin is not None and le_product is not None:
            # Transform inputs if present in encoders
            concern_encoded = le_concern.transform([concern])[0] if concern in le_concern.classes_ else 0
            skin_encoded = le_skin.transform([skin_type])[0] if skin_type in le_skin.classes_ else 0

            input_df = pd.DataFrame([[concern_encoded, skin_encoded]], columns=['Skin Concern', 'Skin Type'])
            pred_index = model.predict(input_df)[0]
            product_name = le_product.inverse_transform([pred_index])[0]

            matched_rows = df[df['Product Recommendation'] == product_name] if df is not None else []
            if len(matched_rows) > 0:
                row = matched_rows.iloc[0]
                recommendation = {
                    'product_name': str(product_name),
                    'ingredients': str(row.get('Ingredients', 'Niacinamide, Hyaluronic Acid, Salicylic Acid')),
                    'how_to_use': str(row.get('How to Use', 'Apply evenly twice daily after cleansing.')),
                    'tips': str(row.get('Tips', 'Follow up with sunscreen during daytime.'))
                }
            else:
                recommendation = {
                    'product_name': str(product_name),
                    'ingredients': 'Hydrating and Soothing Botanicals',
                    'how_to_use': 'Apply 2-3 drops onto clean skin morning and night.',
                    'tips': 'Pair with a broad-spectrum SPF for best results.'
                }
        else:
            # Fallback recommendation if pickle isn't loaded
            recommendation = {
                'product_name': f'Radiant Balance Treatment for {concern}',
                'ingredients': 'Ceramides, Hyaluronic Acid, Centella Asiatica',
                'how_to_use': 'Apply gentle layer after cleansing.',
                'tips': f'Ideal for {skin_type} skin experiencing {concern}.'
            }

        return jsonify({
            'success': True,
            'data': recommendation,
            'product_name': recommendation['product_name'],
            'ingredients': recommendation['ingredients'],
            'how_to_use': recommendation['how_to_use'],
            'tips': recommendation['tips']
        })

    except Exception as e:
        print(f"Recommendation calculation error: {e}")
        return jsonify({
            'success': False,
            'message': 'Failed to compute product recommendation for selected combination.'
        }), 500

@app.route('/favicon.ico')
def favicon():
    return make_response('', 204)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5004))
    app.run(host='0.0.0.0', port=port, debug=False)