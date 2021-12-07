import type { LanguagePattern } from "../types";

export const Dart: LanguagePattern[] = [
  // Variable declaration
  {
    pattern:
      /^\s*(const|final|var|dynamic|late)?\s*(int|double|String|bool|List<[A-Za-z [\](),]+>|HashMap<[A-Za-z [\](),]+>|Iterator<[A-Za-z [\](),]+>|Set<[A-Za-z [\](),]+>)?(\?)?\s\w+(\s=\s.+)?(;|,)$/,
    type: "keyword.variable"
  },
  { pattern: /\bstdout.write\(.+\);/, type: "keyword.print" },
  { pattern: /\bprint\(.+\);/, type: "keyword.print" },
  { pattern: /^\s*import\s("|')dart:\w+("|')/, type: "meta.import", nearTop: true },
  { pattern: /^\s*import\s("|')package:\w+("|')/, type: "meta.import", nearTop: true },
  { pattern: /^\s*library\s\w+;/, type: "meta.module", nearTop: true },
  { pattern: /^\s*(void\s)?main\(\)\s(async\s)?{/, type: "keyword.function" },
  // function with type definition
  {
    pattern:
      /^\s*(List<[A-Za-z [\](),]+>|HashMap<[A-Za-z [\](),]+>|int|double|String|bool|void|Iterator<[A-Za-z [\](),]+>|Set<[A-Za-z [\](),]+>)\s\w+\(.+\)\s*\{$/,
    type: "keyword.function"
  },
  // arrow function
  {
    pattern:
      /^\s*(int|double|String|bool|List<[A-Za-z [\](),]+>|HashMap<[A-Za-z [\](),]+>|Iterator<[A-Za-z [\](),]+>|Set<[A-Za-z [\](),]+>)\s\w+\(.+\)\s=>/,
    type: "keyword.function"
  },
  { pattern: /\bnew\s(List|Map|Iterator|HashMap|Set)<\w+>\(\);$/, type: "keyword.variable" },
  {
    pattern: /^(abstract\s)?class\s\w+\s(extends\s\w+\s)?(with\s\w+\s)?(implements\s\w+\s)?{(})?$/,
    type: "keyword.control"
  },
  { pattern: /\bget\s\w+=>\w+/, type: "keyword.control" },
  { pattern: /^\s*@override$/, type: "keyword.control" },
  { pattern: /\bset\s\w+\(.+\)/, type: "keyword.control" },
  { pattern: /^\s*Future<w+>\s\w+\(.+\)\sasync/, type: "keyword.control" },
  { pattern: /^\s*await\sfor/, type: "keyword.control" },
  { pattern: /^\s*typedef\s.+\s=/, type: "keyword.control" },
  // Avoiding confusion with C
  { pattern: /\blong\s/, type: "not" },
  { pattern: /\s*function\b/, type: "not" },
  // Avoiding confusion with Java
  { pattern: /\bArrayList/, type: "not" }
];
