# Contributing Guide

Hello! We'd love to see your contribution on this repository soon, even if it's just a typo fix!

Contributing means anything from reporting bugs, ideas, suggestion, code fix, even new feature.

Bear in mind to keep your contributions under the [Code of Conduct](./github/CODE_OF_CONDUCT.md) for the community.

## Brief explanation about the project

### A background story

This project was created because the need of a programming language guesser for [Graphene](https://github.com/teknologi-umum/graphene), our own build-from-scratch [Carbon](https://carbon.now.sh) clone without the need of headless browser that does accept a POST request for our [Telegram Bot](https://github.com/teknologi-umum/bot).

We only found [Guesslang](https://github.com/yoeo/guesslang) to be a solution for that. But it's on Python and we can't afford to do a network call (even internally) to Python because of the server's resource limitations.

Not so long after, we found [ts95/lang-detector](https://github.com/ts95/lang-detector) which guess a programming language by scanning each lines and testing it with regular expressions. But the problem is, it's written on Javascript with only CommonJS support, and it only supports a few languages.

Because what we need is somewhat bigger than to simply make a Pull Request to the repository, we think that it would be better for us to just rewrite it to Typescript and add more language support.

Then here we are. Around 75 commits later, this is our own version for the language detector.

### How it works

1. Scans the input string line by line. A line is always delimited by `\n`.
2. For each languages defined on the `src/languages` directory, it will run a regular expression line by line, which returns a point for that language.
3. It will returns an object consisting of the keys: `language` - the detected languages, `statistics` - points for each languages, and `linesOfCode` - lines of code scanned.

### A few considerations

- We know and fully aware of by using regular expressions, if we are trying to add more and more languages, the library would be slower. There is one solution to make regular expressions faster, that is by using [Oniguruma](https://github.com/kkos/oniguruma). But, the drawback is that we have to ditch browser support because the Node.js binding requires C++ bindings in which browsers are not supported.
- To compensate the point above, the regular expressions implementation for each language should be made as minimum and as effective as possible. There are no rules on the maximum regular expression for each language, but I would say, if you could do less and still get the job done, it would be great.
- About the browser support, I just think that it would be nice. Because we don't rely on any Node.js standard library, why don't we ship it to browsers? You can try it yourself [here](https://flourite.pages.dev/).

Until this point, you should be able to understand how the library works behind the scene. If you have any questions of if you're uncertain about some point, please open up an [issue](https://github.com/teknologi-umum/flourite/issues).

## Bug report, ideas, and suggestion

The [issues](https://github.com/teknologi-umum/flourite/issues) page is a great way to communicate to us. Other than that, we have a [Telegram group](https://t.me/teknologi_umum) that you can discuss your ideas into. If you're not an Indonesian speaker, it's 100% fine to talk in English there.

Please make sure that the issue you're creating is in as much detail as possible. Poor communication might lead to a big mistake, we're trying to avoid that.

## Pull request

**A big heads up before you're writing a breaking change code or a new feature: Please open up an [issue](https://github.com/teknologi-umum/flourite/issues) regarding what you're working on, or just talk in the [Telegram group](https://t.me/teknologi_umum).**

### Prerequisites

You will need a few things to get things working:

1. Node.js current version (as of now, we're using v16.6.x as defined in the `.nvmrc` file). You can install it through the [official Node.js download page](https://nodejs.org/en/download/), but we recommend using [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm). Here's a simple installation/setup guide, but you should really refer directly to the corresponding repository's README.

```sh
# If you want to install fnm
$ curl -fsSL https://fnm.vercel.app/install | bash

# Then simply use this command
$ fnm use

# OR if you want to install nvm
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

$ nvm use
```

### Getting Started

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own Github account and [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device.
2. Run `npm install` to install the dependencies needed.
3. Run `npm run test:tdd` if you want to start developing in a [TDD](https://en.wikipedia.org/wiki/Test-driven_development) manner.
4. Happy coding!

You are encouraged to use [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) for your commit message.

### Testing your change

All changes should be covered by tests. Please put a test case in the appropriate file on `tests` directory.

Test cases could be found wherever you like. Most of our test cases are from [Rosetta Code](https://rosettacode.org/wiki/Category:Programming_Languages). You could also browse Github repositories and add some code in which the repository are licensed under MIT as the test cases.

```
$ npm run test
```

### Directory structure

```
.
├── benchmark             - Benchmark needs
│
├── CONTRIBUTING.md       - You are here
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
├── rollup.config.js      - Build configuration
├── src                   - Source directory
│  ├── languages          - Regular expressions of supported languages
│  │
│  ├── index.ts
│  ├── points.ts
│  ├── shiki.ts
│  └── types.ts
│
├── tests                 - Unit testing directory
│
└── tsconfig.json
```

### Before creating a PR

Please run ESLint and Prettier with these commands so you're good on the CI process.

```sh
$ npm run lint
$ npm run format
```

And you're set!
