// ============================================================
// RADIANTSKINCARE — SKINCARE RECOMMENDATION SCORING ENGINE
// Client-side matching based on concern, skin type, product type
// Scoring: Concern +40 | Skin Type +30 | Product Type +15
//          Ingredient relevance +10 | Routine compatibility +5
// ============================================================

import products from './products.js';

// Map skin concerns to related ingredient keywords (for bonus scoring)
const CONCERN_INGREDIENT_MAP = {
  'Acne & Breakouts': ['Salicylic Acid', 'Niacinamide', 'Benzoyl Peroxide', 'Azelaic Acid', 'Zinc PCA', 'Tea Tree', 'Mandelic Acid'],
  'Dryness / Dehydration': ['Hyaluronic Acid', 'Glycerin', 'Ceramides', 'Squalane', 'Panthenol', 'Shea Butter', 'Sodium Hyaluronate'],
  'Oiliness': ['Niacinamide', 'Zinc PCA', 'Salicylic Acid', 'Silica', 'Kaolin'],
  'Redness': ['Centella Asiatica', 'Azelaic Acid', 'Niacinamide', 'Oat Extract', 'Allantoin', 'Calamine', 'Zinc Oxide', 'Madecassoside'],
  'Dark Spots / Uneven Tone': ['Vitamin C', 'L-Ascorbic Acid', 'Niacinamide', 'Tranexamic Acid', 'Alpha Arbutin', 'Kojic Acid', 'Licorice Root', 'Retinol'],
  'Uneven Texture': ['Salicylic Acid', 'Glycolic Acid', 'Lactic Acid', 'AHA', 'BHA', 'Retinol', 'Retinaldehyde', 'Mandelic Acid'],
  'Sensitivity': ['Ceramides', 'Centella Asiatica', 'Oat Extract', 'Allantoin', 'Panthenol', 'Glycerin', 'Zinc Oxide'],
  'Fine Lines / Aging': ['Retinol', 'Retinaldehyde', 'Bakuchiol', 'Peptide', 'Vitamin C', 'Hyaluronic Acid', 'Squalane'],
  'Dull-Looking Skin': ['Vitamin C', 'L-Ascorbic Acid', 'Niacinamide', 'Glycolic Acid', 'Lactic Acid', 'AHA', 'Rosehip'],
  'Visible Pores': ['Niacinamide', 'Zinc PCA', 'Salicylic Acid', 'AHA', 'Silica'],
};

// Score label thresholds
export const getScoreLabel = (score) => {
  if (score >= 80) return { label: 'Highly Relevant', color: '#7C3AED' };
  if (score >= 60) return { label: 'Good Match', color: '#EC4899' };
  if (score >= 50) return { label: 'Also Consider', color: '#8A8398' };
  return null;
};

/**
 * Score a single product against user selections
 */
const scoreProduct = (product, concern, skinType, productType) => {
  let score = 0;

  // 1. Concern match (+40)
  if (concern && product.concerns.includes(concern)) {
    score += 40;
  }

  // 2. Skin type match (+30)
  if (skinType && product.skin_types.includes(skinType)) {
    score += 30;
  }

  // 3. Product type match (+15)
  if (productType && productType !== 'All Products' && product.product_type === productType) {
    score += 15;
  } else if (!productType || productType === 'All Products') {
    // No product type filter — give partial credit as all types are eligible
    score += 5;
  }

  // 4. Ingredient relevance (+10)
  const relevantIngredients = CONCERN_INGREDIENT_MAP[concern] || [];
  const hasRelevantIngredient = relevantIngredients.some((ing) =>
    product.key_ingredients.some((ki) => ki.toLowerCase().includes(ing.toLowerCase()))
  );
  if (hasRelevantIngredient) {
    score += 10;
  }

  // 5. Routine compatibility bonus (+5)
  // If concern is aging/dullness and product is AM — +5 for vitamin C, sunscreen
  // If concern is acne and product is PM — +5 for BHA/retinoid treatments
  if (concern === 'Fine Lines / Aging' || concern === 'Dark Spots / Uneven Tone' || concern === 'Dull-Looking Skin') {
    if (product.routine === 'AM' || product.routine === 'AM | PM') score += 5;
  }
  if (concern === 'Acne & Breakouts' || concern === 'Uneven Texture') {
    if (product.routine === 'PM' || product.routine === 'AM | PM') score += 5;
  }
  if (!concern) {
    score += 5; // neutral
  }

  return Math.min(score, 100);
};

/**
 * Get recommended products based on user selections
 * Returns array of { product, score, scoreLabel } sorted by score desc
 * Only includes products scoring >= 50
 */
export const getRecommendations = (concern, skinType, productType = 'All Products') => {
  if (!concern && !skinType) return [];

  const scored = products.map((product) => ({
    product,
    score: scoreProduct(product, concern, skinType, productType),
  }));

  return scored
    .filter(({ score }) => score >= 50)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(({ product, score }) => ({
      product,
      score,
      scoreLabel: getScoreLabel(score),
    }));
};

/**
 * Get all products filtered by product type and search query
 */
export const getFilteredProducts = (productType = 'All Products', searchQuery = '') => {
  return products.filter((p) => {
    const matchesType = productType === 'All Products' || p.product_type === productType;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      p.product_name.toLowerCase().includes(q) ||
      p.product_type.toLowerCase().includes(q) ||
      p.key_ingredients.some((i) => i.toLowerCase().includes(q)) ||
      p.concerns.some((c) => c.toLowerCase().includes(q)) ||
      p.description.toLowerCase().includes(q);
    return matchesType && matchesSearch;
  });
};

export default getRecommendations;
