import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const productsPath = path.join(__dirname, '../src/data/products.js');
const expansionPath = path.join(__dirname, '../src/data/productsExpansion.js');

let content = fs.readFileSync(productsPath, 'utf8');
const expansionContent = fs.readFileSync(expansionPath, 'utf8');

const match = expansionContent.match(/export const expansionProducts = \[([\s\S]*)\];/);
if (!match) {
  console.error('Failed to parse expansion products');
  process.exit(1);
}

const expansionItems = match[1].trim();

content = content.replace(
  /\/\/ \d+ formulation-based skincare options/,
  '// 132 formulation-based skincare options'
);

content = content.replace(
  /(\s+\},\n\];\n\nexport default products;)/,
  ',\n' + expansionItems + '\n$1'
);

fs.writeFileSync(productsPath, content);
console.log('Merged 82 expansion products into products.js');
