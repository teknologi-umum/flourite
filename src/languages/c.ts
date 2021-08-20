import type { LanguagePattern } from '../types';

export const C: LanguagePattern[] = [
  // Primitive variable declaration.
  { pattern: /(char|long|int|float|double)\s+\w+\s*=?/, points: 2 },
  // malloc function call
  { pattern: /malloc\(.+\)/, points: 2 },
  // #include <whatever.h>
  { pattern: /#include (<|")\w+\.h(>|")/, points: 2, nearTop: true },
  // pointer
  { pattern: /(\w+)\s*\*\s*\w+/, points: 2 },
  // Variable declaration and/or initialisation.
  { pattern: /(\w+)\s+\w+(;|\s*=)/, points: 1 },
  // Array declaration.
  { pattern: /(\w+)\s+\w+\[.+\]/, points: 1 },
  // #define macro
  { pattern: /#define\s+.+/, points: 1 },
  // NULL constant
  { pattern: /NULL/, points: 1 },
  // void keyword
  { pattern: /void/g, points: 1 },
  // (else )if statement
  { pattern: /(else )?if\s*\(.+\)\s\{/, points: 1 },
  // while loop
  { pattern: /while\s\(.+\)\s\{/, points: 1 },
  // printf function
  { pattern: /(printf|puts)\s*\(.+\)/, points: 1 },
  // new Keyword from C++
  { pattern: /new \w+/, points: -1 },
  // new Keyword from Java
  { pattern: /new [A-Z]\w*\s*\(.+\)/, points: 2 },
  // Single quote multicharacter string
  { pattern: /'.{2,}'/, points: -1 },
  // JS variable declaration
  { pattern: /var\s+\w+\s*=?/, points: -1 },
  // Avoiding Ruby confusion
  { pattern: /def\s+\w+\s*(\(.+\))?\s*\n/, points: -50 },
  { pattern: /puts\s+("|').+("|')/, points: -1 },
  // Avoiding C# confusion
  { pattern: /Console\.(WriteLine|Write)(\s*)?\(/, points: -50 },
  { pattern: /(using\s)?System(\..*)?(;)?/, points: -50 },
  { pattern: /(public\s)?((partial|static|delegate)\s)?(class\s)/, points: -50 },
  { pattern: /(public|private|protected|internal)/, points: -1 },
  {
    pattern:
      /(new|this\s)?(List|IEnumerable)<(sbyte|byte|short|ushort|int|uint|long|ulong|float|double|decimal|bool|char|string)>/,
    points: -50,
  },
];
