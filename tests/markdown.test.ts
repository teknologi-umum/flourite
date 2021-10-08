import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';

test('heading 1', () => {
  const code = detectLang('# Heading level 1');
  assert.equal(code, 'Markdown');
});

test('heading 2', () => {
  const code = detectLang('## Heading level 2');
  assert.equal(code, 'Markdown');
});

test('heading 3', () => {
  const code = detectLang('### Heading level 3');
  assert.equal(code, 'Markdown');
});

test('heading 4', () => {
  const code = detectLang('#### Heading level 4');
  assert.equal(code, 'Markdown');
});

test('heading 5', () => {
  const code = detectLang('##### Heading level 5');
  assert.equal(code, 'Markdown');
});

test('heading 6', () => {
  const code = detectLang('###### Heading level 6');
  assert.equal(code, 'Markdown');
});

test('heading 1 alternate syntax', () => {
  const code = detectLang('Heading level 1\n============');
  assert.equal(code, 'Markdown');
});

test('heading 2 alternate syntax', () => {
  const code = detectLang('Heading level 1\n------------');
  assert.equal(code, 'Markdown');
});

test('bold syntax 1', () => {
  const code = detectLang('**This text will be bold**');
  assert.equal(code, 'Markdown');
});

test('bold syntax 2', () => {
  const code = detectLang('__This will also be bold__');
  assert.equal(code, 'Markdown');
});

test('italic syntax 1', () => {
  const code = detectLang('*This text will be italic*');
  assert.equal(code, 'Markdown');
});

test('italic syntax 2', () => {
  const code = detectLang('_This will also be italic_');
  assert.equal(code, 'Markdown');
});

test('list syntax 1', () => {
  const code = detectLang(`* Item 1`);
  assert.equal(code, 'Markdown');
});

// FIXME: Conflicts with YAML
test.skip('list syntax 2', () => {
  const code = detectLang(`- Item 1`);
  assert.equal(code, 'Markdown');
});

test('images', () => {
  const code = detectLang(`![GitHub Logo](/images/logo.png)`);
  assert.equal(code, 'Markdown');
});

test('links', () => {
  const code = detectLang(`[GitHub](http://github.com)`);
  assert.equal(code, 'Markdown');
});

test('blockquotes', () => {
  const code = detectLang(`> We're living the future so
  > the present is our past.`);
  assert.equal(code, 'Markdown');
});

test('inline code', () => {
  const code = detectLang('I think you should use an`<addr>` element here instead.');
  assert.equal(code, 'Markdown');
});

test.run();
