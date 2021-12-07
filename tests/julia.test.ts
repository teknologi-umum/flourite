import { test } from "uvu";
import * as assert from "uvu/assert";
import detectLang from "../src/index";

test("hello world", () => {
  const code = detectLang("println(\"Hello world!\")");
  assert.equal(code.language, "Julia");
});

test("fizz buzz", () => {
  const code = detectLang(`for i in 1:100
    if i % 15 == 0
        println("FizzBuzz")
    elseif i % 3 == 0
        println("Fizz")
    elseif i % 5 == 0
        println("Buzz")
    else
        println(i)
    end
  end`);
  assert.equal(code.language, "Julia");
});

test("fibonacci sequence", () => {
  const code = detectLang(`function fib(n)
    x,y = (0,1)
    for i = 1:n x,y = (y, x+y) end
    x
  end`);
  assert.equal(code.language, "Julia");
});

test("http server", () => {
  const code = detectLang(`using HttpServer
  server = Server() do req, res
      "Goodbye, World!"
  end
  run(server, 8080)`);
  assert.equal(code.language, "Julia");
});

test("palindrome detection", () => {
  const code = detectLang(`function palindrome(s)
    len = length(s)
    if(len==0 || len==1)
        return true
    end
    if(s[1] == s[len])
        return palindrome(SubString(s,2,len-1))
    end
    return false
  end`);
  assert.equal(code.language, "Julia");
});

test("quick sort", () => {
  const code = detectLang(`function quicksort!(A,i=1,j=length(A))
    if j > i
        pivot = A[rand(i:j)] # random element of A
        left, right = i, j
        while left <= right
            while A[left] < pivot
                left += 1
            end
            while A[right] > pivot
                right -= 1
            end
            if left <= right
                A[left], A[right] = A[right], A[left]
                left += 1
                right -= 1
            end
        end
        quicksort!(A,i,right)
        quicksort!(A,left,j)
    end
    return A
  end`);
  assert.equal(code.language, "Julia");
});

test("bubble sort", () => {
  const code = detectLang(`function bubblesort!(arr::AbstractVector)
    for _ in 2:length(arr), j in 1:length(arr)-1
        if arr[j] > arr[j+1]
            arr[j], arr[j+1] = arr[j+1], arr[j]
        end
    end
    return arr
  end

  v = rand(-10:10, 10)
  println("# unordered: $v\n -> ordered: ", bubblesort!(v))`);
  assert.equal(code.language, "Julia");
});

test("heap sort", () => {
  const code = detectLang(`function swap(a, i, j)
    a[i], a[j] = a[j], a[i] 
  end

  function pd!(a, first, last)
    while (c = 2 * first - 1) < last
        if c < last && a[c] < a[c + 1]
            c += 1
        end
        if a[first] < a[c]
            swap(a, c, first)
            first = c
        else
            break
        end
    end
  end

  function heapify!(a, n)
    f = div(n, 2)
    while f >= 1 
        pd!(a, f, n)
        f -= 1 
    end
  end

  function heapsort!(a)
    n = length(a)
    heapify!(a, n)
    l = n
    while l > 1 
        swap(a, 1, l)
        l -= 1
        pd!(a, 1, l)
    end
    return a
  end

  using Random: shuffle
  a = shuffle(collect(1:12))
  println("Unsorted: $a")
  println("Heap sorted: ", heapsort!(a))`);
  assert.equal(code.language, "Julia");
});

test("tree sort on a linked list", () => {
  const code = detectLang(`mutable struct BTree{T}
    data::T
    left::Union{BTree, Nothing}
    right::Union{BTree, Nothing}
    BTree(val::T) where T = new{T}(val, nothing, nothing)
  end

  function insert(tree, data)
    if data < tree.data
        if tree.left == nothing
            tree.left = BTree(data)
        else
            insert(tree.left, data)
        end
    else
        if tree.right == nothing
            tree.right = BTree(data)
        else
            insert(tree.right, data)
        end
    end
  end

  function sorted(tree)
    return tree == nothing ? [] : 
        typeof(tree.data)[sorted(tree.left); tree.data; sorted(tree.right)]
  end

  function arraytotree(arr)
    tree = BTree(arr[1])
    for data in arr[2:end]
        insert(tree, data)
    end
    return tree
  end

  function testtreesort(arr)
    println("Unsorted: ", arr)
    tree = arraytotree(arr)
    println("Sorted: ", sorted(tree))
  end

  testtreesort(rand(1:99, 12))`);
  assert.equal(code.language, "Julia");
});

