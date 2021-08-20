import type { LanguagePattern } from '../types';

export const Rust: LanguagePattern[] = [
  { pattern: /fn\smain()/, points: 2 },
  { pattern: /(pub\s)?fn\s[A-Za-z0-9<>,]+\(.*\)\s->\s\w+(\s\{|)/, points: 1 },
  { pattern: /let\smut\s\w+(\s=|)/, points: 2 },
  { pattern: /(.*)!\(.*\)/, points: 1 },
  { pattern: /use\s\w+::.*/, points: 2 },
  { pattern: /\{:\?\}/, points: 1 },
  { pattern: /loop \{/, points: 1 },
  // Rust keywords
  { pattern: /(impl|crate|extern|macro|box)/, points: 2 },
  { pattern: /match\s\w+\s\{/, points: 1 },
  { pattern: /\w+\.len\(\)/, points: 1 },
  // Data types
  { pattern: /(&str|(i|u)(8|16|32|64|128|size))/, points: 1 },
  // Vector
  { pattern: /(Vec|Vec::new)|vec!/, points: 2 },
  // Traits
  { pattern: /(Ok|Err|Box|ToOwned|Clone)/, points: 1 },
  // Panic!!
  { pattern: /panic!\(.*\)/, points: 2 },
  // Avoiding clash with C#
  { pattern: /using\sSystem/, points: -50 },
  { pattern: /Console\.WriteLine\s*\(/, points: -50 },
  { pattern: /(public\s)?((partial|static)\s)?class\s/, points: -1 },
];
