import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src';
import type { StatisticOutput } from '../src';

test('hello world', () => {
  const code = detectLang(
    `using System;
  Console.WriteLine("Hello world!");`,
    { shiki: true, statistics: true, heuristic: true },
  ) as StatisticOutput;
  assert.equal(code.detected, 'csharp');
  assert.equal(code.statistics, {
    C: -39,
    'C++': -40,
    'C#': 10,
    CSS: 0,
    Go: -39,
    HTML: 0,
    Java: -40,
    Javascript: -40,
    Julia: 5,
    Lua: -20,
    Pascal: 0,
    PHP: 0,
    Python: 0,
    Ruby: 0,
    Rust: -40,
    SQL: 0,
    Unknown: 1,
    YAML: 0,
  });
});

test('fizz buzz', () => {
  const code = detectLang(`class Program
  {
      public void FizzBuzzGo()
      {
          Boolean Fizz = false;
          Boolean Buzz = false;
          for (int count = 1; count <= 100; count ++)
          {
              Fizz = count % 3 == 0;
              Buzz = count % 5 == 0;
              if (Fizz && Buzz)
              {
                  Console.WriteLine("Fizz Buzz");
                  listBox1.Items.Add("Fizz Buzz");
              }
              else if (Fizz)
              {
                  Console.WriteLine("Fizz");
                  listBox1.Items.Add("Fizz");
              }
              else if (Buzz)
              {
                  Console.WriteLine("Buzz");
                  listBox1.Items.Add("Buzz");
              }
              else
              {
                  Console.WriteLine(count);
                  listBox1.Items.Add(count);
              }
          }
      }
  }`);
  assert.equal(code, 'C#');
});

