import type { LanguagePattern } from '../types';

export const C: LanguagePattern[] = [
  // Primitive variable declaration.
  { pattern: /(char|long|int|float|double)( )+\w+( )*=?/, points: 2 },
  // malloc function call
  { pattern: /malloc\(.+\)/, points: 2 },
  // #include <whatever.h>
  { pattern: /#include (<|")\w+\.h(>|")/, points: 2, nearTop: true },
  // pointer
  { pattern: /(\w+)( )*\*( )*\w+/, points: 2 },
  // Variable declaration and/or initialisation.
  { pattern: /(\w+)( )+\w+(;|( )*=)/, points: 1 },
  // Array declaration.
  { pattern: /(\w+)( )+\w+\[.+\]/, points: 1 },
  // #define macro
  { pattern: /#define( )+.+/, points: 1 },
  // NULL constant
  { pattern: /NULL/, points: 1 },
  // void keyword
  { pattern: /void/g, points: 1 },
  // (else )if statement
  { pattern: /(else )?if\s*\(.+\)\s\{/, points: 1 },
  // while loop
  { pattern: /while\s\(.+\)\s\{/, points: 1 },
  // printf function
  { pattern: /(printf|puts)( )*\(.+\)/, points: 1 },
  // new Keyword from C++
  { pattern: /new \w+/, points: -1 },
  // new Keyword from Java
  { pattern: /new [A-Z]\w*( )*\(.+\)/, points: 2 },
  // Single quote multicharacter string
  { pattern: /'.{2,}'/, points: -1 },
  // JS variable declaration
  { pattern: /var( )+\w+( )*=?/, points: -1 },
  // Avoiding Ruby confusion
  { pattern: /def( )+\w+( )*(\(.+\))?( )*\n/, points: -50 },
  { pattern: /puts( )+("|').+("|')/, points: -1 },
  { pattern: /(public\s*)?class\s*(.*)+(\s)?/, points: -50 },
];
