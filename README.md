# Flourite - Language detector

[![npm](https://img.shields.io/npm/v/flourite?style=for-the-badge)](https://www.npmjs.com/package/flourite) [![npm bundle size](https://img.shields.io/bundlephobia/min/flourite?style=for-the-badge)](https://www.npmjs.com/package/flourite) [![GitHub Workflow Status](https://img.shields.io/github/workflow/status/teknologi-umum/flourite/CI?style=for-the-badge)](https://github.com/teknologi-umum/flourite/actions/workflows/ci.yml) [![Codecov](https://img.shields.io/codecov/c/gh/teknologi-umum/flourite?style=for-the-badge)](https://app.codecov.io/gh/teknologi-umum/flourite) [![LGTM Alerts](https://img.shields.io/lgtm/alerts/github/teknologi-umum/flourite?style=for-the-badge)](https://lgtm.com/projects/g/teknologi-umum/flourite/)

A fork of [ts95/lang-detector](https://github.com/ts95/lang-detector), rewritten in Typescript with more language support.

Detects a programming language from a given string.

- Built-in support for CommonJS and ESM format
- Built-in Typescript typings
- No external dependencies
- 200 test cases and growing!

## Detectable languages

| Languages |            |            |        |      |
| --------- | ---------- | ---------- | ------ | ---- |
| C         | Dockerfile | Javascript | Pascal | SQL  |
| C++       | Elixir     | Julia      | PHP    | YAML |
| C#        | Go         | Kotlin     | Python |      |
| Clojure   | HTML       | Lua        | Ruby   |      |
| CSS       | Java       | Markdown   | Rust   |      |

## Install

```bash
$ npm install flourite
```

or via a CDN (unpkg or jsdelivr)

```html
<script src="https://unpkg.com/flourite@1.2.1"></script>
<script src="https://cdn.jsdelivr.net/npm/flourite@1.2.1/dist/index.iife.js"></script>
```

## Usage

```js
import flourite from 'flourite';

const code = flourite('cout << "Hello world" << endl;');

// {
//   language: 'C++',
//   statistics: {
//     C: 0,
//     Clojure: 0,
//     'C++': 5,
//     CSS: 0,
//     'C#': 0,
//     Dockerfile: 0,
//     Elixir: 0,
//     Go: 0,
//     HTML: 0,
//     Java: 0,
//     Javascript: 0,
//     Julia: 2,
//     Kotlin: 0,
//     Lua: 2,
//     Markdown: 0,
//     Pascal: 0,
//     PHP: 0,
//     Python: 0,
//     Ruby: 0,
//     Rust: 0,
//     SQL: 0,
//     Unknown: 1,
//     YAML: 0,
//   },
//   linesOfCode: 1
// }
```

Or if you want to integrate it with [Shiki](https://github.com/shikijs/shiki), you could pass:

```js
flourite('Console.WriteLine("Hello world!");', { shiki: true }).language;
// => csharp
flourite('fn partition<T,F>(v: &mut [T], f: &F) -> usize ', { shiki: true }).language;
// => rust
```

If you want to handle `Unknown` value, you could pass:

```js
const code = flourite("SELECT 'Hello world!' text FROM dual;", { noUnknown: true });
```

### With Typescript

```typescript
import flourite from 'flourite';
import type { Options } from 'flourite';

const flouriteOptions: Options = {
  heuristic: true,
};

const code = flourite('print!({:?}, &v);', flouriteOptions);
```

### Available Options

| Key       | Type      | Default | Description                                                                                      |
| --------- | --------- | ------- | ------------------------------------------------------------------------------------------------ |
| heuristic | `boolean` | `true`  | Checks for codes on the top of the given input. Only checks when the lines of code is above 500. |
| shiki     | `boolean` | `false` | Straightforward compatibility with Shiki's language specification type                           |
| noUnknown | `boolean` | `false` | If `true`, will not output `Unknown` on detected and statistics result                           |

## I'm here for Hacktoberfest, what can I do?

If you're new to open source, we really recommend reading a few articles about contributing to open source projects:

- [Open Source Guide's How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Hacktoberfest Contributor's Guide: How To Find and Contribute to Open-Source Projects](https://www.digitalocean.com/community/tutorials/hacktoberfest-contributor-s-guide-how-to-find-and-contribute-to-open-source-projects)
- [Tips for high-quality Pull Request](https://twitter.com/sudo_navendu/status/1437456596473303042)

Then you can start by reading our [contribution](https://github.com/teknologi-umum/flourite#i-want-to-contribute-what-can-i-do) part and guidelines.

Two things that you can do for sure: Create a new language support and improve the regular expression performance on current supported languages.

Have fun!

## Contributing

- Use the Node.js version as defined on the `.nvmrc` file.
- Run `npm run test:tdd` to initiate a test driven development environment.
- Run `npm run lint` and `npm run format` before commit a change.

For more details and explanation on how things work, see [CONTRIBUTING](./CONTRIBUTING.md)

## License

[MIT](./LICENSE)
