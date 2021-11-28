import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';

test('hello world', () => {
  const code = detectLang('.hello-world {\n\tfont-size: 100px;\n}');
  assert.equal(code.language, 'CSS');
});

test('long', () => {
  const code = detectLang(`/**
  * Improve readability when focused and also mouse hovered in all browsers.
  */
 
 a:active,
 a:hover {
   outline: 0;
 }
 
 /**
  * Address styling not present in IE 8/9/10/11, Safari, and Chrome.
  */
 
 abbr[title] {
   border-bottom: 1px dotted;
 }`);
  assert.equal(code.language, 'CSS');
});

test.run();