test("ludic numbers", () => {
  const code = detectLang(`function ludic_filter{T<:Integer}(n::T)
    0 < n || throw(DomainError())
    slud = trues(n)
    for i in 2:(n-1)
        slud[i] || continue
        x = 0
        for j in (i+1):n
            slud[j] || continue
            x += 1
            x %= i
            x == 0 || continue
            slud[j] = false
        end
    end
    return slud
  end

  ludlen = 10^5
  slud = ludic_filter(ludlen)
  ludics = collect(1:ludlen)[slud]

  n = 25
  println("Generate and show here the first ", n, " ludic numbers.")
  print("    ")
  crwid = 76
  wid = 0
  for i in 1:(n-1)
    s = @sprintf "%d, " ludics[i]
    wid += length(s)
    if crwid < wid
        print("\n    ")
        wid = 0
    end
    print(s)
  end
  println(ludics[n])

  n = 10^3
  println()
  println("How many ludic numbers are there less than or equal to ", n, "?")
  println("    ", sum(slud[1:n]))

  lo = 2000
  hi = lo+5
  println()
  println("Show the ", lo, "..", hi, "'th ludic numbers.")
  for i in lo:hi
    println("    Ludic(", i, ") = ", ludics[i])
  end

  n = 250
  println()
  println("Show all triplets of ludic numbers < ", n)
  for i = 1:n-7
    slud[i] || continue
    j = i+2
    slud[j] || continue
    k = i+6
    slud[k] || continue
    println("    ", i, ", ", j, ", ", k)
  end
  `);
  assert.equal(code.language, "Julia");
});

test("floyd warshall algorithm", () => {
  const code = detectLang(`# Floyd-Warshall algorithm: https://rosettacode.org/wiki/Floyd-Warshall_algorithm
  # v0.6
   
  function floydwarshall(weights::Matrix, nvert::Int)
      dist = fill(Inf, nvert, nvert)
      for i in 1:size(weights, 1)
          dist[weights[i, 1], weights[i, 2]] = weights[i, 3]
      end
      # return dist
      next = collect(j != i ? j : 0 for i in 1:nvert, j in 1:nvert)
   
      for k in 1:nvert, i in 1:nvert, j in 1:nvert
          if dist[i, k] + dist[k, j] < dist[i, j]
              dist[i, j] = dist[i, k] + dist[k, j]
              next[i, j] = next[i, k]
          end
      end
   
      # return next
      function printresult(dist, next)
          println("pair     dist    path")
          for i in 1:size(next, 1), j in 1:size(next, 2)
              if i != j
                  u = i
                  path = @sprintf "%d -> %d    %2d     %s" i j dist[i, j] i
                  while true
                      u = next[u, j]
                      path *= " -> $u"
                      if u == j break end
                  end
                  println(path)
              end
          end
      end
      printresult(dist, next)
  end
   
  floydwarshall([1 3 -2; 2 1 4; 2 3 3; 3 4 2; 4 2 -1], 4)`);
  assert.equal(code.language, "Julia");
});

test("fivenum", () => {
  const code = detectLang(`function mediansorted(x::AbstractVector{T}, i::Integer, l::Integer)::T where T
  len = l - i + 1
  len > zero(len) || throw(ArgumentError("Array slice cannot be empty."))
  mid = i + len ÷ 2
  return isodd(len) ? x[mid] : (x[mid-1] + x[mid]) / 2
end

function fivenum(x::AbstractVector{T}) where T<:AbstractFloat
  r = Vector{T}(5)
  xs = sort(x)
  mid::Int = length(xs) ÷ 2
  lowerend::Int = isodd(length(xs)) ? mid : mid - 1
  r[1] = xs[1]
  r[2] = mediansorted(xs, 1, lowerend)
  r[3] = mediansorted(xs, 1, endof(xs))
  r[4] = mediansorted(xs, mid, endof(xs))
  r[end] = xs[end]
  return r
end

for v in ([15.0, 6.0, 42.0, 41.0, 7.0, 36.0, 49.0, 40.0, 39.0, 47.0, 43.0],
        [36.0, 40.0, 7.0, 39.0, 41.0, 15.0],
        [0.14082834,  0.09748790,  1.73131507,  0.87636009, -1.95059594,  0.73438555,
        -0.03035726,  1.46675970, -0.74621349, -0.72588772,  0.63905160,  0.61501527,
        -0.98983780, -1.00447874, -0.62759469,  0.66206163,  1.04312009, -0.10305385,
         0.75775634,  0.32566578])
  println("# ", v, "\n -> ", fivenum(v))
end`);
  assert.equal(code.language, "Julia");
});

test.run();
