import type { LanguagePattern } from "../types";

export const CSS: LanguagePattern[] = [
  // Properties
  { pattern: /[a-z-]+:(?!:).+;/, type: "keyword" },
  // <style> tag from HTML
  { pattern: /<(\/)?style>/, type: "not" }
];
