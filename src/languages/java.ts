import type { LanguagePattern } from '../types';

export const Java: LanguagePattern[] = [
  // System.out.println() etc.
  { pattern: /System\.(in|out)\.\w+/, type: 'keyword.print' },
  // Class variable declarations
  { pattern: /(private|protected|public)\s*\w+\s*\w+(\s*=\s*[\w])?/, type: 'keyword' },
  // Method
  { pattern: /(private|protected|public)\s*\w+\s*[\w]+\(.+\)/, type: 'keyword' },
  // String class
  { pattern: /(^|\s)(String)\s+[\w]+\s*=?/, type: 'keyword.other' },
  // List/ArrayList
  { pattern: /(List<\w+>|ArrayList<\w*>\s*\(.*\))(\s+[\w]+|;)/, type: 'keyword.variable' },
  // class keyword
  { pattern: /(public\s*)?class\s*(.*)+(\s)?\{/, type: 'keyword' },
  // Array declaration.
  { pattern: /(\w+)(\[\s*\])+\s+\w+/, type: 'constant.array' },
  // final keyword
  { pattern: /final\s*\w+/, type: 'keyword.other' },
  // getter & setter
  { pattern: /\w+\.(get|set)\(.+\)/, type: 'keyword.other' },
  // new Keyword (Java)
  { pattern: /new [A-Z]\w*\s*\(.+\)/, type: 'keyword.other' },
  // C style variable declaration.
  { pattern: /(^|\s)(char|long|int|float|double)\s+[\w]+\s*=?/, type: 'constant.type' },
  // extends/implements keywords
  { pattern: /(extends|implements)/, type: 'meta.module', nearTop: true },
  // null keyword
  { pattern: /null/g, type: 'keyword.other' },
  // (else )if statement
  { pattern: /(else )?if\s*\(.+\)/, type: 'keyword.control' },
  // while loop
  { pattern: /while\s+\(.+\)/, type: 'keyword.control' },
  // void keyword
  { pattern: /void/g, type: 'keyword.other' },
  // const
  { pattern: /const\s*\w+/, type: 'not' },
  // pointer
  { pattern: /(\w+)\s*\*\s*\w+/, type: 'not' },
  // Single quote multicharacter string
  { pattern: /'.{2,}'/, type: 'not' },
  // C style include
  { pattern: /#include\s*(<|")\w+(\.h)?(>|")/, type: 'not', nearTop: true },
  // Avoiding Ruby confusion
  { pattern: /def\s+\w+\s*(\(.+\))?\s*\n/, type: 'not' },
  // Avoiding C# confusion
  { pattern: /\[Attribute\]/, type: 'not' },
  { pattern: /Console\.(WriteLine|Write)(\s*)?\(/, type: 'not' },
  { pattern: /(#region(\s.*)?|#endregion\n)/, type: 'not' },
  { pattern: /using\sSystem(\..*)?(;)?/, type: 'not' },
  // Avoiding Kotlin confusion
  { pattern: /fun main\((.*)?\) {/, type: 'not' },
  { pattern: /(inline(\s+))?fun(\s+)([A-Za-z0-9_])(\s+)?\((.*)\)(\s+)({|=)/, type: 'not' },
  { pattern: /(const)?(\s+)?val(\s+)(.*)(:(\s)(.*)(\?)?)?(\s+)=(\s+)/, type: 'not' },
];
