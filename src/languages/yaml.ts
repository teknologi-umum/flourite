import type { LanguagePattern } from "../types";

export const YAML: LanguagePattern[] = [
  // Regular key: value
  { pattern: /^( )*([A-Za-z0-9_. ]+):( )?(.*)?$/, type: "keyword" },
  // Regular array - key: value
  { pattern: /^( )*-( )([A-Za-z0-9_. ]+):( )?(.*)?$/, type: "keyword" },
  // Regular array - value
  { pattern: /^( )*-( )(.*)$/, type: "keyword" },
  // Binary tag
  { pattern: /^( )*([A-Za-z0-9_. ]+):( )!!binary( )?(|)?$/, type: "constant.type" },
  // Literal multiline block
  { pattern: /^( )*([A-Za-z0-9_. ]+):( )\|$/, type: "keyword" },
  // Folded multiline style
  { pattern: /^( )*([A-Za-z0-9_. ]+):( )>$/, type: "keyword" },
  // Set types
  { pattern: /^( )*\?( )(.*)$/, type: "keyword" },
  // Complex key / multiline key
  { pattern: /^( )*\?( )\|$/, type: "constant.type" },
  // Merge key
  { pattern: /^( )*<<:( )(\*)(.*)?$/, type: "constant.type" },
  // Avoiding confusion with CSS
  { pattern: /^( )*([A-Za-z0-9_. ]+):(.*)?( )?{$/, type: "not" },
  { pattern: /^( )*([A-Za-z0-9_. ]+):(.*)?( )?,$/, type: "not" }
];
