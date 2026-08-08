import { getRecommendations } from '../src/data/skincareRecommender.js';

const testCases = [
  { concern: 'Acne & Breakouts', skinType: 'Oily', productType: 'Any Product', label: 'Oily + Acne' },
  { concern: 'Dehydration', skinType: 'Dry', productType: 'Any Product', label: 'Dry + Dehydration' },
  { concern: 'Redness', skinType: 'Sensitive', productType: 'Any Product', label: 'Sensitive + Redness' },
  { concern: 'Dark Spots', skinType: 'Combination', productType: 'Any Product', label: 'Combination + Dark Spots' },
  { concern: 'Pores', skinType: 'Oily', productType: 'Any Product', label: 'Oily + Pores' },
  { concern: 'Not Sure', skinType: 'Not Sure', productType: 'Any Product', label: 'Not Sure + Not Sure' },
  { concern: 'Oiliness', skinType: 'Oily', productType: 'Cleanser', label: 'Oily + Oiliness + Cleanser' },
  { concern: 'Barrier Support', skinType: 'Dry', productType: 'Moisturizer', label: 'Dry + Barrier + Moisturizer' },
];

console.log('=== RECOMMENDER TEST RESULTS ===\n');

let allPassed = true;

testCases.forEach(({ concern, skinType, productType, label }) => {
  const results = getRecommendations(concern, skinType, productType);
  const count = results.length;
  const top = results.slice(0, 3).map((r) => `${r.product.product_name} (${r.score})`).join(', ');
  const passed = label.includes('Not Sure') ? count === 0 : count > 0;
  if (!passed) allPassed = false;
  console.log(`${label}: ${count} results${count ? '' : ' (expected for Not Sure)'}`);
  if (count) console.log(`  Top: ${top}`);
  console.log('');
});

process.exit(allPassed ? 0 : 1);
