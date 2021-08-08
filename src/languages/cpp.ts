import { LanguagePattern } from '../index';

export const CPP: LanguagePattern[] = [
  // Primitive variable declaration.
  { pattern: /(char|long|int|float|double)( )+\w+( )*=?/, points: 2 },
  // #include <whatever.h>
  { pattern: /#include( )*(<|")\w+(\.h)?(>|")/, points: 2, nearTop: true },
  // using namespace something
  { pattern: /using( )+namespace( )+.+( )*;/, points: 2 },
  // template declaration
  { pattern: /template( )*<.*>/, points: 2 },
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
  { pattern: /#define( )+.+/, points: 1 },
  // template usage
  { pattern: /\w+<\w+>/, points: 1 },
  // class keyword
  { pattern: /class( )+\w+/, points: 1 },
  // void keyword
  { pattern: /void/g, points: 1 },
  // (else )if statement
  { pattern: /(else )?if( )*\(.+\)/, points: 1 },
  // while loop
  { pattern: /while( )+\(.+\)/, points: 1 },
  // Scope operator
  { pattern: /\w*::\w+/, points: 1 },
  // Single quote multicharacter string
  { pattern: /'.{2,}'/, points: -1 },
  // Java List/ArrayList
  { pattern: /(List<\w+>|ArrayList<\w*>( )*\(.*\))(( )+[\w]+|;)/, points: -1 },
];
