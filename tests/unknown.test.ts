import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';

test('should detect Unknown', () => {
  assert.equal('Unknown', detectLang('Hello world!'));
});

test('should detect Unknown', () => {
  assert.equal('Unknown', detectLang('ooga booga'));
});

test.run();
