import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';

test('hello world', () => {
  const code = detectLang('<h1>Hello world</h1>');
  assert.equal(code, 'HTML');
});

test('page', () => {
  const code = detectLang(`<!DOCTYPE html>
  <html>
    <head>
      <title>Page Title</title>
    </head>
    <body>
      <h1>Hello world</h1>
      <p>This is a tiny HTML page.</p>
    </body>
  </html>
  `);
  assert.equal(code, 'HTML');
});

test.run();
