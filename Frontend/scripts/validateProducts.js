/**
 * Validates products.js catalog data quality
 */
import products, { SKIN_TYPES, SKIN_CONCERNS, PRODUCT_TYPES } from '../src/data/products.js';

const VALID_SKIN_TYPES = SKIN_TYPES.filter((s) => s !== 'Not Sure');
const VALID_CONCERNS = SKIN_CONCERNS.filter((c) => c !== 'Not Sure');
const VALID_PRODUCT_TYPES = PRODUCT_TYPES.filter(
  (t) => !['Any Product', 'Complete Routine'].includes(t)
);
VALID_PRODUCT_TYPES.push('Complete Routine');

const REQUIRED_FIELDS = [
  'product_id',
  'product_name',
  'product_type',
  'skin_types',
  'concerns',
  'key_ingredients',
  'description',
  'why_recommended',
  'how_to_use',
  'routine',
  'tips',
  'safety_notes',
];

const BRAND_PATTERNS = [
  /\b(cerave|cetaphil|la roche|neutrogena|the ordinary|paula's choice|skinceuticals|drunk elephant|olay|nivea|eucerin|avene|bioderma|cosrx|innisfree)\b/i,
  /https?:\/\//i,
  /\$\d+/,
  /amazon\.com/i,
];

let issues = [];

const ids = new Set();
const names = new Set();

products.forEach((p, i) => {
  const label = `${p.product_id || `index-${i}`}`;

  REQUIRED_FIELDS.forEach((field) => {
    if (p[field] === undefined || p[field] === null || p[field] === '') {
      issues.push(`${label}: missing field "${field}"`);
    }
    if (Array.isArray(p[field]) && p[field].length === 0) {
      issues.push(`${label}: empty array "${field}"`);
    }
  });

  if (ids.has(p.product_id)) issues.push(`Duplicate product_id: ${p.product_id}`);
  ids.add(p.product_id);

  if (names.has(p.product_name)) issues.push(`Duplicate product_name: ${p.product_name}`);
  names.add(p.product_name);

  p.skin_types?.forEach((st) => {
    if (!VALID_SKIN_TYPES.includes(st)) {
      issues.push(`${label}: unsupported skin_type "${st}"`);
    }
  });

  p.concerns?.forEach((c) => {
    if (!VALID_CONCERNS.includes(c)) {
      issues.push(`${label}: unsupported concern "${c}"`);
    }
  });

  if (!PRODUCT_TYPES.includes(p.product_type) && p.product_type !== 'Complete Routine') {
    if (!VALID_PRODUCT_TYPES.includes(p.product_type)) {
      issues.push(`${label}: unsupported product_type "${p.product_type}"`);
    }
  }

  const textBlob = JSON.stringify(p);
  BRAND_PATTERNS.forEach((pat) => {
    if (pat.test(textBlob)) issues.push(`${label}: possible brand/url/price: ${pat}`);
  });
});

// Category distribution
const byType = {};
products.forEach((p) => {
  byType[p.product_type] = (byType[p.product_type] || 0) + 1;
});

console.log('=== PRODUCT CATALOG VALIDATION ===');
console.log(`Total products: ${products.length}`);
console.log('\nCategory distribution:');
Object.entries(byType)
  .sort((a, b) => b[1] - a[1])
  .forEach(([type, count]) => console.log(`  ${type}: ${count}`));

if (issues.length === 0) {
  console.log('\n✓ All validation checks passed.');
  process.exit(0);
} else {
  console.log(`\n✗ ${issues.length} issue(s) found:`);
  issues.forEach((issue) => console.log(`  - ${issue}`));
  process.exit(1);
}
