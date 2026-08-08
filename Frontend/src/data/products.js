// ============================================================
// RADIANTSKINCARE — NON-BRANDED SKINCARE PRODUCT CATALOG
// 50 formulation-based skincare options
// No brand names · No prices · No fake URLs
// Informational purposes only — not medical advice
// ============================================================

export const PRODUCT_TYPES = [
  'All Products',
  'Cleanser',
  'Serum',
  'Essence',
  'Moisturizer',
  'Sunscreen',
  'Treatment',
  'Body Care',
];

export const SKIN_TYPES = [
  'Oily',
  'Dry',
  'Combination',
  'Normal',
  'Sensitive',
];

export const SKIN_CONCERNS = [
  'Acne & Breakouts',
  'Dryness / Dehydration',
  'Oiliness',
  'Redness',
  'Dark Spots / Uneven Tone',
  'Uneven Texture',
  'Sensitivity',
  'Fine Lines / Aging',
  'Dull-Looking Skin',
  'Visible Pores',
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
    concerns: ['Dryness / Dehydration', 'Sensitivity', 'Redness'],
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
    concerns: ['Oiliness', 'Acne & Breakouts', 'Visible Pores'],
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
    concerns: ['Acne & Breakouts', 'Oiliness', 'Uneven Texture', 'Visible Pores'],
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
    concerns: ['Dryness / Dehydration', 'Sensitivity', 'Redness'],
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
    concerns: ['Sensitivity', 'Dryness / Dehydration', 'Redness'],
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
    concerns: ['Acne & Breakouts', 'Oiliness', 'Visible Pores', 'Dark Spots / Uneven Tone', 'Uneven Texture'],
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
    concerns: ['Dryness / Dehydration', 'Fine Lines / Aging', 'Dull-Looking Skin', 'Sensitivity'],
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
    concerns: ['Dark Spots / Uneven Tone', 'Dull-Looking Skin', 'Fine Lines / Aging'],
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
    concerns: ['Acne & Breakouts', 'Redness', 'Dark Spots / Uneven Tone', 'Uneven Texture'],
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
    concerns: ['Dryness / Dehydration', 'Sensitivity', 'Redness'],
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
    concerns: ['Fine Lines / Aging', 'Dullness / Dehydration', 'Dull-Looking Skin'],
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
    concerns: ['Dark Spots / Uneven Tone', 'Dull-Looking Skin', 'Redness'],
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
    concerns: ['Redness', 'Sensitivity', 'Dryness / Dehydration'],
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
    concerns: ['Oiliness', 'Acne & Breakouts', 'Visible Pores', 'Dryness / Dehydration'],
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
    concerns: ['Dryness / Dehydration', 'Sensitivity', 'Redness', 'Fine Lines / Aging'],
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
    concerns: ['Dryness / Dehydration', 'Fine Lines / Aging', 'Sensitivity'],
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
    concerns: ['Oiliness', 'Acne & Breakouts', 'Visible Pores'],
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
    concerns: ['Sensitivity', 'Redness', 'Dryness / Dehydration'],
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
    concerns: ['Dryness / Dehydration', 'Fine Lines / Aging', 'Dull-Looking Skin'],
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
    concerns: ['Dark Spots / Uneven Tone', 'Fine Lines / Aging', 'Dull-Looking Skin'],
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
    concerns: ['Oiliness', 'Acne & Breakouts', 'Visible Pores'],
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
    concerns: ['Sensitivity', 'Redness', 'Dryness / Dehydration'],
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
    concerns: ['Dark Spots / Uneven Tone', 'Fine Lines / Aging'],
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
    concerns: ['Acne & Breakouts', 'Visible Pores', 'Oiliness', 'Uneven Texture'],
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
    concerns: ['Acne & Breakouts', 'Redness', 'Dark Spots / Uneven Tone', 'Uneven Texture'],
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
    concerns: ['Fine Lines / Aging', 'Uneven Texture', 'Dark Spots / Uneven Tone', 'Dull-Looking Skin'],
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
    concerns: ['Uneven Texture', 'Dull-Looking Skin', 'Dark Spots / Uneven Tone', 'Fine Lines / Aging'],
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
    concerns: ['Sensitivity', 'Redness', 'Dryness / Dehydration'],
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
    concerns: ['Fine Lines / Aging', 'Dull-Looking Skin', 'Uneven Texture'],
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
    concerns: ['Dark Spots / Uneven Tone', 'Dull-Looking Skin'],
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
    concerns: ['Dryness / Dehydration', 'Fine Lines / Aging', 'Sensitivity'],
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
    concerns: ['Sensitivity', 'Dryness / Dehydration', 'Redness'],
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
    concerns: ['Dryness / Dehydration'],
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
    concerns: ['Dryness / Dehydration', 'Uneven Texture'],
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
    concerns: ['Sensitivity', 'Dryness / Dehydration', 'Redness'],
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
    concerns: ['Dark Spots / Uneven Tone', 'Dull-Looking Skin'],
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
    concerns: ['Uneven Texture', 'Dull-Looking Skin', 'Dryness / Dehydration'],
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
    concerns: ['Acne & Breakouts', 'Uneven Texture', 'Dark Spots / Uneven Tone'],
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
    concerns: ['Dryness / Dehydration', 'Redness', 'Sensitivity'],
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
    concerns: ['Oiliness', 'Dull-Looking Skin', 'Acne & Breakouts'],
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
    concerns: ['Dark Spots / Uneven Tone', 'Fine Lines / Aging', 'Dryness / Dehydration'],
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
    concerns: ['Uneven Texture', 'Dull-Looking Skin', 'Visible Pores', 'Dark Spots / Uneven Tone'],
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
    concerns: ['Visible Pores', 'Oiliness'],
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
    concerns: ['Dark Spots / Uneven Tone', 'Redness', 'Dull-Looking Skin'],
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
    concerns: ['Dryness / Dehydration', 'Fine Lines / Aging', 'Dull-Looking Skin', 'Uneven Texture'],
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
    concerns: ['Fine Lines / Aging', 'Uneven Texture', 'Dull-Looking Skin'],
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
    concerns: ['Sensitivity', 'Redness', 'Dryness / Dehydration'],
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
];

export default products;
