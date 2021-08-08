import type { LanguagePattern } from "../index";

export const Javascript: LanguagePattern[] = [
  // undefined keyword
  { pattern: /undefined/g, points: 2 },
  // console.log('ayy lmao')
  { pattern: /console\.log( )*\(/, points: 2 },
  // Variable declaration
  { pattern: /(var|const|let)( )+\w+( )*=?/, points: 2 },
  // Array/Object declaration
  { pattern: /(('|").+('|")( )*|\w+):( )*[{\[]/, points: 2 },
  // === operator
  { pattern: /===/g, points: 1 },
  // !== operator
  { pattern: /!==/g, points: 1 },
  // Function definition
  { pattern: /function\*?(( )+[\$\w]+( )*\(.*\)|( )*\(.*\))/g, points: 1 },
  // null keyword
  { pattern: /null/g, points: 1 },
  // lambda expression
  { pattern: /\(.*\)( )*=>( )*.+/, points: 1 },
  // (else )if statement
  { pattern: /(else )?if( )+\(.+\)/, points: 1 },
  // while loop
  { pattern: /while( )+\(.+\)/, points: 1 },
  // C style variable declaration.
  { pattern: /(^|\s)(char|long|int|float|double)( )+\w+( )*=?/, points: -1 },
  // pointer
  { pattern: /(\w+)( )*\*( )*\w+/, points: -1 },
  // HTML <script> tag
  { pattern: /<(\/)?script( type=('|")text\/javascript('|"))?>/, points: -50 },
]