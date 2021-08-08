import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';

test('hello world', () => {
  assert.equal('HTML', detectLang('<h1>Hello world</h1>'));
});

test('page', () => {
  assert.equal(
    'HTML',
    detectLang(`<!DOCTYPE html>
  <html>
    <head>
      <title>Page Title</title>
    </head>
    <body>
      <h1>Hello world</h1>
      <p>This is a tiny HTML page.</p>
    </body>
  </html>
  `),
  );
});

test.run();
