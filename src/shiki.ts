/**
 * Returns a language string that match with Shiki's language specification,
 * find it here: https://github.com/shikijs/shiki/blob/main/docs/languages.md
 * If the name is similar, we'll just convert it to lower case.
 * @param {String} language Language from the list
 * @returns {String} Shiki acceptable language
 */
export function convert(language: string): string {
  if (language === "C++") return "cpp";
  if (language === "C#") return "csharp";
  return language.toLowerCase();
}
