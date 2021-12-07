import { test } from "uvu";
import * as assert from "uvu/assert";
import detectLang from "../src/index";

test("local definition", () => {
  const code = detectLang(
    `local foo = "bar"
    local some_var = 12
    local table = {1, 2, "foo"} `
  );
  assert.equal(code.language, "Lua");
});

test("array-like tables", () => {
  const code = detectLang("{1212, \"foo\", 'bar', true, false, nil}");

  assert.equal(code.language, "Lua");
});

test("map-like tables", () => {
  const code = detectLang("{foo = \"bar\", [0] = false, [\"true\"] = 1212}");

  assert.equal(code.language, "Lua");
});

test("metatable definition", () => {
  const code = detectLang(`local foo = setmetatable({}, {
    __index = function(x, y) return y end
    __newindex = function(x, y) rawset(x, y) end
    __add = function(x, y) return x + y end
  })`);

  assert.equal(code.language, "Lua");
});

test("functiopn call", () => {
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

  assert.equal(code.language, "Lua");
});

test("http", () => {
  const code = detectLang(
    `for i = 1, 100 do
      local http = require("socket.http")
      local url = require("socket.url")
      local page = http.request('http://www.google.com/m/search?q=' .. url.escape("lua"))
      print(page)`
  );

  assert.equal(code.language, "Lua");
});

test("fizzbuzz", () => {
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
      end`
  );

  assert.equal(code.language, "Lua");
});

test("fibonacci sequence", () => {
  const code = detectLang(`--calculates the nth fibonacci number. Breaks for negative or non-integer n.
  function fibs(n) 
    return n < 2 and n or fibs(n - 1) + fibs(n - 2) 
  end`);
  assert.equal(code.language, "Lua");
});

test("quicksort", () => {
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

  assert.equal(code.language, "Lua");
});

test("floyd warshall", () => {
  const code = detectLang(`function printResult(dist, nxt)
    print("pair     dist    path")
    for i=0, #nxt do
        for j=0, #nxt do
            if i ~= j then
                u = i + 1
                v = j + 1
                path = string.format("%d -> %d    %2d     %s", u, v, dist[i][j], u)
                repeat
                    u = nxt[u-1][v-1]
                    path = path .. " -> " .. u
                until (u == v)
                print(path)
            end
        end
    end
  end

  function floydWarshall(weights, numVertices)
    dist = {}
    for i=0, numVertices-1 do
        dist[i] = {}
        for j=0, numVertices-1 do
            dist[i][j] = math.huge
        end
    end

    for _,w in pairs(weights) do
        -- the weights array is one based
        dist[w[1]-1][w[2]-1] = w[3]
    end

    nxt = {}
    for i=0, numVertices-1 do
        nxt[i] = {}
        for j=0, numVertices-1 do
            if i ~= j then
                nxt[i][j] = j+1
            end
        end
    end

    for k=0, numVertices-1 do
        for i=0, numVertices-1 do
            for j=0, numVertices-1 do
                if dist[i][k] + dist[k][j] < dist[i][j] then
                    dist[i][j] = dist[i][k] + dist[k][j]
                    nxt[i][j] = nxt[i][k]
                end
            end
        end
    end

    printResult(dist, nxt)
  end

  weights = {
    {1, 3, -2},
    {2, 1, 4},
    {2, 3, 3},
    {3, 4, 2},
    {4, 2, -1}
  }
  numVertices = 4
  floydWarshall(weights, numVertices)`);

  assert.equal(code.language, "Lua");
});

test("bubble sort", () => {
  const code = detectLang(`function bubbleSort(A)
    local itemCount=#A
    local hasChanged
    repeat
      hasChanged = false
      itemCount=itemCount - 1
      for i = 1, itemCount do
        if A[i] > A[i + 1] then
          A[i], A[i + 1] = A[i + 1], A[i]
          hasChanged = true
        end
      end
    until hasChanged == false
  end

  list = { 5, 6, 1, 2, 9, 14, 2, 15, 6, 7, 8, 97 }
  bubbleSort(list)
  for i, j in pairs(list) do
      print(j)
  end`);

  assert.equal(code.language, "Lua");
});

test("ludic numbers", () => {
  const code = detectLang(`-- Return table of ludic numbers below limit
  function ludics (limit)
      local ludList, numList, index = {1}, {}
      for n = 2, limit do table.insert(numList, n) end
      while #numList > 0 do
          index = numList[1]
          table.insert(ludList, index)
          for key = #numList, 1, -1 do
              if key % index == 1 then table.remove(numList, key) end
          end
      end
      return ludList
  end
   
  -- Return true if n is found in t or false otherwise
  function foundIn (t, n)
      for k, v in pairs(t) do
          if v == n then return true end
      end
      return false
  end
   
  -- Display msg followed by all values in t
  function show (msg, t)
      io.write(msg)
      for _, v in pairs(t) do io.write(" " .. v) end
      print("\n")
  end
   
  -- Main procedure
  local first25, under1k, inRange, tripList, triplets = {}, 0, {}, {}, {}
  for k, v in pairs(ludics(30000)) do
      if k <= 25 then table.insert(first25, v) end
      if v <= 1000 then under1k = under1k + 1 end
      if k >= 2000 and k <= 2005 then table.insert(inRange, v) end
      if v < 250 then table.insert(tripList, v) end
  end
  for _, x in pairs(tripList) do
      if foundIn(tripList, x + 2) and foundIn(tripList, x + 6) then
          table.insert(triplets, "\n{" .. x .. "," .. x+2 .. "," .. x+6 .. "}")
      end
  end
  show("First 25:", first25)
  print(under1k .. " are less than or equal to 1000\n")
  show("2000th to 2005th:", inRange)
  show("Triplets:", triplets)`);

  assert.equal(code.language, "Lua");
});

test("lsp handler", () => {
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
  `
  );
  assert.equal(code.language, "Lua");
});

