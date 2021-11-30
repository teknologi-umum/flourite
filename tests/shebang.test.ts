import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';

test('converted', () => {
  const node = '#!/usr/bin/env node';
  const nodelang = detectLang(node);
  assert.is(nodelang.language, 'Javascript');

  const python = '#!/usr/bin/env python3';
  const pythonlang = detectLang(python);
  assert.is(pythonlang.language, 'Python');

  const php = '#!/usr/bin/env php';
  const phplang = detectLang(php);
  assert.is(phplang.language, 'PHP');
});

test('random', () => {
  const lang = detectLang('#!/usr/bin/env ruby', { shiki: false });
  assert.is(lang.language, 'Ruby');
  const shiki = detectLang('#!/usr/bin/env ruby', { shiki: true });
  assert.is(shiki.language, 'ruby');
});

test('bash', () => {
  const shebang = '#!/bin/bash';
  const lang = detectLang(shebang);
  assert.is(lang.language, 'Bash');

  const shiki = detectLang(shebang, { shiki: true });
  assert.is(shiki.language, 'bash');
});

test('real world scenario', () => {
  const code = detectLang(`#!/usr/bin/env julia

repo = ""
directory = ""

if length(ARGS) >= 1 && ARGS[1] != ""
  if startswith(ARGS[1], "https://") || startswith(ARGS[1], "git@")
    repo = ARGS[1]
  elseif startswith(ARGS[1], "github:")
    repo = "git@github.com:" * chop(ARGS[1], head = 7, tail = 0)
  elseif startswith(ARGS[1], "gitlab:")
    repo = "git@gitlab.com:" * chop(ARGS[1], head = 7, tail = 0)
  elseif startswith(ARGS[1], "bitbucket:")
    repo = "git@bitbucket.org:" * chop(ARGS[1], head = 10, tail = 0)
  else
    repo = "git@github.com:" * ARGS[1]
  end
else
  println("Repository can't be empty!!!")
  exit(1)
end

if length(ARGS) > 1 && ARGS[2] != ""
  directory = ARGS[2]
else
  directory = split(repo, "/")[2]
end

run(\`git clone --depth=1 $repo $directory\`)
run(\`rm -rf $directory/.git\`)`);
  assert.is(code.language, 'Julia');
});

test.run();
