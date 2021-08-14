import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';

test('should detect Unknown', () => {
  assert.equal(detectLang('Hello world!'), 'Unknown');
});

test('should detect Unknown', () => {
  assert.equal(detectLang('ooga booga'), 'Unknown');
});

test.run();
