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
  'Dryness': ['Hyaluronic Acid', 'Glycerin', 'Ceramides', 'Squalane', 'Panthenol', 'Shea Butter', 'Sodium Hyaluronate'],
  'Dehydration': ['Hyaluronic Acid', 'Sodium Hyaluronate', 'Glycerin', 'Panthenol', 'Snail Secretion', 'Aloe'],
  'Oiliness': ['Niacinamide', 'Zinc PCA', 'Salicylic Acid', 'Silica', 'Kaolin'],
  'Redness': ['Centella Asiatica', 'Azelaic Acid', 'Niacinamide', 'Oat Extract', 'Allantoin', 'Calamine', 'Zinc Oxide', 'Madecassoside'],
  'Dark Spots': ['Vitamin C', 'L-Ascorbic Acid', 'Niacinamide', 'Tranexamic Acid', 'Alpha Arbutin', 'Kojic Acid', 'Licorice Root', 'Retinol'],
  'Uneven Texture': ['Salicylic Acid', 'Glycolic Acid', 'Lactic Acid', 'AHA', 'BHA', 'Retinol', 'Retinaldehyde', 'Mandelic Acid'],
  'Sensitivity': ['Ceramides', 'Centella Asiatica', 'Oat Extract', 'Allantoin', 'Panthenol', 'Glycerin', 'Zinc Oxide'],
  'Signs of Aging': ['Retinol', 'Retinaldehyde', 'Bakuchiol', 'Peptide', 'Vitamin C', 'Hyaluronic Acid', 'Squalane'],
  'Dullness': ['Vitamin C', 'L-Ascorbic Acid', 'Niacinamide', 'Glycolic Acid', 'Lactic Acid', 'AHA', 'Rosehip'],
  'Pores': ['Niacinamide', 'Zinc PCA', 'Salicylic Acid', 'AHA', 'Silica'],
  'Barrier Support': ['Ceramides', 'Fatty Acids', 'Cholesterol', 'Panthenol', 'Oat Extract', 'Glycerin', 'Squalane'],
};

// Normalize user selections — handle "Not Sure" and alias values
const normalizeConcern = (concern) => {
  if (!concern || concern === 'Not Sure') return '';
  return concern;
};

const normalizeSkinType = (skinType) => {
  if (!skinType || skinType === 'Not Sure') return '';
  return skinType;
};

const normalizeProductType = (productType) => {
  if (!productType || productType === 'Any Product' || productType === 'All Products' || productType === 'Complete Routine') return '';
  return productType;
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

  // 3. Product type match (+15) — no type filter = +5 baseline
  if (productType && product.product_type === productType) {
    score += 15;
  } else if (!productType) {
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
  if (concern === 'Signs of Aging' || concern === 'Dark Spots' || concern === 'Dullness') {
    if (product.routine === 'AM' || product.routine === 'AM | PM') score += 5;
  }
  if (concern === 'Acne & Breakouts' || concern === 'Uneven Texture') {
    if (product.routine === 'PM' || product.routine === 'AM | PM') score += 5;
  }
  if (!concern) {
    score += 5; // neutral — no concern specified
  }

  return Math.min(score, 100);
};

/**
 * Get recommended products based on user selections.
 * Normalizes "Not Sure" and "Any Product" to empty strings (no filter).
 * Returns array of { product, score, scoreLabel } sorted by score desc.
 * Only includes products scoring >= 50.
 */
export const getRecommendations = (rawConcern, rawSkinType, rawProductType = 'Any Product') => {
  const concern = normalizeConcern(rawConcern);
  const skinType = normalizeSkinType(rawSkinType);
  const productType = normalizeProductType(rawProductType);

  // Require at least one non-empty filter
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
 * Get all products filtered by product type and search query.
 * Handles "Any Product" / "All Products" as no filter.
 */
export const getFilteredProducts = (productType = 'Any Product', searchQuery = '') => {
  const normalizedType = normalizeProductType(productType);
  return products.filter((p) => {
    const matchesType = !normalizedType || p.product_type === normalizedType;
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
