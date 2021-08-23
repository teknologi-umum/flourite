import type { LanguagePattern } from '../types';

export const Lua: LanguagePattern[] = [
  // multiline string
  { pattern: /(\[\[.*\]\])/, type: 'constant.string' },
  // local definition
  { pattern: /local\s([a-zA-Z0-9_]+)(\s*=)?/, type: 'keyword.variable' },
  // function definition
  { pattern: /(local\s)?function\s*([a-zA-Z0-9_]*)?\(\)/, type: 'keyword.function' },
  // for loop
  { pattern: /for\s+([a-zA-Z]+)\s*=\s*([a-zA-Z0-9_]+),\s*([a-zA-Z0-9_]+)\s+do/, type: 'keyword.control' },
  // while loop
  { pattern: /while\s(.*)\sdo/, type: 'keyword.control' },
  // keywords
  {
    pattern:
      /\s+(and|break|do|else|elseif|end|false|function|if|in|not|or|local|repeat|return|then|true|until|pairs|ipairs|in|yield)/,
    type: 'keyword.other',
  },
  { pattern: /nil/, type: 'constant.null'},
  // length operator
  { pattern: /#([a-zA-Z_{}]+)/, type: 'keyword.operator' },
  // metatables
  { pattern: /((get|set)metatable|raw(get|set|equal))\(.*\)/, type: 'keyword.other' },
  // metamethods
  { pattern: /__(index|newindex|call|sub|mul|div|mod|pow|unm|eq|le|lt)/, type: 'keyword.other' },
  // method invocation
  { pattern: /(\(.+\)|([a-zA-Z_]+)):([a-zA-Z_])\(.*\)/, type: 'keyword.other' },
  // array-like table
  { pattern: /{\s*(\S+)((,|;)\s*\S+)*\s*}/, type: 'constant.array' },
  // map-like table
  { pattern: /{\s*(\S+\s*=\s*\S+)((,|;)\s*\S+\s*=\s*\S+)*\s*}/, type: 'constant.dictionary' },
  // builtin math methods
  { pattern: /math\.(.*)\([0-9]*\)/, type: 'macro' },
  // builtin table methods
  { pattern: /table\.(.*)\(.*\)/, type: 'macro' },
  // builtin io methods
  { pattern: /io\.(.*)\(.*\)/, type: 'macro' },
  // builtin functions
  { pattern: /(require|dofile)\((.*)\)/, type: 'meta.import' },
  { pattern: /(pcall|xpcall|unpack|pack|coroutine)/, type: 'keyword.other' },
  // comments
  { pattern: /--(\[\[)?.*/, type: 'comment.line' },
  // rest arguments
  { pattern: /\.\.\./, type: 'keyword.other' },

  // invalid comments
  { pattern: /(\/\/|\/\*)/, type: 'not' },
  // avoid confusion with C
  { pattern: /(#(include|define)|printf|\s+int\s+)/, type: 'not' },
  // avoid confusion with javascript
  { pattern: /\s+(let|const|var)\s+/, type: 'not' },
  // avoid confusion with PHP & Python
  { pattern: /\s+(echo|die|\$(.*))\s+/, type: 'not' },
  // avoid confusion with Python
  { pattern: /(def|len|from|import)/, type: 'not' },
  // avoid confusion with SQL
  { pattern: /(SELECT|FROM|INSERT|ALTER)/, type: 'not' },
  // avoid confusion with Ruby
  { pattern: /(puts)/, type: 'not' },
  // avoid confusion Julia
  { pattern: /(([a-zA-Z0-9]+)::([a-zA-Z0-9]+)|using|(.*)!\(.*\)|(\|\|))/, type: 'not' },
];
