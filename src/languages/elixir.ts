import type { LanguagePattern } from "../types";

export const Elixir: LanguagePattern[] = [
  // Modules
  { pattern: /^\s*defmodule\s+.+\s+do$/, type: "meta.module" },
  // Alias
  { pattern: /\s*alias\s+.+as:.+/, type: "keyword.other" },
  // IO.puts()
  { pattern: /IO\.puts.+/, type: "keyword.print" },
  // Anonymous func
  { pattern: /fn\s+[A-Za-z0-9_:<>()]+\s+->\s+.+(end)?$/, type: "keyword.function" },
  { pattern: /^\s*(def|defp)\s+.+\s+do$/, type: "keyword.function" },
  { pattern: /^\s*(if|unless|cond|case|try|defimpl|defprotocol)\s+.+\s+do$/, type: "keyword.control" },
  { pattern: /^\s*defstruct\s+/, type: "keyword" },
  // Spec
  { pattern: /^\s*@spec\s+.+::.+/, type: "macro" },
  // Lists
  { pattern: /\{:.+,.+\}/, type: "constant.array" },
  // Maps
  { pattern: /%\{(.+(=>|:).+(,)?){1,}\}/, type: "constant.dictionary" }
];
