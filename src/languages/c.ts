import type { LanguagePattern } from "../types";

export const C: LanguagePattern[] = [
  // Primitive variable declaration.
  { pattern: /(char|long|int|float|double)\s+\w+\s*=?/, type: "constant.type" },
  // malloc function call
  { pattern: /malloc\(.+\)/, type: "keyword.function" },
  // #include <whatever.h>
  { pattern: /#include (<|")\w+\.h(>|")/, type: "meta.import", nearTop: true },
  // pointer
  { pattern: /(\w+)\s*\*\s*\w+/, type: "keyword" },
  // Variable declaration and/or initialisation.
  { pattern: /(\w+)\s+\w+(;|\s*=)/, type: "macro" },
  // Array declaration.
  { pattern: /(\w+)\s+\w+\[.+\]/, type: "keyword.other" },
  // #define macro
  { pattern: /#define\s+.+/, type: "macro" },
  // NULL constant
  { pattern: /NULL/, type: "constant.null" },
  // void keyword
  { pattern: /void/g, type: "keyword.other" },
  // (else )if statement
  // { pattern: /(else )?if\s*\(.+\)\s\{/, points: 1 },
  // while loop
  // { pattern: /while\s\(.+\)\s\{/, points: 1 },
  // printf function
  { pattern: /(printf|puts)\s*\(.+\)/, type: "keyword.print" },
  // new Keyword from C++
  { pattern: /new \w+/, type: "not" },
  // new Keyword from Java
  { pattern: /new [A-Z]\w*\s*\(.+\)/, type: "not" },
  // Single quote multicharacter string
  { pattern: /'.{2,}'/, type: "not" },
  // JS variable declaration
  { pattern: /var\s+\w+\s*=?/, type: "not" },
  // Avoiding Ruby confusion
  { pattern: /def\s+\w+\s*(?:(\(.+\))\s*)?\n/, type: "not" },
  { pattern: /puts\s+("|').+("|')/, type: "not" },
  // Avoiding C# confusion
  { pattern: /Console\.(WriteLine|Write)(\s*)?\(/, type: "not" },
  { pattern: /(using\s)?System(\..*)?(;)?/, type: "not" },
  {
    pattern: /(public\s)?((partial|static|delegate)\s)?(class\s)/,
    type: "not"
  },
  { pattern: /(public|private|protected|internal)/, type: "not" },
  {
    pattern:
      /(new|this\s)?(List|IEnumerable)<(sbyte|byte|short|ushort|int|uint|long|ulong|float|double|decimal|bool|char|string)>/,
    type: "not"
  },
  // Avoiding Lua confusion
  { pattern: /local\s(function|\w+)?/, type: "not" }
];
