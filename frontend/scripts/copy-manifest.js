import { cpSync } from 'node:fs';
import { resolve } from 'node:path';

const src = resolve('src/manifest.json');
const dest = resolve('build/manifest.json');

cpSync(src, dest);
console.log('✅ manifest.json скопирован');
