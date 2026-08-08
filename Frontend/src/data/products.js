// ============================================================
// RADIANTSKINCARE — NON-BRANDED SKINCARE PRODUCT CATALOG
// 132 formulation-based skincare options
// No brand names · No prices · No fake URLs
// Informational purposes only — not medical advice
// ============================================================

export const PRODUCT_TYPES = [
  'Any Product',
  'Cleanser',
  'Serum',
  'Essence',
  'Moisturizer',
  'Sunscreen',
  'Treatment',
  'Eye Care',
  'Body Care',
  'Complete Routine',
];

export const SKIN_TYPES = [
  'Oily',
  'Dry',
  'Combination',
  'Normal',
  'Sensitive',
  'Not Sure',
];

export const SKIN_CONCERNS = [
  'Acne & Breakouts',
  'Dryness',
  'Dehydration',
  'Oiliness',
  'Redness',
  'Dark Spots',
  'Uneven Texture',
  'Sensitivity',
  'Signs of Aging',
  'Dullness',
  'Pores',
  'Barrier Support',
  'Not Sure',
];

const products = [
  // ─────────────────────────────────────────────
  // CLEANSERS
  // ─────────────────────────────────────────────
  {
    product_id: 'PROD001',
    product_name: 'Gentle Hydrating Cleanser',
    product_type: 'Cleanser',
    skin_types: ['Dry', 'Normal', 'Sensitive'],
    concerns: ['Dryness', 'Sensitivity', 'Redness'],
    key_ingredients: ['Glycerin', 'Panthenol', 'Ceramides'],
    description:
      'A mild, low-lather cleanser formulation designed for dry and sensitive skin. Helps cleanse without disrupting the moisture barrier.',
    why_recommended:
      'Relevant for users seeking a gentle, hydrating cleanser formulation that minimises moisture loss during cleansing.',
    how_to_use:
      'Apply a small amount to damp skin, massage gently, then rinse with lukewarm water. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Avoid hot water when cleansing — lukewarm water is gentler on the skin barrier.',
    safety_notes:
      'Patch testing is recommended when introducing any new cleanser. Discontinue use if irritation occurs.',
  },
  {
    product_id: 'PROD002',
    product_name: 'Foaming Gel Cleanser',
    product_type: 'Cleanser',
    skin_types: ['Oily', 'Combination'],
    concerns: ['Oiliness', 'Acne & Breakouts', 'Pores'],
    key_ingredients: ['Salicylic Acid', 'Niacinamide', 'Tea Tree Extract'],
    description:
      'A foaming gel cleanser formulation commonly used in oily and acne-prone skin routines. Helps remove excess surface oil during cleansing.',
    why_recommended:
      'Relevant for users with oily or combination skin looking for a gel-textured cleansing option.',
    how_to_use:
      'Lather with water, massage gently onto face, rinse thoroughly. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Over-cleansing can trigger excess oil production. Cleanse twice daily and no more.',
    safety_notes:
      'If the formula contains salicylic acid, introduce gradually. Not typically recommended for dry or sensitive skin types.',
  },
  {
    product_id: 'PROD003',
    product_name: 'Salicylic Acid Cleansing Gel',
    product_type: 'Cleanser',
    skin_types: ['Oily', 'Combination'],
    concerns: ['Acne & Breakouts', 'Oiliness', 'Uneven Texture', 'Pores'],
    key_ingredients: ['Salicylic Acid (BHA)', 'Zinc PCA', 'Glycerin'],
    description:
      'A BHA-based cleansing gel formulation designed to assist with congestion, excess oil, and skin texture as part of a targeted skincare routine.',
    why_recommended:
      'Relevant for oily, blemish-focused routines. Salicylic acid is commonly used in formulations to support pore care and skin texture.',
    how_to_use:
      'Use once or twice daily. Massage gently onto damp skin and rinse. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Use sunscreen during daytime when incorporating BHA-containing products in your routine.',
    safety_notes:
      'Not suitable for sensitive or dry skin. Introduce gradually. Discontinue if irritation develops.',
  },
  {
    product_id: 'PROD004',
    product_name: 'Cream Cleanser',
    product_type: 'Cleanser',
    skin_types: ['Dry', 'Sensitive', 'Normal'],
    concerns: ['Dryness', 'Sensitivity', 'Redness'],
    key_ingredients: ['Shea Butter', 'Ceramides', 'Oat Extract'],
    description:
      'A creamy, low-foam cleanser formulation designed for dry, sensitive, or compromised skin. Provides a comfortable cleansing experience while supporting the skin barrier.',
    why_recommended:
      'Relevant for users seeking a non-stripping cream cleanser for dry or sensitive skin routines.',
    how_to_use:
      'Apply to dry or damp skin, gently massage, and rinse or remove with a damp cloth. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Cream cleansers are well-suited for dry or sensitised skin that may react to foam-based formulas.',
    safety_notes:
      'Patch test recommended. Avoid if any ingredient causes a known reaction.',
  },
  {
    product_id: 'PROD005',
    product_name: 'Low-pH Gentle Cleanser',
    product_type: 'Cleanser',
    skin_types: ['Oily', 'Combination', 'Normal', 'Sensitive'],
    concerns: ['Acne & Breakouts', 'Sensitivity', 'Oiliness'],
    key_ingredients: ['Glycerin', 'Centella Asiatica', 'Betaine'],
    description:
      'A mild low-pH gel cleanser formulation suitable for most skin types. Commonly recommended in routines that include active ingredients to help maintain skin pH after cleansing.',
    why_recommended:
      'Relevant for users looking for a gentle pH-balanced cleansing option that works well alongside active skincare products.',
    how_to_use:
      'Apply to damp skin, massage gently, and rinse. Suitable for morning and evening use. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'A low-pH cleanser may help preserve the effectiveness of actives applied after cleansing.',
    safety_notes: 'Generally suitable for most skin types. Patch test recommended for sensitive skin.',
  },
  {
    product_id: 'PROD006',
    product_name: 'Micellar Cleansing Water',
    product_type: 'Cleanser',
    skin_types: ['Normal', 'Sensitive', 'Dry', 'Combination'],
    concerns: ['Sensitivity', 'Dryness', 'Redness'],
    key_ingredients: ['Micelles', 'Glycerin', 'Panthenol'],
    description:
      'A gentle micellar water formulation that removes surface impurities without rinsing. Suitable as a first-step cleanser or a gentle standalone option for sensitive skin.',
    why_recommended:
      'Relevant for sensitive skin routines or as a gentle makeup-removing step before a main cleanser.',
    how_to_use:
      'Apply to a cotton pad and gently wipe across the skin. No rinsing required for standalone use. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'For a thorough cleanse, follow with a rinse-off cleanser in the evening.',
    safety_notes: 'Generally gentle and suitable for sensitive skin. Patch test recommended.',
  },

  // ─────────────────────────────────────────────
  // SERUMS / ESSENCES
  // ─────────────────────────────────────────────
  {
    product_id: 'PROD007',
    product_name: 'Niacinamide Serum',
    product_type: 'Serum',
    skin_types: ['Oily', 'Combination', 'Normal'],
    concerns: ['Acne & Breakouts', 'Oiliness', 'Pores', 'Dark Spots', 'Uneven Texture'],
    key_ingredients: ['Niacinamide', 'Zinc PCA'],
    description:
      'A lightweight serum formulation with niacinamide, commonly used in skincare routines focused on oiliness, blemish-prone skin, and uneven-looking tone.',
    why_recommended:
      'Relevant for oily and blemish-focused routines. Niacinamide is widely used in formulations designed to support the appearance of pores, oiliness, and uneven tone.',
    how_to_use:
      'Apply a few drops to clean skin before moisturiser. Follow product label instructions and introduce gradually.',
    routine: 'AM | PM',
    tips: 'Niacinamide is generally well-tolerated and can be used alongside most other active skincare ingredients.',
    safety_notes:
      'Patch test recommended when starting a new active serum. Discontinue use if significant irritation occurs.',
  },
  {
    product_id: 'PROD008',
    product_name: 'Hyaluronic Acid Hydrating Serum',
    product_type: 'Serum',
    skin_types: ['Dry', 'Normal', 'Combination', 'Sensitive'],
    concerns: ['Dryness', 'Signs of Aging', 'Dullness', 'Sensitivity'],
    key_ingredients: ['Hyaluronic Acid', 'Sodium Hyaluronate', 'Glycerin'],
    description:
      'A hydration-focused serum formulation with hyaluronic acid, a humectant commonly used to help attract and retain moisture in the skin.',
    why_recommended:
      'Relevant for users seeking a lightweight hydrating serum. Hyaluronic acid is commonly used in routines designed to support skin comfort and hydration.',
    how_to_use:
      'Apply to slightly damp skin before moisturiser. Follow with a moisturiser to help seal in hydration. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Apply to damp skin and follow immediately with a moisturiser for best results.',
    safety_notes: 'Generally suitable for all skin types. Patch test recommended for sensitive skin.',
  },
  {
    product_id: 'PROD009',
    product_name: 'Vitamin C Brightening Serum',
    product_type: 'Serum',
    skin_types: ['Normal', 'Combination', 'Dry'],
    concerns: ['Dark Spots', 'Dullness', 'Signs of Aging'],
    key_ingredients: ['L-Ascorbic Acid (Vitamin C)', 'Vitamin E', 'Ferulic Acid'],
    description:
      'An antioxidant serum formulation with vitamin C, commonly used in morning routines focused on uneven-looking skin tone and dull-looking skin.',
    why_recommended:
      'Relevant for users looking for a vitamin C serum option for morning routines. L-ascorbic acid is commonly used in formulations supporting the appearance of brighter-looking skin.',
    how_to_use:
      'Apply in the morning to clean skin before moisturiser and sunscreen. Follow product label instructions.',
    routine: 'AM',
    tips: 'Always follow a vitamin C serum with broad-spectrum sunscreen in the morning routine.',
    safety_notes:
      'Vitamin C formulations can oxidise over time. Store properly. Some skin types may experience mild tingling initially — patch test recommended.',
  },
  {
    product_id: 'PROD010',
    product_name: 'Azelaic Acid Serum',
    product_type: 'Serum',
    skin_types: ['Oily', 'Combination', 'Sensitive'],
    concerns: ['Acne & Breakouts', 'Redness', 'Dark Spots', 'Uneven Texture'],
    key_ingredients: ['Azelaic Acid', 'Niacinamide'],
    description:
      'A multi-tasking serum formulation with azelaic acid, commonly used in routines focused on blemish-prone skin, uneven tone, and redness.',
    why_recommended:
      'Relevant for users seeking an active serum for blemish-prone or redness-prone skin routines. Azelaic acid is commonly used in formulations designed for sensitive, acne-prone, or uneven-tone skin.',
    how_to_use:
      'Apply to clean skin, morning or evening. Follow product label instructions and introduce gradually.',
    routine: 'AM | PM',
    tips: 'Azelaic acid is generally well-tolerated compared to many other actives and may suit sensitive skin types.',
    safety_notes:
      'Patch test recommended. Start with low frequency and increase gradually. Avoid direct eye area.',
  },
  {
    product_id: 'PROD011',
    product_name: 'Barrier Support Serum',
    product_type: 'Serum',
    skin_types: ['Dry', 'Sensitive', 'Normal'],
    concerns: ['Dryness', 'Sensitivity', 'Redness'],
    key_ingredients: ['Ceramides', 'Panthenol', 'Glycerin', 'Centella Asiatica'],
    description:
      'A serum formulation designed to support the skin barrier, commonly used in routines for dry, compromised, or sensitivity-prone skin.',
    why_recommended:
      'Relevant for users looking to support skin barrier function. Ceramides and panthenol are commonly used in barrier-focused skincare formulations.',
    how_to_use:
      'Apply to clean skin before moisturiser. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Layer a barrier serum under your moisturiser for added hydration support.',
    safety_notes: 'Generally gentle and suitable for sensitive skin. Patch test recommended.',
  },
  {
    product_id: 'PROD012',
    product_name: 'Peptide Serum',
    product_type: 'Serum',
    skin_types: ['Dry', 'Normal', 'Combination'],
    concerns: ['Signs of Aging', 'Dryness', 'Dullness'],
    key_ingredients: ['Peptide Complex', 'Hyaluronic Acid', 'Niacinamide'],
    description:
      'A serum formulation containing peptides, commonly used in anti-aging routines to support the appearance of skin firmness and overall skin condition.',
    why_recommended:
      'Relevant for users looking for a peptide-based serum option. Peptides are commonly used in formulations focused on skin appearance and routine support.',
    how_to_use:
      'Apply to clean skin before moisturiser. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Peptide serums can generally be layered with other hydrating and active ingredients.',
    safety_notes: 'Generally well-tolerated. Patch test recommended.',
  },
  {
    product_id: 'PROD013',
    product_name: 'Tranexamic Acid Serum',
    product_type: 'Serum',
    skin_types: ['Normal', 'Combination', 'Sensitive'],
    concerns: ['Dark Spots', 'Dullness', 'Redness'],
    key_ingredients: ['Tranexamic Acid', 'Niacinamide', 'Vitamin C'],
    description:
      'A serum formulation with tranexamic acid, commonly used in routines focused on uneven-looking skin tone and post-blemish marks.',
    why_recommended:
      'Relevant for users seeking a serum option for uneven tone and dark spot-focused routines. Tranexamic acid is increasingly used in formulations supporting the appearance of more even-looking skin.',
    how_to_use:
      'Apply to clean skin before moisturiser. Follow product label instructions and introduce gradually.',
    routine: 'AM | PM',
    tips: 'Pair with daily sunscreen for best results when targeting uneven skin tone.',
    safety_notes: 'Patch test recommended. Generally well-tolerated.',
  },
  {
    product_id: 'PROD014',
    product_name: 'Centella Asiatica Calming Essence',
    product_type: 'Essence',
    skin_types: ['Sensitive', 'Normal', 'Dry'],
    concerns: ['Redness', 'Sensitivity', 'Dryness'],
    key_ingredients: ['Centella Asiatica', 'Madecassoside', 'Panthenol'],
    description:
      'A calming essence formulation with centella asiatica, commonly used in routines for redness-prone or sensitivity-prone skin.',
    why_recommended:
      'Relevant for users with sensitive or reactive skin looking for a gentle, calming essence. Centella asiatica is commonly used in formulations supporting the appearance of calm, comfortable skin.',
    how_to_use:
      'Apply to clean skin by gently patting in. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Centella-based essences are often suitable for post-procedure or post-irritation routines.',
    safety_notes: 'Generally gentle. Patch test recommended.',
  },

  // ─────────────────────────────────────────────
  // MOISTURIZERS
  // ─────────────────────────────────────────────
  {
    product_id: 'PROD015',
    product_name: 'Lightweight Gel Moisturizer',
    product_type: 'Moisturizer',
    skin_types: ['Oily', 'Combination', 'Normal'],
    concerns: ['Oiliness', 'Acne & Breakouts', 'Pores', 'Dryness'],
    key_ingredients: ['Hyaluronic Acid', 'Niacinamide', 'Glycerin'],
    description:
      'A water-based gel moisturiser formulation suitable for oily and combination skin types. Provides lightweight hydration without heavy texture.',
    why_recommended:
      'Relevant for oily or combination skin routines where a non-greasy moisturiser formulation is preferred.',
    how_to_use:
      'Apply to clean skin morning and evening after serum. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Even oily skin benefits from moisturising — skipping moisturiser may lead to increased oil production.',
    safety_notes: 'Generally well-tolerated. Patch test recommended.',
  },
  {
    product_id: 'PROD016',
    product_name: 'Ceramide Barrier Cream',
    product_type: 'Moisturizer',
    skin_types: ['Dry', 'Sensitive', 'Normal'],
    concerns: ['Dryness', 'Sensitivity', 'Redness', 'Signs of Aging'],
    key_ingredients: ['Ceramides NP/AP/EOP', 'Cholesterol', 'Fatty Acids', 'Glycerin'],
    description:
      'A rich barrier-supporting cream formulation with ceramides, commonly used in dry and sensitive skin routines to help support skin barrier integrity.',
    why_recommended:
      'Relevant for users with dry or compromised skin looking for a ceramide-based moisturiser. Ceramides are commonly used in formulations designed to support the skin barrier.',
    how_to_use:
      'Apply to clean skin morning and evening. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Ceramide creams are generally suitable for compromised or dry skin and may help with comfort during colder months.',
    safety_notes: 'Generally gentle. Patch test recommended for sensitive skin.',
  },
  {
    product_id: 'PROD017',
    product_name: 'Hydrating Cream Moisturizer',
    product_type: 'Moisturizer',
    skin_types: ['Dry', 'Normal', 'Sensitive'],
    concerns: ['Dryness', 'Signs of Aging', 'Sensitivity'],
    key_ingredients: ['Glycerin', 'Shea Butter', 'Squalane', 'Hyaluronic Acid'],
    description:
      'A nourishing cream moisturiser formulation designed for dry and normal skin types, providing long-lasting hydration.',
    why_recommended:
      'Relevant for users seeking a richer moisturiser for dry skin routines. Shea butter and glycerin are commonly used in formulations for dry, comfortable-feeling skin.',
    how_to_use:
      'Apply to clean skin morning and evening. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Apply while skin is still slightly damp after serum for enhanced moisture absorption.',
    safety_notes: 'Generally suitable for dry and normal skin types. Patch test recommended.',
  },
  {
    product_id: 'PROD018',
    product_name: 'Oil-Free Moisturizer',
    product_type: 'Moisturizer',
    skin_types: ['Oily', 'Combination'],
    concerns: ['Oiliness', 'Acne & Breakouts', 'Pores'],
    key_ingredients: ['Niacinamide', 'Zinc PCA', 'Hyaluronic Acid'],
    description:
      'A non-comedogenic, oil-free moisturiser formulation designed for oily or acne-prone skin types.',
    why_recommended:
      'Relevant for oily or acne-prone skin routines where a lightweight, non-comedogenic moisturiser is preferred.',
    how_to_use:
      'Apply to clean skin morning and evening. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Look for "non-comedogenic" labels when selecting a moisturiser for oily or acne-prone skin.',
    safety_notes: 'Patch test recommended. Discontinue if breakouts increase.',
  },
  {
    product_id: 'PROD019',
    product_name: 'Sensitive Skin Moisturizer',
    product_type: 'Moisturizer',
    skin_types: ['Sensitive', 'Normal', 'Dry'],
    concerns: ['Sensitivity', 'Redness', 'Dryness'],
    key_ingredients: ['Oat Extract', 'Allantoin', 'Glycerin', 'Panthenol'],
    description:
      'A fragrance-free, gentle moisturiser formulation designed for reactive and sensitive skin types.',
    why_recommended:
      'Relevant for sensitive skin routines where minimal, gentle ingredients are preferred. Oat extract and allantoin are commonly used in formulations for reactive skin.',
    how_to_use:
      'Apply to clean skin morning and evening. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Choose fragrance-free formulations when managing sensitive or reactive skin.',
    safety_notes: 'Patch test recommended. Avoid formulas with known irritants for sensitive skin.',
  },
  {
    product_id: 'PROD020',
    product_name: 'Rich Overnight Repair Cream',
    product_type: 'Moisturizer',
    skin_types: ['Dry', 'Normal'],
    concerns: ['Dryness', 'Signs of Aging', 'Dullness'],
    key_ingredients: ['Squalane', 'Peptide Complex', 'Shea Butter', 'Hyaluronic Acid'],
    description:
      'A richer overnight moisturiser formulation designed to support skin comfort and appearance during the evening routine.',
    why_recommended:
      'Relevant for evening routines focused on hydration and skin repair support. Squalane and peptides are commonly used in overnight formulations.',
    how_to_use:
      'Apply as the final step of your evening routine. Follow product label instructions.',
    routine: 'PM',
    tips: 'Overnight moisturisers are typically richer than daytime formulations — choose based on your skin type.',
    safety_notes: 'Patch test recommended. Not typically suitable as a daytime formulation.',
  },

  // ─────────────────────────────────────────────
  // SUNSCREENS
  // ─────────────────────────────────────────────
  {
    product_id: 'PROD021',
    product_name: 'Broad-Spectrum SPF 50 Sunscreen',
    product_type: 'Sunscreen',
    skin_types: ['Normal', 'Dry', 'Combination'],
    concerns: ['Dark Spots', 'Signs of Aging', 'Dullness'],
    key_ingredients: ['UV Filters (Broad-Spectrum)', 'Glycerin', 'Vitamin E'],
    description:
      'A broad-spectrum SPF 50 sunscreen formulation that helps protect the skin from UVA and UVB exposure. Suitable for daily use.',
    why_recommended:
      'Relevant for all daytime skincare routines. Daily sun protection is a foundational step in skincare.',
    how_to_use:
      'Apply generously as the final step of your morning skincare routine. Reapply approximately every 2 hours when outdoors. Follow product label instructions.',
    routine: 'AM',
    tips: 'Sun protection is one of the most important steps in any skincare routine. Apply every morning.',
    safety_notes: 'Do not rely solely on sunscreen for sun protection. Seek shade and protective clothing where appropriate.',
  },
  {
    product_id: 'PROD022',
    product_name: 'Lightweight Gel Sunscreen',
    product_type: 'Sunscreen',
    skin_types: ['Oily', 'Combination'],
    concerns: ['Oiliness', 'Acne & Breakouts', 'Pores'],
    key_ingredients: ['UV Filters (Broad-Spectrum)', 'Niacinamide', 'Hyaluronic Acid'],
    description:
      'A lightweight gel-textured sunscreen formulation designed for oily and combination skin types. Provides broad-spectrum protection with a non-greasy finish.',
    why_recommended:
      'Relevant for oily skin routines where a lightweight, non-comedogenic sunscreen option is preferred.',
    how_to_use:
      'Apply generously as the final step of your morning routine. Reapply every 2 hours during sun exposure. Follow product label instructions.',
    routine: 'AM',
    tips: 'Oily skin types may prefer gel or water-based sunscreen formulations over heavier cream options.',
    safety_notes: 'Patch test recommended. Choose formulas labelled non-comedogenic for oily/acne-prone skin.',
  },
  {
    product_id: 'PROD023',
    product_name: 'Sensitive Skin Mineral Sunscreen',
    product_type: 'Sunscreen',
    skin_types: ['Sensitive', 'Dry'],
    concerns: ['Sensitivity', 'Redness', 'Dryness'],
    key_ingredients: ['Zinc Oxide', 'Titanium Dioxide', 'Centella Asiatica'],
    description:
      'A mineral-filter sunscreen formulation using zinc oxide and titanium dioxide, commonly recommended for sensitive and reactive skin types.',
    why_recommended:
      'Relevant for sensitive skin routines. Mineral sunscreen filters are commonly considered a suitable option for reactive or redness-prone skin.',
    how_to_use:
      'Apply generously before sun exposure and reapply every 2 hours. Follow product label instructions.',
    routine: 'AM',
    tips: 'Mineral sunscreens may leave a white cast on deeper skin tones — look for tinted mineral options where appropriate.',
    safety_notes: 'Generally well-tolerated by sensitive skin. Patch test recommended.',
  },
  {
    product_id: 'PROD024',
    product_name: 'Broad-Spectrum SPF 30+ Sunscreen',
    product_type: 'Sunscreen',
    skin_types: ['Normal', 'Combination', 'Oily'],
    concerns: ['Dark Spots', 'Signs of Aging'],
    key_ingredients: ['UV Filters (Broad-Spectrum)', 'Glycerin', 'Panthenol'],
    description:
      'A broad-spectrum SPF 30 sunscreen formulation suitable for everyday use as part of a morning skincare routine.',
    why_recommended:
      'Relevant for daily daytime routines. SPF 30 is the commonly recommended minimum for daily sun protection.',
    how_to_use:
      'Apply generously as the last step of your morning routine. Reapply every 2 hours during sun exposure. Follow product label instructions.',
    routine: 'AM',
    tips: 'Higher SPF provides more protection — SPF 50 is generally recommended for extended outdoor exposure.',
    safety_notes:
      'No sunscreen blocks 100% of UV rays. Combine with shade and protective clothing for comprehensive protection.',
  },

  // ─────────────────────────────────────────────
  // TREATMENTS
  // ─────────────────────────────────────────────
  {
    product_id: 'PROD025',
    product_name: 'Salicylic Acid Spot Treatment',
    product_type: 'Treatment',
    skin_types: ['Oily', 'Combination'],
    concerns: ['Acne & Breakouts', 'Pores', 'Oiliness', 'Uneven Texture'],
    key_ingredients: ['Salicylic Acid 2%', 'Zinc PCA'],
    description:
      'A targeted salicylic acid treatment formulation commonly used in blemish-focused skincare routines to address localised breakouts and pore congestion.',
    why_recommended:
      'Relevant for oily and blemish-prone routines. Salicylic acid is a commonly used BHA exfoliant in formulations designed to support the appearance of pores and skin texture.',
    how_to_use:
      'Apply sparingly to affected areas. Follow product label instructions. Do not apply to large areas unless directed.',
    routine: 'PM',
    tips: 'Use targeted spot treatments sparingly — applying to the entire face is not always necessary.',
    safety_notes:
      'Not recommended for sensitive or dry skin. Discontinue if irritation or excessive dryness develops. Use with sunscreen.',
  },
  {
    product_id: 'PROD026',
    product_name: 'Azelaic Acid Treatment',
    product_type: 'Treatment',
    skin_types: ['Oily', 'Combination', 'Sensitive'],
    concerns: ['Acne & Breakouts', 'Redness', 'Dark Spots', 'Uneven Texture'],
    key_ingredients: ['Azelaic Acid 10–15%', 'Niacinamide'],
    description:
      'A targeted azelaic acid treatment formulation commonly used for blemish-prone, redness-prone, or uneven-tone skin routines.',
    why_recommended:
      'Relevant for users with acne-prone, redness-prone, or uneven-tone skin. Azelaic acid is commonly used in formulations designed to support the appearance of blemish-prone and sensitive skin.',
    how_to_use:
      'Apply to affected areas or the full face as needed. Introduce gradually. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Azelaic acid is generally considered one of the better-tolerated active ingredients for sensitive skin.',
    safety_notes: 'Patch test recommended. Consult a skincare professional for high-concentration formulations.',
  },
  {
    product_id: 'PROD027',
    product_name: 'Benzoyl Peroxide Acne Treatment',
    product_type: 'Treatment',
    skin_types: ['Oily', 'Combination'],
    concerns: ['Acne & Breakouts'],
    key_ingredients: ['Benzoyl Peroxide 2.5–5%'],
    description:
      'A targeted acne treatment formulation with benzoyl peroxide, commonly used in blemish-focused routines.',
    why_recommended:
      'Relevant for routines specifically targeting active breakouts. Benzoyl peroxide is commonly used in formulations for blemish-prone skin.',
    how_to_use:
      'Apply a small amount to affected areas only. Introduce gradually — begin with low frequency. Follow product label instructions closely.',
    routine: 'PM',
    tips: 'Benzoyl peroxide can bleach fabrics — use white towels and pillowcases when using BP-containing products.',
    safety_notes:
      'Can cause dryness and irritation. Not suitable for sensitive skin. Introduce very gradually. Start with a low concentration (2.5%). Discontinue if severe irritation develops.',
  },
  {
    product_id: 'PROD028',
    product_name: 'Retinol-Based Treatment Serum',
    product_type: 'Treatment',
    skin_types: ['Normal', 'Combination', 'Oily'],
    concerns: ['Signs of Aging', 'Uneven Texture', 'Dark Spots', 'Dullness'],
    key_ingredients: ['Retinol', 'Bakuchiol', 'Squalane'],
    description:
      'A retinoid-based treatment serum formulation commonly used in evening routines focused on skin texture, fine lines, and uneven-looking skin tone.',
    why_recommended:
      'Relevant for evening routines targeting skin texture and aging concerns. Retinol is widely used in formulations focused on the appearance of skin renewal.',
    how_to_use:
      'Apply only in the evening to clean, dry skin. Begin with low concentration once or twice per week and gradually increase frequency. Follow product label instructions.',
    routine: 'PM',
    tips: 'Always use broad-spectrum sunscreen every morning when using retinol in your routine.',
    safety_notes:
      'Retinol can cause dryness, peeling, and sensitivity, especially when starting. Not suitable for sensitive or compromised skin without professional guidance. Not recommended during pregnancy — consult a healthcare professional.',
  },
  {
    product_id: 'PROD029',
    product_name: 'AHA Exfoliating Treatment',
    product_type: 'Treatment',
    skin_types: ['Normal', 'Dry', 'Combination'],
    concerns: ['Uneven Texture', 'Dullness', 'Dark Spots', 'Signs of Aging'],
    key_ingredients: ['Glycolic Acid', 'Lactic Acid', 'Panthenol'],
    description:
      'An AHA-based exfoliating treatment formulation with glycolic or lactic acid, commonly used in routines focused on skin texture and dull-looking skin.',
    why_recommended:
      'Relevant for users targeting dull or uneven skin texture. Alpha hydroxy acids are commonly used in formulations supporting the appearance of skin brightness and texture.',
    how_to_use:
      'Apply to clean, dry skin in the evening. Start once or twice per week and increase gradually. Follow product label instructions.',
    routine: 'PM',
    tips: 'Always use sunscreen the morning after using an AHA exfoliant — AHAs increase photosensitivity.',
    safety_notes:
      'Not suitable for sensitive or reactive skin without professional guidance. Introduce gradually. Do not combine with retinoids or other strong actives without building tolerance first.',
  },
  {
    product_id: 'PROD030',
    product_name: 'Barrier Repair Treatment',
    product_type: 'Treatment',
    skin_types: ['Dry', 'Sensitive'],
    concerns: ['Sensitivity', 'Redness', 'Dryness'],
    key_ingredients: ['Ceramides', 'Fatty Acids', 'Cholesterol', 'Oat Extract'],
    description:
      'A targeted barrier repair formulation commonly used when the skin barrier is compromised, reactive, or dry. Supports the appearance of comfortable, calmer-looking skin.',
    why_recommended:
      'Relevant for routines focused on sensitive or compromised skin. Ceramide and fatty acid combinations are commonly used in formulations designed to support the skin barrier.',
    how_to_use:
      'Apply to clean skin as a targeted treatment or as a moisturiser. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'When the skin barrier is compromised, simplify your routine and focus on gentle, barrier-supporting formulations before reintroducing active products.',
    safety_notes: 'Generally gentle. Patch test recommended.',
  },
  {
    product_id: 'PROD031',
    product_name: 'Bakuchiol Serum (Retinol Alternative)',
    product_type: 'Serum',
    skin_types: ['Sensitive', 'Dry', 'Normal'],
    concerns: ['Signs of Aging', 'Dullness', 'Uneven Texture'],
    key_ingredients: ['Bakuchiol', 'Squalane', 'Vitamin E'],
    description:
      'A bakuchiol serum formulation commonly discussed as a gentler plant-derived alternative to retinol for aging-focused routines.',
    why_recommended:
      'Relevant for users interested in an anti-aging-focused serum that may be more suitable for sensitive skin than retinol-based formulations.',
    how_to_use:
      'Apply to clean skin before moisturiser. Can be used morning or evening. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Bakuchiol is generally considered more gentle than retinol and may be suitable for sensitive skin types seeking anti-aging options.',
    safety_notes: 'Patch test recommended. Generally well-tolerated.',
  },
  {
    product_id: 'PROD032',
    product_name: 'Alpha Arbutin Serum',
    product_type: 'Serum',
    skin_types: ['Normal', 'Combination', 'Dry'],
    concerns: ['Dark Spots', 'Dullness'],
    key_ingredients: ['Alpha Arbutin', 'Hyaluronic Acid', 'Glycerin'],
    description:
      'A serum formulation containing alpha arbutin, commonly used in routines focused on the appearance of dark spots and uneven skin tone.',
    why_recommended:
      'Relevant for users seeking a serum targeting uneven-looking skin tone. Alpha arbutin is commonly used in formulations for post-mark fading and tone support.',
    how_to_use:
      'Apply to clean skin before moisturiser. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Pair with daily sunscreen for best results when targeting uneven skin tone and dark spots.',
    safety_notes: 'Patch test recommended. Generally well-tolerated.',
  },
  {
    product_id: 'PROD033',
    product_name: 'Squalane Facial Oil',
    product_type: 'Serum',
    skin_types: ['Dry', 'Normal', 'Sensitive'],
    concerns: ['Dryness', 'Signs of Aging', 'Sensitivity'],
    key_ingredients: ['Squalane'],
    description:
      'A squalane facial oil formulation commonly used as a lightweight oil step to support skin hydration and comfort.',
    why_recommended:
      'Relevant for dry or normal skin routines where additional oil-based hydration support is needed. Squalane is commonly used in formulations for dry, comfortable-feeling skin.',
    how_to_use:
      'Apply a few drops to clean skin, alone or mixed with moisturiser. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Squalane is derived from sugarcane in many formulations and is generally suitable for most skin types, including sensitive skin.',
    safety_notes: 'Generally well-tolerated. Patch test recommended.',
  },

  // ─────────────────────────────────────────────
  // BODY / SUPPORTIVE CARE
  // ─────────────────────────────────────────────
  {
    product_id: 'PROD034',
    product_name: 'Gentle Fragrance-Free Body Wash',
    product_type: 'Body Care',
    skin_types: ['Sensitive', 'Dry', 'Normal'],
    concerns: ['Sensitivity', 'Dryness', 'Redness'],
    key_ingredients: ['Glycerin', 'Oat Extract', 'Panthenol'],
    description:
      'A gentle, fragrance-free body wash formulation suitable for sensitive and dry body skin. Designed for daily use without stripping moisture.',
    why_recommended:
      'Relevant for sensitive body skin routines. Fragrance-free formulations are commonly recommended for reactive or dry body skin.',
    how_to_use:
      'Use daily during bathing. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Choose fragrance-free body wash formulations for sensitive or eczema-prone body skin.',
    safety_notes: 'Patch test recommended. Discontinue if irritation develops.',
  },
  {
    product_id: 'PROD035',
    product_name: 'Body Moisturiser Lotion',
    product_type: 'Body Care',
    skin_types: ['Normal', 'Dry', 'Combination'],
    concerns: ['Dryness'],
    key_ingredients: ['Glycerin', 'Shea Butter', 'Vitamin E'],
    description:
      'A daily body moisturiser lotion formulation designed to support comfortable, hydrated body skin.',
    why_recommended:
      'Relevant for daily body care routines, particularly for those with dry or normal body skin.',
    how_to_use:
      'Apply to clean body skin after bathing. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Apply body moisturiser immediately after bathing while skin is still slightly damp for better absorption.',
    safety_notes: 'Patch test recommended. Avoid application to broken or irritated skin.',
  },
  {
    product_id: 'PROD036',
    product_name: 'Urea Moisturiser (10%)',
    product_type: 'Body Care',
    skin_types: ['Dry', 'Sensitive'],
    concerns: ['Dryness', 'Uneven Texture'],
    key_ingredients: ['Urea 10%', 'Glycerin', 'Ceramides'],
    description:
      'A urea-based moisturiser formulation commonly used for very dry or rough body skin. Urea is a humectant and mild keratolytic commonly used in formulations supporting skin softness and texture.',
    why_recommended:
      'Relevant for very dry or rough skin routines. Urea-based formulations are commonly used for rough, thickened, or extremely dry skin.',
    how_to_use:
      'Apply to dry body areas as needed. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Urea formulations are commonly used on areas such as heels, elbows, or knees prone to rough or thickened skin.',
    safety_notes:
      'Higher urea concentrations may cause initial tingling. Not typically suitable for broken or acutely irritated skin. Patch test recommended.',
  },
  {
    product_id: 'PROD037',
    product_name: 'Fragrance-Free Barrier Body Cream',
    product_type: 'Body Care',
    skin_types: ['Sensitive', 'Dry'],
    concerns: ['Sensitivity', 'Dryness', 'Redness'],
    key_ingredients: ['Ceramides', 'Petrolatum', 'Oat Extract'],
    description:
      'A thick, fragrance-free barrier cream formulation for sensitive or dry body skin. Commonly used in supportive care routines for very dry or reactive body skin.',
    why_recommended:
      'Relevant for sensitive or very dry body skin routines. Ceramide and petrolatum-based formulations are commonly used to support skin barrier integrity.',
    how_to_use:
      'Apply to affected body areas as needed. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Barrier creams are thicker than standard moisturisers — particularly useful for very dry or sensitive body skin areas.',
    safety_notes: 'Patch test recommended. Consult a healthcare professional for ongoing or severe dry skin conditions.',
  },

  // ─────────────────────────────────────────────
  // ADDITIONAL SERUMS / TREATMENTS
  // ─────────────────────────────────────────────
  {
    product_id: 'PROD038',
    product_name: 'Kojic Acid Serum',
    product_type: 'Serum',
    skin_types: ['Normal', 'Combination', 'Dry'],
    concerns: ['Dark Spots', 'Dullness'],
    key_ingredients: ['Kojic Acid', 'Glycerin', 'Niacinamide'],
    description:
      'A serum formulation with kojic acid, commonly used in routines targeting the appearance of uneven-looking skin tone and post-blemish marks.',
    why_recommended:
      'Relevant for users targeting uneven-looking skin tone. Kojic acid is commonly used in formulations supporting the appearance of more even-looking skin.',
    how_to_use:
      'Apply to clean skin before moisturiser. Follow product label instructions and introduce gradually.',
    routine: 'PM',
    tips: 'Use alongside daily sunscreen for best results when targeting pigmentation.',
    safety_notes: 'Patch test recommended. Some individuals may find kojic acid irritating — introduce gradually.',
  },
  {
    product_id: 'PROD039',
    product_name: 'Lactic Acid Exfoliant',
    product_type: 'Treatment',
    skin_types: ['Dry', 'Normal', 'Sensitive'],
    concerns: ['Uneven Texture', 'Dullness', 'Dryness'],
    key_ingredients: ['Lactic Acid', 'Hyaluronic Acid', 'Glycerin'],
    description:
      'A lactic acid exfoliant formulation commonly used for a gentler AHA exfoliating option that also provides hydration alongside exfoliation.',
    why_recommended:
      'Relevant for users seeking a gentler exfoliating option. Lactic acid is generally considered a milder AHA suitable for dry or sensitive skin types compared to glycolic acid.',
    how_to_use:
      'Apply to clean skin in the evening. Introduce gradually — once or twice per week initially. Follow product label instructions.',
    routine: 'PM',
    tips: 'Lactic acid is generally considered more hydrating than glycolic acid, making it potentially more suitable for dry skin exfoliation.',
    safety_notes:
      'Use sunscreen the following morning. Do not combine with other exfoliating actives without building tolerance. Patch test recommended.',
  },
  {
    product_id: 'PROD040',
    product_name: 'Mandelic Acid Serum',
    product_type: 'Serum',
    skin_types: ['Sensitive', 'Oily', 'Combination'],
    concerns: ['Acne & Breakouts', 'Uneven Texture', 'Dark Spots'],
    key_ingredients: ['Mandelic Acid', 'Niacinamide'],
    description:
      'A mandelic acid serum formulation, commonly used as a gentler exfoliating option for blemish-prone or sensitive skin routines.',
    why_recommended:
      'Relevant for users seeking a gentler exfoliating serum option. Mandelic acid is often considered suitable for sensitive or blemish-prone skin due to its larger molecular size.',
    how_to_use:
      'Apply to clean skin in the evening. Introduce gradually. Follow product label instructions.',
    routine: 'PM',
    tips: 'Mandelic acid may be a suitable exfoliating option for skin types that find glycolic acid too strong.',
    safety_notes: 'Use sunscreen the following morning. Patch test recommended.',
  },
  {
    product_id: 'PROD041',
    product_name: 'Panthenol Hydrating Serum',
    product_type: 'Serum',
    skin_types: ['Sensitive', 'Dry', 'Normal'],
    concerns: ['Dryness', 'Redness', 'Sensitivity'],
    key_ingredients: ['Panthenol (Provitamin B5)', 'Glycerin', 'Allantoin'],
    description:
      'A hydrating serum formulation with panthenol (provitamin B5), commonly used in routines focused on skin comfort and hydration support.',
    why_recommended:
      'Relevant for sensitive or dry skin routines. Panthenol is widely used in formulations for its humectant and soothing properties.',
    how_to_use:
      'Apply to clean skin before moisturiser. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Panthenol is generally well-tolerated and can be a good addition to sensitive skin routines.',
    safety_notes: 'Generally gentle. Patch test recommended.',
  },
  {
    product_id: 'PROD042',
    product_name: 'Green Tea Antioxidant Serum',
    product_type: 'Serum',
    skin_types: ['Oily', 'Combination', 'Normal'],
    concerns: ['Oiliness', 'Dullness', 'Acne & Breakouts'],
    key_ingredients: ['Green Tea Extract (EGCG)', 'Niacinamide', 'Hyaluronic Acid'],
    description:
      'An antioxidant serum formulation with green tea extract, commonly used in routines focused on oily skin and overall skin condition.',
    why_recommended:
      'Relevant for oily and combination skin routines. Green tea extract is commonly used in formulations for its antioxidant properties.',
    how_to_use:
      'Apply to clean skin before moisturiser. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Antioxidant serums are generally best applied in the morning routine.',
    safety_notes: 'Generally well-tolerated. Patch test recommended.',
  },
  {
    product_id: 'PROD043',
    product_name: 'Rosehip Seed Oil',
    product_type: 'Serum',
    skin_types: ['Dry', 'Normal', 'Combination'],
    concerns: ['Dark Spots', 'Signs of Aging', 'Dryness'],
    key_ingredients: ['Rosehip Seed Oil', 'Vitamin A (naturally occurring)', 'Vitamin E'],
    description:
      'A facial oil formulation with rosehip seed oil, commonly used in evening routines for dry or aging-focused skin concerns.',
    why_recommended:
      'Relevant for dry or aging-focused evening routines. Rosehip seed oil is commonly used in formulations targeting the appearance of uneven tone and dry skin.',
    how_to_use:
      'Apply a few drops to clean skin in the evening. Follow product label instructions.',
    routine: 'PM',
    tips: 'Rosehip oil can be used alone or layered under a richer moisturiser in dry skin routines.',
    safety_notes:
      'Not suitable as a sole daytime product. Patch test recommended. May not suit acne-prone skin types due to oil content.',
  },
  {
    product_id: 'PROD044',
    product_name: 'Glycolic Acid Toner',
    product_type: 'Treatment',
    skin_types: ['Normal', 'Oily', 'Combination'],
    concerns: ['Uneven Texture', 'Dullness', 'Pores', 'Dark Spots'],
    key_ingredients: ['Glycolic Acid 5–7%', 'Aloe Vera', 'Glycerin'],
    description:
      'A glycolic acid toner formulation commonly used as an exfoliating step in routines focused on skin texture, brightness, and pore appearance.',
    why_recommended:
      'Relevant for normal and oily skin routines targeting texture and dullness. Glycolic acid is the smallest AHA molecule and is commonly used in exfoliating formulations.',
    how_to_use:
      'Apply to clean skin with a cotton pad in the evening. Introduce gradually. Follow product label instructions.',
    routine: 'PM',
    tips: 'Do not use a glycolic acid toner on the same evening as other exfoliating actives.',
    safety_notes:
      'Not typically suitable for sensitive or dry skin. Use sunscreen the following morning. Patch test recommended.',
  },
  {
    product_id: 'PROD045',
    product_name: 'Pore-Minimising Primer Serum',
    product_type: 'Serum',
    skin_types: ['Oily', 'Combination'],
    concerns: ['Pores', 'Oiliness'],
    key_ingredients: ['Niacinamide', 'Silica', 'Zinc PCA'],
    description:
      'A serum formulation with niacinamide and silica, commonly used in routines targeting the appearance of visible pores and surface oiliness.',
    why_recommended:
      'Relevant for oily and combination skin routines targeting pore appearance. Niacinamide and zinc are commonly used in formulations for pore and oil control.',
    how_to_use:
      'Apply to clean skin before moisturiser. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Pore minimising products address the appearance of pores — enlarged pores are largely determined by genetics and skin type.',
    safety_notes: 'Patch test recommended. Generally well-tolerated.',
  },
  {
    product_id: 'PROD046',
    product_name: 'Calamine Soothing Lotion',
    product_type: 'Treatment',
    skin_types: ['Sensitive', 'Oily', 'Combination'],
    concerns: ['Redness', 'Sensitivity', 'Acne & Breakouts'],
    key_ingredients: ['Calamine', 'Zinc Oxide', 'Glycerin'],
    description:
      'A soothing treatment formulation with calamine, commonly used for redness-prone and reactive skin to support the appearance of calmer-looking skin.',
    why_recommended:
      'Relevant for sensitive or redness-prone skin routines. Calamine and zinc oxide are commonly used in supportive formulations for reactive skin.',
    how_to_use:
      'Apply to affected areas as needed. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Calamine formulations can be soothing as a spot treatment or overall application for reactive skin.',
    safety_notes: 'Patch test recommended. Consult a healthcare professional for persistent or severe skin redness.',
  },
  {
    product_id: 'PROD047',
    product_name: 'Licorice Root Extract Serum',
    product_type: 'Serum',
    skin_types: ['Normal', 'Combination', 'Sensitive'],
    concerns: ['Dark Spots', 'Redness', 'Dullness'],
    key_ingredients: ['Licorice Root Extract', 'Niacinamide', 'Hyaluronic Acid'],
    description:
      'A serum formulation with licorice root extract, commonly used in routines targeting uneven-looking skin tone and redness-prone skin.',
    why_recommended:
      'Relevant for routines targeting the appearance of uneven tone and redness. Licorice root extract is commonly used in formulations for tone-supporting skincare.',
    how_to_use:
      'Apply to clean skin before moisturiser. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Pairing a tone-targeting serum with daily sunscreen supports best results over time.',
    safety_notes: 'Patch test recommended. Generally well-tolerated.',
  },
  {
    product_id: 'PROD048',
    product_name: 'Snail Mucin Essence',
    product_type: 'Essence',
    skin_types: ['Dry', 'Normal', 'Combination', 'Sensitive'],
    concerns: ['Dryness', 'Signs of Aging', 'Dullness', 'Uneven Texture'],
    key_ingredients: ['Snail Secretion Filtrate', 'Hyaluronic Acid', 'Glycerin'],
    description:
      'An essence formulation with snail secretion filtrate, commonly used in multi-step skincare routines for hydration and skin comfort support.',
    why_recommended:
      'Relevant for hydration and skin texture-focused routines. Snail mucin is commonly used in formulations for its humectant and skin-conditioning properties.',
    how_to_use:
      'Apply to clean skin before serum and moisturiser. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Essences are typically applied after toning and before serums in a multi-step routine.',
    safety_notes: 'Not suitable for those with shellfish or snail allergies. Patch test recommended.',
  },
  {
    product_id: 'PROD049',
    product_name: 'Retinal Serum (Retinaldehyde)',
    product_type: 'Treatment',
    skin_types: ['Normal', 'Combination'],
    concerns: ['Signs of Aging', 'Uneven Texture', 'Dullness'],
    key_ingredients: ['Retinaldehyde', 'Squalane', 'Ceramides'],
    description:
      'A retinaldehyde-based treatment serum formulation. Retinaldehyde is commonly discussed as a potent form of vitamin A that may be better tolerated than prescription retinoids for some users.',
    why_recommended:
      'Relevant for advanced anti-aging evening routines. Retinaldehyde is a form of vitamin A used in formulations for skin texture and renewal support.',
    how_to_use:
      'Apply only in the evening. Begin with low frequency and introduce very gradually. Follow product label instructions.',
    routine: 'PM',
    tips: 'Use daily sunscreen every morning when using retinaldehyde in your evening routine.',
    safety_notes:
      'Can cause irritation, peeling, and dryness. Not suitable for sensitive or dry skin without professional guidance. Not recommended during pregnancy — consult a healthcare professional.',
  },
  {
    product_id: 'PROD050',
    product_name: 'Vitamin B5 Healing Gel',
    product_type: 'Treatment',
    skin_types: ['Sensitive', 'Dry', 'Normal'],
    concerns: ['Sensitivity', 'Redness', 'Dryness'],
    key_ingredients: ['Panthenol (Vitamin B5)', 'Centella Asiatica', 'Glycerin'],
    description:
      'A panthenol-based healing gel formulation commonly used to support the appearance of irritated or compromised skin in supportive skincare routines.',
    why_recommended:
      'Relevant for routines focused on soothing and supporting sensitive or compromised skin. Panthenol is widely used in formulations for its humectant and calming properties.',
    how_to_use:
      'Apply to clean skin as needed. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Vitamin B5 gels can be used as a simple, minimal-ingredient step when the skin is reactive or irritated.',
    safety_notes: 'Generally gentle. Patch test recommended.',
  },

  // ── CLEANSERS (gap fill) ──
  {
    product_id: 'PROD051',
    product_name: 'Gentle Daily Cleanser',
    product_type: 'Cleanser',
    skin_types: ['Normal', 'Combination', 'Oily', 'Dry'],
    concerns: ['Dryness', 'Dehydration', 'Sensitivity'],
    key_ingredients: ['Glycerin', 'Panthenol', 'Amino Acids'],
    description:
      'A simple, everyday cleanser formulation suitable for most skin types. Designed for users who want a straightforward daily cleansing step without harsh surfactants.',
    why_recommended:
      'Relevant for beginners or anyone seeking a basic daily cleanser that works across common skin types.',
    how_to_use:
      'Apply to damp skin, massage gently, and rinse with lukewarm water. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'A gentle daily cleanser is often enough for simple morning and evening routines.',
    safety_notes: 'Patch test recommended when trying any new cleanser.',
  },
  {
    product_id: 'PROD052',
    product_name: 'Sensitive Skin Cleanser',
    product_type: 'Cleanser',
    skin_types: ['Sensitive', 'Dry', 'Normal'],
    concerns: ['Sensitivity', 'Redness', 'Dryness', 'Barrier Support'],
    key_ingredients: ['Oat Extract', 'Allantoin', 'Glycerin', 'Ceramides'],
    description:
      'A fragrance-free cleanser formulation specifically designed for reactive and easily irritated skin. Minimises potential irritants while effectively removing daily buildup.',
    why_recommended:
      'Relevant for sensitive skin routines where a dedicated, minimal-ingredient cleanser is preferred over general formulas.',
    how_to_use:
      'Apply to damp skin using gentle circular motions, then rinse. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Look for fragrance-free and low-foam formulas when managing sensitive skin.',
    safety_notes: 'Patch test recommended. Discontinue if stinging or redness increases.',
  },
  {
    product_id: 'PROD053',
    product_name: 'Oil Cleanser',
    product_type: 'Cleanser',
    skin_types: ['Dry', 'Normal', 'Combination', 'Sensitive'],
    concerns: ['Dryness', 'Dehydration', 'Sensitivity'],
    key_ingredients: ['Squalane', 'Vitamin E', 'Grape Seed Oil'],
    description:
      'An oil-based cleanser formulation used as a first cleanse to dissolve sunscreen, makeup, and surface oil without stripping the skin.',
    why_recommended:
      'Relevant for double-cleansing routines or dry skin types that benefit from oil-based cleansing before a water-based cleanser.',
    how_to_use:
      'Apply to dry skin, massage gently, then emulsify with water and rinse. Follow with a second cleanser if desired. Follow product label instructions.',
    routine: 'PM',
    tips: 'Oil cleansing can be especially helpful for removing sunscreen and long-wear makeup in the evening.',
    safety_notes: 'Patch test recommended. Avoid if you have known allergies to listed plant oils.',
  },
  {
    product_id: 'PROD054',
    product_name: 'Barrier-Support Cleanser',
    product_type: 'Cleanser',
    skin_types: ['Dry', 'Sensitive', 'Normal'],
    concerns: ['Barrier Support', 'Dryness', 'Sensitivity', 'Redness'],
    key_ingredients: ['Ceramides', 'Cholesterol', 'Fatty Acids', 'Panthenol'],
    description:
      'A barrier-focused cleanser formulation that cleanses while supporting the skin moisture barrier. Suitable for compromised or dryness-prone skin.',
    why_recommended:
      'Relevant when the skin barrier needs extra support during cleansing, such as after over-exfoliation or during seasonal dryness.',
    how_to_use:
      'Apply to damp skin, massage gently, and rinse. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Pair with a barrier-support moisturiser for a cohesive routine when skin feels reactive or tight after cleansing.',
    safety_notes: 'Generally gentle. Patch test recommended for sensitive skin.',
  },
  {
    product_id: 'PROD055',
    product_name: 'Hydrating Gel Cleanser',
    product_type: 'Cleanser',
    skin_types: ['Combination', 'Normal', 'Oily', 'Dry'],
    concerns: ['Dehydration', 'Dryness', 'Oiliness'],
    key_ingredients: ['Hyaluronic Acid', 'Glycerin', 'Aloe Vera'],
    description:
      'A non-foaming gel cleanser that provides hydration during cleansing. Suitable for combination and dehydrated skin that needs moisture without heavy residue.',
    why_recommended:
      'Relevant for combination or dehydrated skin that finds foaming cleansers too drying but still wants a lightweight gel texture.',
    how_to_use:
      'Massage onto damp skin and rinse thoroughly. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Hydrating gel cleansers can suit skin that feels tight after foaming formulas.',
    safety_notes: 'Patch test recommended.',
  },
  {
    product_id: 'PROD056',
    product_name: 'Amino Acid Gentle Cleanser',
    product_type: 'Cleanser',
    skin_types: ['Sensitive', 'Dry', 'Normal', 'Combination'],
    concerns: ['Sensitivity', 'Dryness', 'Redness', 'Barrier Support'],
    key_ingredients: ['Amino Acid Surfactants', 'Glycerin', 'Betaine'],
    description:
      'A mild amino acid-based cleanser formulation that produces a soft lather while maintaining skin comfort. Commonly used in gentle skincare routines.',
    why_recommended:
      'Relevant for users seeking a gentle cleanser with amino acid surfactants, which are often considered milder than traditional foaming agents.',
    how_to_use:
      'Lather with water, apply to damp skin, and rinse. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Amino acid cleansers are a popular choice for sensitive-skin routines in many regions.',
    safety_notes: 'Patch test recommended.',
  },
  {
    product_id: 'PROD057',
    product_name: 'Purifying Clay Cleanser',
    product_type: 'Cleanser',
    skin_types: ['Oily', 'Combination'],
    concerns: ['Oiliness', 'Pores', 'Acne & Breakouts'],
    key_ingredients: ['Kaolin Clay', 'Bentonite', 'Niacinamide', 'Glycerin'],
    description:
      'A clay-based cleanser formulation that helps absorb excess surface oil while cleansing. Suitable for oily and combination skin types.',
    why_recommended:
      'Relevant for oily skin routines where a clay cleanser can help manage surface oiliness without a separate mask step.',
    how_to_use:
      'Apply to damp skin, massage briefly, and rinse. Use as directed on the product label — typically not daily for all skin types.',
    routine: 'PM',
    tips: 'Clay cleansers may be best used a few times per week rather than twice daily for some users.',
    safety_notes: 'Can be drying. Not recommended for dry or sensitive skin. Patch test recommended.',
  },
  {
    product_id: 'PROD058',
    product_name: 'Centella Cleansing Balm',
    product_type: 'Cleanser',
    skin_types: ['Sensitive', 'Dry', 'Normal', 'Combination'],
    concerns: ['Sensitivity', 'Redness', 'Dryness', 'Barrier Support'],
    key_ingredients: ['Centella Asiatica', 'Ceramides', 'Shea Butter'],
    description:
      'A balm-to-oil cleanser with centella asiatica for sensitive skin double cleansing. Melts away makeup and sunscreen while supporting calm-looking skin.',
    why_recommended:
      'Relevant for sensitive skin users who want the benefits of balm cleansing with soothing centella ingredients.',
    how_to_use:
      'Massage onto dry skin until balm melts, add water to emulsify, then rinse. Follow product label instructions.',
    routine: 'PM',
    tips: 'Balm cleansers work well as the first step in a double-cleanse routine.',
    safety_notes: 'Patch test recommended. Avoid if allergic to any balm base ingredients.',
  },

  // ── ESSENCES / TONERS ──
  {
    product_id: 'PROD059',
    product_name: 'Hydrating Facial Toner',
    product_type: 'Essence',
    skin_types: ['Dry', 'Normal', 'Combination', 'Sensitive'],
    concerns: ['Dehydration', 'Dryness', 'Dullness', 'Barrier Support'],
    key_ingredients: ['Hyaluronic Acid', 'Glycerin', 'Panthenol'],
    description:
      'A lightweight hydrating toner formulation applied after cleansing to replenish moisture before serums and moisturiser.',
    why_recommended:
      'Relevant for dehydrated or dry skin routines where an extra hydration step after cleansing supports overall skin comfort.',
    how_to_use:
      'Apply to clean skin with hands or a cotton pad. Follow with serum and moisturiser. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Applying toner to slightly damp skin can help humectants work more effectively.',
    safety_notes: 'Generally suitable for most skin types. Patch test recommended for sensitive skin.',
  },
  {
    product_id: 'PROD060',
    product_name: 'Niacinamide Balancing Toner',
    product_type: 'Essence',
    skin_types: ['Oily', 'Combination', 'Normal'],
    concerns: ['Oiliness', 'Pores', 'Acne & Breakouts', 'Dark Spots'],
    key_ingredients: ['Niacinamide', 'Zinc PCA', 'Glycerin'],
    description:
      'A balancing toner formulation with niacinamide for oily and combination skin. Helps prep skin before targeted treatments.',
    why_recommended:
      'Relevant for oily and combination skin routines seeking a toner step focused on oil balance and pore appearance.',
    how_to_use:
      'Apply to clean skin after cleansing. Follow with moisturiser and sunscreen in the morning. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Niacinamide toners can complement (not replace) a dedicated niacinamide serum in some routines.',
    safety_notes: 'Patch test recommended. Introduce gradually if new to niacinamide.',
  },
  {
    product_id: 'PROD061',
    product_name: 'Centella Soothing Toner',
    product_type: 'Essence',
    skin_types: ['Sensitive', 'Dry', 'Normal', 'Combination'],
    concerns: ['Redness', 'Sensitivity', 'Barrier Support', 'Dryness'],
    key_ingredients: ['Centella Asiatica', 'Madecassoside', 'Panthenol', 'Glycerin'],
    description:
      'A soothing toner formulation with centella asiatica for redness-prone and sensitive skin. Provides a calming hydration step after cleansing.',
    why_recommended:
      'Relevant for sensitive or redness-prone routines where a centella-based toner adds a gentle soothing step.',
    how_to_use:
      'Pat onto clean skin with hands or a soft cotton pad. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Centella toners are commonly used when skin feels reactive or after sun exposure.',
    safety_notes: 'Generally gentle. Patch test recommended.',
  },
  {
    product_id: 'PROD062',
    product_name: 'Barrier Repair Essence',
    product_type: 'Essence',
    skin_types: ['Dry', 'Sensitive', 'Normal'],
    concerns: ['Barrier Support', 'Dryness', 'Sensitivity', 'Redness'],
    key_ingredients: ['Ceramides', 'Cholesterol', 'Fatty Acids', 'Panthenol'],
    description:
      'A barrier-focused essence formulation with ceramides and lipids to support skin barrier integrity after cleansing.',
    why_recommended:
      'Relevant for routines prioritising barrier repair, especially when skin feels compromised or overly dry.',
    how_to_use:
      'Apply to clean skin before serum and moisturiser. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Layer barrier essences under ceramide moisturisers for complementary barrier support.',
    safety_notes: 'Generally gentle. Patch test recommended.',
  },
  {
    product_id: 'PROD063',
    product_name: 'pH-Balancing Hydrating Toner',
    product_type: 'Essence',
    skin_types: ['Normal', 'Combination', 'Oily', 'Sensitive'],
    concerns: ['Sensitivity', 'Dehydration', 'Acne & Breakouts'],
    key_ingredients: ['Betaine', 'Glycerin', 'Centella Asiatica'],
    description:
      'A pH-balanced hydrating toner formulation designed to restore skin comfort after cleansing and before active products.',
    why_recommended:
      'Relevant for routines that include actives, where maintaining skin pH after cleansing may support overall routine tolerance.',
    how_to_use:
      'Apply to clean skin immediately after cleansing. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'pH-balancing toners are often used in routines with acids or retinoids.',
    safety_notes: 'Patch test recommended.',
  },
  {
    product_id: 'PROD064',
    product_name: 'Oil-Control Clarifying Toner',
    product_type: 'Essence',
    skin_types: ['Oily', 'Combination'],
    concerns: ['Oiliness', 'Pores', 'Acne & Breakouts'],
    key_ingredients: ['Witch Hazel', 'Niacinamide', 'Zinc PCA', 'Glycerin'],
    description:
      'A clarifying toner formulation for oily skin that helps remove residual impurities after cleansing while supporting oil balance.',
    why_recommended:
      'Relevant for oily skin routines where a clarifying toner step helps manage shine and pore appearance.',
    how_to_use:
      'Apply to clean skin with a cotton pad or pat in with hands. Follow with moisturiser. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Avoid over-using clarifying toners if skin feels tight or stripped.',
    safety_notes: 'Can be drying. Not recommended for dry or sensitive skin. Patch test recommended.',
  },
  {
    product_id: 'PROD065',
    product_name: 'Fermented Hydrating Essence',
    product_type: 'Essence',
    skin_types: ['Dry', 'Normal', 'Combination', 'Sensitive'],
    concerns: ['Dehydration', 'Dullness', 'Dryness', 'Signs of Aging'],
    key_ingredients: ['Galactomyces Ferment', 'Hyaluronic Acid', 'Niacinamide'],
    description:
      'A fermented essence formulation that provides lightweight hydration and supports the appearance of smoother, more radiant-looking skin.',
    why_recommended:
      'Relevant for users interested in fermented skincare ingredients for hydration and overall skin appearance.',
    how_to_use:
      'Pat onto clean skin after toner (if used) and before serum. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Fermented essences are typically applied early in a routine for maximum absorption.',
    safety_notes: 'Patch test recommended. Discontinue if irritation occurs.',
  },
  {
    product_id: 'PROD066',
    product_name: 'Beta-Glucan Hydrating Essence',
    product_type: 'Essence',
    skin_types: ['Sensitive', 'Dry', 'Normal'],
    concerns: ['Dehydration', 'Sensitivity', 'Redness', 'Barrier Support'],
    key_ingredients: ['Beta-Glucan', 'Hyaluronic Acid', 'Panthenol'],
    description:
      'A hydrating essence with beta-glucan, a polysaccharide commonly used in formulations for sensitive and dehydrated skin.',
    why_recommended:
      'Relevant for sensitive or dehydrated skin seeking a soothing hydration step beyond basic hyaluronic acid.',
    how_to_use:
      'Apply to clean skin and pat in gently. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Beta-glucan is often considered soothing and may suit reactive skin better than some other humectants.',
    safety_notes: 'Generally gentle. Patch test recommended.',
  },
  {
    product_id: 'PROD067',
    product_name: 'Combination Skin Rebalancing Toner',
    product_type: 'Essence',
    skin_types: ['Combination', 'Normal'],
    concerns: ['Oiliness', 'Dryness', 'Dehydration', 'Pores'],
    key_ingredients: ['Niacinamide', 'Hyaluronic Acid', 'Green Tea Extract'],
    description:
      'A rebalancing toner formulation designed for combination skin that needs hydration in dry areas and oil control in the T-zone.',
    why_recommended:
      'Relevant specifically for combination skin routines that need both hydration and oil balance in one toner step.',
    how_to_use:
      'Apply to clean skin, focusing on areas as needed. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Combination skin may benefit from applying richer products to dry areas and lighter products to the T-zone.',
    safety_notes: 'Patch test recommended.',
  },

  // ── SERUMS (gap fill) ──
  {
    product_id: 'PROD068',
    product_name: 'Daily Hydrating Serum',
    product_type: 'Serum',
    skin_types: ['Normal', 'Dry', 'Combination', 'Sensitive', 'Oily'],
    concerns: ['Dehydration', 'Dryness', 'Dullness', 'Barrier Support'],
    key_ingredients: ['Hyaluronic Acid', 'Glycerin', 'Panthenol'],
    description:
      'A straightforward hydrating serum for everyday use. Suitable for users who want a simple hydration boost without active ingredients.',
    why_recommended:
      'Relevant for beginners or anyone building a basic routine who needs a simple, well-tolerated hydrating serum.',
    how_to_use:
      'Apply a few drops to clean, slightly damp skin before moisturiser. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'A basic hydrating serum pairs well with most other skincare products.',
    safety_notes: 'Generally suitable for all skin types. Patch test recommended.',
  },
  {
    product_id: 'PROD069',
    product_name: 'Dehydration Recovery Serum',
    product_type: 'Serum',
    skin_types: ['Dry', 'Combination', 'Normal', 'Oily'],
    concerns: ['Dehydration', 'Dryness', 'Dullness', 'Barrier Support'],
    key_ingredients: ['Sodium Hyaluronate', 'Panthenol', 'Aloe Vera', 'Glycerin'],
    description:
      'A targeted serum formulation for dehydrated skin that lacks water (not oil). Helps replenish moisture levels and improve skin comfort.',
    why_recommended:
      'Relevant when skin feels tight, looks dull, or shows fine dehydration lines despite using moisturiser — a sign of water loss rather than oil deficiency.',
    how_to_use:
      'Apply to damp skin before moisturiser. Can be layered under richer products. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Dehydrated skin often benefits from layering humectant serums under occlusive moisturisers.',
    safety_notes: 'Patch test recommended.',
  },
  {
    product_id: 'PROD070',
    product_name: 'Combination Skin Balancing Serum',
    product_type: 'Serum',
    skin_types: ['Combination', 'Normal'],
    concerns: ['Oiliness', 'Dryness', 'Dehydration', 'Pores'],
    key_ingredients: ['Niacinamide', 'Hyaluronic Acid', 'Zinc PCA'],
    description:
      'A dual-action serum formulation balancing hydration for dry areas and oil control for the T-zone on combination skin.',
    why_recommended:
      'Relevant specifically for combination skin that needs both moisture and oil management in a single serum step.',
    how_to_use:
      'Apply to clean skin, adjusting amount by area if needed. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Apply more product to dry cheek areas and less to the oily T-zone if your skin varies significantly.',
    safety_notes: 'Patch test recommended.',
  },
  {
    product_id: 'PROD071',
    product_name: 'Copper Peptide Firming Serum',
    product_type: 'Serum',
    skin_types: ['Normal', 'Dry', 'Combination'],
    concerns: ['Signs of Aging', 'Dullness', 'Uneven Texture'],
    key_ingredients: ['Copper Peptides (GHK-Cu)', 'Hyaluronic Acid', 'Squalane'],
    description:
      'A peptide serum formulation with copper peptides, commonly used in anti-aging routines focused on skin firmness and overall appearance.',
    why_recommended:
      'Relevant for users seeking peptide-based anti-aging options beyond standard retinol or bakuchiol formulations.',
    how_to_use:
      'Apply to clean skin before moisturiser. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Copper peptides may not combine well with strong acids or vitamin C in the same routine — introduce one active at a time.',
    safety_notes: 'Patch test recommended. Avoid combining with strong acids initially.',
  },
  {
    product_id: 'PROD072',
    product_name: 'Resveratrol Antioxidant Serum',
    product_type: 'Serum',
    skin_types: ['Normal', 'Dry', 'Combination', 'Sensitive'],
    concerns: ['Signs of Aging', 'Dullness', 'Redness'],
    key_ingredients: ['Resveratrol', 'Vitamin E', 'Ferulic Acid'],
    description:
      'An antioxidant serum with resveratrol for environmental protection and support of overall skin appearance in morning routines.',
    why_recommended:
      'Relevant for users seeking antioxidant protection beyond vitamin C, especially those who find L-ascorbic acid irritating.',
    how_to_use:
      'Apply in the morning to clean skin before moisturiser and sunscreen. Follow product label instructions.',
    routine: 'AM',
    tips: 'Antioxidant serums are generally best used in the morning to support daytime environmental protection.',
    safety_notes: 'Patch test recommended.',
  },
  {
    product_id: 'PROD073',
    product_name: 'PHA Gentle Exfoliating Serum',
    product_type: 'Serum',
    skin_types: ['Sensitive', 'Dry', 'Normal'],
    concerns: ['Uneven Texture', 'Dullness', 'Dryness', 'Sensitivity'],
    key_ingredients: ['Gluconolactone (PHA)', 'Lactobionic Acid', 'Hyaluronic Acid'],
    description:
      'A PHA-based exfoliating serum formulation offering gentler exfoliation than AHAs or BHAs, with added hydration.',
    why_recommended:
      'Relevant for sensitive or dry skin types that want texture improvement without the intensity of glycolic or salicylic acid.',
    how_to_use:
      'Apply in the evening to clean skin. Start once or twice weekly. Follow product label instructions.',
    routine: 'PM',
    tips: 'PHAs are generally considered gentler exfoliants suitable for sensitive skin compared to AHAs and BHAs.',
    safety_notes: 'Use sunscreen during daytime. Patch test recommended. Introduce gradually.',
  },
  {
    product_id: 'PROD074',
    product_name: 'Beta-Glucan Soothing Serum',
    product_type: 'Serum',
    skin_types: ['Sensitive', 'Dry', 'Normal'],
    concerns: ['Sensitivity', 'Redness', 'Dryness', 'Barrier Support'],
    key_ingredients: ['Beta-Glucan', 'Panthenol', 'Centella Asiatica', 'Allantoin'],
    description:
      'A soothing serum with beta-glucan for reactive skin that needs calming support alongside hydration.',
    why_recommended:
      'Relevant for sensitive skin routines where soothing ingredients are prioritised over active treatments.',
    how_to_use:
      'Apply to clean skin before moisturiser. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Soothing serums can be helpful when reintroducing actives after a skin barrier recovery period.',
    safety_notes: 'Generally gentle. Patch test recommended.',
  },
  {
    product_id: 'PROD075',
    product_name: 'Ectoin Protective Serum',
    product_type: 'Serum',
    skin_types: ['Sensitive', 'Dry', 'Normal'],
    concerns: ['Sensitivity', 'Redness', 'Barrier Support', 'Dehydration'],
    key_ingredients: ['Ectoin', 'Hyaluronic Acid', 'Panthenol'],
    description:
      'A protective serum with ectoin, an ingredient commonly used in formulations for sensitive and environmentally stressed skin.',
    why_recommended:
      'Relevant for sensitive skin exposed to pollution, temperature changes, or other environmental stressors.',
    how_to_use:
      'Apply to clean skin morning and evening. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Ectoin is often used in formulations designed for urban or pollution-exposed skin.',
    safety_notes: 'Generally gentle. Patch test recommended.',
  },
  {
    product_id: 'PROD076',
    product_name: 'Gentle Vitamin C Derivative Serum',
    product_type: 'Serum',
    skin_types: ['Sensitive', 'Normal', 'Dry', 'Combination'],
    concerns: ['Dark Spots', 'Dullness', 'Signs of Aging'],
    key_ingredients: ['Sodium Ascorbyl Phosphate', 'Vitamin E', 'Ferulic Acid'],
    description:
      'A vitamin C derivative serum (SAP) that offers antioxidant benefits with typically less irritation than L-ascorbic acid formulations.',
    why_recommended:
      'Relevant for users who want vitamin C benefits but find pure L-ascorbic acid too irritating or unstable.',
    how_to_use:
      'Apply in the morning to clean skin before moisturiser and sunscreen. Follow product label instructions.',
    routine: 'AM',
    tips: 'Vitamin C derivatives are generally more stable and gentler than L-ascorbic acid.',
    safety_notes: 'Patch test recommended. Always follow with sunscreen in the morning.',
  },
  {
    product_id: 'PROD077',
    product_name: 'N-Acetyl Glucosamine Brightening Serum',
    product_type: 'Serum',
    skin_types: ['Normal', 'Combination', 'Dry', 'Sensitive'],
    concerns: ['Dark Spots', 'Dullness', 'Uneven Texture'],
    key_ingredients: ['N-Acetyl Glucosamine', 'Niacinamide', 'Hyaluronic Acid'],
    description:
      'A brightening serum with N-acetyl glucosamine, commonly paired with niacinamide in formulations targeting uneven skin tone.',
    why_recommended:
      'Relevant for users seeking tone-evening options beyond alpha arbutin or kojic acid, with generally good tolerance.',
    how_to_use:
      'Apply to clean skin before moisturiser. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Pair with daily sunscreen when targeting uneven skin tone.',
    safety_notes: 'Patch test recommended. Generally well-tolerated.',
  },
  {
    product_id: 'PROD078',
    product_name: 'Succinic Acid Blemish Serum',
    product_type: 'Serum',
    skin_types: ['Oily', 'Combination', 'Sensitive'],
    concerns: ['Acne & Breakouts', 'Oiliness', 'Redness'],
    key_ingredients: ['Succinic Acid', 'Niacinamide', 'Zinc PCA'],
    description:
      'A blemish-focused serum with succinic acid, a gentler alternative sometimes used in formulations for acne-prone and sensitive skin.',
    why_recommended:
      'Relevant for blemish-prone skin that may not tolerate stronger acids like salicylic or benzoyl peroxide.',
    how_to_use:
      'Apply to clean skin, focusing on breakout-prone areas. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Succinic acid is generally considered milder than many traditional blemish treatments.',
    safety_notes: 'Patch test recommended. Introduce gradually.',
  },
  {
    product_id: 'PROD079',
    product_name: 'Allantoin Soothing Serum',
    product_type: 'Serum',
    skin_types: ['Sensitive', 'Dry', 'Normal'],
    concerns: ['Sensitivity', 'Redness', 'Dryness', 'Barrier Support'],
    key_ingredients: ['Allantoin', 'Panthenol', 'Glycerin', 'Oat Extract'],
    description:
      'A minimal-ingredient soothing serum with allantoin for reactive skin needing gentle daily support.',
    why_recommended:
      'Relevant for highly reactive skin that needs a very simple, soothing serum without actives.',
    how_to_use:
      'Apply to clean skin before moisturiser. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Allantoin is commonly used in formulations for its skin-conditioning properties.',
    safety_notes: 'Generally very gentle. Patch test recommended.',
  },
  {
    product_id: 'PROD080',
    product_name: 'Multi-Weight Hyaluronic Serum',
    product_type: 'Serum',
    skin_types: ['Dry', 'Normal', 'Combination', 'Oily', 'Sensitive'],
    concerns: ['Dehydration', 'Dryness', 'Signs of Aging'],
    key_ingredients: ['Hyaluronic Acid (Multi-Molecular Weight)', 'Sodium Hyaluronate', 'Panthenol'],
    description:
      'A hyaluronic acid serum with multiple molecular weights for hydration at different skin depths.',
    why_recommended:
      'Relevant for users who want enhanced hydration beyond a single-weight hyaluronic acid formula.',
    how_to_use:
      'Apply to damp skin before moisturiser. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Multi-weight HA serums aim to hydrate both surface and deeper skin layers.',
    safety_notes: 'Patch test recommended. Apply to damp skin for best results.',
  },
  {
    product_id: 'PROD081',
    product_name: 'Ceramide Niacinamide Dual Serum',
    product_type: 'Serum',
    skin_types: ['Combination', 'Normal', 'Oily', 'Dry'],
    concerns: ['Barrier Support', 'Oiliness', 'Dehydration', 'Pores'],
    key_ingredients: ['Ceramides', 'Niacinamide', 'Hyaluronic Acid'],
    description:
      'A dual-action serum combining barrier-support ceramides with oil-balancing niacinamide for comprehensive routine support.',
    why_recommended:
      'Relevant for users who want both barrier support and oil control in one serum step.',
    how_to_use:
      'Apply to clean skin before moisturiser. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'This combination addresses both barrier health and oil balance — two common concerns in one step.',
    safety_notes: 'Patch test recommended.',
  },
  {
    product_id: 'PROD082',
    product_name: 'CoQ10 Antioxidant Defense Serum',
    product_type: 'Serum',
    skin_types: ['Normal', 'Dry', 'Combination'],
    concerns: ['Signs of Aging', 'Dullness', 'Dryness'],
    key_ingredients: ['Coenzyme Q10 (Ubiquinone)', 'Vitamin E', 'Squalane'],
    description:
      'An antioxidant serum with coenzyme Q10 for aging-focused routines and support against environmental oxidative stress.',
    why_recommended:
      'Relevant for anti-aging routines seeking antioxidant options beyond vitamin C and green tea.',
    how_to_use:
      'Apply in the morning or evening to clean skin. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'CoQ10 levels in skin naturally decline with age — topical formulations may support overall skin appearance.',
    safety_notes: 'Patch test recommended.',
  },
  {
    product_id: 'PROD083',
    product_name: 'Oil-Control Mattifying Serum',
    product_type: 'Serum',
    skin_types: ['Oily', 'Combination'],
    concerns: ['Oiliness', 'Pores', 'Acne & Breakouts'],
    key_ingredients: ['Niacinamide', 'Zinc PCA', 'Silica', 'Kaolin'],
    description:
      'A mattifying serum formulation designed to reduce the appearance of surface oil and shine throughout the day.',
    why_recommended:
      'Relevant for oily skin users who need dedicated oil control beyond a standard niacinamide serum.',
    how_to_use:
      'Apply to clean skin in the morning before moisturiser and sunscreen. Follow product label instructions.',
    routine: 'AM',
    tips: 'Mattifying serums work best under lightweight, oil-free moisturisers and gel sunscreens.',
    safety_notes: 'Patch test recommended. Not recommended for dry skin.',
  },
  {
    product_id: 'PROD084',
    product_name: 'Collagen Support Peptide Serum',
    product_type: 'Serum',
    skin_types: ['Dry', 'Normal', 'Combination'],
    concerns: ['Signs of Aging', 'Dryness', 'Dullness'],
    key_ingredients: ['Matrixyl (Peptide Complex)', 'Hyaluronic Acid', 'Ceramides'],
    description:
      'A collagen-support peptide serum focused on the appearance of skin firmness and elasticity in aging routines.',
    why_recommended:
      'Relevant for users seeking peptide-based firming support as an alternative or complement to retinol.',
    how_to_use:
      'Apply to clean skin before moisturiser. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Peptide serums can generally be used alongside retinol when introduced gradually.',
    safety_notes: 'Patch test recommended.',
  },
  {
    product_id: 'PROD085',
    product_name: 'Tea Tree Clarifying Serum',
    product_type: 'Serum',
    skin_types: ['Oily', 'Combination'],
    concerns: ['Acne & Breakouts', 'Oiliness', 'Pores'],
    key_ingredients: ['Tea Tree Extract', 'Niacinamide', 'Zinc PCA'],
    description:
      'A clarifying serum with tea tree extract for blemish-prone and oily skin routines.',
    why_recommended:
      'Relevant for oily, acne-prone routines seeking a natural-leaning clarifying ingredient alongside niacinamide.',
    how_to_use:
      'Apply to clean skin, focusing on breakout-prone areas. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Tea tree is commonly used in blemish-focused formulations — patch test first as some individuals are sensitive to it.',
    safety_notes: 'Patch test essential. Discontinue if irritation occurs. Avoid undiluted tea tree oil on skin.',
  },

  // ── MOISTURIZERS (gap fill) ──
  {
    product_id: 'PROD086',
    product_name: 'Daily Hydrating Moisturizer',
    product_type: 'Moisturizer',
    skin_types: ['Normal', 'Dry', 'Combination', 'Sensitive'],
    concerns: ['Dryness', 'Dehydration', 'Sensitivity', 'Barrier Support'],
    key_ingredients: ['Glycerin', 'Hyaluronic Acid', 'Squalane'],
    description:
      'An everyday moisturiser for daily hydration without heavy texture. A straightforward option for basic skincare routines.',
    why_recommended:
      'Relevant for beginners or anyone needing a reliable daily moisturiser without specialised actives.',
    how_to_use:
      'Apply to clean skin morning and evening. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'A daily moisturiser is a core step in any routine — apply even if your skin feels oily in some areas.',
    safety_notes: 'Patch test recommended.',
  },
  {
    product_id: 'PROD087',
    product_name: 'Lightweight Everyday Moisturizer',
    product_type: 'Moisturizer',
    skin_types: ['Oily', 'Combination', 'Normal'],
    concerns: ['Oiliness', 'Dehydration', 'Acne & Breakouts'],
    key_ingredients: ['Hyaluronic Acid', 'Glycerin', 'Aloe Vera'],
    description:
      'A featherlight moisturiser that hydrates without adding heaviness. Ideal for users who dislike rich cream textures.',
    why_recommended:
      'Relevant for oily or combination skin users who want hydration without a greasy finish.',
    how_to_use:
      'Apply a thin layer to clean skin. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Lightweight moisturisers can be layered under sunscreen without feeling heavy.',
    safety_notes: 'Patch test recommended.',
  },
  {
    product_id: 'PROD088',
    product_name: 'Combination Skin Gel-Cream',
    product_type: 'Moisturizer',
    skin_types: ['Combination', 'Normal'],
    concerns: ['Oiliness', 'Dryness', 'Dehydration', 'Pores'],
    key_ingredients: ['Niacinamide', 'Hyaluronic Acid', 'Ceramides'],
    description:
      'A gel-cream moisturiser balancing lightweight texture with adequate hydration for combination skin types.',
    why_recommended:
      'Relevant specifically for combination skin that needs a moisturiser addressing both oily T-zone and dry cheek areas.',
    how_to_use:
      'Apply to clean skin, adjusting amount by facial area. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Gel-cream textures often suit combination skin better than heavy creams or very light gels alone.',
    safety_notes: 'Patch test recommended.',
  },
  {
    product_id: 'PROD089',
    product_name: 'Basic Barrier Cream',
    product_type: 'Moisturizer',
    skin_types: ['Dry', 'Sensitive', 'Normal'],
    concerns: ['Barrier Support', 'Dryness', 'Sensitivity', 'Redness'],
    key_ingredients: ['Ceramides', 'Petrolatum', 'Glycerin', 'Panthenol'],
    description:
      'A no-frills barrier cream for skin that needs straightforward protection and moisture. Suitable for compromised or reactive skin.',
    why_recommended:
      'Relevant for users prioritising barrier repair with a simple, effective moisturiser without unnecessary additives.',
    how_to_use:
      'Apply to clean skin as the final moisturising step. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'When skin is compromised, a basic barrier cream may be all you need until skin recovers.',
    safety_notes: 'Generally gentle. Patch test recommended.',
  },
  {
    product_id: 'PROD090',
    product_name: 'Probiotic Soothing Moisturizer',
    product_type: 'Moisturizer',
    skin_types: ['Sensitive', 'Dry', 'Normal'],
    concerns: ['Sensitivity', 'Redness', 'Barrier Support', 'Dryness'],
    key_ingredients: ['Probiotics (Lactobacillus Ferment)', 'Prebiotics', 'Ceramides', 'Oat Extract'],
    description:
      'A moisturiser with probiotic and prebiotic ingredients to support the skin microbiome and comfort for sensitive skin.',
    why_recommended:
      'Relevant for sensitive skin routines interested in microbiome-supporting skincare formulations.',
    how_to_use:
      'Apply to clean skin morning and evening. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Probiotic skincare is an emerging area — results vary and consistency matters.',
    safety_notes: 'Patch test recommended.',
  },
  {
    product_id: 'PROD091',
    product_name: 'Triple Ceramide Rich Cream',
    product_type: 'Moisturizer',
    skin_types: ['Dry', 'Normal', 'Sensitive'],
    concerns: ['Dryness', 'Barrier Support', 'Signs of Aging', 'Sensitivity'],
    key_ingredients: ['Ceramides NP/AP/EOP', 'Cholesterol', 'Fatty Acids', 'Shea Butter'],
    description:
      'A rich cream with three ceramide types plus cholesterol and fatty acids — the lipid combination commonly used in advanced barrier repair formulations.',
    why_recommended:
      'Relevant for very dry or barrier-compromised skin needing intensive lipid replenishment.',
    how_to_use:
      'Apply generously to clean skin, especially in the evening. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'The ceramide-cholesterol-fatty acid ratio mimics the skin natural lipid structure.',
    safety_notes: 'Patch test recommended. May feel heavy for oily skin types.',
  },
  {
    product_id: 'PROD092',
    product_name: 'Water Cream Lightweight Moisturizer',
    product_type: 'Moisturizer',
    skin_types: ['Oily', 'Combination', 'Normal'],
    concerns: ['Oiliness', 'Dehydration', 'Pores'],
    key_ingredients: ['Hyaluronic Acid', 'Glycerin', 'Dimethicone'],
    description:
      'A water-cream moisturiser that bursts into a lightweight, fresh texture on application. Provides hydration without occlusive heaviness.',
    why_recommended:
      'Relevant for oily skin users who want a moisturiser that feels weightless yet provides adequate hydration.',
    how_to_use:
      'Apply to clean skin and allow to absorb. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Water creams are popular in oily-skin routines for their fresh, non-greasy finish.',
    safety_notes: 'Patch test recommended.',
  },
  {
    product_id: 'PROD093',
    product_name: 'Dry Skin Intensive Cream',
    product_type: 'Moisturizer',
    skin_types: ['Dry', 'Normal'],
    concerns: ['Dryness', 'Dehydration', 'Signs of Aging', 'Barrier Support'],
    key_ingredients: ['Shea Butter', 'Squalane', 'Ceramides', 'Hyaluronic Acid'],
    description:
      'An intensive cream moisturiser for persistently dry skin that needs more than a standard lotion.',
    why_recommended:
      'Relevant for very dry skin types or seasonal dryness that requires richer, more occlusive hydration.',
    how_to_use:
      'Apply generously to clean skin, especially in the evening. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Very dry skin may benefit from applying this cream over a hydrating serum on damp skin.',
    safety_notes: 'Patch test recommended. May be too rich for oily skin.',
  },
  {
    product_id: 'PROD094',
    product_name: 'Niacinamide Hydrating Gel-Cream',
    product_type: 'Moisturizer',
    skin_types: ['Oily', 'Combination', 'Normal'],
    concerns: ['Oiliness', 'Pores', 'Dehydration', 'Dark Spots'],
    key_ingredients: ['Niacinamide', 'Hyaluronic Acid', 'Glycerin'],
    description:
      'A gel-cream moisturiser with niacinamide for oil balance and hydration in one step.',
    why_recommended:
      'Relevant for users who want niacinamide benefits in their moisturiser rather than a separate serum.',
    how_to_use:
      'Apply to clean skin morning and evening. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'If you already use a niacinamide serum, check total niacinamide exposure across your routine.',
    safety_notes: 'Patch test recommended.',
  },

  // ── SUNSCREENS (gap fill) ──
  {
    product_id: 'PROD095',
    product_name: 'Daily Sunscreen SPF 50',
    product_type: 'Sunscreen',
    skin_types: ['Normal', 'Dry', 'Combination', 'Oily', 'Sensitive'],
    concerns: ['Dark Spots', 'Signs of Aging', 'Dullness', 'Redness'],
    key_ingredients: ['UV Filters (Broad-Spectrum SPF 50)', 'Glycerin', 'Panthenol'],
    description:
      'A straightforward daily sunscreen for everyday UV protection. Suitable for most skin types as a basic morning routine final step.',
    why_recommended:
      'Relevant for beginners or anyone needing a simple, daily SPF 50 option without specialised features.',
    how_to_use:
      'Apply generously as the last step of your morning routine. Reapply every 2 hours during sun exposure. Follow product label instructions.',
    routine: 'AM',
    tips: 'Daily sunscreen is the single most impactful step for long-term skin health.',
    safety_notes: 'Reapply as directed. Sunscreen alone does not provide complete sun protection.',
  },
  {
    product_id: 'PROD096',
    product_name: 'Hydrating Sunscreen Lotion',
    product_type: 'Sunscreen',
    skin_types: ['Dry', 'Normal', 'Sensitive'],
    concerns: ['Dryness', 'Dehydration', 'Sensitivity', 'Dark Spots'],
    key_ingredients: ['UV Filters (Broad-Spectrum)', 'Hyaluronic Acid', 'Ceramides', 'Glycerin'],
    description:
      'A hydrating sunscreen lotion that combines UV protection with moisture-supporting ingredients for dry skin types.',
    why_recommended:
      'Relevant for dry skin users who find standard sunscreens too drying or tight-feeling.',
    how_to_use:
      'Apply generously in the morning as the final skincare step. Follow product label instructions.',
    routine: 'AM',
    tips: 'Hydrating sunscreens can reduce the need for a separate moisturiser in the morning for some dry skin types.',
    safety_notes: 'Patch test recommended. Reapply every 2 hours during sun exposure.',
  },
  {
    product_id: 'PROD097',
    product_name: 'Matte Finish Oil-Control Sunscreen',
    product_type: 'Sunscreen',
    skin_types: ['Oily', 'Combination'],
    concerns: ['Oiliness', 'Pores', 'Acne & Breakouts', 'Dark Spots'],
    key_ingredients: ['UV Filters (Broad-Spectrum SPF 50)', 'Silica', 'Niacinamide', 'Zinc PCA'],
    description:
      'A matte-finish sunscreen designed for oily skin that provides SPF 50 protection without adding shine.',
    why_recommended:
      'Relevant for oily skin users who struggle to find sunscreens that do not increase surface oiliness.',
    how_to_use:
      'Apply as the final morning step. Reapply as directed. Follow product label instructions.',
    routine: 'AM',
    tips: 'Matte sunscreens can double as a primer under makeup for oily skin.',
    safety_notes: 'Patch test recommended. Choose non-comedogenic formulas for acne-prone skin.',
  },
  {
    product_id: 'PROD098',
    product_name: 'Tinted Mineral Sunscreen',
    product_type: 'Sunscreen',
    skin_types: ['Sensitive', 'Dry', 'Normal', 'Combination'],
    concerns: ['Sensitivity', 'Redness', 'Dark Spots', 'Signs of Aging'],
    key_ingredients: ['Zinc Oxide', 'Titanium Dioxide', 'Iron Oxides (Tint)'],
    description:
      'A tinted mineral sunscreen that provides broad-spectrum protection while helping to even the appearance of skin tone and reduce white cast.',
    why_recommended:
      'Relevant for mineral sunscreen users who experience white cast, or those wanting light coverage with sun protection.',
    how_to_use:
      'Apply evenly as the final morning step. Reapply every 2 hours. Follow product label instructions.',
    routine: 'AM',
    tips: 'Tinted mineral sunscreens can help offset the white cast common with untinted mineral formulas.',
    safety_notes: 'Patch test recommended. Choose a tint shade appropriate for your skin tone where possible.',
  },
  {
    product_id: 'PROD099',
    product_name: 'Fragrance-Free Daily Sunscreen',
    product_type: 'Sunscreen',
    skin_types: ['Sensitive', 'Dry', 'Normal', 'Combination'],
    concerns: ['Sensitivity', 'Redness', 'Dark Spots', 'Signs of Aging'],
    key_ingredients: ['UV Filters (Broad-Spectrum SPF 50)', 'Glycerin', 'Allantoin'],
    description:
      'A fragrance-free daily sunscreen formulated for sensitive skin that reacts to scented products.',
    why_recommended:
      'Relevant for sensitive skin routines where fragrance-free sun protection is essential.',
    how_to_use:
      'Apply generously every morning. Reapply during extended sun exposure. Follow product label instructions.',
    routine: 'AM',
    tips: 'Fragrance is a common irritant — fragrance-free sunscreens are widely recommended for reactive skin.',
    safety_notes: 'Patch test recommended.',
  },
  {
    product_id: 'PROD100',
    product_name: 'Invisible Finish Gel Sunscreen',
    product_type: 'Sunscreen',
    skin_types: ['Oily', 'Combination', 'Normal'],
    concerns: ['Oiliness', 'Pores', 'Dark Spots'],
    key_ingredients: ['UV Filters (Broad-Spectrum SPF 50)', 'Hyaluronic Acid', 'Niacinamide'],
    description:
      'An invisible-finish gel sunscreen that absorbs quickly without white cast or greasy residue.',
    why_recommended:
      'Relevant for users who dislike the feel or appearance of traditional cream sunscreens.',
    how_to_use:
      'Apply as the final morning step. Allow to dry before makeup. Follow product label instructions.',
    routine: 'AM',
    tips: 'Gel sunscreens often work well under makeup due to their lightweight, fast-absorbing texture.',
    safety_notes: 'Patch test recommended. Reapply as directed.',
  },

  // ── TREATMENTS / EXFOLIANTS (gap fill) ──
  {
    product_id: 'PROD101',
    product_name: 'BHA Liquid Exfoliant 2%',
    product_type: 'Treatment',
    skin_types: ['Oily', 'Combination', 'Normal'],
    concerns: ['Acne & Breakouts', 'Pores', 'Oiliness', 'Uneven Texture'],
    key_ingredients: ['Salicylic Acid 2%', 'Green Tea Extract', 'Methylpropanediol'],
    description:
      'A leave-on BHA liquid exfoliant with 2% salicylic acid for pore care, oil control, and skin texture improvement.',
    why_recommended:
      'Relevant for oily and blemish-prone routines needing a dedicated leave-on BHA step distinct from BHA cleansers.',
    how_to_use:
      'Apply to clean skin in the evening with a cotton pad or hands. Start once or twice weekly. Follow product label instructions.',
    routine: 'PM',
    tips: 'Leave-on BHA exfoliants work differently from rinse-off BHA cleansers — do not use both on the same evening initially.',
    safety_notes: 'Not for sensitive or dry skin. Use sunscreen daily. Introduce gradually.',
  },
  {
    product_id: 'PROD102',
    product_name: 'PHA Exfoliating Solution',
    product_type: 'Treatment',
    skin_types: ['Sensitive', 'Dry', 'Normal'],
    concerns: ['Uneven Texture', 'Dullness', 'Sensitivity', 'Dryness'],
    key_ingredients: ['Gluconolactone (PHA)', 'Lactobionic Acid', 'Aloe Vera'],
    description:
      'A leave-on PHA exfoliating solution for gentle texture refinement on sensitive or dry skin.',
    why_recommended:
      'Relevant for users who need exfoliation but cannot tolerate AHA or BHA leave-on products.',
    how_to_use:
      'Apply to clean skin in the evening. Start once weekly. Follow product label instructions.',
    routine: 'PM',
    tips: 'PHAs provide hydration alongside exfoliation — a dual benefit for dry or sensitive skin.',
    safety_notes: 'Use sunscreen during daytime. Patch test recommended.',
  },
  {
    product_id: 'PROD103',
    product_name: 'Enzyme Exfoliating Powder',
    product_type: 'Treatment',
    skin_types: ['Sensitive', 'Normal', 'Dry', 'Combination'],
    concerns: ['Uneven Texture', 'Dullness', 'Sensitivity'],
    key_ingredients: ['Papain (Papaya Enzyme)', 'Bromelain (Pineapple Enzyme)', 'Rice Powder'],
    description:
      'A powder-to-foam enzyme exfoliant activated with water. Provides very gentle physical and enzymatic exfoliation.',
    why_recommended:
      'Relevant for sensitive skin users who want occasional gentle exfoliation without acids.',
    how_to_use:
      'Mix a small amount with water to create a foam, massage gently, and rinse. Use 1–2 times weekly. Follow product label instructions.',
    routine: 'PM',
    tips: 'Enzyme exfoliants work on the skin surface and are generally gentler than chemical exfoliants.',
    safety_notes: 'Avoid scrubbing aggressively. Patch test recommended.',
  },
  {
    product_id: 'PROD104',
    product_name: 'Sulfur Blemish Treatment',
    product_type: 'Treatment',
    skin_types: ['Oily', 'Combination', 'Sensitive'],
    concerns: ['Acne & Breakouts', 'Oiliness', 'Redness'],
    key_ingredients: ['Sulfur 3–10%', 'Niacinamide', 'Kaolin'],
    description:
      'A sulfur-based blemish treatment commonly used as an alternative to benzoyl peroxide for spot treatment of breakouts.',
    why_recommended:
      'Relevant for blemish-prone skin that does not tolerate benzoyl peroxide or salicylic acid well.',
    how_to_use:
      'Apply a thin layer to affected areas. Use as directed on the product label.',
    routine: 'PM',
    tips: 'Sulfur has a distinctive smell — this is normal for sulfur-based formulations.',
    safety_notes: 'Patch test recommended. Avoid if allergic to sulfur. Can be drying.',
  },
  {
    product_id: 'PROD105',
    product_name: 'Triple Acid Resurfacing Treatment',
    product_type: 'Treatment',
    skin_types: ['Normal', 'Oily', 'Combination'],
    concerns: ['Uneven Texture', 'Dullness', 'Dark Spots', 'Pores'],
    key_ingredients: ['Glycolic Acid', 'Lactic Acid', 'Salicylic Acid'],
    description:
      'A multi-acid resurfacing treatment combining AHA and BHA for comprehensive texture and tone improvement.',
    why_recommended:
      'Relevant for experienced users with tolerant skin seeking stronger exfoliation than single-acid products.',
    how_to_use:
      'Apply in the evening to clean skin. Start once weekly. Follow product label instructions.',
    routine: 'PM',
    tips: 'Multi-acid treatments are for experienced users — build tolerance with single acids first.',
    safety_notes: 'Not for sensitive or dry skin. Use sunscreen daily. Do not combine with retinol initially.',
  },
  {
    product_id: 'PROD106',
    product_name: 'Overnight Hydrating Sleep Mask',
    product_type: 'Treatment',
    skin_types: ['Dry', 'Normal', 'Combination', 'Sensitive'],
    concerns: ['Dehydration', 'Dryness', 'Dullness', 'Barrier Support'],
    key_ingredients: ['Hyaluronic Acid', 'Ceramides', 'Squalane', 'Panthenol'],
    description:
      'An overnight hydrating mask applied as the final evening step to lock in moisture while you sleep.',
    why_recommended:
      'Relevant for dehydrated or dry skin needing an intensive hydration boost 1–3 times per week.',
    how_to_use:
      'Apply a generous layer as the last step of your evening routine. Rinse or leave on as directed. Follow product label instructions.',
    routine: 'PM',
    tips: 'Sleep masks are not daily moisturisers — use them as an occasional intensive hydration treatment.',
    safety_notes: 'Patch test recommended.',
  },
  {
    product_id: 'PROD107',
    product_name: 'Kaolin Clay Purifying Mask',
    product_type: 'Treatment',
    skin_types: ['Oily', 'Combination'],
    concerns: ['Oiliness', 'Pores', 'Acne & Breakouts'],
    key_ingredients: ['Kaolin Clay', 'Bentonite', 'Niacinamide', 'Tea Tree Extract'],
    description:
      'A weekly clay mask formulation that absorbs excess oil and helps clarify congested pores.',
    why_recommended:
      'Relevant for oily skin routines wanting a dedicated weekly purifying treatment beyond daily cleansing.',
    how_to_use:
      'Apply an even layer to clean skin, leave for 10–15 minutes, then rinse. Use 1–2 times weekly. Follow product label instructions.',
    routine: 'PM',
    tips: 'Do not leave clay masks on until fully dry and cracking — this can over-dry the skin.',
    safety_notes: 'Can be drying. Not for dry or sensitive skin. Patch test recommended.',
  },
  {
    product_id: 'PROD108',
    product_name: '10% Glycolic Acid Treatment',
    product_type: 'Treatment',
    skin_types: ['Normal', 'Oily', 'Combination'],
    concerns: ['Uneven Texture', 'Dullness', 'Dark Spots', 'Signs of Aging'],
    key_ingredients: ['Glycolic Acid 10%', 'Aloe Vera', 'Glycerin'],
    description:
      'A higher-strength glycolic acid treatment for experienced users targeting significant texture and tone concerns.',
    why_recommended:
      'Relevant for users who have built tolerance to lower-strength glycolic products and need stronger resurfacing.',
    how_to_use:
      'Apply to clean skin in the evening. Start once weekly. Follow product label instructions.',
    routine: 'PM',
    tips: 'Build up from lower-strength glycolic products before using 10% formulations.',
    safety_notes: 'Not for sensitive or dry skin. Mandatory daily sunscreen. Introduce very gradually.',
  },
  {
    product_id: 'PROD109',
    product_name: 'Gentle Enzyme Exfoliating Gel',
    product_type: 'Treatment',
    skin_types: ['Sensitive', 'Normal', 'Dry'],
    concerns: ['Uneven Texture', 'Dullness', 'Sensitivity'],
    key_ingredients: ['Papain', 'Bromelain', 'Glycerin', 'Panthenol'],
    description:
      'A rinse-off enzyme exfoliating gel for gentle surface exfoliation without acids.',
    why_recommended:
      'Relevant for sensitive skin needing occasional exfoliation without AHA, BHA, or PHA ingredients.',
    how_to_use:
      'Apply to damp skin, massage gently for 1–2 minutes, rinse. Use 1–2 times weekly. Follow product label instructions.',
    routine: 'PM',
    tips: 'Enzyme gels provide a middle ground between no exfoliation and chemical exfoliants.',
    safety_notes: 'Patch test recommended. Do not use on broken or irritated skin.',
  },
  {
    product_id: 'PROD110',
    product_name: 'Tea Tree Blemish Gel',
    product_type: 'Treatment',
    skin_types: ['Oily', 'Combination'],
    concerns: ['Acne & Breakouts', 'Oiliness', 'Redness'],
    key_ingredients: ['Tea Tree Extract', 'Salicylic Acid', 'Zinc PCA'],
    description:
      'A targeted blemish gel combining tea tree and salicylic acid for localised breakout treatment.',
    why_recommended:
      'Relevant for spot-treating individual blemishes with a combination of clarifying ingredients.',
    how_to_use:
      'Apply a small amount directly to blemishes. Follow product label instructions.',
    routine: 'PM',
    tips: 'Spot treatments work best on individual blemishes rather than as all-over applications.',
    safety_notes: 'Patch test recommended. Avoid applying to large areas unless directed.',
  },
  {
    product_id: 'PROD111',
    product_name: 'Lactic Acid 5% Treatment',
    product_type: 'Treatment',
    skin_types: ['Dry', 'Normal', 'Sensitive'],
    concerns: ['Uneven Texture', 'Dullness', 'Dryness', 'Dark Spots'],
    key_ingredients: ['Lactic Acid 5%', 'Hyaluronic Acid', 'Panthenol'],
    description:
      'A mid-strength lactic acid treatment that exfoliates while providing hydration — suited to dry skin types.',
    why_recommended:
      'Relevant for dry skin users wanting AHA exfoliation with less dryness than glycolic acid typically causes.',
    how_to_use:
      'Apply in the evening to clean skin. Start once weekly. Follow product label instructions.',
    routine: 'PM',
    tips: 'Lactic acid is generally considered the most hydrating AHA.',
    safety_notes: 'Use sunscreen daily. Patch test recommended. Introduce gradually.',
  },
  {
    product_id: 'PROD112',
    product_name: 'Mandelic Acid 10% Treatment',
    product_type: 'Treatment',
    skin_types: ['Sensitive', 'Oily', 'Combination'],
    concerns: ['Acne & Breakouts', 'Uneven Texture', 'Dark Spots'],
    key_ingredients: ['Mandelic Acid 10%', 'Niacinamide', 'Glycerin'],
    description:
      'A leave-on mandelic acid treatment at 10% concentration for gentle exfoliation on sensitive or blemish-prone skin.',
    why_recommended:
      'Relevant for users who want leave-on exfoliation but find glycolic or salicylic acid too strong.',
    how_to_use:
      'Apply to clean skin in the evening. Start once or twice weekly. Follow product label instructions.',
    routine: 'PM',
    tips: 'Mandelic acid has a larger molecule size, which may make it gentler for some skin types.',
    safety_notes: 'Use sunscreen daily. Patch test recommended.',
  },

  // ── EYE CARE ──
  {
    product_id: 'PROD113',
    product_name: 'Hydrating Eye Cream',
    product_type: 'Eye Care',
    skin_types: ['Dry', 'Normal', 'Sensitive', 'Combination'],
    concerns: ['Dryness', 'Dehydration', 'Signs of Aging'],
    key_ingredients: ['Hyaluronic Acid', 'Ceramides', 'Squalane', 'Peptide Complex'],
    description:
      'A hydrating eye cream for the delicate eye area, addressing dryness and fine lines around the eyes.',
    why_recommended:
      'Relevant for users needing dedicated eye-area hydration beyond facial moisturiser.',
    how_to_use:
      'Apply a small amount around the orbital bone using your ring finger. Avoid direct contact with eyes. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Use your ring finger for the gentlest application pressure around the eye area.',
    safety_notes: 'Avoid getting product directly in the eyes. Patch test recommended.',
  },
  {
    product_id: 'PROD114',
    product_name: 'Caffeine Depuffing Eye Gel',
    product_type: 'Eye Care',
    skin_types: ['Oily', 'Combination', 'Normal', 'Dry'],
    concerns: ['Signs of Aging', 'Dullness', 'Dehydration'],
    key_ingredients: ['Caffeine', 'Peptide Complex', 'Hyaluronic Acid'],
    description:
      'A lightweight caffeine eye gel commonly used in morning routines to address the appearance of puffiness around the eyes.',
    why_recommended:
      'Relevant for morning routines where eye-area puffiness is a concern. Caffeine is commonly used in eye formulations for its depuffing properties.',
    how_to_use:
      'Apply in the morning to clean skin around the eye area. Follow product label instructions.',
    routine: 'AM',
    tips: 'Caffeine eye gels are typically used in the morning — puffiness is often more visible upon waking.',
    safety_notes: 'Avoid direct eye contact. Patch test recommended.',
  },
  {
    product_id: 'PROD115',
    product_name: 'Peptide Firming Eye Cream',
    product_type: 'Eye Care',
    skin_types: ['Dry', 'Normal', 'Combination'],
    concerns: ['Signs of Aging', 'Dryness', 'Dullness'],
    key_ingredients: ['Matrixyl (Peptide Complex)', 'Retinol (Low Concentration)', 'Ceramides'],
    description:
      'A peptide and low-concentration retinol eye cream for aging-focused eye area care.',
    why_recommended:
      'Relevant for users targeting fine lines and firmness around the eyes with peptide and retinol ingredients.',
    how_to_use:
      'Apply in the evening to clean skin around the eye area. Follow product label instructions.',
    routine: 'PM',
    tips: 'Introduce retinol eye products gradually — the eye area can be more sensitive than facial skin.',
    safety_notes: 'Use sunscreen during daytime. Not recommended during pregnancy. Patch test recommended.',
  },
  {
    product_id: 'PROD116',
    product_name: 'Sensitive Skin Eye Cream',
    product_type: 'Eye Care',
    skin_types: ['Sensitive', 'Dry', 'Normal'],
    concerns: ['Sensitivity', 'Redness', 'Dryness', 'Barrier Support'],
    key_ingredients: ['Oat Extract', 'Allantoin', 'Ceramides', 'Panthenol'],
    description:
      'A fragrance-free eye cream formulated for sensitive eye-area skin that reacts to standard eye products.',
    why_recommended:
      'Relevant for users whose eye area is particularly reactive and needs a minimal, soothing formula.',
    how_to_use:
      'Apply gently around the orbital bone morning and evening. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'The eye area is often more sensitive than the rest of the face — choose gentle, fragrance-free formulas.',
    safety_notes: 'Patch test recommended. Avoid direct eye contact.',
  },
  {
    product_id: 'PROD117',
    product_name: 'Retinol Eye Treatment',
    product_type: 'Eye Care',
    skin_types: ['Normal', 'Combination', 'Dry'],
    concerns: ['Signs of Aging', 'Dark Spots', 'Uneven Texture'],
    key_ingredients: ['Retinol (Eye-Safe Concentration)', 'Ceramides', 'Peptide Complex'],
    description:
      'A retinol-based eye treatment for aging concerns around the eyes, formulated at concentrations suitable for the delicate eye area.',
    why_recommended:
      'Relevant for users with established retinol tolerance seeking targeted eye-area anti-aging treatment.',
    how_to_use:
      'Apply in the evening only. Start once or twice weekly. Follow product label instructions.',
    routine: 'PM',
    tips: 'Always use sunscreen in the morning when using retinol products, including eye-area retinol.',
    safety_notes: 'Not for sensitive skin without professional guidance. Not recommended during pregnancy. Patch test essential.',
  },

  // ── BODY / LIP CARE ──
  {
    product_id: 'PROD118',
    product_name: 'Simple Hydrating Lip Balm',
    product_type: 'Body Care',
    skin_types: ['Dry', 'Normal', 'Sensitive', 'Combination', 'Oily'],
    concerns: ['Dryness', 'Dehydration', 'Sensitivity'],
    key_ingredients: ['Beeswax', 'Shea Butter', 'Vitamin E', 'Lanolin'],
    description:
      'A basic hydrating lip balm for everyday lip moisture. Suitable for all skin types.',
    why_recommended:
      'Relevant for anyone needing straightforward daily lip hydration as part of a complete skincare routine.',
    how_to_use:
      'Apply to lips as needed throughout the day. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Reapply lip balm after eating, drinking, or exposure to dry or cold conditions.',
    safety_notes: 'Avoid if allergic to beeswax or lanolin. Patch test on a small lip area first.',
  },
  {
    product_id: 'PROD119',
    product_name: 'Barrier Repair Lip Treatment',
    product_type: 'Body Care',
    skin_types: ['Dry', 'Sensitive', 'Normal'],
    concerns: ['Dryness', 'Barrier Support', 'Sensitivity'],
    key_ingredients: ['Ceramides', 'Petrolatum', 'Shea Butter', 'Panthenol'],
    description:
      'An intensive lip treatment with ceramides and occlusive ingredients for very dry or cracked lips.',
    why_recommended:
      'Relevant when lips are persistently dry, cracked, or compromised and need more than a basic balm.',
    how_to_use:
      'Apply a generous layer to lips, especially before bed. Follow product label instructions.',
    routine: 'PM',
    tips: 'Apply as an overnight lip mask for intensive repair of very dry lips.',
    safety_notes: 'Patch test recommended.',
  },
  {
    product_id: 'PROD120',
    product_name: 'SPF Lip Balm',
    product_type: 'Body Care',
    skin_types: ['Normal', 'Dry', 'Sensitive', 'Combination', 'Oily'],
    concerns: ['Dark Spots', 'Dryness', 'Signs of Aging'],
    key_ingredients: ['UV Filters (Broad-Spectrum)', 'Beeswax', 'Shea Butter', 'Vitamin E'],
    description:
      'A lip balm with broad-spectrum SPF protection for lips exposed to daily sun.',
    why_recommended:
      'Relevant because lips are often overlooked in sun protection routines despite being susceptible to UV damage.',
    how_to_use:
      'Apply to lips before sun exposure and reapply every 2 hours. Follow product label instructions.',
    routine: 'AM',
    tips: 'Lips need sun protection too — especially during outdoor activities.',
    safety_notes: 'Reapply after eating or drinking. Patch test recommended.',
  },
  {
    product_id: 'PROD121',
    product_name: 'Gentle Body Exfoliating Scrub',
    product_type: 'Body Care',
    skin_types: ['Normal', 'Dry', 'Combination', 'Oily'],
    concerns: ['Uneven Texture', 'Dryness', 'Dullness'],
    key_ingredients: ['Sugar Crystals', 'Glycerin', 'Shea Butter', 'Vitamin E'],
    description:
      'A gentle physical body scrub for smoothing rough body skin. Suitable for most skin types when used occasionally.',
    why_recommended:
      'Relevant for body care routines targeting rough elbows, knees, or general body texture.',
    how_to_use:
      'Massage onto damp body skin in the shower, then rinse. Use 1–2 times weekly. Follow product label instructions.',
    routine: 'PM',
    tips: 'Follow body exfoliation with moisturiser while skin is still damp.',
    safety_notes: 'Avoid on broken or irritated skin. Do not use on the face.',
  },
  {
    product_id: 'PROD122',
    product_name: 'AHA Smoothing Body Lotion',
    product_type: 'Body Care',
    skin_types: ['Normal', 'Dry', 'Oily', 'Combination'],
    concerns: ['Uneven Texture', 'Dryness', 'Dullness', 'Dark Spots'],
    key_ingredients: ['Lactic Acid', 'Glycolic Acid', 'Urea', 'Glycerin'],
    description:
      'A body lotion with AHA ingredients for smoothing rough body skin texture, including keratosis pilaris-prone areas.',
    why_recommended:
      'Relevant for rough body skin, bumpy upper arms, or uneven body texture that regular lotion does not address.',
    how_to_use:
      'Apply to clean body skin daily or as directed. Follow product label instructions.',
    routine: 'PM',
    tips: 'AHA body lotions can make skin more sun-sensitive — use body sunscreen if applying to exposed areas.',
    safety_notes: 'Avoid on broken skin. Use sun protection on treated areas. Patch test recommended.',
  },
  {
    product_id: 'PROD123',
    product_name: 'Hand Repair Cream',
    product_type: 'Body Care',
    skin_types: ['Dry', 'Normal', 'Sensitive'],
    concerns: ['Dryness', 'Barrier Support', 'Sensitivity'],
    key_ingredients: ['Ceramides', 'Shea Butter', 'Glycerin', 'Panthenol'],
    description:
      'An intensive hand cream for dry, cracked, or frequently washed hands needing barrier support.',
    why_recommended:
      'Relevant for hands exposed to frequent washing, sanitiser, or cold weather that compromises skin barrier.',
    how_to_use:
      'Apply to hands as needed, especially after washing. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Apply hand cream after every hand wash for best results with very dry hands.',
    safety_notes: 'Patch test recommended.',
  },
  {
    product_id: 'PROD124',
    product_name: 'Gentle Daily Body Moisturizer',
    product_type: 'Body Care',
    skin_types: ['Normal', 'Dry', 'Sensitive', 'Combination'],
    concerns: ['Dryness', 'Sensitivity', 'Dehydration'],
    key_ingredients: ['Glycerin', 'Shea Butter', 'Oat Extract', 'Vitamin E'],
    description:
      'A simple, everyday body moisturiser for daily body skin hydration without heavy fragrance or actives.',
    why_recommended:
      'Relevant for beginners or anyone wanting a basic daily body moisturiser as part of overall skin care.',
    how_to_use:
      'Apply to clean body skin after bathing. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Daily body moisturising helps maintain comfortable body skin, especially in dry climates.',
    safety_notes: 'Patch test recommended.',
  },
  {
    product_id: 'PROD125',
    product_name: 'Salicylic Acid Body Wash',
    product_type: 'Body Care',
    skin_types: ['Oily', 'Combination', 'Normal'],
    concerns: ['Acne & Breakouts', 'Uneven Texture', 'Oiliness'],
    key_ingredients: ['Salicylic Acid 2%', 'Tea Tree Extract', 'Glycerin'],
    description:
      'A body wash with salicylic acid for body acne, back breakouts, and rough body texture.',
    why_recommended:
      'Relevant for body acne or congested body skin that needs BHA cleansing beyond facial products.',
    how_to_use:
      'Use in the shower on affected body areas. Follow product label instructions.',
    routine: 'PM',
    tips: 'Body acne often responds to the same BHA ingredients used in facial blemish routines.',
    safety_notes: 'Avoid on broken or irritated skin. Patch test recommended.',
  },
  {
    product_id: 'PROD126',
    product_name: 'Soothing Oat Body Lotion',
    product_type: 'Body Care',
    skin_types: ['Sensitive', 'Dry', 'Normal'],
    concerns: ['Sensitivity', 'Dryness', 'Redness', 'Barrier Support'],
    key_ingredients: ['Colloidal Oatmeal', 'Ceramides', 'Glycerin', 'Panthenol'],
    description:
      'A soothing oat-based body lotion for sensitive or reactive body skin prone to dryness and irritation.',
    why_recommended:
      'Relevant for sensitive body skin that reacts to standard body lotions or fragrances.',
    how_to_use:
      'Apply to clean body skin daily. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Colloidal oatmeal is commonly used in formulations for eczema-prone or reactive body skin.',
    safety_notes: 'Patch test recommended. Consult a healthcare professional for persistent skin conditions.',
  },
  {
    product_id: 'PROD127',
    product_name: 'Urea Foot Cream (20%)',
    product_type: 'Body Care',
    skin_types: ['Dry', 'Normal'],
    concerns: ['Dryness', 'Uneven Texture'],
    key_ingredients: ['Urea 20%', 'Lactic Acid', 'Shea Butter', 'Glycerin'],
    description:
      'A high-concentration urea foot cream for very dry, cracked heels and rough foot skin.',
    why_recommended:
      'Relevant for persistently rough or cracked foot skin that standard body lotion does not soften.',
    how_to_use:
      'Apply to clean, dry feet, especially heels. Use as directed on the product label.',
    routine: 'PM',
    tips: 'Apply before bed and wear cotton socks for enhanced absorption on very dry feet.',
    safety_notes: 'Higher urea concentrations may tingle initially. Not for use on broken skin. Patch test recommended.',
  },

  // ── COMPLETE ROUTINES (beginner-friendly) ──
  {
    product_id: 'PROD128',
    product_name: 'Simple Morning Skincare Routine',
    product_type: 'Complete Routine',
    skin_types: ['Normal', 'Combination', 'Oily', 'Dry', 'Sensitive'],
    concerns: ['Dryness', 'Dehydration', 'Oiliness', 'Dark Spots', 'Dullness'],
    key_ingredients: ['Gentle Cleanser', 'Hydrating Serum', 'Moisturizer', 'Broad-Spectrum SPF'],
    description:
      'A basic three-to-four step morning routine: cleanse, hydrate (serum), moisturise, and apply sunscreen. Suitable as a starting point for most skin types.',
    why_recommended:
      'Relevant for beginners who want a simple, structured morning routine without needing to select individual products.',
    how_to_use:
      '1) Cleanse with a gentle cleanser. 2) Apply hydrating serum to damp skin. 3) Apply moisturiser. 4) Finish with broad-spectrum SPF 30+. Follow product label instructions for each step.',
    routine: 'AM',
    tips: 'Consistency matters more than complexity — a simple routine used daily often outperforms a complex routine used sporadically.',
    safety_notes: 'Choose formulations suited to your skin type. Patch test new products individually before combining.',
  },
  {
    product_id: 'PROD129',
    product_name: 'Simple Evening Skincare Routine',
    product_type: 'Complete Routine',
    skin_types: ['Normal', 'Combination', 'Oily', 'Dry', 'Sensitive'],
    concerns: ['Dryness', 'Dehydration', 'Signs of Aging', 'Uneven Texture', 'Acne & Breakouts'],
    key_ingredients: ['Gentle Cleanser', 'Treatment Serum (optional)', 'Moisturizer'],
    description:
      'A basic evening routine: cleanse, optionally treat with one active serum, and moisturise. A manageable starting point for PM skincare.',
    why_recommended:
      'Relevant for beginners building an evening routine. Introduce one active product at a time.',
    how_to_use:
      '1) Cleanse thoroughly (double cleanse if wearing sunscreen or makeup). 2) Apply one treatment serum if using actives. 3) Apply moisturiser. Follow product label instructions.',
    routine: 'PM',
    tips: 'Introduce active products one at a time in the evening — this makes it easier to identify what works for your skin.',
    safety_notes: 'Do not introduce multiple actives simultaneously. Patch test each new product.',
  },
  {
    product_id: 'PROD130',
    product_name: 'Sensitive Skin Starter Routine',
    product_type: 'Complete Routine',
    skin_types: ['Sensitive', 'Dry', 'Normal'],
    concerns: ['Sensitivity', 'Redness', 'Dryness', 'Barrier Support'],
    key_ingredients: ['Fragrance-Free Cleanser', 'Barrier Serum', 'Sensitive Moisturizer', 'Mineral Sunscreen'],
    description:
      'A minimal routine designed for sensitive skin: gentle cleanse, barrier-support serum, sensitive moisturiser, and mineral sunscreen.',
    why_recommended:
      'Relevant for sensitive skin users who need a curated, low-irritant routine without navigating individual product selection.',
    how_to_use:
      'AM: Gentle cleanse → barrier serum → sensitive moisturiser → mineral SPF. PM: Gentle cleanse → barrier serum → sensitive moisturiser. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Keep sensitive skin routines minimal — fewer products means fewer potential irritants.',
    safety_notes: 'Patch test each product individually before starting the full routine. Consult a healthcare professional for persistent sensitivity.',
  },
  {
    product_id: 'PROD131',
    product_name: 'Oily Skin Starter Routine',
    product_type: 'Complete Routine',
    skin_types: ['Oily', 'Combination'],
    concerns: ['Oiliness', 'Acne & Breakouts', 'Pores', 'Dehydration'],
    key_ingredients: ['Gel Cleanser', 'Niacinamide Serum', 'Oil-Free Moisturizer', 'Gel Sunscreen'],
    description:
      'A structured routine for oily and combination skin: gel cleanse, niacinamide serum, oil-free moisturiser, and lightweight gel sunscreen.',
    why_recommended:
      'Relevant for oily skin users wanting a complete routine framework focused on oil control and hydration balance.',
    how_to_use:
      'AM: Gel cleanser → niacinamide serum → oil-free moisturiser → gel SPF. PM: Gel cleanser → niacinamide serum → oil-free moisturiser. Add BHA treatment 1–2x weekly once tolerated. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Oily skin still needs moisturiser and sunscreen — skipping these can worsen oiliness.',
    safety_notes: 'Introduce BHA or other actives gradually. Patch test each product.',
  },
  {
    product_id: 'PROD132',
    product_name: 'Dry Skin Starter Routine',
    product_type: 'Complete Routine',
    skin_types: ['Dry', 'Normal', 'Sensitive'],
    concerns: ['Dryness', 'Dehydration', 'Barrier Support', 'Signs of Aging'],
    key_ingredients: ['Cream Cleanser', 'Hyaluronic Serum', 'Ceramide Moisturizer', 'Hydrating Sunscreen'],
    description:
      'A hydration-focused routine for dry skin: cream cleanse, hyaluronic serum, ceramide moisturiser, and hydrating sunscreen.',
    why_recommended:
      'Relevant for dry skin users needing a complete routine framework prioritising moisture and barrier support.',
    how_to_use:
      'AM: Cream cleanser → HA serum on damp skin → ceramide moisturiser → hydrating SPF. PM: Cream cleanser → HA serum → richer moisturiser or overnight cream. Follow product label instructions.',
    routine: 'AM | PM',
    tips: 'Layer hydration: serum on damp skin, then moisturiser to seal it in.',
    safety_notes: 'Patch test each product. Introduce retinol very gradually if adding to this routine.',
  },
];

export default products;
