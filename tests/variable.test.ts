import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';

// Test something that isn't a programming language.
test('should detect Unknown', () => {
  assert.equal('Unknown', detectLang('ooga booga'));
});

// Test a short JavaScript snippet.
test('should detect Javascript', () => {
  assert.equal('Javascript', detectLang('var javascript = true;'));
});

// Test pointer.
test('should detect C', () => {
  assert.equal('C', detectLang('int *ptr;'));
});

// Test python variable declaration.
test('should detect Python', () => {
  assert.equal('Python', detectLang('i = 1'));
});

// Test getter/setter.
test('should detect Java', () => {
  assert.equal('Java', detectLang('Person person = people.get(0);'));
});

// Test List/ArrayList
test('should detect Java', () => {
  assert.equal('Java', detectLang('List<String> things = new ArrayList<>();'));
});

test.run();