test('quick sort', () => {
  const code = detectLang(`//
  // The Tripartite conditional enables Bentley-McIlroy 3-way Partitioning.
  // This performs additional compares to isolate islands of keys equal to
  // the pivot value.  Use unless key-equivalent classes are of small size.
  //
  #define Tripartite
   
  namespace RosettaCode {
    using System;
    using System.Diagnostics;
   
    public class QuickSort<T> where T : IComparable {
      #region Constants
      public const UInt32 INSERTION_LIMIT_DEFAULT = 12;
      private const Int32 SAMPLES_MAX = 19;
      #endregion
   
      #region Properties
      public UInt32 InsertionLimit { get; }
      private T[] Samples { get; }
      private Int32 Left { get; set; }
      private Int32 Right { get; set; }
      private Int32 LeftMedian { get; set; }
      private Int32 RightMedian { get; set; }
      #endregion
   
      #region Constructors
      public QuickSort(UInt32 insertionLimit = INSERTION_LIMIT_DEFAULT) {
        this.InsertionLimit = insertionLimit;
        this.Samples = new T[SAMPLES_MAX];
      }
      #endregion
   
      #region Sort Methods
      public void Sort(T[] entries) {
        Sort(entries, 0, entries.Length - 1);
      }
   
      public void Sort(T[] entries, Int32 first, Int32 last) {
        var length = last + 1 - first;
        while (length > 1) {
          if (length < InsertionLimit) {
            InsertionSort<T>.Sort(entries, first, last);
            return;
          }
   
          Left = first;
          Right = last;
          var median = pivot(entries);
          partition(median, entries);
          //[Note]Right < Left
   
          var leftLength = Right + 1 - first;
          var rightLength = last + 1 - Left;
   
          //
          // First recurse over shorter partition, then loop
          // on the longer partition to elide tail recursion.
          //
          if (leftLength < rightLength) {
            Sort(entries, first, Right);
            first = Left;
            length = rightLength;
          }
          else {
            Sort(entries, Left, last);
            last = Right;
            length = leftLength;
          }
        }
      }
   
      /// <summary>Return an odd sample size proportional to the log of a large interval size.</summary>
      private static Int32 sampleSize(Int32 length, Int32 max = SAMPLES_MAX) {
        var logLen = (Int32)Math.Log10(length);
        var samples = Math.Min(2 * logLen + 1, max);
        return Math.Min(samples, length);
      }
   
      /// <summary>Estimate the median value of entries[Left:Right]</summary>
      /// <remarks>A sample median is used as an estimate the true median.</remarks>
      private T pivot(T[] entries) {
        var length = Right + 1 - Left;
        var samples = sampleSize(length);
        // Sample Linearly:
        for (var sample = 0; sample < samples; sample++) {
          // Guard against Arithmetic Overflow:
          var index = (Int64)length * sample / samples + Left;
          Samples[sample] = entries[index];
        }
   
        InsertionSort<T>.Sort(Samples, 0, samples - 1);
        return Samples[samples / 2];
      }
   
      private void partition(T median, T[] entries) {
        var first = Left;
        var last = Right;
  #if Tripartite
        LeftMedian = first;
        RightMedian = last;
  #endif
        while (true) {
          //[Assert]There exists some index >= Left where entries[index] >= median
          //[Assert]There exists some index <= Right where entries[index] <= median
          // So, there is no need for Left or Right bound checks
          while (median.CompareTo(entries[Left]) > 0) Left++;
          while (median.CompareTo(entries[Right]) < 0) Right--;
   
          //[Assert]entries[Right] <= median <= entries[Left]
          if (Right <= Left) break;
   
          Swap(entries, Left, Right);
          swapOut(median, entries);
          Left++;
          Right--;
          //[Assert]entries[first:Left - 1] <= median <= entries[Right + 1:last]
        }
   
        if (Left == Right) {
          Left++;
          Right--;
        }
        //[Assert]Right < Left
        swapIn(entries, first, last);
   
        //[Assert]entries[first:Right] <= median <= entries[Left:last]
        //[Assert]entries[Right + 1:Left - 1] == median when non-empty
      }
      #endregion
   
      #region Swap Methods
      [Conditional("Tripartite")]
      private void swapOut(T median, T[] entries) {
        if (median.CompareTo(entries[Left]) == 0) Swap(entries, LeftMedian++, Left);
        if (median.CompareTo(entries[Right]) == 0) Swap(entries, Right, RightMedian--);
      }
   
      [Conditional("Tripartite")]
      private void swapIn(T[] entries, Int32 first, Int32 last) {
        // Restore Median entries
        while (first < LeftMedian) Swap(entries, first++, Right--);
        while (RightMedian < last) Swap(entries, Left++, last--);
      }
   
      /// <summary>Swap entries at the left and right indicies.</summary>
      public void Swap(T[] entries, Int32 left, Int32 right) {
        Swap(ref entries[left], ref entries[right]);
      }
   
      /// <summary>Swap two entities of type T.</summary>
      public static void Swap(ref T e1, ref T e2) {
        var e = e1;
        e1 = e2;
        e2 = e;
      }
      #endregion
    }
   
    #region Insertion Sort
    static class InsertionSort<T> where T : IComparable {
      public static void Sort(T[] entries, Int32 first, Int32 last) {
        for (var next = first + 1; next <= last; next++)
          insert(entries, first, next);
      }
   
      /// <summary>Bubble next entry up to its sorted location, assuming entries[first:next - 1] are already sorted.</summary>
      private static void insert(T[] entries, Int32 first, Int32 next) {
        var entry = entries[next];
        while (next > first && entries[next - 1].CompareTo(entry) > 0)
          entries[next] = entries[--next];
        entries[next] = entry;
      }
    }
    #endregion
  }`);
  assert.equal(code, 'C#');
});

