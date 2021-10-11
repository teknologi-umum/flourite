import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';

test('heading 1', () => {
  const code = detectLang('# Heading level 1');
  assert.equal(code.language, 'Markdown');
});

test('heading 2', () => {
  const code = detectLang('## Heading level 2');
  assert.equal(code.language, 'Markdown');
});

test('heading 3', () => {
  const code = detectLang('### Heading level 3');
  assert.equal(code.language, 'Markdown');
});

test('heading 4', () => {
  const code = detectLang('#### Heading level 4');
  assert.equal(code.language, 'Markdown');
});

test('heading 5', () => {
  const code = detectLang('##### Heading level 5');
  assert.equal(code.language, 'Markdown');
});

test('heading 6', () => {
  const code = detectLang('###### Heading level 6');
  assert.equal(code.language, 'Markdown');
});

test('heading 1 alternate syntax', () => {
  const code = detectLang('Heading level 1\n============');
  assert.equal(code.language, 'Markdown');
});

test('heading 2 alternate syntax', () => {
  const code = detectLang('Heading level 1\n------------');
  assert.equal(code.language, 'Markdown');
});

test('bold syntax 1', () => {
  const code = detectLang('**This text will be bold**');
  assert.equal(code.language, 'Markdown');
});

test('bold syntax 2', () => {
  const code = detectLang('__This will also be bold__');
  assert.equal(code.language, 'Markdown');
});

test('italic syntax 1', () => {
  const code = detectLang('*This text will be italic*');
  assert.equal(code.language, 'Markdown');
});

test('italic syntax 2', () => {
  const code = detectLang('_This will also be italic_');
  assert.equal(code.language, 'Markdown');
});

test('list syntax 1', () => {
  const code = detectLang(`* Item 1`);
  assert.equal(code.language, 'Markdown');
});

// FIXME: Conflicts with YAML
test.skip('list syntax 2', () => {
  const code = detectLang(`- Item 1`);
  assert.equal(code.language, 'Markdown');
});

test('images', () => {
  const code = detectLang(`![GitHub Logo](/images/logo.png)`);
  assert.equal(code.language, 'Markdown');
});

test('links', () => {
  const code = detectLang(`[GitHub](http://github.com)`);
  assert.equal(code.language, 'Markdown');
});

test('links 2', () => {
  const code = detectLang(`[GitHub][http://github.com]`);
  assert.equal(code.language, 'Markdown');
});

test('links 3', () => {
  const code = detectLang(`[1]: https://en.wikipedia.org/wiki/Hobbit#Lifestyle`);
  assert.equal(code.language, 'Markdown');
});

test('links 4', () => {
  const code = detectLang(`[1]: <https://en.wikipedia.org/wiki/Hobbit#Lifestyle> "Hobbit lifestyles"`);
  assert.equal(code.language, 'Markdown');
});

test('blockquotes', () => {
  const code = detectLang(`> We're living the future so
  > the present is our past.`);
  assert.equal(code.language, 'Markdown');
});

test('inline code', () => {
  const code = detectLang('I think you should use an`<addr>` element here instead.');
  assert.equal(code.language, 'Markdown');
});