test("yes, this is a valid lua code", () => {
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
}`
  );

  assert.equal(code.language, "Lua");
});

test("fivenum", () => {
  const code = detectLang(`function slice(tbl, low, high)
  local copy = {}

  for i=low or 1, high or #tbl do
      copy[#copy+1] = tbl[i]
  end

  return copy
end

-- assumes that tbl is sorted
function median(tbl)
  m = math.floor(#tbl / 2) + 1
  if #tbl % 2 == 1 then
      return tbl[m]
  end
  return (tbl[m-1] + tbl[m]) / 2
end

function fivenum(tbl)
  table.sort(tbl)

  r0 = tbl[1]
  r2 = median(tbl)
  r4 = tbl[#tbl]

  m = math.floor(#tbl / 2)
  if #tbl % 2 == 1 then
      low = m
  else
      low = m - 1
  end
  r1 = median(slice(tbl, nil, low+1))
  r3 = median(slice(tbl, low+2, nil))

  return r0, r1, r2, r3, r4
end

x1 = {
  {15.0, 6.0, 42.0, 41.0, 7.0, 36.0, 49.0, 40.0, 39.0, 47.0, 43.0},
  {36.0, 40.0, 7.0, 39.0, 41.0, 15.0},
  {
      0.14082834,  0.09748790,  1.73131507,  0.87636009, -1.95059594,  0.73438555,
     -0.03035726,  1.46675970, -0.74621349, -0.72588772,  0.63905160,  0.61501527,
     -0.98983780, -1.00447874, -0.62759469,  0.66206163,  1.04312009, -0.10305385,
      0.75775634,  0.32566578
  }
}

for i,x in ipairs(x1) do
  print(fivenum(x))
end`);
  assert.equal(code.language, "Lua");
});

test("modules detection", () => {
  const code = detectLang(`module("mymath", package.seeall)

  function mymath.add(a,b)
     print(a+b)
  end
  
  function mymath.sub(a,b)
     print(a-b)
  end
  
  function mymath.mul(a,b)
     print(a*b)
  end
  
  function mymath.div(a,b)
     print(a/b)
  end`);

  assert.equal(code.language, "Lua");
});

test("craete user defined modules", () => {
  const code = detectLang(`module("mymodule", package.seeall)

  function foo() -- create it as if it's a global function
      print("Hello World!")
  end
  
  require "mymodule"
  mymodule.foo()`);

  assert.equal(code.language, "Lua");
});

test.run();
