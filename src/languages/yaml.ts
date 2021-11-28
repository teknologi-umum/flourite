import type { LanguagePattern } from "../types";

export const YAML: LanguagePattern[] = [
  // Regular key: value
  { pattern: /^( )*([\w. ]+):( )?(.*)?$/, type: "keyword" },
  // Regular array - key: value
  { pattern: /^( )*-( )([\w. ]+):( )?(.*)?$/, type: "keyword" },
  // Regular array - value
  { pattern: /^( )*-( )(.*)$/, type: "keyword" },
  // Binary tag
  { pattern: /^( )*([\w. ]+):( )!!binary( )?(|)?$/, type: "constant.type" },
  // Literal multiline block
  { pattern: /^( )*([\w. ]+):( )\|$/, type: "keyword" },
  // Folded multiline style
  { pattern: /^( )*([\w. ]+):( )>$/, type: "keyword" },
  // Set types
  { pattern: /^( )*\?( )(.*)$/, type: "keyword" },
  // Complex key / multiline key
  { pattern: /^( )*\?( )\|$/, type: "constant.type" },
  // Merge key
  { pattern: /^( )*<<:( )(\*)(.*)?$/, type: "constant.type" },
  // Avoiding confusion with CSS
  { pattern: /^( )*([\w. ]+):(.*)?( )?\{$/, type: "not" },
  { pattern: /^( )*([\w. ]+):(.*)?( )?,$/, type: "not" }
];
