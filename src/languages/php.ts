import type { LanguagePattern } from '../types';

export const PHP: LanguagePattern[] = [
  // PHP tag
  { pattern: /<\?php/, type: 'meta.module' },
  // PHP style variables.
  { pattern: /\$\w+/, type: 'keyword.variable' },
  // use Something\Something;
  { pattern: /use\s+\w+(\\\w+)+\s*;/, type: 'meta.import', nearTop: true },
  // arrow
  { pattern: /\$\w+->\w+/, type: 'keyword' },
  // require/include
  { pattern: /(require|include)(_once)?\s*\(?\s*('|").+\.php('|")\s*\)?\s*;/, type: 'meta.import' },
  // echo 'something';
  { pattern: /echo\s+('|").+('|")\s*;/, type: 'keyword.print' },
  // NULL constant
  { pattern: /NULL/, type: 'constant.null' },
  // new keyword
  { pattern: /new\s+((\\\w+)+|\w+)(\(.*\))?/, type: 'keyword' },
  // Function definition
  { pattern: /function(\s+[$\w]+\(.*\)|\s*\(.*\))/g, type: 'keyword.control' },
  // (else)if statement
  { pattern: /(else)?if\s+\(.+\)/, type: 'keyword.control' },
  // scope operator
  { pattern: /\w+::\w+/, type: 'keyword' },
  // === operator
  { pattern: /===/g, type: 'keyword.operator' },
  // !== operator
  { pattern: /!==/g, type: 'keyword.operator' },
  // C/JS style variable declaration.
  { pattern: /(^|\s)(var|char|long|int|float|double)\s+\w+\s*=?/, type: 'not' },
  // Javascript variable declaration
  { pattern: /(var|const|let)\s+\w+\s*=?/, type: 'not' },
];
