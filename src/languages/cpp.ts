import type { LanguagePattern } from '../types';

export const CPP: LanguagePattern[] = [
  // Primitive variable declaration.
  { pattern: /(char|long|int|float|double)\s+\w+\s*=?/, points: 2 },
  // #include <whatever.h>
  { pattern: /#include\s*(<|")\w+(\.h)?(>|")/, points: 2 },
  // using namespace something
  { pattern: /using\s+namespace\s+.+\s*;/, points: 2 },
  // template declaration
  { pattern: /template\s*<.*>/, points: 2 },
  // std
  { pattern: /std::\w+/g, points: 2 },
  // cout/cin/endl
  { pattern: /(cout|cin|endl)/g, points: 2 },
  // Visibility specifiers
  { pattern: /(public|protected|private):/, points: 2 },
  // nullptr
  { pattern: /nullptr/, points: 2 },
  // new Keyword
  { pattern: /new \w+(\(.*\))?/, points: 1 },
  // #define macro
  { pattern: /#define\s+.+/, points: 1 },
  // template usage
  { pattern: /\w+<\w+>/, points: 1 },
  // class keyword
  { pattern: /class\s+\w+/, points: 1 },
  // void keyword
  { pattern: /void/g, points: 1 },
  // (else )if statement
  { pattern: /(else )?if\s*\(.+\)/, points: 1 },
  // while loop
  { pattern: /while\s+\(.+\)/, points: 1 },
  // Scope operator
  { pattern: /\w*::\w+/, points: 1 },
  // Single quote multicharacter string
  { pattern: /'.{2,}'/, points: -1 },
  // Java List/ArrayList
  { pattern: /(List<\w+>|ArrayList<\w*>\s*\(.*\))(\s+[\w]+|;)/, points: -1 },
  // Avoiding Ruby confusion
  { pattern: /def\s+\w+\s*(\(.+\))?\s*\n/, points: -50 },
  { pattern: /puts\s+("|').+("|')/, points: -1 },
  // Avoiding C# confusion
  { pattern: /Console\.(WriteLine|Write)(\s*)?\(/, points: -50 },
  { pattern: /(using\s)?System(\..*)?(;)?/, points: -50 },
  { pattern: /(public|private|protected|internal)\s/, points: -50 },
];