test.skip('example 1', () => {
  const code = detectLang(`# Changelog

  All notable changes to this project will be documented in this file.
  
  The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
  and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
  
  
  ## [12.2.0] - 2021-08-02
  ### Added
  - Ordered lists: add order value to token info.
  
  ### Fixed
  - Always suffix indented code block with a newline, #799.
  
  
  ## [12.1.0] - 2021-07-01
  ### Changed
  - Updated CM spec compatibility to 0.30.
  
  
  ## [12.0.6] - 2021-04-16
  ### Fixed
  - Newline in \`alt\` should be rendered, #775.
  
  
  ## [12.0.5] - 2021-04-15
  ### Fixed
  - HTML block tags with \`===\` inside are no longer incorrectly interpreted as headers, #772.
  - Fix table/list parsing ambiguity, #767.
  
  
  ## [12.0.4] - 2020-12-20
  ### Fixed
  - Fix crash introduced in \`12.0.3\` when processing strikethrough (\`~~\`) and similar plugins, #742.
  - Avoid fenced token mutation, #745.
  
  
  ## [12.0.3] - 2020-12-07
  ### Fixed
  - \`[](<foo<bar>)\` is no longer a valid link.
  - \`[](url (xxx())\` is no longer a valid link.
  - \`[](url xxx)\` is no longer a valid link.
  - Fix performance issues when parsing links (#732, #734), backticks, (#733, #736),
    emphases (#735), and autolinks (#737).
  - Allow newline in \`<? ... ?>\` in an inline context.
  - Allow \`<meta>\` html tag to appear in an inline context.
  
  
  ## [12.0.2] - 2020-10-23
  ### Fixed
  - Three pipes (\`|\n|\n|\`) are no longer rendered as a table with no columns, #724.
  
  
  ## [12.0.1] - 2020-10-19
  ### Fixed
  - Fix tables inside lists indented with tabs, #721.
  
  
  ## [12.0.0] - 2020-10-14
  ### Added
  - \`.gitattributes\`, force unix eol under windows, for development.
  
  ### Changed
  - Added 3rd argument to \`highlight(code, lang, attrs)\`, #626.
  - Rewrite tables according to latest GFM spec, #697.
  - Use \`rollup.js\` to browserify sources.
  - Drop \`bower.json\` (bower reached EOL).
  - Deps bump.
  - Tune \`specsplit.js\` options.
  - Drop \`Makefile\` in favour of npm scrips.
  
  ### Fixed
  - Fix mappings for table rows (amended fix made in 11.0.1), #705.
  - \`%25\` is no longer decoded in beautified urls, #720.
  
  
  ## [11.0.1] - 2020-09-14
  ### Fixed
  - Fix blockquote lazy newlines, #696.
  - Fix missed mappings for table rows, #705.
  
  
  ## [11.0.0] - 2020-05-20
  ### Changed
  - Bumped \`linkify-it\` to 3.0.0, #661 + allow unlimited \`.\` inside links.
  - Dev deps bump.
  - Switch to \`nyc\` for coverage reports.
  - Partially moved tasks from Makefile to npm scripts.
  - Automate web update on npm publish.
  
  ### Fixed
  - Fix em- and en-dashes not being typographed when separated by 1 char, #624.
  - Allow opening quote after another punctuation char in typographer, #641.
  - Assorted wording & typo fixes.
  
  
  ## [10.0.0] - 2019-09-11
  ### Security
  - Fix quadratic parse time for some combinations of pairs, #583. Algorithm is
    now similar to one in reference implementation.
  
  ### Changed
  - Minor internal structs change, to make pairs parse more effective (cost is
    linear now). If you use external "pairs" extensions, you need sync those with
    "official ones". Without update, old code will work, but can cause invalid
    result in rare case. This is the only reason of major version bump. With high probability you don't need to change your code, only update version dependency.
  - Updated changelog format.
  - Deps bump.
  
  
  ## [9.1.0] - 2019-08-11
  ### Changed
  - Remove extra characters from line break check. Leave only 0x0A & 0x0D, as in
    CommonMark spec, #581.
  
  
  ## [9.0.1] - 2019-07-12
  ### Fixed
  - Fix possible corruption of open/close tag levels, #466
  
  
  ## [9.0.0] - 2019-07-09
  ### Changed
  - Updated CM spec compatibility to 0.29.
  - Update Travis-CI node version to actual (8 & latest).
  - Deps bump.
  
  
  ## [8.4.2] - 2018-02-15
  ### Fixed
  - Fix \`--no-html\` CLI option, #476.
  
  
  ## [8.4.1] - 2018-02-15
  ### Fixed
  - Fix smartquotes around softbreaks, #430.
  
  
  ## [8.4.0] - 2017-08-24
  ### Changed
  - Updated CM spec compatibility to 0.28.
  
  
  ## [8.3.2] - 2017-08-03
  ### Fixed
  - Fix blockquote termination inside lists, #386.
  
  
  ## [8.3.1] - 2017-03-06
  ### Fixed
  - Fix blockquote termination by list item, #338.
  
  
  ## [8.3.0] - 2017-02-16
  ### Changed
  - Remove tabs at the beginning of the line in paragraphs.
  - Better error message for bad input type, #324.
  
  ### Fixed
  - Fix table indentation issues, #325, #224.
  - Fix blockquote termination inside indented lists, #329.
  
  
  ## [8.2.2] - 2016-12-15
  ### Added
  - Add \`-o\` / \`--output\` option to CLI, #312.
  
  
  ## [8.2.1] - 2016-12-02
  ### Fixed
  - Add missed h2..h6 to whitelisted block tags.
  
  
  ## [8.2.0] - 2016-12-01
  ### Changed
  - Updated CM spec compatibility to 0.27 (no significant changes).
  
  ### Fixed
  - Fix backticks handle inside tables, #303.
  - Fix edge case for fenced blocks with \`~~~\` in info, #301.
  - Fix fallback to reference if link is not valid, #302.
  
  
  ## [8.1.0] - 2016-11-03
  ### Changed
  - Make link parse helpers (\`md.helpers\`) pluggable, #299.
  
  
  ## [8.0.1] - 2016-10-18
  ### Fixed
  - Tables: allow tab characters in markup
  
  
  ## [8.0.0] - 2016-09-16
  ### Changed
  - Benchmarks src cleanup.
  - Remove testing in old nodes (but still use es5).
  - Updated CM spec compatibility to 0.26 (see list below):
  - Two consecutive newlines no longer terminate a list.
  - Ordered list terminating a paragraph can now only start with 1.
  - Adjust emphasis algorithm (\`*foo**bar**baz*\` is now parsed as \`<strong>\`
    inside \`<em>\`).
  - Fix tab width calculation inside lists and blockquotes.
  
  
  ## [7.0.1] - 2016-08-16
  ### Fixed
  - Fence renderer: fix concat of class array, #276.
  - Code renderer: do not render double space before attrs, #275.
  - Replacer: disable replacements inside autolinks, #272.
  
  
  ## [7.0.0] - 2016-06-22
  ### Changed
  - Bump \`linkify-it\` dependency to 2.0.0.  \`---\` no longer terminates
    autodetected links by default. \`md.linkifier.set('---', true)\` will return old
    behaviour.
  - Major version bumped, because internals or \`linkify-it\` was changed.
    You will not be affected anyhow, if not used direct access to
    \`require('linkify-it/re')\` for customizations.
  
  
  ## [6.1.1] - 2016-06-21
  ### Changed
  - Render \`code_inline\` & \`code_block\` attributes if exist.
  
  
  ## [6.1.0] - 2016-06-19
  ### Changed
  - Updated \`fence\` renderer to not mutate token. Token stream should be
    immutable after renderer call.
  
  
  ## [6.0.5] - 2016-06-01
  ### Fixed
  - Process \`\r\` the same way as \`\n\` and \`\r\n\\\`, #252.
  
  
  ## [6.0.4] - 2016-05-30
  ### Added
  - Added \`Token.attrGet()\` method for convenience, #251.
  
  
  ## [6.0.3] - 2016-05-30
  ### Security
  - Security fix: possible ReDOS in \`linkify-it\` (forced bump of \`linkify-it\` &
    \`uc-micro\` dependencies). New installs will use fixed packages automatically,
    but we bumped \`markdown-it\` version for sure & for web builds.
  
  
  ## [6.0.2] - 2016-05-16
  ### Fixed
  - Fix: should not escape twice content of image alt attribute, #246.
  
  
  ## [6.0.1] - 2016-04-02
  ### Fixed
  - Improve support of missing values in tables, #224.
  
  
  ## [6.0.0] - 2016-02-11
  ### Changed
  - Maintenance release. Version bump caused by notable changes in CM spec
    (multiline setext headers, no spaces inside links, ...). API was not changed.
  - Fit CM 0.24 spec requirements.
  
  ### Fixed
  - Fixed nesting limit check in inline blocks, #197.
  - Fixed posible tail loss in CLI ouput.
  
  
  ## [5.1.0] - 2016-01-07
  ### Added
  - Token: added \`.attrSet()\` & \`.attrJoin()\` methods.
  - Highlighter: allow wrapper override (if result starts with "<pre").
  
  
  ## [5.0.3] - 2016-01-04
  ### Fixed
  - Allow single column and mismatched columns count in tables.
  - Smartquotes: take into account adjacent tokens.
  - Fill \`content\` property in image token with \`alt\` source.
  
  
  ## [5.0.2] - 2015-11-20
  ### Fixed
  - Fix meta information (\`token.markup\` and \`token.info\`) for autolink tokens.
  
  
  ## [5.0.1] - 2015-10-30
  ### Fixed
  - Improved tables compatibility with github, #120.
  
  
  ## [5.0.0] - 2015-10-05
  ### Changed
  - Internal API change. Due to new CM spec requirements, we had to update
    internals. That should not touch ordinary users, but can affect some external
    plugins. If you are plugin developper - see migration guide:
    https://github.com/markdown-it/markdown-it/blob/master/docs/5.0_migration.md.
  - Updated CM spec compatibility to 0.22 (see list below).
  - Keep tabs (don't replace with spaces).
  - Don't wrap iframes with paragraphs.
  - Rewritten emphasis algorithm.
  
  ### Fixed
  - Fix closure compiler collisions (don't use reserved words), #159.
  
  
  ## [4.4.0] - 2015-07-18
  ### Changed
  - Updated HTML blocks logic to CM 0.21 spec.
  - Minor fixes.
  
  
  ## [4.3.1] - 2015-07-15
  ### Security
  - Fix class name injection in fence renderer.
  
  ### Fixed
  - Allow numbered lists starting from zero.
  
  
  ## [4.3.0] - 2015-06-29
  ### Changed
  - \`linkify-it\` dependency update (1.2.0). Now accepts dash at the end of links.
  
  
  ## [4.2.2] - 2015-06-10
  ### Changed
  - CM spec 0.20.
  
  ### Added
  - Added support for multichar substituition in smartquites, #115.
  
  ### Fixed
  - Fixed code block render inside blockquites, #116.
  - Doc fixes.
  
  
  ## [4.2.1] - 2015-05-01
  ### Changed
  - Minor emphasis update to match CM spec 0.19.
  
  
  ## [4.2.0] - 2015-04-21
  ### Changed
  - Bumped [linkify-it](https://github.com/markdown-it/linkify-it) version to
    1.1.0. Now links with IP hosts and without protocols are not linkified by
    default, due possible collisions with some version numbers patterns (0.5.0.0).
    You still can return back old behaviour by \`md.linkify.set({ fuzzyIP: true })\`.
  
  
  ## [4.1.2] - 2015-04-19
  ### Changed
  - Bumped linkifier version. More strict 2-chars tald support for links without
    schema. Should not linkify things like \`io.js\` and \`node.js\`.
  
  
  ## [4.1.1] - 2015-04-15
  ### Fixed
  - Improved pipe chars support in table cells, #86 (thanks to @jbt).
  
  
  ## [4.1.0] - 2015-03-31
  ### Security
  - Disabled \`data:\` URLs by default (except some image mimes), to avoid
    possible XSS. Version bumped, because features changed (formally). If you did
    not used \`data:\` URLs, consider this version as 4.0.4 (no API changes).
  
  ### Changed
  - Simplified link validator code. Now more easy to understand and to copy
    into your projects for customization.
  
  
  ## [4.0.3] - 2015-03-25
  ### Changed
  - Updated linkifier.
  - Smartquotes rule cleanup (#76).
  
  ### Fixed
  - Fixed replacements rule bug in PhantomJS (#77).
  
  
  ## [4.0.2] - 2015-03-22
  ### Fixed
  - Fixed emphasis \`marker\` fields in tokens (#69).
  - Fixed html block tokens with numbers in name (#74).
  
  
  ## [4.0.1] - 2015-03-13
  ### Added
  - Added custom container plugin demo.
  
  ### Changed
  - Updated \`linkify-it\` version.
  
  
  ## [4.0.0] - 2015-03-11
  ### Changed
  - Breaking internal API changes. See [v4 migration notes](https://github.com/markdown-it/markdown-it/blob/master/docs/4.0_migration.md). In usual case you will need to update plugins.
  - Token internals changed
  - Unified the most of renderer methods.
  - Changed tokens creation - use \`state.push(...)\` (see sources)
  - Moved \`normalizeUrl()\` to root class as \`.normalizeLink()\` &
    added \`normalizeLinkText()\` method.
  - Moved \`.validateUrl()\` to root class and simplified logic - no more need to
    replace entities.
  - Joined md unescape & replace entities logic to \`utils.unescapeAll()\`.
  - Removed \`replaceEntities()\` in \`utils\`.
  - \`md.utils.lib\` now exposes useful libs for plugins.
  - Use entities data from external package.
  
  ### Fixed
  - Fixed emphasis regression, caused by CM v0.18 spec (#65).
  
  
  ## [3.1.0] - 2015-03-05
  ### Changed
  - Spec conformance update to 0.18.
  - Significantly improved autolinking quality (use \`linkify-it\` package), #2.
  
  ### Fixed
  - Rewritten links normalizer to solve different edge cases (use \`mdurl\`
    package), #29.
  - Moved link title entities replace out of renderer.
  - Fixed escaped entities in links (\`foo&amp;/bar\`).
  - Improved smartquotes logic, #61.
  
  
  ## [3.0.7] - 2015-02-22
  ### Added
  - Added basic CLI support.
  
  ### Changed
  - Use external package for unicode data (punctuation).
  
  ### Fixed
  - Added \v \f to valid whitespaces.
  - Match table columns count by header.
  
  
  ## [3.0.6] - 2015-02-12
  ### Added
  - Sync scroll result => source in demo.
  
  ### Changed
  - Moved \`normalizeReference()\` to utils.
  
  ### Fixed
  - Fixed hang on long vertical list of links. Appeared in 3.0.5. See #54 for
    details. Thanks to @fengmk2 for report!
  - Table lines now can have escaped pipe char \`|\` (#5).
  
  
  ## [3.0.5] - 2015-02-06
  ### Changed
  - Significantly improved tests coverage (with dead code removal and other
    related things).
  
  ### Fixed
  - Fixed link validator - could skip some kind of javascript links with uppercase
    digital entities (thanks to @opennota)
  
  
  ## [3.0.4] - 2015-01-13
  ### Changed
  - Improved errors processing in url normalizer (for broken sequences).
  - Improved nesting limit processing in inline parser.
  - Reorganized tests & improved coverage.
  - Show inline diffs for failed tests.
  
  
  ## [3.0.3] - 2015-01-11
  ### Fixed
  - Fixed punctuation check in emphasis.
  
  
  ## [3.0.2] - 2015-01-09
  ### Fixed
  - Allow dashes in HTML tag names (needed for custom HTML tags).
  
  
  ## [3.0.1] - 2015-01-07
  ### Changed
  - Added # to terminator chars.
  
  ### Fixed
  - Improved link encoder - fix invalid surrogates to avoid errors.
  
  
  ## [3.0.0] - 2015-01-04
  ### Changed
  - Big split. All "rare" rules moved to external plugins (deflist, abbr, footnote,
    sub, sup, ins, mark).
  - Updated CM spec conformance to v0.15 (better unicode support).
  - Added \`md\` (parser instance) link to all state objects (instead of former
    options/parser).
  - References/Footnotes/Abbrs moved to \`block\` chain.
  - Input normalization moved to \`core\` chain.
  - Splitted links and images to separate rules.
  - Renamed some rules.
  - Removed \`full\` preset. Not needed anymore.
  - enable/disable methods now throw by default on invalid rules (exceptions can
    be disabled).
  - Replace NULL characters with 0xFFFD instead of strip.
  - Removed custom fences sugar (overcomplication).
  - Rewritten link components parse helpers.
  - More functions in \`md.utils\`.
  
  ### Fixed
  - Fixed inline html comments & cdata parse.
  
  
  ## [2.2.1] - 2014-12-29
  ### Added
  - Added development info.
  
  ### Changed
  - .use() now pass any number of params to plugins.
  
  ### Fixed
  - Fixed line breaks in definitions lists.
  
  
  ## [2.2.0] - 2014-12-28
  ### Added
  - API docs.
  - Added 'zero' preset.
  
  ### Changed
  - Updated CM spec conformance to v0.13.
  
  ### Fixed
  - Fixed several crashes, when some basic rules are disabled
    (block termination check, references check).
  
  
  ## [2.1.3] - 2014-12-24
  ### Added
  - Added curring to \`set\`/\`configure\`/\`enable\`/\`disable\` methods.
  
  ### Changed
  - Demo rework - now can include plugins.
  - Docs update.
  
  
  ## [2.1.2] - 2014-12-23
  ### Changed
  - Exposed helpers into parser instances (for plugins).
  - Removed utils from global export - been in instances seems enougth.
  - Refactored demo & added markdown-it-emoji to it.
  
  
  ## [2.1.1] - 2014-12-22
  ### Changed
  - Refreshed browser builds, missed in prev release.
  - Minor changes.
  
  
  ## [2.1.0] - 2014-12-21
  ### Changed
  - Separated method to enable rules by whitelist (enableOnly).
  - Changed second param of enable/disable ruler methods.
  - Shortcuts in main class for bulk enable/disable rules.
  - ASCII-friendly browserified files.
  - Separate package for spec tests.
  
  
  ## [2.0.0] - 2014-12-20
  ### Changed
  - New project name & home! Now it's \`markdown-it\`,
  - Sugar for constructor call - \`new\` is not mandatory now.
  - Renamed presets folder (configs -> presets).
  
  
  [12.2.0]: https://github.com/markdown-it/markdown-it/compare/12.1.0...12.2.0
  [12.1.0]: https://github.com/markdown-it/markdown-it/compare/12.0.6...12.1.0
  [12.0.6]: https://github.com/markdown-it/markdown-it/compare/12.0.5...12.0.6
  [12.0.5]: https://github.com/markdown-it/markdown-it/compare/12.0.4...12.0.5
  [12.0.4]: https://github.com/markdown-it/markdown-it/compare/12.0.3...12.0.4
  [12.0.3]: https://github.com/markdown-it/markdown-it/compare/12.0.2...12.0.3
  [12.0.2]: https://github.com/markdown-it/markdown-it/compare/12.0.1...12.0.2
  [12.0.1]: https://github.com/markdown-it/markdown-it/compare/12.0.0...12.0.1
  [12.0.0]: https://github.com/markdown-it/markdown-it/compare/11.0.1...12.0.0
  [11.0.1]: https://github.com/markdown-it/markdown-it/compare/11.0.0...11.0.1
  [11.0.0]: https://github.com/markdown-it/markdown-it/compare/10.0.0...11.0.0
  [10.0.0]: https://github.com/markdown-it/markdown-it/compare/9.1.0...10.0.0
  [9.1.0]: https://github.com/markdown-it/markdown-it/compare/9.0.1...9.1.0
  [9.0.1]: https://github.com/markdown-it/markdown-it/compare/9.0.0...9.0.1
  [9.0.0]: https://github.com/markdown-it/markdown-it/compare/8.4.2...9.0.0
  [8.4.2]: https://github.com/markdown-it/markdown-it/compare/8.4.1...8.4.2
  [8.4.1]: https://github.com/markdown-it/markdown-it/compare/8.4.0...8.4.1
  [8.4.0]: https://github.com/markdown-it/markdown-it/compare/8.3.2...8.4.0
  [8.3.2]: https://github.com/markdown-it/markdown-it/compare/8.3.1...8.3.2
  [8.3.1]: https://github.com/markdown-it/markdown-it/compare/8.3.0...8.3.1
  [8.3.0]: https://github.com/markdown-it/markdown-it/compare/8.2.2...8.3.0
  [8.2.2]: https://github.com/markdown-it/markdown-it/compare/8.2.1...8.2.2
  [8.2.1]: https://github.com/markdown-it/markdown-it/compare/8.2.0...8.2.1
  [8.2.0]: https://github.com/markdown-it/markdown-it/compare/8.1.0...8.2.0
  [8.1.0]: https://github.com/markdown-it/markdown-it/compare/8.0.1...8.1.0
  [8.0.1]: https://github.com/markdown-it/markdown-it/compare/8.0.0...8.0.1
  [8.0.0]: https://github.com/markdown-it/markdown-it/compare/7.0.1...8.0.0
  [7.0.1]: https://github.com/markdown-it/markdown-it/compare/7.0.0...7.0.1
  [7.0.0]: https://github.com/markdown-it/markdown-it/compare/6.1.1...7.0.0
  [6.1.1]: https://github.com/markdown-it/markdown-it/compare/6.1.0...6.1.1
  [6.1.0]: https://github.com/markdown-it/markdown-it/compare/6.0.5...6.1.0
  [6.0.5]: https://github.com/markdown-it/markdown-it/compare/6.0.4...6.0.5
  [6.0.4]: https://github.com/markdown-it/markdown-it/compare/6.0.3...6.0.4
  [6.0.3]: https://github.com/markdown-it/markdown-it/compare/6.0.2...6.0.3
  [6.0.2]: https://github.com/markdown-it/markdown-it/compare/6.0.1...6.0.2
  [6.0.1]: https://github.com/markdown-it/markdown-it/compare/6.0.0...6.0.1
  [6.0.0]: https://github.com/markdown-it/markdown-it/compare/5.1.0...6.0.0
  [5.1.0]: https://github.com/markdown-it/markdown-it/compare/5.0.3...5.1.0
  [5.0.3]: https://github.com/markdown-it/markdown-it/compare/5.0.2...5.0.3
  [5.0.2]: https://github.com/markdown-it/markdown-it/compare/5.0.1...5.0.2
  [5.0.1]: https://github.com/markdown-it/markdown-it/compare/5.0.0...5.0.1
  [5.0.0]: https://github.com/markdown-it/markdown-it/compare/4.4.0...5.0.0
  [4.4.0]: https://github.com/markdown-it/markdown-it/compare/4.3.1...4.4.0
  [4.3.1]: https://github.com/markdown-it/markdown-it/compare/4.3.0...4.3.1
  [4.3.0]: https://github.com/markdown-it/markdown-it/compare/4.2.2...4.3.0
  [4.2.2]: https://github.com/markdown-it/markdown-it/compare/4.2.1...4.2.2
  [4.2.1]: https://github.com/markdown-it/markdown-it/compare/4.2.0...4.2.1
  [4.2.0]: https://github.com/markdown-it/markdown-it/compare/4.1.2...4.2.0
  [4.1.2]: https://github.com/markdown-it/markdown-it/compare/4.1.1...4.1.2
  [4.1.1]: https://github.com/markdown-it/markdown-it/compare/4.1.0...4.1.1
  [4.1.0]: https://github.com/markdown-it/markdown-it/compare/4.0.3...4.1.0
  [4.0.3]: https://github.com/markdown-it/markdown-it/compare/4.0.2...4.0.3
  [4.0.2]: https://github.com/markdown-it/markdown-it/compare/4.0.1...4.0.2
  [4.0.1]: https://github.com/markdown-it/markdown-it/compare/4.0.0...4.0.1
  [4.0.0]: https://github.com/markdown-it/markdown-it/compare/3.1.0...4.0.0
  [3.1.0]: https://github.com/markdown-it/markdown-it/compare/3.0.7...3.1.0
  [3.0.7]: https://github.com/markdown-it/markdown-it/compare/3.0.6...3.0.7
  [3.0.6]: https://github.com/markdown-it/markdown-it/compare/3.0.5...3.0.6
  [3.0.5]: https://github.com/markdown-it/markdown-it/compare/3.0.4...3.0.5
  [3.0.4]: https://github.com/markdown-it/markdown-it/compare/3.0.3...3.0.4
  [3.0.3]: https://github.com/markdown-it/markdown-it/compare/3.0.2...3.0.3
  [3.0.2]: https://github.com/markdown-it/markdown-it/compare/3.0.1...3.0.2
  [3.0.1]: https://github.com/markdown-it/markdown-it/compare/3.0.0...3.0.1
  [3.0.0]: https://github.com/markdown-it/markdown-it/compare/2.2.1...3.0.0
  [2.2.1]: https://github.com/markdown-it/markdown-it/compare/2.2.0...2.2.1
  [2.2.0]: https://github.com/markdown-it/markdown-it/compare/2.1.3...2.2.0
  [2.1.3]: https://github.com/markdown-it/markdown-it/compare/2.1.2...2.1.3
  [2.1.2]: https://github.com/markdown-it/markdown-it/compare/2.1.1...2.1.2
  [2.1.1]: https://github.com/markdown-it/markdown-it/compare/2.1.0...2.1.1
  [2.1.0]: https://github.com/markdown-it/markdown-it/compare/2.0.0...2.1.0
  [2.0.0]: https://github.com/markdown-it/markdown-it/releases/tag/2.0.0`);
  assert.equal(code.language, 'Markdown');
});

