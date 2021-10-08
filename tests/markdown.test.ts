import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';

test('heading 1', () => {
  const code = detectLang('# Heading level 1');
  assert.equal(code.language, 'Markdown');
});

test('heading 2', () => {
  const code = detectLang('## Heading level 2');
  assert.equal(code.language, 'Markdown');
});

test('heading 3', () => {
  const code = detectLang('### Heading level 3');
  assert.equal(code.language, 'Markdown');
});

test('heading 4', () => {
  const code = detectLang('#### Heading level 4');
  assert.equal(code.language, 'Markdown');
});

test('heading 5', () => {
  const code = detectLang('##### Heading level 5');
  assert.equal(code.language, 'Markdown');
});

test('heading 6', () => {
  const code = detectLang('###### Heading level 6');
  assert.equal(code.language, 'Markdown');
});

test('heading 1 alternate syntax', () => {
  const code = detectLang('Heading level 1\n============');
  assert.equal(code.language, 'Markdown');
});

test('heading 2 alternate syntax', () => {
  const code = detectLang('Heading level 1\n------------');
  assert.equal(code.language, 'Markdown');
});

test('bold syntax 1', () => {
  const code = detectLang('**This text will be bold**');
  assert.equal(code.language, 'Markdown');
});

test('bold syntax 2', () => {
  const code = detectLang('__This will also be bold__');
  assert.equal(code.language, 'Markdown');
});

test('italic syntax 1', () => {
  const code = detectLang('*This text will be italic*');
  assert.equal(code.language, 'Markdown');
});

test('italic syntax 2', () => {
  const code = detectLang('_This will also be italic_');
  assert.equal(code.language, 'Markdown');
});

test('list syntax 1', () => {
  const code = detectLang(`* Item 1`);
  assert.equal(code.language, 'Markdown');
});

// FIXME: Conflicts with YAML
test.skip('list syntax 2', () => {
  const code = detectLang(`- Item 1`);
  assert.equal(code.language, 'Markdown');
});

test('images', () => {
  const code = detectLang(`![GitHub Logo](/images/logo.png)`);
  assert.equal(code.language, 'Markdown');
});

test('links', () => {
  const code = detectLang(`[GitHub](http://github.com)`);
  assert.equal(code.language, 'Markdown');
});

test('blockquotes', () => {
  const code = detectLang(`> We're living the future so
  > the present is our past.`);
  assert.equal(code.language, 'Markdown');
});

test('inline code', () => {
  const code = detectLang('I think you should use an`<addr>` element here instead.');
  assert.equal(code.language, 'Markdown');
});

test('readme example', () => {
  const code = detectLang(`# Flourite - Language detector

  [![npm](https://img.shields.io/npm/v/flourite?style=for-the-badge)](https://www.npmjs.com/package/flourite) [![npm bundle size](https://img.shields.io/bundlephobia/min/flourite?style=for-the-badge)](https://www.npmjs.com/package/flourite) [![GitHub Workflow Status](https://img.shields.io/github/workflow/status/teknologi-umum/flourite/CI?style=for-the-badge)](https://github.com/teknologi-umum/flourite/actions/workflows/ci.yml) [![Codecov](https://img.shields.io/codecov/c/gh/teknologi-umum/flourite?style=for-the-badge)](https://app.codecov.io/gh/teknologi-umum/flourite) [![LGTM Alerts](https://img.shields.io/lgtm/alerts/github/teknologi-umum/flourite?style=for-the-badge)](https://lgtm.com/projects/g/teknologi-umum/flourite/)
  
  A fork of [ts95/lang-detector](https://github.com/ts95/lang-detector), rewritten in Typescript with more language support.
  
  Detects a programming language from a given string.
  
  - Built-in support for CommonJS and ESM format
  - Built-in Typescript typings
  - No external dependencies
  - 200 test cases and growing!`);
  assert.equal(code.language, 'Markdown');
});

test('example 1', () => {
  const code = detectLang(`Heading
  =======
  
  Sub-heading
  -----------
  
  Paragraphs are separated 
  by a blank line.
  
  Two spaces at the end of a line  
  produce a line break.`);
  assert.equal(code.language, 'Markdown');
});

test('example 2', () => {
  const code = detectLang(` Text attributes _italic_,
  **bold**, \`monospace\`. Some implementations may use *single-asterisks* for italic text.`);
  assert.equal(code.language, 'Markdown');
});

test('example 3', () => {
  const code = detectLang(`Bullet list:

  * apples
  * oranges
  * pears

Numbered list:

  1. lather
  2. rinse
  3. repeat`);
  assert.equal(code.language, 'Markdown');
});

test('example 4', () => {
  const code = detectLang(`An [example](http://example.com).

  ![Image](Icon-pictures.png "icon")
  
  > Markdown uses email-style
  > characters for blockquoting.
  > Multiple paragraphs need to be prepended individually.
  
  Basic inline <abbr title="Hypertext Markup Language">HTML</abbr> may be supported.`);
  assert.equal(code.language, 'Markdown');
});

test.run();