test('heap sort', () => {
  const code = detectLang(`using System;
  using System.Collections.Generic;
  using System.Text;
   
  public class HeapSortClass
  {
      public static void HeapSort<T>(T[] array)
      {
          HeapSort<T>(array, 0, array.Length, Comparer<T>.Default);
      }
   
      public static void HeapSort<T>(T[] array, int offset, int length, IComparer<T> comparer)
      {
          HeapSort<T>(array, offset, length, comparer.Compare);
      }
   
      public static void HeapSort<T>(T[] array, int offset, int length, Comparison<T> comparison)
      {
          // build binary heap from all items
          for (int i = 0; i < length; i++)
          {
              int index = i;
              T item = array[offset + i]; // use next item
   
              // and move it on top, if greater than parent
              while (index > 0 &&
                  comparison(array[offset + (index - 1) / 2], item) < 0)
              {
                  int top = (index - 1) / 2;
                  array[offset + index] = array[offset + top];
                  index = top;
              }
              array[offset + index] = item;
          }
   
          for (int i = length - 1; i > 0; i--)
          {
              // delete max and place it as last
              T last = array[offset + i];
              array[offset + i] = array[offset];
   
              int index = 0;
              // the last one positioned in the heap
              while (index * 2 + 1 < i)
              {
                  int left = index * 2 + 1, right = left + 1;
   
                  if (right < i && comparison(array[offset + left], array[offset + right]) < 0)
                  {
                      if (comparison(last, array[offset + right]) > 0) break;
   
                      array[offset + index] = array[offset + right];
                      index = right;
                  }
                  else
                  {
                      if (comparison(last, array[offset + left]) > 0) break;
   
                      array[offset + index] = array[offset + left];
                      index = left;
                  }
              }
              array[offset + index] = last;
          }
      }
   
      static void Main()
      {
          // usage
          byte[] r = {5, 4, 1, 2};
          HeapSort(r);
   
          string[] s = { "-", "D", "a", "33" };
          HeapSort(s, 0, s.Length, StringComparer.CurrentCultureIgnoreCase);
      }
  }`);
  assert.equal(code, 'C#');
});

test('bubble sort', () => {
  const code = detectLang(`using System;
  using System.Collections.Generic;
   
  namespace RosettaCode.BubbleSort
  {
      public static class BubbleSortMethods
      {
          //The "this" keyword before the method parameter identifies this as a C# extension
          //method, which can be called using instance method syntax on any generic list,
          //without having to modify the generic List<T> code provided by the .NET framework.
          public static void BubbleSort<T>(this List<T> list) where T : IComparable
          {
              bool madeChanges;
              int itemCount = list.Count;
              do
              {
                  madeChanges = false;
                  itemCount--;
                  for (int i = 0; i < itemCount; i++)
                  {
                      if (list[i].CompareTo(list[i + 1]) > 0)
                      {
                          T temp = list[i + 1];
                          list[i + 1] = list[i];
                          list[i] = temp;
                          madeChanges = true;
                      }
                  }
              } while (madeChanges);
          }
      }
   
      //A short test program to demonstrate the BubbleSort. The compiler will change the
      //call to testList.BubbleSort() into one to BubbleSortMethods.BubbleSort<T>(testList).
      class Program
      {
          static void Main()
          {
              List<int> testList = new List<int> { 3, 7, 3, 2, 1, -4, 10, 12, 4 };
              testList.BubbleSort();
              foreach (var t in testList) Console.Write(t + " ");
          }
      }
  }`);
  assert.equal(code, 'C#');
});