test.skip('example 2', () => {
  const code = detectLang(`---
  draft: false
  title: Why I use Linux instead of other OS
  date: 2020-02-27
  desc: A post where I try to explain why I use this beautiful and awesome operating system called Linux
  tags:
    - linux
  ---
  
  # Table of Content
  
  # Introduction
  Hello internet people of the internet! In this post, I will explain the reason why I use Linux and how I know Linux. Well, the correct term here should be GNU/Linux but it's _way_ too long let's be honest. So, whenever I say Linux, what I mean is GNU/Linux. Let's start with how I know Linux.
  
  # Origin
  ## My first laptop
  It all started when I want to buy my first laptop. Roughly about 9 months ago. It runs Intel Celeron N4000 processor, which is pretty bad (yeah, I know). At that time, I didn't know about Thinkpad which most of people said has the best value for its price. So, I do some quick research on how ~~slow~~ fast this processor runs. It turns out, it's pretty bad.
  
  ## How I know Linux
  I heard a lot of people say that Windows 10 is heavy for a slow processor like mine. It's bloat, it's too heavy, too many things going on, there's some malicious virus that can easily infect your computer, yaddi yadda. To be honest, I became a bit sad at that time. Then I came across a post on Facebook saying something like "Try Linux if your laptop/pc isn't powerful enough to run windows." Then I start to wonder, what is this guy talking about? Linux? I never heard that before.
  
  I became interested in that. Bare in mind that I don't have any laptop yet. I don't know why I love to read some articles about Linux and joined on several groups even if I don't have any machine that runs Linux (I even help people solve issues that they have on their Linux machine even though I don't have any laptop. That's quite something if you ask me). It's an interesting operating system (mainly because I never heard of it). Somehow, I like the fact that most people don't use it. I like to be different. Finally, after about a month, I bought my very first laptop.
  
  ## My first distribution
  Linux has so many distributions. Like, a gazillion of them. But from what I observe, there are only a few "big boys" that stands out from the others. Some of them are Debian, Ubuntu, Arch, Manjaro, OpenSUSE, Fedora, RHEL, PopOS, etc. I got confused easily on which one is the best for me. Then I decided to check what's that guy is using on Facebook.
  
  The guy on Facebook runs [Manjaro Linux](https://manjaro.org). I was like, "Why did he choose that? That's a silly name for Linux." Not gonna lie, that's my first impression lol. About a week later, I tried to install one of Linux distribution after getting convinced enough. The one that I chose was [Linux Mint](https://linuxmint.com). At that time, I installed Linux Mint 19.1 XFCE Edition. I was so happy to be able to install Linux. Unfortunately, I lost my first screenshot on Linux Mint.
  
  ## Changing distribution
  A month has passed. I feel pretty comfortable with Linux. Then, there was this news saying that Ubuntu dropped their support for 32bit libraries. Do you remember that news? I was like, "Well, that's fine I guess. What's wrong with that?" Little did I know, 32bit libraries are what most games depend on. Then I started to panic and confused lmao.
  
  I was like, "Oh come on. I'm already comfortable with my current setup. I still want to play some games but I don't want to change my distribution." Yep, that's literally what I said. And you know what? f*** it. Imma change my distribution. I decided to choose Manjaro since it's not based on Ubuntu. Yep, the one that I've mentioned before. A distribution that I thought has a stupid name (I felt so guilty now lol). Then I started to think, "Who cares about names anyway. As long as it is usable, it's good."
  
  Finally, I installed it. I took a quick screenshot after installing it because I was so excited. Here, take a look!
  
  ![manjaro](/assets/post/why-i-use-linux/manjaro.png)
  
  Manjaro is based on Arch. Some people say that it's Arch without all of its fuss. I mean, it's true. At the time I'm writing this, I use Arch. For beginners that want to try Archlinux, it's a good starting point. I ended up using it for nearly 8 months. It was a great experience.
  
  # Why Linux?
  So, why do I use Linux then? Well, let me give you a quick list of why Linux is better than the other OS
    - **It's free**
  
        Linux is free both in price and free as in freedom. You don't have to pay for license and you can do anyting you want with it. You can customize your Desktop Environment (look and feel) or even build your very own kernel!
  
    - **It's lightweight**
  
        Linux is so lightweight. It can bring your old hardware to life. There's this joke that says "Linux can run on everything". Starting from [business card](https://www.thirtythreeforty.net/posts/2019/12/my-business-card-runs-linux/) (yes, there's someone out there who built their business card with Linux inside it) until your high end $50000 beast or whatever.
  
    - **It's secure**
  
        Linux is very secure. That's why most of servers around the world is using Linux for it. You don't have to worry to install antivirus to prevent ransomware getting into your system. No need to worry on that stuff.
  
    - **There's always something to learn**
  
        Like, seriously. You can always learn something new everyday. There are so much good stuff that you can learn from Linux. If you like something challenging, go ahead and try Linux.
  
    - **Package Manager**
  
        Now this is the stuff that makes me really love Linux. Linux has a centralized place to download any app that you want. You don't need to go to some kind of obscure website and find the correct download link. You just need to \`apt install\` or \`pacman - S\` any package that you want and it's totally secure.
  
  # Conclusion
  At first, I'm afraid that I can't install Windows on my new laptop. Who would've thought that in the end, I use Archlinux which some people say that it's difficult to install. I think it's not that hard, follow the wiki and you're set (said someone who had failed to install Archlinux 3 times lmao).
  
  Alright, this post will end right here. I might post why I use VIM/Window Managers next time. See ya in the next post everyone, have a good day!`);
  assert.equal(code.language, 'Markdown');
});

