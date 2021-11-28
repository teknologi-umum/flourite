import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src';

test('hello world', () => {
  const code = detectLang(`IO.puts :stderr, "Goodbye, World!"`);
  assert.equal(code.language, 'Elixir');
});

test('fizz buzz', () => {
  const code = detectLang(`defmodule FizzBuzz do
  def fizzbuzz(n) when rem(n, 15) == 0, do: "FizzBuzz"
  def fizzbuzz(n) when rem(n,  5) == 0, do: "Buzz"
  def fizzbuzz(n) when rem(n,  3) == 0, do: "Fizz"
  def fizzbuzz(n),                      do: n  
end
 
Enum.each(1..100, &IO.puts FizzBuzz.fizzbuzz &1)`);
  assert.equal(code.language, 'Elixir');
});

test('anagrams', () => {
  const code = detectLang(`defmodule Anagrams do
  def find(file) do
    File.read!(file)
    |> String.split
    |> Enum.group_by(fn word -> String.codepoints(word) |> Enum.sort end)
    |> Enum.group_by(fn {_,v} -> length(v) end) 
    |> Enum.max 
    |> print
  end
 
  defp print({_,y}) do
    Enum.each(y, fn {_,e} -> Enum.sort(e) |> Enum.join(" ") |> IO.puts end)
  end
end
 
Anagrams.find("unixdict.txt")`);
  assert.equal(code.language, 'Elixir');
});

test('bubble sort', () => {
  const code = detectLang(`defmodule Sort do
  def bsort(list) when is_list(list) do
    t = bsort_iter(list)
 
    if t == list, do: t, else: bsort(t)
  end
 
  def bsort_iter([x, y | t]) when x > y, do: [y | bsort_iter([x | t])]
  def bsort_iter([x, y | t]), do: [x | bsort_iter([y | t])]
  def bsort_iter(list), do: list
end`);
  assert.equal(code.language, 'Elixir');
});

test('heap sort', () => {
  const code = detectLang(`defmodule Sort do
  def heapSort(list) do
    len = length(list)
    heapify(List.to_tuple(list), div(len - 2, 2))
    |> heapSort(len-1)
    |> Tuple.to_list
  end
 
  defp heapSort(a, finish) when finish > 0 do
    swap(a, 0, finish)
    |> siftDown(0, finish-1)
    |> heapSort(finish-1)
  end
  defp heapSort(a, _), do: a
 
  defp heapify(a, start) when start >= 0 do
    siftDown(a, start, tuple_size(a)-1)
    |> heapify(start-1)
  end
  defp heapify(a, _), do: a
 
  defp siftDown(a, root, finish) when root * 2 + 1 <= finish do
    child = root * 2 + 1
    if child + 1 <= finish and elem(a,child) < elem(a,child + 1), do: child = child + 1
    if elem(a,root) < elem(a,child),
      do:   swap(a, root, child) |> siftDown(child, finish),
      else: a
  end
  defp siftDown(a, _root, _finish), do: a
 
  defp swap(a, i, j) do
    {vi, vj} = {elem(a,i), elem(a,j)}
    a |> put_elem(i, vj) |> put_elem(j, vi)
  end
end
 
(for _ <- 1..20, do: :rand.uniform(20)) |> IO.inspect |> Sort.heapSort |> IO.inspect`);
  assert.equal(code.language, 'Elixir');
});

test('merge sort', () => {
  const code = detectLang(`defmodule Sort do
  def merge_sort(list) when length(list) <= 1, do: list
  def merge_sort(list) do
    {left, right} = Enum.split(list, div(length(list), 2))
    :lists.merge( merge_sort(left), merge_sort(right))
  end
end`);
  assert.equal(code.language, 'Elixir');
});

test('quick sort', () => {
  const code = detectLang(`defmodule Sort do
  def qsort([]), do: []
  def qsort([h | t]) do
    {lesser, greater} = Enum.split_with(t, &(&1 < h))
    qsort(lesser) ++ [h] ++ qsort(greater)
  end
end`);
  assert.equal(code.language, 'Elixir');
});

