import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';

test('should detect Unknown', () => {
  assert.equal(detectLang('Hello world!'), 'Unknown');
});

test('should detect Unknown', () => {
  assert.equal(detectLang('ooga booga'), 'Unknown');
});

test('should not gives unknown', () => {
  assert.equal(detectLang('a very random text', { noUnknown: true }), '');
});

test.run();
