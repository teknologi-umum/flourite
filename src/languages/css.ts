import { LanguagePattern } from "../index";

export const CSS: LanguagePattern[] = [
  // Properties
  { pattern: /[a-z\-]+:(?!:).+;/, points: 2 },
  // <style> tag from HTML
  { pattern: /<(\/)?style>/, points: -50 },
]