test('merge sort', () => {
  const code = detectLang(`namespace RosettaCode {
    using System;
   
    public class MergeSort<T> where T : IComparable {
      #region Constants
      public const UInt32 INSERTION_LIMIT_DEFAULT = 12;
      public const Int32 MERGES_DEFAULT = 6;
      #endregion
   
      #region Properties
      public UInt32 InsertionLimit { get; }
      protected UInt32[] Positions { get; set; }
   
      private Int32 merges;
      public Int32 Merges {
        get { return merges; }
        set {
          // A minimum of 2 merges are required
          if (value > 1)
            merges = value;
          else
            throw new ArgumentOutOfRangeException($"value = {value} must be greater than one", nameof(Merges));
   
          if (Positions == null || Positions.Length != merges)
            Positions = new UInt32[merges];
        }
      }
      #endregion
   
      #region Constructors
      public MergeSort(UInt32 insertionLimit, Int32 merges) {
        InsertionLimit = insertionLimit;
        Merges = merges;
      }
   
      public MergeSort()
        : this(INSERTION_LIMIT_DEFAULT, MERGES_DEFAULT) {
      }
      #endregion
   
      #region Sort Methods
      public void Sort(T[] entries) {
        // Allocate merge buffer
        var entries2 = new T[entries.Length];
        Sort(entries, entries2, 0, entries.Length - 1);
      }
   
      // Top-Down K-way Merge Sort
      public void Sort(T[] entries1, T[] entries2, Int32 first, Int32 last) {
        var length = last + 1 - first;
        if (length < 2) return;      
        if (length < Merges || length < InsertionLimit) {
          InsertionSort<T>.Sort(entries1, first, last);
          return;
        }
   
        var left = first;
        var size = ceiling(length, Merges);
        for (var remaining = length; remaining > 0; remaining -= size, left += size) {
          var right = left + Math.Min(remaining, size) - 1;
          Sort(entries1, entries2, left, right);
        }
   
        Merge(entries1, entries2, first, last);
        Array.Copy(entries2, first, entries1, first, length);
      }
      #endregion
   
      #region Merge Methods
      public void Merge(T[] entries1, T[] entries2, Int32 first, Int32 last) {
        Array.Clear(Positions, 0, Merges);
        // This implementation has a quadratic time dependency on the number of merges
        for (var index = first; index <= last; index++)
          entries2[index] = remove(entries1, first, last);
      }
   
      private T remove(T[] entries, Int32 first, Int32 last) {
        T entry = default;
        Int32? found = default;
        var length = last + 1 - first;
   
        var index = 0;
        var left = first;
        var size = ceiling(length, Merges);
        for (var remaining = length; remaining > 0; remaining -= size, left += size, index++) {
          var position = Positions[index];
          if (position < Math.Min(remaining, size)) {
            var next = entries[left + position];
            if (!found.HasValue || entry.CompareTo(next) > 0) {
              found = index;
              entry = next;
            }
          }
        }
   
        // Remove entry
        Positions[found.Value]++;
        return entry;
      }
      #endregion
   
      #region Math Methods
      private static Int32 ceiling(Int32 numerator, Int32 denominator) {
        return (numerator + denominator - 1) / denominator;
      }
      #endregion
    }
   
    #region Insertion Sort
    static class InsertionSort<T> where T : IComparable {
      public static void Sort(T[] entries, Int32 first, Int32 last) {
        for (var next = first + 1; next <= last; next++)
          insert(entries, first, next);
      }
   
      /// <summary>Bubble next entry up to its sorted location, assuming entries[first:next - 1] are already sorted.</summary>
      private static void insert(T[] entries, Int32 first, Int32 next) {
        var entry = entries[next];
        while (next > first && entries[next - 1].CompareTo(entry) > 0)
          entries[next] = entries[--next];
        entries[next] = entry;
      }
    }
    #endregion
  }`);
  assert.equal(code, 'C#');
});

test('fibonacci sequence', () => {
  const code = detectLang(`public static IEnumerable<long> Fibs(uint x) {
      IList<ulong> fibs = new List<ulong>();
  
      ulong prev = -1;
      ulong next = 1;
      for (int i = 0; i < x; i++)
      {
      long sum = prev + next;
          prev = next;
          next = sum;
          fibs.Add(sum); 
      }
      return fibs;
  }
 `);
  assert.equal(code, 'C#');
});

test('happy numbers', () => {
  const code = detectLang(`using System;
  using System.Collections.Generic;
  using System.Linq;
  using System.Text;
   
  namespace HappyNums
  {
      class Program
      {
          public static bool ishappy(int n)
          {
              List<int> cache = new List<int>();
              int sum = 0;
              while (n != 1)
              {
                  if (cache.Contains(n))
                  {
                      return false;
                  }
                  cache.Add(n);
                  while (n != 0)
                  {
                      int digit = n % 10;
                      sum += digit * digit;
                      n /= 10;
                  }
                  n = sum;
                  sum = 0;
              }
             return true;            
          }
   
          static void Main(string[] args)
          {
              int num = 1;
              List<int> happynums = new List<int>();
   
              while (happynums.Count < 8)
              {
                  if (ishappy(num))
                  {
                      happynums.Add(num);
                  }
                  num++;
              }
              Console.WriteLine("First 8 happy numbers : " + string.Join(",", happynums));
          }
      }
  }`);
  assert.equal(code, 'C#');
});

