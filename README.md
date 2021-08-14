# Flourite - Language detector

A fork from [ts95/lang-detector](https://github.com/ts95/lang-detector), rewritten in Typescript with more language support.

Detects a programming language from a given string.

- Built-in support for CommonJS and ESM format
- Built-in Typescript typings
- No external dependencies

## Detectable languages

| Languages |            |        |
| --------- | ---------- | ------ |
| C         | Javascript | Python |
| C++       | Java       | Ruby   |
| HTML      | CSS        | PHP    |

## Install

```bash
$ npm install flourite
```

## Usage

```js
import detectLang from 'flourite';

const code = detectLang('console.log("Hello World");'); // => Javascript
```

## Development

- Use the Node.js version as defined on the `.nvmrc` file.
- Run `npm run test:tdd` to initiate a test driven development environment.
- Run `npm run lint` and `npm run format` before commit a change.

## License

[MIT](./LICENSE)
