import type { LanguagePattern } from '../types';

export const PHP: LanguagePattern[] = [
  // PHP tag
  { pattern: /<\?php/, points: 2 },
  // PHP style variables.
  { pattern: /\$\w+/, points: 2 },
  // use Something\Something;
  { pattern: /use\s+\w+(\\\w+)+\s*;/, points: 2, nearTop: true },
  // arrow
  { pattern: /\$\w+->\w+/, points: 2 },
  // require/include
  { pattern: /(require|include)(_once)?\s*\(?\s*('|").+\.php('|")\s*\)?\s*;/, points: 2 },
  // echo 'something';
  { pattern: /echo\s+('|").+('|")\s*;/, points: 1 },
  // NULL constant
  { pattern: /NULL/, points: 1 },
  // new keyword
  { pattern: /new\s+((\\\w+)+|\w+)(\(.*\))?/, points: 1 },
  // Function definition
  { pattern: /function(\s+[$\w]+\(.*\)|\s*\(.*\))/g, points: 1 },
  // (else)if statement
  { pattern: /(else)?if\s+\(.+\)/, points: 1 },
  // scope operator
  { pattern: /\w+::\w+/, points: 1 },
  // === operator
  { pattern: /===/g, points: 1 },
  // !== operator
  { pattern: /!==/g, points: 1 },
  // C/JS style variable declaration.
  { pattern: /(^|\s)(var|char|long|int|float|double)\s+\w+\s*=?/, points: -1 },
];
