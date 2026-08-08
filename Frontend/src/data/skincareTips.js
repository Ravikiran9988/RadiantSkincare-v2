// ============================================================
// RADIANTSKINCARE — SKINCARE TIPS LOOKUP
// Returns 3–5 tips based on selected skin type + concern combo
// Tips are informational only — not medical advice
// ============================================================

const tipsByProfile = {
  // ── Oily ────────────────────────────────────────────────
  'Oily|Acne & Breakouts': [
    'Keep cleansing gentle — over-cleansing can trigger more oil production.',
    'Avoid harsh scrubbing, which may irritate and worsen breakout-prone skin.',
    'Introduce active products (e.g. salicylic acid, niacinamide) gradually — one at a time.',
    'Consider non-comedogenic formulations when selecting moisturisers and sunscreens.',
    'Always use a broad-spectrum sunscreen in the morning, even on oily skin.',
  ],
  'Oily|Oiliness': [
    'Moisturise even on oily skin — skipping moisturiser can signal skin to produce more oil.',
    'Lightweight, water-based or gel formulations are generally well-suited for oily skin.',
    'Niacinamide and zinc-based formulations are commonly used in routines for oily skin appearance.',
    'Blotting papers can help manage midday shine without disrupting skincare.',
    'Use sunscreen daily — oily skin still needs sun protection.',
  ],
  'Oily|Visible Pores': [
    'Pore size is largely determined by genetics and skin type — no product can permanently shrink pores.',
    'Keeping skin clear and oil-free can support the appearance of less visible pores.',
    'Niacinamide is commonly used in formulations targeting the appearance of pores.',
    'Avoid heavy occlusive products which can contribute to congestion in oily skin.',
    'Regular gentle exfoliation may support the appearance of cleaner-looking pores.',
  ],
  'Oily|Dark Spots / Uneven Tone': [
    'Daily sunscreen is one of the most important steps for supporting the appearance of even skin tone.',
    'Niacinamide serums are commonly used in routines targeting uneven-looking tone on oily skin.',
    'Introduce tone-targeting actives gradually and one at a time.',
    'Consistent use of a routine is more effective than frequent product switching.',
    'Avoid picking at blemishes, which can contribute to post-blemish marks.',
  ],
  'Oily|Uneven Texture': [
    'Gentle exfoliating formulations can support the appearance of smoother-looking skin texture.',
    'Introduce exfoliants gradually — start once or twice a week.',
    'Always use sunscreen the morning after using an exfoliating active.',
    'Avoid combining multiple exfoliating actives in the same routine.',
    'Keep the routine simple and consistent.',
  ],
  'Oily|Dull-Looking Skin': [
    'Gentle exfoliation and consistent use of sunscreen can support brighter-looking skin over time.',
    'Vitamin C serums are commonly used in morning routines targeting dull-looking skin.',
    'Stay hydrated — skin hydration can affect the appearance of skin brightness.',
    'Consistent use of SPF helps prevent further uneven tone development.',
    'Avoid heavy, occlusive formulations that may not suit oily skin.',
  ],

  // ── Dry ─────────────────────────────────────────────────
  'Dry|Dryness / Dehydration': [
    'Apply moisturiser while skin is still slightly damp after cleansing for better absorption.',
    'Avoid hot water when cleansing — lukewarm water is gentler on dry skin.',
    'Layer a hydrating serum under your moisturiser for added hydration support.',
    'Choose cream or lotion formulations over gel formulations for dry skin types.',
    'Consider a richer moisturiser in the evening routine for dry skin.',
  ],
  'Dry|Sensitivity': [
    'Choose fragrance-free formulations where possible for dry and sensitive skin.',
    'Introduce new products one at a time to identify how your skin responds.',
    'A simplified routine with fewer products can help manage reactive, dry skin.',
    'Avoid exfoliating actives until skin is stable and comfortable.',
    'Patch test new products on a small area before applying to the full face.',
  ],
  'Dry|Redness': [
    'Prefer gentle, fragrance-free formulations for redness-prone dry skin.',
    'Avoid products with alcohol or strong fragrances that may irritate reactive skin.',
    'Centella asiatica and oat-based formulations are commonly used for redness-prone skin.',
    'Simplify your routine to fewer, gentle products when skin is reactive.',
    'Use lukewarm water — extreme temperatures can contribute to redness.',
  ],
  'Dry|Fine Lines / Aging': [
    'Consistent moisturising supports the appearance of plump, comfortable skin.',
    'Apply hydrating serums (hyaluronic acid) to slightly damp skin for best absorption.',
    'Retinol-based treatments should be introduced very gradually on dry skin — start slowly.',
    'Always use sunscreen in the morning — it is one of the most effective steps for aging concerns.',
    'Rich overnight moisturisers may support skin comfort and appearance in dry skin routines.',
  ],
  'Dry|Dull-Looking Skin': [
    'Lactic acid is generally considered a gentler exfoliating option suitable for dry skin.',
    'Consistent moisturising can support the appearance of more radiant-looking skin.',
    'Vitamin C serums in the morning routine are commonly used for dull-looking skin.',
    'Always follow exfoliating actives with sunscreen the next morning.',
    'Squalane-based formulations can add a healthy glow to dry skin routines.',
  ],
  'Dry|Uneven Texture': [
    'Lactic acid is generally a better-tolerated AHA option for dry skin compared to glycolic acid.',
    'Introduce exfoliating actives once a week and build gradually.',
    'Always follow exfoliating treatment evenings with sunscreen the next morning.',
    'Keep the routine hydrating — support skin barrier alongside any exfoliation.',
    'Avoid combining multiple active products when beginning a new routine.',
  ],

  // ── Combination ──────────────────────────────────────────
  'Combination|Acne & Breakouts': [
    'Focus active products on areas prone to breakouts rather than the entire face.',
    'Use a lightweight moisturiser on the T-zone and a slightly richer one on drier areas if needed.',
    'Introduce one new active at a time and monitor how your skin responds.',
    'Non-comedogenic formulations are generally recommended for combination, blemish-prone skin.',
    'Always use sunscreen in the morning.',
  ],
  'Combination|Oiliness': [
    'Gel moisturisers are often a good option for combination skin with an oily T-zone.',
    'You may prefer lighter formulations in oilier areas and slightly richer ones in drier zones.',
    'Niacinamide is commonly used in formulations for oily or combination skin tone.',
    'Avoid mattifying products that may be too drying for combination skin.',
    'Patch test new products on the T-zone and cheeks separately.',
  ],
  'Combination|Dark Spots / Uneven Tone': [
    'Daily sunscreen is important for supporting the appearance of even-looking skin tone.',
    'Niacinamide and tranexamic acid are commonly used in tone-targeting routines for combination skin.',
    'Introduce tone-targeting actives gradually.',
    'Consistency is key — give products time to work before switching.',
    'Avoid picking at blemishes to minimise post-mark development.',
  ],
  'Combination|Uneven Texture': [
    'Gentle exfoliation can support the appearance of smoother-looking combination skin.',
    'Start exfoliating actives at low frequency and build gradually.',
    'Use sunscreen the morning after any exfoliating treatment evening.',
    'Keep the rest of the routine balanced — don\'t over-exfoliate.',
    'Combination skin can tolerate AHAs and BHAs, but introduce them separately.',
  ],
  'Combination|Visible Pores': [
    'Niacinamide is commonly used in formulations for pore appearance in combination skin.',
    'Keeping the skin clear and well-moisturised supports the appearance of less visible pores.',
    'Gentle BHA exfoliation can support the appearance of pore clarity.',
    'Heavy occlusive products may not suit combination skin in oilier zones.',
    'Consistent routine use is more effective than trying many different products.',
  ],

  // ── Sensitive ────────────────────────────────────────────
  'Sensitive|Redness': [
    'Choose fragrance-free and alcohol-free formulations for sensitive, redness-prone skin.',
    'Introduce one new product at a time and observe how skin responds.',
    'Keep the skincare routine simple — fewer products reduces the risk of irritation.',
    'Use lukewarm water when cleansing — extreme temperatures can worsen redness.',
    'Centella asiatica and niacinamide are commonly used in formulations for redness-prone skin.',
  ],
  'Sensitive|Sensitivity': [
    'Patch test every new product on a small area before full application.',
    'Choose minimal-ingredient, fragrance-free formulations for sensitive skin.',
    'Avoid introducing multiple new products at the same time.',
    'A simple routine of cleanser, moisturiser, and sunscreen is a good starting point.',
    'When skin is reactive, simplify the routine before reintroducing active products.',
  ],
  'Sensitive|Dryness / Dehydration': [
    'Choose gentle, fragrance-free moisturisers designed for sensitive or dry skin.',
    'Ceramide and oat-based formulations are commonly recommended for sensitive, dry skin.',
    'Avoid exfoliating actives until skin is comfortable and stable.',
    'Layer a gentle hydrating serum under your moisturiser for extra comfort.',
    'Use lukewarm water — hot water can irritate sensitive skin.',
  ],
  'Sensitive|Acne & Breakouts': [
    'Azelaic acid is generally considered a better-tolerated active for sensitive, blemish-prone skin.',
    'Avoid harsh scrubbing or abrasive exfoliants on sensitive, blemish-prone skin.',
    'Introduce actives one at a time — sensitive skin can react to too many changes at once.',
    'Choose gentle, fragrance-free formulations even in acne-targeted products.',
    'Use sunscreen daily — even on sensitive skin.',
  ],
  'Sensitive|Fine Lines / Aging': [
    'Bakuchiol may be a more tolerable retinol alternative for sensitive skin anti-aging routines.',
    'If using retinol, start at the lowest available concentration very infrequently.',
    'Hydrating formulations with peptides are generally well-tolerated by sensitive skin.',
    'Always use sunscreen — it is one of the most important aging-prevention steps.',
    'Keep the routine gentle and avoid combining multiple strong actives.',
  ],

  // ── Normal ───────────────────────────────────────────────
  'Normal|Fine Lines / Aging': [
    'Consistent sunscreen use is one of the most evidence-supported anti-aging steps.',
    'Retinol-based treatments are commonly used in PM routines for aging-focused skin concerns.',
    'Introduce retinol at a low frequency and build slowly.',
    'Vitamin C in the morning and retinol in the evening is a commonly used combination.',
    'Keep the routine consistent — anti-aging benefits generally develop gradually over time.',
  ],
  'Normal|Dark Spots / Uneven Tone': [
    'Daily sunscreen is a foundational step for targeting and preventing uneven skin tone.',
    'Vitamin C serums in the morning are commonly used in tone-targeting routines.',
    'Consistency over time is important — tone concerns typically take weeks to improve.',
    'Introduce new actives one at a time.',
    'Avoid picking at blemishes to reduce post-mark development.',
  ],
  'Normal|Dull-Looking Skin': [
    'Gentle AHA exfoliation can support the appearance of brighter-looking normal skin.',
    'Vitamin C serums are commonly used in morning routines for dull-looking skin.',
    'Daily sunscreen prevents further uneven tone development.',
    'Consistent hydration supports the appearance of radiant-looking skin.',
    'Keeping the routine simple and consistent is often more effective than frequent changes.',
  ],
  'Normal|Uneven Texture': [
    'Gentle AHA or BHA exfoliation can support the appearance of smoother-looking skin.',
    'Introduce exfoliants gradually — once a week initially.',
    'Use sunscreen the morning after any exfoliating product evening.',
    'Consistent moisturising alongside exfoliation supports balanced skin.',
    'Normal skin can generally tolerate most actives when introduced gradually.',
  ],
  'Normal|Acne & Breakouts': [
    'Normal skin with occasional breakouts may benefit from gentle, targeted actives.',
    'Introduce blemish-targeted actives gradually.',
    'Non-comedogenic formulations are generally suitable for breakout-prone normal skin.',
    'Use sunscreen daily.',
    'Avoid over-treating breakouts — a gentle approach is often best for normal skin.',
  ],
};

