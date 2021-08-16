import type { LanguagePattern } from '../types';

export const Javascript: LanguagePattern[] = [
  // undefined keyword
  { pattern: /undefined/g, points: 2 },
  // console.log('ayy lmao')
  { pattern: /console\.log\s*\(/, points: 2 },
  // Variable declaration
  { pattern: /(var|const|let)\s+\w+\s*=?/, points: 2 },
  // Array/Object declaration
  { pattern: /(('|").+('|")\s*|\w+):\s*[{[]/, points: 2 },
  // === operator
  { pattern: /===/g, points: 1 },
  // !== operator
  { pattern: /!==/g, points: 1 },
  // Function definition
  { pattern: /function\*?(\s+[$\w]+\s*\(.*\)|\s*\(.*\))/g, points: 1 },
  // null keyword
  { pattern: /null/g, points: 1 },
  // lambda expression
  { pattern: /\(.*\)\s*=>\s*.+/, points: 1 },
  // (else )if statement
  { pattern: /(else )?if\s+\(.+\)/, points: 1 },
  // while loop
  { pattern: /while\s+\(.+\)/, points: 1 },
  // C style variable declaration.
  { pattern: /(^|\s)(char|long|int|float|double)\s+\w+\s*=?/, points: -1 },
  // pointer
  { pattern: /(\w+)\s*\*\s*\w+/, points: -1 },
  // HTML <script> tag
  { pattern: /<(\/)?script( type=('|")text\/javascript('|"))?>/, points: -50 },
  { pattern: /fn\s[A-Za-z0-9<>,]+\(.*\)\s->\s\w+(\s\{|)/, points: -50 },
];
