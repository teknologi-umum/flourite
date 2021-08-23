# Flourite - Language detector

A fork from [ts95/lang-detector](https://github.com/ts95/lang-detector), rewritten in Typescript with more language support.

Detects a programming language from a given string.

- Built-in support for CommonJS and ESM format
- Built-in Typescript typings
- No external dependencies
- 100 test cases and growing!

## Detectable languages

| Languages |            |        |
| --------- | ---------- | ------ |
| C         | Javascript | Python |
| C++       | Java       | Ruby   |
| HTML      | CSS        | PHP    |
| SQL       | Julia      | Rust   |

## Install

```bash
$ npm install flourite
```

or via a CDN (unpkg or jsdelivr)

```html
<script src="https://unpkg.com/flourite@1.0.2"></script>
<script src="https://cdn.jsdelivr.net/npm/flourite@1.0.2/dist/index.iife.js"></script>
```

## Usage

```js
import flourite from 'flourite';

const code = flourite('console.log("Hello World");'); // => Javascript
```

You could supply options to make see numbers of points for a certain language:

```js
import flourite from 'flourite';

const code = flourite('printf("Hello World")', { statistics: true });
// {
//   detected: 'C',
//   statistics: [
//     [ 'C', 1 ],
//     [ 'Unknown', 1 ],
//     [ 'C++', 0 ],
//     [ 'CSS', 0 ],
//     [ 'Go', 0 ],
//     [ 'HTML', 0 ],
//     [ 'Java', 0 ],
//     [ 'Javascript', 0 ],
//     [ 'Julia', 0 ],
//     [ 'PHP', 0 ],
//     [ 'Python', 0 ],
//     [ 'Ruby', 0 ],
//     [ 'Rust', 0 ],
//     [ 'SQL', 0 ]
//   ]
// }
```

## Development

- Use the Node.js version as defined on the `.nvmrc` file.
- Run `npm run test:tdd` to initiate a test driven development environment.
- Run `npm run lint` and `npm run format` before commit a change.

## License

[MIT](./LICENSE)
