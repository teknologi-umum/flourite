import type { LanguagePattern } from '../types';

export const Java: LanguagePattern[] = [
  // System.out.println() etc.
  { pattern: /System\.(in|out)\.\w+/, points: 2 },
  // Class variable declarations
  { pattern: /(private|protected|public)\s*\w+\s*\w+(\s*=\s*[\w])?/, points: 2 },
  // Method
  { pattern: /(private|protected|public)\s*\w+\s*[\w]+\(.+\)/, points: 2 },
  // String class
  { pattern: /(^|\s)(String)\s+[\w]+\s*=?/, points: 2 },
  // List/ArrayList
  { pattern: /(List<\w+>|ArrayList<\w*>\s*\(.*\))(\s+[\w]+|;)/, points: 2 },
  // class keyword
  { pattern: /(public\s*)?class\s*(.*)+(\s)?\{/, points: 2 },
  // Array declaration.
  { pattern: /(\w+)(\[\s*\])+\s+\w+/, points: 2 },
  // final keyword
  { pattern: /final\s*\w+/, points: 2 },
  // getter & setter
  { pattern: /\w+\.(get|set)\(.+\)/, points: 2 },
  // new Keyword (Java)
  { pattern: /new [A-Z]\w*\s*\(.+\)/, points: 2 },
  // C style variable declaration.
  { pattern: /(^|\s)(char|long|int|float|double)\s+[\w]+\s*=?/, points: 1 },
  // extends/implements keywords
  { pattern: /(extends|implements)/, points: 2, nearTop: true },
  // null keyword
  { pattern: /null/g, points: 1 },
  // (else )if statement
  { pattern: /(else )?if\s*\(.+\)/, points: 1 },
  // while loop
  { pattern: /while\s+\(.+\)/, points: 1 },
  // void keyword
  { pattern: /void/g, points: 1 },
  // const
  { pattern: /const\s*\w+/, points: -1 },
  // pointer
  { pattern: /(\w+)\s*\*\s*\w+/, points: -1 },
  // Single quote multicharacter string
  { pattern: /'.{2,}'/, points: -1 },
  // C style include
  { pattern: /#include\s*(<|")\w+(\.h)?(>|")/, points: -1, nearTop: true },
  // Avoiding Ruby confusion
  { pattern: /def\s+\w+\s*(\(.+\))?\s*\n/, points: -50 },
];
