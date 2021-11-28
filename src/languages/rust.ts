import type { LanguagePattern } from "../types";

export const Rust: LanguagePattern[] = [
  { pattern: /fn\smain()/, type: "keyword.function" },
  {
    pattern: /(pub\s)?fn\s[A-Za-z\d<>,]+\(.*\)\s->\s\w+(\s\{|)/,
    type: "keyword.visibility"
  },
  { pattern: /let\smut\s\w+(\s=|)/, type: "keyword.variable" },
  { pattern: /(.*)!\(.*\)/, type: "macro" },
  { pattern: /use\s\w+::.*/, type: "meta.import" },
  { pattern: /\{:\?\}/, type: "keyword.other" },
  { pattern: /loop \{/, type: "keyword.control" },
  // Rust keywords
  { pattern: /(impl|crate|extern|macro|box)/, type: "keyword.other" },
  { pattern: /match\s\w+\s\{/, type: "keyword.control" },
  { pattern: /\w+\.len\(\)/, type: "keyword.other" },
  // Data types
  { pattern: /(&str|(i|u)(8|16|32|64|128|size))/, type: "constant.type" },
  // Vector
  { pattern: /(Vec|Vec::new)|vec!/, type: "constant.type" },
  // Traits
  { pattern: /(Ok|Err|Box|ToOwned|Clone)/, type: "keyword.other" },
  // Panic!!
  { pattern: /panic!\(.*\)/, type: "keyword.function" },
  // Avoiding clash with C#
  { pattern: /using\sSystem/, type: "not" },
  { pattern: /Console\.WriteLine\s*\(/, type: "not" },
  { pattern: /(public\s)?((partial|static)\s)?class\s/, type: "not" },
  { pattern: /(function|func)\s/, type: "not" }
];
