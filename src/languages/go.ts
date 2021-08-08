import { LanguagePattern } from '../index';

export const Go: LanguagePattern[] = [
  // package something
  { pattern: /package( )+[a-z]+\n/, points: 2, nearTop: true },
  // import
  { pattern: /(import( )*\(( )*\n)|(import( )+"[a-z0-9\/\.]+")/, points: 2, nearTop: true },
  // error check
  { pattern: /if.+err( )*!=( )*nil.+{/, points: 2 },
  // Go print
  { pattern: /fmt\.Print(f|ln)?\(.*\)/, points: 2 },
  // function
  { pattern: /func(( )+\w+( )*)?\(.*\).*{/, points: 2 },
  // variable initialisation
  { pattern: /\w+( )*:=( )*.+[^;\n]/, points: 2 },
  // if/else if
  { pattern: /(}( )*else( )*)?if[^\(\)]+{/, points: 2 },
  // var/const declaration
  { pattern: /(var|const)( )+\w+( )+[\w\*]+(\n|( )*=|$)/, points: 2 },
  // public access on package
  { pattern: /[a-z]+\.[A-Z]\w*/, points: 1 },
  // nil keyword
  { pattern: /nil/, points: 1 },
  // Single quote multicharacter string
  { pattern: /'.{2,}'/, points: -1 },
];
