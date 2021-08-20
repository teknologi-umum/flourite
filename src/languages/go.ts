import type { LanguagePattern } from '../types';

export const Go: LanguagePattern[] = [
  // package something
  { pattern: /package\s+[a-z]+\n/, points: 2, nearTop: true },
  // import
  { pattern: /(import\s*\(\s*\n)|(import\s+"[a-z0-9/.]+")/, points: 2, nearTop: true },
  // error check
  { pattern: /if.+err\s*!=\s*nil.+{/, points: 2 },
  // Go print
  { pattern: /fmt\.Print(f|ln)?\(.*\)/, points: 2 },
  // function
  { pattern: /func(\s+\w+\s*)?\(.*\).*{/, points: 2 },
  // variable initialisation
  { pattern: /\w+\s*:=\s*.+[^;\n]/, points: 2 },
  // if/else if
  { pattern: /(}\s*else\s*)?if[^()]+{/, points: 2 },
  // var/const declaration
  { pattern: /(var|const)\s+\w+\s+[\w*]+(\n|\s*=|$)/, points: 2 },
  // public access on package
  { pattern: /[a-z]+\.[A-Z]\w*/, points: 1 },
  // nil keyword
  { pattern: /nil/, points: 1 },
  // Single quote multicharacter string
  { pattern: /'.{2,}'/, points: -1 },
  // Avoiding C# confusion
  { pattern: /Console\.(WriteLine|Write)(\s*)?\(/, points: -50 },
  { pattern: /using\sSystem(\..*)?(;)?/, points: -50 },
  { pattern: /(public|private|protected|internal)\s/, points: -1 },
];
