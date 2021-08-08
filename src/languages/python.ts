import { LanguagePattern } from "../index";

export const Python: LanguagePattern[] = [
  // Function definition
  { pattern: /def( )+\w+\(.*\)( )*:/, points: 2 },
  // while loop
  { pattern: /while (.+):/, points: 2 },
  // from library import something
  { pattern: /from [\w\.]+ import (\w+|\*)/, points: 2 },
  // class keyword
  { pattern: /class( )*\w+(\(( )*\w+( )*\))?( )*:/, points: 2 },
  // if keyword
  { pattern: /if( )+(.+)( )*:/, points: 2 },
  // elif keyword
  { pattern: /elif( )+(.+)( )*:/, points: 2 },
  // else keyword
  { pattern: /else:/, points: 2 },
  // for loop
  { pattern: /for (\w+|\(?\w+,( )*\w+\)?) in (.+):/, points: 2 },
  // Python variable declaration.
  { pattern: /\w+( )*=( )*\w+(?!;)(\n|$)/, points: 1 },
  // import something
  { pattern: /import ([[^\.]\w])+/, points: 1, nearTop: true },
  // print statement/function
  { pattern: /print((( )*\(.+\))|( )+.+)/, points: 1 },
  // &&/|| operators
  { pattern: /(&{2}|\|{2})/, points: -1 },
]