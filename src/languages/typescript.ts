import type { LanguagePattern } from "../types";


export const Typescript: LanguagePattern[] = [{
  pattern: /(Readonly<|ReadonlyArray<|Array<|Record<|Pick<|Omit<|Exclude<|Extract<)/,
  type: "constant.dictionary"
},
{
  pattern: /\w+\[]/,
  type: "keyword.other"
},
{
  pattern: /:\s*\w+\s*</,
  type: "keyword.control"
},
{
  pattern: /\??:\s*(any|string|boolean|undefined|null|number|void|never|symbol|bigint)\s*/,
  type: "constant.type"
},
{
  pattern: /(let|const|var)*\s*\w*:\s*(any|string|boolean|undefined|null|number|void|never|symbol|bigint)\s*=/,
  type: "constant.type"
},
{ pattern: /console\.log\s*\(/, type: "keyword.print" },
{
  pattern: /interface\s*(\w+)\s*{/,
  type: "constant.type"
},
{
  pattern: /enum\s*\w+\s*=/,
  type: "constant.type"
},
{
  pattern: /type\s*(\w+)\s*=/,
  type: "constant.type"
},
{
  pattern: /function\s+\w+\(.*\):\s\w+\s*{/,
  type: "keyword.function"
},
{
  pattern: /\(.*\):\s\w+\s*=>\s*{/,
  type: "keyword.function"
},
{
  pattern: /(typeof|declare)\s+/,
  type: "keyword"
},
{
  pattern: /\s+as\s+/,
  type: "keyword"
},
// Rust types
{
  pattern: /usize/,
  type: "not"
},
//   Kotlin
{
  pattern: /Array<String>/,
  type: "not"
}
];