import type { LanguagePattern } from '../types';

export const Javascript: LanguagePattern[] = [
  // undefined keyword
  { pattern: /undefined/g, type: 'keyword' },
  // console.log('ayy lmao')
  { pattern: /console\.log\s*\(/, type: 'keyword.print' },
  // Variable declaration
  { pattern: /(var|const|let)\s+\w+\s*=?/, type: 'keyword.variable' },
  // Array/Object declaration
  { pattern: /(('|").+('|")\s*|\w+):\s*[{[]/, type: 'constant.array' },
  // === operator
  { pattern: /===/g, type: 'keyword.operator' },
  // !== operator
  { pattern: /!==/g, type: 'keyword.operator' },
  // Function definition
  { pattern: /function\*?(\s+[$\w]+\s*\(.*\)|\s*\(.*\))/g, type: 'keyword.function' },
  // null keyword
  { pattern: /null/g, type: 'constant.null' },
  // lambda expression
  { pattern: /\(.*\)\s*=>\s*.+/, type: 'keyword.control' },
  // (else )if statement
  { pattern: /(else )?if\s+\(.+\)/, type: 'keyword.control' },
  // while loop
  { pattern: /while\s+\(.+\)/, type: 'keyword.control' },
  // C style variable declaration.
  { pattern: /(^|\s)(char|long|int|float|double)\s+\w+\s*=?/, type: 'not' },
  // pointer
  { pattern: /\*\w+/, type: 'not' },
  // HTML <script> tag
  { pattern: /<(\/)?script( type=('|")text\/javascript('|"))?>/, type: 'not' },
  { pattern: /fn\s[A-Za-z0-9<>,]+\(.*\)\s->\s\w+(\s\{|)/, type: 'not' },
  // Avoiding C# confusion
  { pattern: /Console\.(WriteLine|Write)(\s*)?\(/, type: 'not' },
  { pattern: /(using\s)?System(\..*)?(;)?/, type: 'not' },
  { pattern: /(func|fn)\s/, type: 'not' },
  { pattern: /(begin|end)\n/, type: 'not' },
  // Avoiding Lua confusion
  { pattern: /local\s(function|(\w+)\s=)/, type: 'not' },
];
