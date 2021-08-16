import type { LanguagePattern } from '../types';

export const Ruby: LanguagePattern[] = [
  // require/include
  { pattern: /(require|include)\s+'\w+(\.rb)?'/, points: 2, nearTop: true },
  // Function definition
  { pattern: /def\s+\w+\s*(\(.+\))?\s*\n/, points: 2 },
  // Instance variables
  { pattern: /@\w+/, points: 2 },
  // Boolean property
  { pattern: /\.\w+\?/, points: 2 },
  // puts (Ruby print)
  { pattern: /puts\s+("|').+("|')/, points: 2 },
  // Inheriting class
  { pattern: /class [A-Z]\w*\s*<\s*([A-Z]\w*(::)?)+/, points: 2 },
  // attr_accessor
  { pattern: /attr_accessor\s+(:\w+(,\s*)?)+/, points: 2 },
  // new
  { pattern: /\w+\.new\s+/, points: 2 },
  // elsif keyword
  { pattern: /elsif/, points: 2 },
  // do
  { pattern: /do\s*\|(\w+(,\s*\w+)?)+\|/, points: 2 },
  // for loop
  { pattern: /for (\w+|\(?\w+,\s*\w+\)?) in (.+)/, points: 1 },
  // nil keyword
  { pattern: /nil/, points: 1 },
  // Scope operator
  { pattern: /[A-Z]\w*::[A-Z]\w*/, points: 1 },
];