test('ludic numbers', () => {
  const code = detectLang(`defmodule Ludic do
  def numbers(n \\ 100000) do
    [h|t] = Enum.to_list(1..n)
    numbers(t, [h])
  end
 
  defp numbers(list, nums) when length(list) < hd(list), do: Enum.reverse(nums, list)
  defp numbers([h|_]=list, nums) do
    Enum.drop_every(list, h) |> numbers([h | nums])
  end
 
  def task do
    IO.puts "First 25 : #{inspect numbers(200) |> Enum.take(25)}"
    IO.puts "Below 1000: #{length(numbers(1000))}"
    tuple = numbers(25000) |> List.to_tuple
    IO.puts "2000..2005th: #{ inspect for i <- 1999..2004, do: elem(tuple, i) }"
    ludic = numbers(250)
    triple = for x <- ludic, x+2 in ludic, x+6 in ludic, do: [x, x+2, x+6]
    IO.puts "Triples below 250: #{inspect triple, char_lists: :as_lists}"
  end
end
 
Ludic.task`);
  assert.equal(code.language, 'Elixir');
});

test('happy numbers', () => {
  const code = detectLang(`defmodule Happy do
  def task(num) do
    Process.put({:happy, 1}, true)
    Stream.iterate(1, &(&1+1))
    |> Stream.filter(fn n -> happy?(n) end)
    |> Enum.take(num)
  end
 
  defp happy?(n) do
    sum = square_sum(n, 0)
    val = Process.get({:happy, sum})
    if val == nil do
      Process.put({:happy, sum}, false)
      val = happy?(sum)
      Process.put({:happy, sum}, val)
    end
    val
  end
 
  defp square_sum(0, sum), do: sum
  defp square_sum(n, sum) do
    r = rem(n, 10)
    square_sum(div(n, 10), sum + r*r)
  end
end
 
IO.inspect Happy.task(8)`);
  assert.equal(code.language, 'Elixir');
});

test('floyd warshall', () => {
  const code = detectLang(`defmodule Floyd_Warshall do
  def main(n, edge) do
    {dist, next} = setup(n, edge)
    {dist, next} = shortest_path(n, dist, next)
    print(n, dist, next)
  end
 
  defp setup(n, edge) do
    big = 1.0e300
    dist = for i <- 1..n, j <- 1..n, into: %{}, do: {{i,j},(if i==j, do: 0, else: big)}
    next = for i <- 1..n, j <- 1..n, into: %{}, do: {{i,j}, nil}
    Enum.reduce(edge, {dist,next}, fn {u,v,w},{dst,nxt} ->
      { Map.put(dst, {u,v}, w), Map.put(nxt, {u,v}, v) }
    end)
  end
 
  defp shortest_path(n, dist, next) do
    (for k <- 1..n, i <- 1..n, j <- 1..n, do: {k,i,j})
    |> Enum.reduce({dist,next}, fn {k,i,j},{dst,nxt} ->
         if dst[{i,j}] > dst[{i,k}] + dst[{k,j}] do
           {Map.put(dst, {i,j}, dst[{i,k}] + dst[{k,j}]), Map.put(nxt, {i,j}, nxt[{i,k}])}
         else
           {dst, nxt}
         end
       end)
  end
 
  defp print(n, dist, next) do
    IO.puts "pair     dist    path"
    for i <- 1..n, j <- 1..n, i != j,
        do: :io.format "~w -> ~w  ~4w     ~s~n", [i, j, dist[{i,j}], path(next, i, j)]
  end
 
  defp path(next, i, j), do: path(next, i, j, [i]) |> Enum.join(" -> ")
 
  defp path(_next, i, i, list), do: Enum.reverse(list)
  defp path(next, i, j, list) do
    u = next[{i,j}]
    path(next, u, j, [u | list])
  end
end
 
edge = [{1, 3, -2}, {2, 1, 4}, {2, 3, 3}, {3, 4, 2}, {4, 2, -1}]
Floyd_Warshall.main(4, edge)`);
  assert.equal(code.language, 'Elixir');
});

test.run();
