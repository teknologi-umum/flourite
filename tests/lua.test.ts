import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';

test('local definition', () => {
  const code = detectLang(
    `local foo = "bar"
local some_var = 12
local table = {1, 2, "foo"} `,
  );
  assert.equal(code, 'Lua');
});

test('math operation', () => {
  const code = detectLang(
    `math.pow(1212)
math.tan(1212)
math.sqrt(1212)
math.rad(1212)`,
  );

  assert.equal(code, 'Lua');
});

test('array-like tables', () => {
  const code = detectLang(`{1212, "foo", 'bar', true, false, nil}`);

  assert.equal(code, 'Lua');
});

test('map-like tables', () => {
  const code = detectLang(`{foo = "bar", [0] = false, ["true"] = 1212}`);

  assert.equal(code, 'Lua');
});

test('table operation', () => {
  const code = detectLang(
    `math.pow(1212)
math.tan(1212)
math.sqrt(1212)
math.rad(1212)`,
  );

  assert.equal(code, 'Lua');
});

test('metatable definition', () => {
  const code = detectLang(`local foo = setmetatable({}, {
    __index = function(x, y) return y end
    __newindex = function(x, y) rawset(x, y) end
    __add = function(x, y) return x + y end
  })`);

  assert.equal(code, 'Lua');
});

test('functiopn call', () => {
  const code = detectLang(`
foo("bar")
foo "bar"
foo_fasda 'bar'
foo [[bar]]
foo"bar"
foo'bar'
foo[[bar]]
foo {...}
foo{...}
`);

  assert.equal(code, 'Lua');
});

test('http', () => {
  const code = detectLang(
    `for i = 1, 100 do
local http = require("socket.http")
local url = require("socket.url")
local page = http.request('http://www.google.com/m/search?q=' .. url.escape("lua"))
print(page)`,
  );
  assert.equal(code, 'Lua');
});

test('fizzbuzz', () => {
  const code = detectLang(
    `for i = 1, 100 do
  if i % 15 == 0 then
    print("FizzBuzz")
  elseif i % 3 == 0 then
    print("Fizz")
  elseif i % 5 == 0 then
    print("Buzz")
  else
    print(i)
  end
end`,
  );
  assert.equal(code, 'Lua');
});

test('quicksort', () => {
  const code = detectLang(`--in-place quicksort
function quicksort(t, start, endi)
  start, endi = start or 1, endi or #t
  --partition w.r.t. first element
  if(endi - start < 1) then return t end
  local pivot = start
  for i = start + 1, endi do
    if t[i] <= t[pivot] then
      if i == pivot + 1 then
        t[pivot],t[pivot+1] = t[pivot+1],t[pivot]
      else
        t[pivot],t[pivot+1],t[i] = t[i],t[pivot],t[pivot+1]
      end
      pivot = pivot + 1
    end
  end
  t = quicksort(t, start, pivot - 1)
  return quicksort(t, pivot + 1, endi)
end

--example
print(unpack(quicksort{5, 2, 7, 3, 4, 7, 1}))`);
  assert.equal(code, 'Lua');
});

test('lsp handler', () => {
  const code = detectLang(
    `--see: https://microsoft.github.io/language-server-protocol/specifications/specification-current/#textDocument_completion
M['textDocument/completion'] = function(_, _, result)
  if vim.tbl_isempty(result or {}) then return end
  local row, col = unpack(api.nvim_win_get_cursor(0))
  local line = assert(api.nvim_buf_get_lines(0, row-1, row, false)[1])
  local line_to_cursor = line:sub(col+1)
  local textMatch = vim.fn.match(line_to_cursor, '\\k*$')
  local prefix = line_to_cursor:sub(textMatch+1)

  local matches = util.text_document_completion_list_to_complete_items(result, prefix)
  vim.fn.complete(textMatch+1, matches)
end
`,
  );

  assert.equal(code, 'Lua');
});

test('yes, this is a valid lua code', () => {
  const code = detectLang(
    `local elements = u.namelist()

[[element1]] {
  bg = 0xffffff;
  fg = nil;
}

[[element2]] {
  num = 123123;
}

[[fooooooo]] {
  ["false"] = true;
  [0] = false;
}`,
  );

  assert.equal(code, 'Lua');
});

test.run();