test.skip('example 3', () => {
  const code = detectLang(`---
  name: 'blog-using-vue-nuxt-markdown'
  title: Website with blog and portfolio using Vue.js + Nuxt + Markdown
  year: 1 January 2019
  color: '#8e7964'
  trans: 'blog-usando-vue-nuxt-markdown'
  id: 'vue-nuxt-blog'
  description: |
    How I created my new website with portfolio and blog in two languages. What technology I used and why.
  ---
  
  ## Why did I re-do my website with Nuxt?
  
  Although some of you already know me, I am [Marina Aísa](https://twitter.com/MarinaAisa), UX Engineer (design and front-end) and I currently work at [Holaluz](https://www.holaluz.com/en).
  
  Last year, 2018, I was very focused on learning more about JavaScript, which was a pending subject and at the same time I learnt [Vue.js](https://vuejs.org/). Meanwhile at my workplace, we started using [Nuxt.js](https://nuxtjs.org/) a framework on VueJS to remake both company's static and dynamic (SPA) webapps into components and create a design system with it.
  
  My previous website was made with [Middleman](https://middlemanapp.com/) a static pages generator based on Ruby, so I took the opportunity to redo my website with Nuxt and Vue, in order to:
  - To learn
  - Improve performance
  - Add functionality as a blog and portfolio system
  - Add two languages, Spanish and English, **also in blog posts** but independently, since I guess I won't translate every post in both languages.
  
  What attracts me the most of Nuxt is the philosophy *serverless* (Nuxt can also be SSR tho) and the static prerendering it provides to SPA applications. Briefly, with this stack you can combine the best of a static website: compiled HTML -> what leads to a better SEO, plus the best of a *single page application*: Webpack, cache optimizations, lazy-loading, functions and asynchronous data...
  
  ## But where do I get the content if I don't have a server?
  
  Nuxt, by following the architecture [JAMStack](https://jamstack.org/) is built to get content through APIs, so many people use headless CMSs like [Contentful](https://www.contentful.com/) or [Prismic](https://prismic.io/). At first I thought they were interesting options but I realized that it wasn't necessary for a website like mine since CMSs are oriented to be used by people without technical knowledge, besides they are expensive, they save assets on their own servers and they aren't the best option if I wanted to have the best performance.
  
  **Therefore, I decided to use a Markdowns system that I store in Github and call dynamically.**
  
  ### Importing posts on the main page depending on the language
  
  Using the asynchronous function \`asyncData\` that Nuxt provides only in its pages (it is not avalaible in its components) I import the Markdowns that I have saved in the folder \`content\` of the project. Later I return them in the form of a promise as an array of objects. As you can see below, this import depends on the constant \`blogs\` which will be the array \`blogsEs\` or \`blogsEn\` depending on the language of the page stored on the Vuex's state.
  
  \`\`\`javascript
  import blogsEn from '~/contents/en/blogsEn.js';
  import blogsEs from '~/contents/es/blogsEs.js'
  
  async asyncData({ app }) {
    const blogs = app.i18n.locale === 'en' ? blogsEn : blogsEs;

    async function asyncImport(blogName) {
      const wholeMD = await import(\`~/content/\${app.i18n.locale}/blog/\${blogName}.md\`);
      return wholeMD.attributes;
    }

    return Promise.all(blogs.map(blog => asyncImport(blog)))
      .then((res) => {
        return {
          blogs: res
        };
      });
  }
  \`\`\`
  
  The reason why I'm importing the arrays containing the blogs names is because I want to use it also to generate the static pages through the object [generate](https://nuxtjs.org/api/configuration-generate/) in the Nuxt configuration, file \`nuxt.config.js\`.
  
  \`\`\`javascript;
  import blogsEn from '~/contents/en/blogsEn.js';
  import blogsEs from '~/contents/es/blogsEs.js';

  generate: {
    routes: [
      '/es', '404'
    ]
      .concat(blogsEn.map(blog => \`/blog/\${blog}\`))
      .concat(blogsEs.map(blog => \`es/blog/\${blog}\`));
  }
  \`\`\`
  
  ### Generating dynamic pages from Markdown files
  
  Nuxt has a very interesting functionality, the creation of [dynamic routes](https://nuxtjs.org/guide/routing/#dynamic-routes).
  
  In the next import I use the function \`asyncData\` instead of \`data\` as it's usual in Vue, to first import each Markdown and then return a new object with the information I want to use in the template of the page.
  **The URL will be equal to each markdown file's name.**
  In the case that the md file doesn't exist it will simply go to error page 404.
  
  \`\`\`javascript
  async asyncData({ params, app }) {
    const fileContent = await import(\`~/contents/\${app.i18n.locale}/blog/\${params.slug}.md\`);
    const attr = fileContent.attributes;
    return {
      colors: attr.colors,
      date: attr.date,
      description: attr.description,
      id: attr.id,
      name: params.slug,
      related: attr.related,
      renderFunc: fileContent.vue.render,
      staticRenderFuncs: fileContent.vue.staticRenderFns,
      title: attr.title,
      urlTranslation: attr.urlTranslation
    };
  }
  \`\`\`
  
  If we wanted to create a portfolio in the future, it would be exactly the same as the blog. We would create within \`contents\` a folder called \`portfolio\` and we would do the same process that we have done with \`blogs\`.
  
  The loader for Webpack Markdown files that I use is: [frontmatter-markdown-loader](https://www.npmjs.com/package/frontmatter-markdown-loader) that allows me to put Vue components inside markdown files, as well as extract the \`frontmatter\` attributes as they do static generators like Jekyll. For making the code look pretty I apply: [HighlightJS](https://highlightjs.org/)
  
  ## Let's talk about performance
  
  Do you remember that before I told you that one of my motivations for creating this website was to have a blog that had a good performance?
  With Nuxt I have achieved it, and I still have a lot to optimize.
  
  If you have arrived here, you have probably thought: *"OMG Marina, you could just have made a blog in [Medium](https://medium.com/) and save you all this crazy work"* and right now you're going to understand why I don't like Medium.
  
  While writing in Medium **you don't have control over your blog** such as CSS, SEO, adding functionalities, **Medium owns your content**, you have a limit of articles read for free... and **their performance seems quite bad**
  
  Thanks to Google's tool [Lighthouse](https://developers.google.com/web/fundamentals/performance/audit/) we can analyze and compare Medium with my website.
  
  <image-responsive
      imageURL="blog/vue-nuxt-blog/performance.jpg"
      :width="'952'"
      :height="'509'"
      alt="performance" />
  
  As you can see, Medium does a lot of things well, but performance is not one of them. This translates into user experience as a very slow load, especially on mobile devices. **Because performance is user experience.** We'll talk more about it another day.
  The interesting thing here is that with Nuxt I managed to reach a **94%** performance compared to 40% offered by Medium in the first load, but the best thing is that since using cache systems, **the second load on my website the performance is 100%** while Medium scores 60%.
  
  ## Web in two languages
  
  To translate the web in English and Spanish I use [nuxt-i18n](https://github.com/nuxt-community/nuxt-i18n). It is a layer above [vue-i18n](https://github.com/kazupon/vue-i18n) which has lazy-loading translations. *Nuxt-i18n* automates how translations are worked on the Vue router, simplifying it for Nuxt. I recommend it for the router, although it has some things that I couldn't managed to make it work as the redirection cookie based on the browser language. But it's a problem that you have to accept if you use a new framework like Nuxt is.
  
  ## Features and improvements I want to add in the future
  
  - I am not very happy with the amount of JS that I am putting into the web, I have more than 100k of synchronous JS and I want to reduce it. I still have to figure out how. My relationship with JS is love/hate. On the one hand I love everything you can do with it and on the other I hate it because it has a terrible cost on the performance of the page.
  
  - Adding a portfolio system with dynamic pages like the blog.
  
  - Improvements in design and usability.
  
  - Making the web totally accessible from the design to the code.
  
  - Cleaning CSS that I don't use and try to reduce it.
  
  - I criticize a lot Medium but I really like its design and some of its features, in fact I would like to add its famous *clap* button to my website.
  
  - Add comments to each post.
  
  - Add similar posts to the one you've read.
  
  ## Things about the webapp that I'll write another day
  
  - Lazy loading of components and images in Nuxt, I will tell you which packages I use and the component I did to render a first image as a *placeholder* in base64 and afterwards asynchronously the final image.
  
  - How to use \`analyze\` of Nuxt to analyze the JS generated by Webpack in our app and to optimize it.
  
  - The big mistake I made along the way: Vuex. <nuxt-link to="/blog/vuex-what-is-when-use-it">You can read it here</nuxt-link>
  
  - How to put emojis on your website through a sprite made in SCSS so that they always look the same regardless of the browser or device.
  
  - Loading Vue asynchronous components with the practical example of the travel map that is in the home page.
  
  I thought about publishing a starter about it but being realist, I wouldn't have enough time to maintain it. I think this post explains how to do it very well, but if you have any doubt left, you can always contact me at my email: [marina@marinaaisa](mailto:marina@marinaaisa.com).
  
  Since I don't have a comments section on each post, I would love to continue the conversation on [Twitter](https://twitter.com/MarinaAisa). All feedback is welcome! If you think there is something that it can be improved, you would help me a lot.`);
  assert.equal(code.language, 'Markdown');
});

test.run();
