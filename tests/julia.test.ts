import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';

test('hello world', () => {
  const code = detectLang(`println("Hello world!")`);
  assert.equal(code, 'Julia');
});

test('fizz buzz', () => {
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
  assert.equal(code, 'Julia');
});

test('fibonacci sequence', () => {
  const code = detectLang(`function fib(n)
    x,y = (0,1)
    for i = 1:n x,y = (y, x+y) end
    x
  end`);
  assert.equal(code, 'Julia');
});

test('http server', () => {
  const code = detectLang(`using HttpServer
  server = Server() do req, res
      "Goodbye, World!"
  end
  run(server, 8080)`);
  assert.equal(code, 'Julia');
});

test('quick sort', () => {
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
  assert.equal(code, 'Julia');
});

test('bubble sort', () => {
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
  assert.equal(code, 'Julia');
});

test('heap sort', () => {
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
  assert.equal(code, 'Julia');
});

test('tree sort on a linked list', () => {
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
  assert.equal(code, 'Julia');
});

test.run();
