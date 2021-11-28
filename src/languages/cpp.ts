import type { LanguagePattern } from '../types';

export const CPP: LanguagePattern[] = [
  // Primitive variable declaration.
  { pattern: /(char|long|int|float|double)\s+\w+\s*=?/, type: 'constant.type' },
  // #include <whatever.h>
  { pattern: /#include\s*(<|")\w+(\.h)?(>|")/, type: 'meta.import' },
  // using namespace something
  { pattern: /using\s+namespace\s+.+\s*;/, type: 'keyword' },
  // template declaration
  { pattern: /template\s*<.*>/, type: 'keyword' },
  // std
  { pattern: /std::\w+/g, type: 'keyword.other' },
  // cout/cin/endl
  { pattern: /(cout|cin|endl)/g, type: 'keyword.print' },
  // Visibility specifiers
  { pattern: /(public|protected|private):/, type: 'keyword.visibility' },
  // nullptr
  { pattern: /nullptr/, type: 'keyword' },
  // new Keyword
  { pattern: /new \w+(\(.*\))?/, type: 'keyword' },
  // #define macro
  { pattern: /#define\s+.+/, type: 'macro' },
  // template usage
  { pattern: /\w+<\w+>/, type: 'keyword.other' },
  // class keyword
  { pattern: /class\s+\w+/, type: 'keyword' },
  // void keyword
  { pattern: /void/g, type: 'keyword' },
  // (else )if statement
  { pattern: /(else )?if\s*\(.+\)/, type: 'keyword.control' },
  // while loop
  { pattern: /while\s+\(.+\)/, type: 'keyword.control' },
  // Scope operator
  { pattern: /\w*::\w+/, type: 'macro' },
  // Single quote multicharacter string
  { pattern: /'.{2,}'/, type: 'not' },
  // Java List/ArrayList
  { pattern: /(List<\w+>|ArrayList<\w*>\s*\(.*\))(\s+[\w]+|;)/, type: 'not' },
  // Avoiding Ruby confusion
  { pattern: /def\s+\w+\s*(\(.+\))?\s*\n/, type: 'not' },
  { pattern: /puts\s+("|').+("|')/, type: 'not' },
  { pattern: /\bmodule\s\S/, type: 'not' },
  // Avoiding C# confusion
  { pattern: /Console\.(WriteLine|Write)(\s*)?\(/, type: 'not' },
  { pattern: /(using\s)?System(\..*)?(;)?/, type: 'not' },
  { pattern: /static\s+\S+\s+Main\(.*\)/, type: 'not' },
  { pattern: /(public|private|protected|internal)\s/, type: 'not' },
  // Avoiding Kotlin confusion
  { pattern: /fun main\((.*)?\) {/, type: 'not' },
  {
    pattern: /(inline|private|public|protected|override|operator(\s+))?fun(\s+)([A-Za-z0-9_])(\s+)?\((.*)\)(\s+)({|=)/,
    type: 'not',
  },
  { pattern: /(const)?(\s+)?val(\s+)(.*)(:(\s)(.*)(\?)?)?(\s+)=(\s+)/, type: 'not' },
  // Avoiding Dart confusion
  { pattern: /^(void\s)?main\(\)\s(async\s)?{/, type: 'not' },
];
