import type { LanguagePattern } from "../types";

export const Clojure: LanguagePattern[] = [
  { pattern: /^(\s+)?\(ns(\s+)(.*)(\))?$/, type: "meta.module" },
  { pattern: /^(\s+)?\(print(ln)?(\s+)(.*)(\))$/, type: "keyword.print" },
  { pattern: /^(\s+)?\((de)?fn(-)?(\s+)(.*)(\))?$/, type: "keyword.function" },
  { pattern: /^(\s+)?\((let|def)(\s+)(.*)(\))?$/, type: "keyword.variable" },
  // Collection & sequences
  { pattern: /^(\s+)?\((class|coll\?|seq\?|range|cons|conj|concat|map|filter|reduce)(\s+)(.*)(\))?$/, type: "keyword" },
  // Threading macro
  { pattern: /^(\s+)?\((as)?->(>)?/, type: "macro" },
  // Modules
  { pattern: /^(\s+)?\((use|require|import|:import)(\s+)(.*)(\))?$/, type: "meta.module" },
  // Control keywords
  { pattern: /^(\s+)?\((do|if|loop|cond|when|or|and|condp|case)/, type: "keyword.control" }
];
