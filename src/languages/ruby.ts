import type { LanguagePattern } from "../types";

export const Ruby: LanguagePattern[] = [
  // require/include
  {
    pattern: /(require|include)\s+'\w+(\.rb)?'/,
    type: "meta.import",
    nearTop: true
  },
  // Function definition
  { pattern: /def\s+\w+\s*(?:(\(.+\))\s*)?\n/, type: "keyword.function" },
  // Instance variables
  { pattern: /@\w+/, type: "keyword.other" },
  // Boolean property
  { pattern: /\.\w+\?/, type: "constant.boolean" },
  // puts (Ruby print)
  { pattern: /puts\s+("|').+("|')/, type: "keyword.print" },
  // Inheriting class
  { pattern: /class [A-Z]\w*\s*<\s*([A-Z]\w*(::)?)+/, type: "keyword" },
  // attr_accessor
  { pattern: /attr_accessor\s+(:\w+(,\s*)?)+/, type: "keyword.function" },
  // new
  { pattern: /\w+\.new\s+/, type: "keyword" },
  // elsif keyword
  { pattern: /elsif/, type: "keyword.control" },
  // module
  { pattern: /\bmodule\s\S/, type: "keyword.other" },
  // BEGIN and END
  { pattern: /\bBEGIN\s\{.*\}/, type: "keyword.other" },
  { pattern: /\bEND\s\{.*\}/, type: "keyword.other" },
  // do
  { pattern: /do\s*\|\w+(,\s*\w+)*\|/, type: "keyword.control" },
  // for loop
  { pattern: /for (\w+|\(?\w+,\s*\w+\)?) in (.+)/, type: "keyword.control" },
  // nil keyword
  { pattern: /nil/, type: "constant.null" },
  // Scope operator
  { pattern: /[A-Z]\w*::[A-Z]\w*/, type: "macro" }
];
