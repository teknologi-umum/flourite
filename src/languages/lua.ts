import type { LanguagePattern } from '../types';

export const Lua: LanguagePattern[] = [
  // multiline string
  { pattern: /(\[\[.*\]\])/, points: 2 },
  // local definition
  { pattern: /local\s+([a-zA-Z_]+)\s*=\s*(.+)/, points: 20 },
  // function definition
  { pattern: /function\s*([a-zA-Z0-9_]*)?\(\)/, points: 2 },
  // for loop
  { pattern: /for\s+([a-zA-Z]+)\s*=\s*([a-zA-Z0-9_]+),\s*([a-zA-Z0-9_]+)\s+do/, points: 20 },
  // keywords
  {
    pattern:
      /\s+(and|break|do|else|elseif|end|false|function|if|in|local|nil|not|or|repeat|return|then|true|until|while|pairs|ipairs|in|yield)/,
    points: 2,
  },
  // length operator
  { pattern: /#([a-zA-Z_{}]+)/, points: 2 },
  // metatables
  { pattern: /((get|set)metatable|raw(get|set|equal))\(.*\)/, points: 2 },
  // metamethods
  { pattern: /__(index|newindex|call|sub|mul|div|mod|pow|unm|eq|le|lt)/, points: 2 },
  // method invocation
  { pattern: /(\(.+\)|([a-zA-Z_]+)):([a-zA-Z_])\(.*\)/, points: 2 },
  // array-like table
  { pattern: /{\s*(\S+)((,|;)\s*\S+)*\s*}/, points: 5 },
  // map-like table
  { pattern: /{\s*(\S+\s*=\s*\S+)((,|;)\s*\S+\s*=\s*\S+)*\s*}/, points: 5 },
  // builtin math methods
  { pattern: /math\.(.*)\([0-9]*\)/, points: 2 },
  // builtin table methods
  { pattern: /table\.(.*)\(.*\)/, points: 2 },
  // builtin io methods
  { pattern: /io\.(.*)\(.*\)/, points: 2 },
  // builtin functions
  { pattern: /(require|dofile|pcall|xpcall|unpack|pack|coroutine)/, points: 2 },
  // comments
  { pattern: /--(\[\[)?.*/, points: 2 },
  // rest arguments
  { pattern: /\.\.\./, points: 2 },

  // invalid comments
  { pattern: /(\/\/|\/\*)/, points: -20 },
  // avoid confusion with C
  { pattern: /(#(include|define)|printf|\s+int\s+)/, points: -40 },
  // avoid confusion with javascript
  { pattern: /\s+(let|const|var)\s+/, points: -20 },
  // avoid confusion with PHP & Python
  { pattern: /\s+(echo|die|\$(.*))\s+/, points: -20 },
  // avoid confusion with Python
  { pattern: /(def|len|from|import)/, points: -10 },
  // avoid confusion with SQL
  { pattern: /(SELECT|FROM|INSERT|ALTER)/, points: -10 },
  // // avoid confusion with Ruby
  { pattern: /(puts)/, points: -10 },
  // avoid confusion Julia
  { pattern: /(([a-zA-Z0-9]+):([a-zA-Z0-9]+)|using|(.*)!\(.*\)|(\|\|))/, points: -40 },
];