test('gamma function', () => {
  const code = detectLang(`using System;
  using System.Numerics;
   
  static int g = 7;
  static double[] p = {0.99999999999980993, 676.5203681218851, -1259.1392167224028,
         771.32342877765313, -176.61502916214059, 12.507343278686905,
         -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7};
   
  Complex Gamma(Complex z)
  {
      // Reflection formula
      if (z.Real < 0.5)
    {
          return Math.PI / (Complex.Sin( Math.PI * z) * Gamma(1 - z));
    }
      else
    {
          z -= 1;
          Complex x = p[0];
          for (var i = 1; i < g + 2; i++)
      {
              x += p[i]/(z+i);
      }
          Complex t = z + g + 0.5;
          return Complex.Sqrt(2 * Math.PI) * (Complex.Pow(t, z + 0.5)) * Complex.Exp(-t) * x;
    }
  }
   `);
  assert.equal(code, 'C#');
});

test('fivenum', () => {
  const code = detectLang(`using System;
  using System.Collections.Generic;
  using System.Linq;
  using System.Text;
   
  namespace Fivenum {
      public static class Helper {
          public static string AsString<T>(this ICollection<T> c, string format = "{0}") {
              StringBuilder sb = new StringBuilder("[");
              int count = 0;
              foreach (var t in c) {
                  if (count++ > 0) {
                      sb.Append(", ");
                  }
                  sb.AppendFormat(format, t);
              }
              return sb.Append("]").ToString();
          }
      }
   
      class Program {
          static double Median(double[] x, int start, int endInclusive) {
              int size = endInclusive - start + 1;
              if (size <= 0) throw new ArgumentException("Array slice cannot be empty");
              int m = start + size / 2;
              return (size % 2 == 1) ? x[m] : (x[m - 1] + x[m]) / 2.0;
          }
   
          static double[] Fivenum(double[] x) {
              foreach (var d in x) {
                  if (Double.IsNaN(d)) {
                      throw new ArgumentException("Unable to deal with arrays containing NaN");
                  }
              }
              double[] result = new double[5];
              Array.Sort(x);
              result[0] = x.First();
              result[2] = Median(x, 0, x.Length - 1);
              result[4] = x.Last();
              int m = x.Length / 2;
              int lowerEnd = (x.Length % 2 == 1) ? m : m - 1;
              result[1] = Median(x, 0, lowerEnd);
              result[3] = Median(x, m, x.Length - 1);
              return result;
          }
   
          static void Main(string[] args) {
              double[][] x1 = new double[][]{
                  new double[]{ 15.0, 6.0, 42.0, 41.0, 7.0, 36.0, 49.0, 40.0, 39.0, 47.0, 43.0},
                  new double[]{ 36.0, 40.0, 7.0, 39.0, 41.0, 15.0},
                  new double[]{
                       0.14082834,  0.09748790,  1.73131507,  0.87636009, -1.95059594,  0.73438555,
                      -0.03035726,  1.46675970, -0.74621349, -0.72588772,  0.63905160,  0.61501527,
                      -0.98983780, -1.00447874, -0.62759469,  0.66206163,  1.04312009, -0.10305385,
                       0.75775634,  0.32566578
                  },
              };
              foreach(var x in x1) {
                  var result = Fivenum(x);
                  Console.WriteLine(result.AsString("{0:F8}"));
              }
          }
      }
  }`);
  assert.equal(code, 'C#');
});

test('y combinator', () => {
  const code = detectLang(`using System;
 
  static class YCombinator<T, TResult>
  {
      // RecursiveFunc is not needed to call Fix() and so can be private.
      private delegate Func<T, TResult> RecursiveFunc(RecursiveFunc r);
   
      public static Func<Func<Func<T, TResult>, Func<T, TResult>>, Func<T, TResult>> Fix { get; } =
          f => ((RecursiveFunc)(g => f(x => g(g)(x))))(g => f(x => g(g)(x)));
  }
   
  static class Program
  {
      static void Main()
      {
          var fac = YCombinator<int, int>.Fix(f => x => x < 2 ? 1 : x * f(x - 1));
          var fib = YCombinator<int, int>.Fix(f => x => x < 2 ? x : f(x - 1) + f(x - 2));
   
          Console.WriteLine(fac(10));
          Console.WriteLine(fib(10));
      }
  }
   `);
  assert.equal(code, 'C#');
});

test.run();
