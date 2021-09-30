# Contributing Guide

Hello! We'd love to see your contribution on this repository soon, even if it's just a typo fix!

Contributing means anything from reporting bugs, ideas, suggestion, code fix, even new feature.

Bear in mind to keep your contributions under the [Code of Conduct](./github/CODE_OF_CONDUCT.md) for the community.

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

```
npm run test
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
