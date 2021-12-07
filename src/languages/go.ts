import type { LanguagePattern } from "../types";

export const Go: LanguagePattern[] = [
  // package something
  { pattern: /package\s+[a-z]+\n/, type: "meta.module", nearTop: true },
  // import
  { pattern: /(import\s*\(\s*\n)|(import\s+"[a-z0-9/.]+")/, type: "meta.import", nearTop: true },
  // error check
  { pattern: /if.+err\s*!=\s*nil.+{/, type: "keyword.function" },
  // Go print
  { pattern: /fmt\.Print(f|ln)?\(.*\)/, type: "keyword.print" },
  // function
  { pattern: /func(\s+\w+\s*)?\(.*\).*{/, type: "keyword.function" },
  // variable initialisation
  { pattern: /\w+\s*:=\s*.+[^;\n]/, type: "keyword.variable" },
  // if/else if
  { pattern: /(}\s*else\s*)?if[^()]+{/, type: "keyword.control" },
  // var/const declaration
  { pattern: /(var|const)\s+\w+\s+[\w*]+(\n|\s*=|$)/, type: "keyword.variable" },
  // public access on package
  { pattern: /[a-z]+\.[A-Z]\w*/, type: "macro" },
  // nil keyword
  { pattern: /nil/, type: "keyword" },
  // Single quote multicharacter string
  { pattern: /'.{2,}'/, type: "not" },
  // Avoiding C# confusion
  { pattern: /Console\.(WriteLine|Write)(\s*)?\(/, type: "not" },
  { pattern: /using\sSystem(\..*)?(;)?/, type: "not" },
  { pattern: /(public|private|protected|internal)\s/, type: "not" }
];
