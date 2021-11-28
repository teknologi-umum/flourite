import type { LanguagePattern } from "../types";

export const Elixir: LanguagePattern[] = [
  // Modules
  {
    pattern:
      /^\s*defmodule\s+(?:\S.*|[\t\v\f \xa0\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff])\s+do$/,
    type: "meta.module"
  },
  // Alias
  {
    pattern:
      /\s*alias\s+(?:\S.*|[\t\v\f \xa0\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff])as:.+/,
    type: "keyword.other"
  },
  // IO.puts()
  { pattern: /IO\.puts.+/, type: "keyword.print" },
  // Anonymous func
  {
    pattern:
      /fn\s+[\w:<>()]+\s+->\s+(?:\S.*|[\t\v\f \xa0\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff])(end)?$/,
    type: "keyword.function"
  },
  {
    pattern:
      /^\s*(def|defp)\s+(?:\S.*|[\t\v\f \xa0\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff])\s+do$/,
    type: "keyword.function"
  },
  {
    pattern:
      /^\s*(if|unless|cond|case|try|defimpl|defprotocol)\s+(?:\S.*|[\t\v\f \xa0\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff])\s+do$/,
    type: "keyword.control"
  },
  { pattern: /^\s*defstruct\s+/, type: "keyword" },
  // Spec
  {
    pattern:
      /^\s*@spec\s+(?:\S.*|[\t\v\f \xa0\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff])::.+/,
    type: "macro"
  },
  // Lists
  { pattern: /\{:.[^\n\r,\u2028\u2029]*,.+\}/, type: "constant.array" },
  // Maps
  { pattern: /%\{(.+(=>|:).+(,)?)+\}/, type: "constant.dictionary" }
];
