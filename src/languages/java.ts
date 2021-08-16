import type { LanguagePattern } from '../types';

export const Java: LanguagePattern[] = [
  // System.out.println() etc.
  { pattern: /System\.(in|out)\.\w+/, points: 2 },
  // Class variable declarations
  { pattern: /(private|protected|public)( )*\w+( )*\w+(( )*=( )*[\w])?/, points: 2 },
  // Method
  { pattern: /(private|protected|public)( )*\w+( )*[\w]+\(.+\)/, points: 2 },
  // String class
  { pattern: /(^|\s)(String)( )+[\w]+( )*=?/, points: 2 },
  // List/ArrayList
  { pattern: /(List<\w+>|ArrayList<\w*>( )*\(.*\))(( )+[\w]+|;)/, points: 2 },
  // class keyword
  { pattern: /(public\s*)?class\s*(.*)+(\s)?\{/, points: 2 },
  // Array declaration.
  { pattern: /(\w+)(\[( )*\])+( )+\w+/, points: 2 },
  // final keyword
  { pattern: /final( )*\w+/, points: 2 },
  // getter & setter
  { pattern: /\w+\.(get|set)\(.+\)/, points: 2 },
  // new Keyword (Java)
  { pattern: /new [A-Z]\w*( )*\(.+\)/, points: 2 },
  // C style variable declaration.
  { pattern: /(^|\s)(char|long|int|float|double)( )+[\w]+( )*=?/, points: 1 },
  // extends/implements keywords
  { pattern: /(extends|implements)/, points: 2, nearTop: true },
  // null keyword
  { pattern: /null/g, points: 1 },
  // (else )if statement
  { pattern: /(else )?if( )*\(.+\)/, points: 1 },
  // while loop
  { pattern: /while( )+\(.+\)/, points: 1 },
  // void keyword
  { pattern: /void/g, points: 1 },
  // const
  { pattern: /const( )*\w+/, points: -1 },
  // pointer
  { pattern: /(\w+)( )*\*( )*\w+/, points: -1 },
  // Single quote multicharacter string
  { pattern: /'.{2,}'/, points: -1 },
  // C style include
  { pattern: /#include( )*(<|")\w+(\.h)?(>|")/, points: -1, nearTop: true },
  // Avoiding Ruby confusion
  { pattern: /def( )+\w+( )*(\(.+\))?( )*\n/, points: -50 },
];
