/* eslint-env mocha */
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import core from '../../src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const src = fs
  .readdirSync(path.resolve(__dirname, '../../src'))
  .filter(f => f.includes('.js'))
  .map(f => path.basename(f, '.js'));

describe('main export', () => {
  it('should export an object', () => {
    const expected = 'object';
    const actual = typeof core;

    assert.equal(actual, expected);
  });

  for (const f of src.filter(f => f !== 'index')) {
    it(`should export ${f}`, async () => {
      const mod = await import(new URL(`../../src/${f}.js`, import.meta.url));
      assert.equal(core[f], mod.default);
    });

    it(`should export ${f} from root`, () => {
      const file = `${f}.js`;
      const expected = true;
      const actual = fs.statSync(path.join(path.resolve('.'), file)).isFile();

      assert.equal(actual, expected);
    });
  }
});
