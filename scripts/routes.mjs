import { readFileSync } from 'node:fs';
export const routes = JSON.parse(readFileSync(new URL('../src/publicRoutes.json', import.meta.url), 'utf8'));