// Fallback tips when no specific combination is matched
const defaultTips = {
  Oily: [
    'Use a lightweight, non-comedogenic moisturiser even on oily skin.',
    'Avoid over-cleansing — gentle cleansing twice daily is generally sufficient.',
    'Introduce active products gradually, one at a time.',
    'Use broad-spectrum sunscreen every morning.',
    'Non-comedogenic formulations are generally recommended for oily skin types.',
  ],
  Dry: [
    'Prioritise moisturising formulations in your routine.',
    'Apply moisturiser while skin is still slightly damp for better absorption.',
    'Choose gentle, fragrance-free formulations where possible.',
    'Use broad-spectrum sunscreen every morning.',
    'Avoid hot water when cleansing — lukewarm water is gentler.',
  ],
  Combination: [
    'A lightweight moisturiser is generally suitable for combination skin types.',
    'You may prefer to use different formulations in different zones.',
    'Introduce active products one at a time.',
    'Use broad-spectrum sunscreen every morning.',
    'Keep the routine simple and consistent.',
  ],
  Sensitive: [
    'Patch test every new product on a small area first.',
    'Choose fragrance-free and minimal-ingredient formulations.',
    'Introduce one new product at a time.',
    'Keep your routine simple — fewer products reduces irritation risk.',
    'Use broad-spectrum sunscreen every morning.',
  ],
  Normal: [
    'Maintain a consistent cleanser, moisturiser, and sunscreen routine.',
    'Introduce active products gradually.',
    'Use broad-spectrum sunscreen every morning.',
    'Normal skin generally tolerates most formulations when introduced gradually.',
    'Consistency and simplicity are the foundation of a good skincare routine.',
  ],
};

/**
 * Get skincare tips based on skin type + concern combination
 * Falls back to skin-type-only tips if no specific combination is found
 */
export const getSkincareTips = (skinType, concern) => {
  const key = concern ? `${skinType}|${concern}` : null;
  if (key && tipsByProfile[key]) {
    return tipsByProfile[key];
  }
  return defaultTips[skinType] || defaultTips['Normal'];
};

export default getSkincareTips;
