import type { LanguagePattern } from '../types';

export const Python: LanguagePattern[] = [
  // Function definition
  { pattern: /def\s+\w+\(.*\)\s*:/, type: 'keyword.function' },
  // while loop
  { pattern: /while (.+):/, type: 'keyword.control' },
  // from library import something
  { pattern: /from [\w.]+ import (\w+|\*)/, type: 'meta.import' },
  // class keyword
  { pattern: /class\s*\w+(\(\s*\w+\s*\))?\s*:/, type: 'keyword' },
  // if keyword
  { pattern: /if\s+(.+)\s*:/, type: 'keyword.control' },
  // elif keyword
  { pattern: /elif\s+(.+)\s*:/, type: 'keyword.control' },
  // else keyword
  { pattern: /else:/, type: 'keyword.control' },
  // for loop
  { pattern: /for (\w+|\(?\w+,\s*\w+\)?) in (.+):/, type: 'keyword.control' },
  // Python variable declaration.
  { pattern: /\w+\s*=\s*\w+(?!;)(\n|$)/, type: 'keyword' },
  // import something
  { pattern: /import ([[^.]\w])+/, type: 'meta.import', nearTop: true },
  // print statement/function
  { pattern: /print((\s*\(.+\))|\s+.+)/, type: 'keyword.print' },
  // &&/|| operators
  { pattern: /(&{2}|\|{2})/, type: 'not' },
];
