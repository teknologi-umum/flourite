import { test } from "uvu";
import * as assert from "uvu/assert";
import detectLang from "../src";

test("hello world", () => {
  const code = detectLang(`fun main(args: Array<String>) {
    println("Goodbye, World!")
}`);
  assert.equal(code.language, "Kotlin");
});

test("fizz buzz", () => {
  const code = detectLang(`fun main(args: Array<String>) {
 
    //Read the maximum number, set to 0 if it couldn't be read
    val max = readLine()?.toInt() ?: 0
    val words = mutableMapOf<Int, String>()
 
    //Read input three times for a factor and a word
    (1..3).forEach {
        readLine()?.let {
            val tokens = it.split(' ')
            words.put(tokens[0].toInt(), tokens[1])
        }
    }
 
    //Sort the words so they will be output in arithmetic order
    val sortedWords = words.toSortedMap()
 
    //Find the words with matching factors and print them, print the number if no factors match
    for (i in 1..max) {
        val wordsToPrint = sortedWords.filter { i % it.key == 0 }.map { it.value }
        if (wordsToPrint.isNotEmpty()) {
            wordsToPrint.forEach { print(it) }
            println()
        }
        else
            println(i)
    }
}`);
  assert.equal(code.language, "Kotlin");
});

test("guess the number", () => {
  const code = detectLang(`// version 1.0.5-2
 
  fun main(args: Array<String>) {
    val n = (1 + java.util.Random().nextInt(10)).toString()
    println("Guess which number I've chosen in the range 1 to 10\n")
    do { print(" Your guess : ") } while (n != readLine())
    println("\\nWell guessed!")
  }`);
  assert.equal(code.language, "Kotlin");
});

test("date manipulation", () => {
  const code = detectLang(`import java.text.SimpleDateFormat
  import java.util.*
   
  fun main(args: Array<String>) {
      val dts  = "March 7 2009 7:30pm EST"
      val sdf  = SimpleDateFormat("MMMM d yyyy h:mma z")
      val dt   = sdf.parse(dts)
      val cal  = GregorianCalendar(TimeZone.getTimeZone("EST"))  // stay with EST
      cal.time = dt
      cal.add(Calendar.HOUR_OF_DAY, 12) // add 12 hours
      val fmt = "%tB %1\\$td %1\\$tY %1\\$tl:%1\\$tM%1\\$tp %1\\$tZ"
      println(fmt.format(cal)) // display new time
   
      // display time now in Mountain Standard Time which is 2 hours earlier than EST
      cal.timeZone = TimeZone.getTimeZone("MST")
      println(fmt.format(cal))
  }`);
  assert.equal(code.language, "Kotlin");
});

test("humble numbers", () => {
  const code = detectLang(`fun isHumble(i: Int): Boolean {
    if (i <= 1) return true
    if (i % 2 == 0) return isHumble(i / 2)
    if (i % 3 == 0) return isHumble(i / 3)
    if (i % 5 == 0) return isHumble(i / 5)
    if (i % 7 == 0) return isHumble(i / 7)
    return false
}
 
fun main() {
    val limit: Int = Short.MAX_VALUE.toInt()
    val humble = mutableMapOf<Int, Int>()
    var count = 0
    var num = 1
 
    while (count < limit) {
        if (isHumble(num)) {
            val str = num.toString()
            val len = str.length
            humble.merge(len, 1) { a, b -> a + b }
 
            if (count < 50) print("$num ")
            count++
        }
        num++
    }
    println("\\n")
 
    println("Of the first $count humble numbers:")
    num = 1
    while (num < humble.size - 1) {
        if (humble.containsKey(num)) {
            val c = humble[num]
            println("%5d have %2d digits".format(c, num))
            num++
        } else {
            break
        }
    }
}`);
  assert.equal(code.language, "Kotlin");
});

test("attractive number", () => {
  const code = detectLang(`const val MAX = 120
 
  fun isPrime(n: Int) : Boolean {
      if (n < 2) return false
      if (n % 2 == 0) return n == 2
      if (n % 3 == 0) return n == 3
      var d : Int = 5
      while (d * d <= n) {
          if (n % d == 0) return false
          d += 2
          if (n % d == 0) return false
          d += 4
      }
      return true
  }
   
  fun countPrimeFactors(n: Int) =
      when {
          n == 1  -> 0
          isPrime(n) -> 1
          else -> {
              var nn = n
              var count = 0
              var f = 2
              while (true) {
                  if (nn % f == 0) {
                      count++
                      nn /= f
                      if (nn == 1) break
                      if (isPrime(nn)) f = nn
                  } else if (f >= 3) {
                      f += 2
                  } else {
                      f = 3
                  }
              }
              count
          }
      }
   
  fun main() {
      println("The attractive numbers up to and including $MAX are:")
      var count = 0
      for (i in 1..MAX) {
          val n = countPrimeFactors(i)
          if (isPrime(n)) {
              System.out.printf("%4d", i)
              if (++count % 20 == 0) println()
          }
      }
      println()
  }`);
  assert.equal(code.language, "Kotlin");
});

test("bubble sort", () => {
  const code = detectLang(`import java.util.Comparator
 
  fun <T> bubbleSort(a: Array<T>, c: Comparator<T>) {
      var changed: Boolean
      do {
          changed = false
          for (i in 0..a.size - 2) {
              if (c.compare(a[i], a[i + 1]) > 0) {
                  val tmp = a[i]
                  a[i] = a[i + 1]
                  a[i + 1] = tmp
                  changed = true
              }
          }
      } while (changed)
  }`);
  assert.equal(code.language, "Kotlin");
});

test("heap sort", () => {
  const code = detectLang(`fun heapSort(a: IntArray) {
    heapify(a)
    var end = a.size - 1
    while (end > 0) {
        val temp = a[end]
        a[end] = a[0]
        a[0] = temp
        end--
        siftDown(a, 0, end)
    }
}
 
fun heapify(a: IntArray) {
    var start = (a.size - 2) / 2
    while (start >= 0) {
        siftDown(a, start, a.size - 1)
        start--
    }
}
 
fun siftDown(a: IntArray, start: Int, end: Int) {
    var root = start
    while (root * 2 + 1 <= end) {
        var child = root * 2 + 1
        if (child + 1 <= end && a[child] < a[child + 1]) child++
        if (a[root] < a[child]) {
            val temp = a[root]
            a[root] = a[child]
            a[child] = temp
            root = child
        }
        else return
    }
}
 
fun main(args: Array<String>) {
    val aa = arrayOf(
        intArrayOf(100, 2, 56, 200, -52, 3, 99, 33, 177, -199),
        intArrayOf(4, 65, 2, -31, 0, 99, 2, 83, 782, 1),
        intArrayOf(12, 11, 15, 10, 9, 1, 2, 3, 13, 14, 4, 5, 6, 7, 8)
    )
    for (a in aa) {
        heapSort(a)
        println(a.joinToString(", "))
    }
}`);
  assert.equal(code.language, "Kotlin");
});

test("merge sort", () => {
  const code = detectLang(`fun mergeSort(list: List<Int>): List<Int> {
    if (list.size <= 1) {
        return list
    }
 
    val left = mutableListOf<Int>()
    val right = mutableListOf<Int>()
 
    val middle = list.size / 2
    list.forEachIndexed { index, number ->
        if (index < middle) {
            left.add(number)
        } else {
            right.add(number)
        }
    }
 
    fun merge(left: List<Int>, right: List<Int>): List<Int> = mutableListOf<Int>().apply {
        var indexLeft = 0
        var indexRight = 0
 
        while (indexLeft < left.size && indexRight < right.size) {
            if (left[indexLeft] <= right[indexRight]) {
                add(left[indexLeft])
                indexLeft++
            } else {
                add(right[indexRight])
                indexRight++
            }
        }
 
        while (indexLeft < left.size) {
            add(left[indexLeft])
            indexLeft++
        }
 
        while (indexRight < right.size) {
            add(right[indexRight])
            indexRight++
        }
    }
 
    return merge(mergeSort(left), mergeSort(right))
}
 
fun main(args: Array<String>) {
    val numbers = listOf(5, 2, 3, 17, 12, 1, 8, 3, 4, 9, 7)
    println("Unsorted: $numbers")
    println("Sorted: \${mergeSort(numbers)}")
}`);
  assert.equal(code.language, "Kotlin");
});

test("palindrome", () => {
  const code = detectLang(`// version 1.1.2
 
  /* These functions deal automatically with Unicode as all strings are UTF-16 encoded in Kotlin */
   
  fun isExactPalindrome(s: String) = (s == s.reversed())
   
  fun isInexactPalindrome(s: String): Boolean {
      var t = ""
      for (c in s) if (c.isLetterOrDigit()) t += c
      t = t.toLowerCase()
      return t == t.reversed()
  }
   
  fun main(args: Array<String>) {
      val candidates = arrayOf("rotor", "rosetta", "step on no pets", "été")
      for (candidate in candidates) {
          println("'$candidate' is \${if (isExactPalindrome(candidate)) "an" else "not an"} exact palindrome")
      }
      println()
      val candidates2 = arrayOf(
           "In girum imus nocte et consumimur igni",
           "Rise to vote, sir",
           "A man, a plan, a canal - Panama!",
           "Ce repère, Perec"  // note: 'è' considered a distinct character from 'e'
      )
      for (candidate in candidates2) {
          println("'$candidate' is \${if (isInexactPalindrome(candidate)) "an" else "not an"} inexact palindrome")
      }
  }`);
  assert.equal(code.language, "Kotlin");
});

test("floyd warshall", () => {
  const code = detectLang(`object FloydWarshall {
    fun doCalcs(weights: Array<IntArray>, nVertices: Int) {
        val dist = Array(nVertices) { DoubleArray(nVertices) { Double.POSITIVE_INFINITY } }
        for (w in weights) dist[w[0] - 1][w[1] - 1] = w[2].toDouble()
        val next = Array(nVertices) { IntArray(nVertices) }
        for (i in 0 until next.size) {
            for (j in 0 until next.size) {
                if (i != j) next[i][j] = j + 1
            }
        }
        for (k in 0 until nVertices) {
            for (i in 0 until nVertices) {
                for (j in 0 until nVertices) {
                    if (dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j]
                        next[i][j] = next[i][k]
                    }
                }
            }
        }
        printResult(dist, next)
    }
 
    private fun printResult(dist: Array<DoubleArray>, next: Array<IntArray>) {
        var u: Int
        var v: Int
        var path: String
        println("pair     dist    path")
        for (i in 0 until next.size) {
            for (j in 0 until next.size) {
                if (i != j) {
                    u = i + 1
                    v = j + 1
                    path = ("%d -> %d    %2d     %s").format(u, v, dist[i][j].toInt(), u)
                    do {
                        u = next[u - 1][v - 1]
                        path += " -> " + u
                    } while (u != v)
                    println(path)
                }
            }
        }
    }
}
 
fun main(args: Array<String>) {
    val weights = arrayOf(
            intArrayOf(1, 3, -2),
            intArrayOf(2, 1, 4),
            intArrayOf(2, 3, 3),
            intArrayOf(3, 4, 2),
            intArrayOf(4, 2, -1)
    )
    val nVertices = 4
    FloydWarshall.doCalcs(weights, nVertices)
}`);
  assert.equal(code.language, "Kotlin");
});

test("most frequent k chair distance", () => {
  const code = detectLang(`fun mostFreqKHashing(input: String, k: Int): String = 
  input.groupBy { it }.map { Pair(it.key, it.value.size) }
                      .sortedByDescending { it.second } // preserves original order when equal
                      .take(k)
                      .fold("") { acc, v -> acc + "\${v.first}\${v.second.toChar()}" }

fun mostFreqKSimilarity(input1: String, input2: String): Int {
  var similarity = 0
  for (i in 0 until input1.length step 2) {
      for (j in 0 until input2.length step 2) {
          if (input1[i] == input2[j]) {
              val freq1 = input1[i + 1].toInt()
              val freq2 = input2[j + 1].toInt()
              if (freq1 != freq2) continue  // assuming here that frequencies need to match
              similarity += freq1
          }
      }
  }
  return similarity
}

fun mostFreqKSDF(input1: String, input2: String, k: Int, maxDistance: Int) {
  println("input1 : $input1")
  println("input2 : $input2")
  val s1 = mostFreqKHashing(input1, k)
  val s2 = mostFreqKHashing(input2, k)
  print("mfkh(input1, $k) = ")
  for ((i, c) in s1.withIndex()) print(if (i % 2 == 0) c.toString() else c.toInt().toString())
  print("\\nmfkh(input2, $k) = ")
  for ((i, c) in s2.withIndex()) print(if (i % 2 == 0) c.toString() else c.toInt().toString())
  val result = maxDistance - mostFreqKSimilarity(s1, s2)
  println("\\nSDF(input1, input2, $k, $maxDistance) = $result\\n")
}

fun main(args: Array<String>) {
  val pairs = listOf(
      Pair("research", "seeking"),
      Pair("night", "nacht"),
      Pair("my", "a"),
      Pair("research", "research"),
      Pair("aaaaabbbb", "ababababa"),
      Pair("significant", "capabilities")
  )
  for (pair in pairs) mostFreqKSDF(pair.first, pair.second, 2, 10)

  var s1 = "LCLYTHIGRNIYYGSYLYSETWNTGIMLLLITMATAFMGYVLPWGQMSFWGATVITNLFSAIPYIGTNLV"
  var s2 = "EWIWGGFSVDKATLNRFFAFHFILPFTMVALAGVHLTFLHETGSNNPLGLTSDSDKIPFHPYYTIKDFLG"
  mostFreqKSDF(s1, s2, 2, 100)
  s1 = "abracadabra12121212121abracadabra12121212121"
  s2 = s1.reversed()
  mostFreqKSDF(s1, s2, 2, 100)
}`);
  assert.equal(code.language, "Kotlin");
});

test("bankers algorithm", () => {
  const code = detectLang(`fun main(args: Array<String>) {
    print("Enter the number of resources: ")
    val r = readLine()!!.toInt()
 
    print("\\nEnter the number of processes: ")
    val p = readLine()!!.toInt()
 
    print("\\nEnter Claim Vector: ")
    val maxRes = readLine()!!.split(' ').map { it.toInt() } .toIntArray()
 
    println("\\nEnter Allocated Resource Table:")
    val curr = Array(p) { IntArray(r) }
    for (i in 0 until p) {
        print("Row \${i + 1}:  ")
        curr[i] = readLine()!!.split(' ').map { it.toInt() }.toIntArray()
    }
 
    println("\\nEnter Maximum Claim Table: ")
    val maxClaim = Array(p) { IntArray(r) }
    for (i in 0 until p) {
        print("Row \${i + 1}:  ")
        maxClaim[i] = readLine()!!.split(' ').map { it.toInt() }.toIntArray()
    }
 
    val alloc = IntArray(r)
    for (i in 0 until p) {
        for (j in 0 until r) alloc[j] += curr[i][j]
    }
    println("\\nAllocated Resources: \${alloc.joinToString(" ")}")
 
    val avl = IntArray(r) { maxRes[it] - alloc[it] }
    println("\\nAvailable Resources: \${avl.joinToString(" ")}")
 
    val running = BooleanArray(p) { true }
    var count = p
    while (count != 0) {
        var safe = false
        for (i in 0 until p) {
            if (running[i]) {
                var exec = true
                for (j in 0 until r) {
                    if (maxClaim[i][j] - curr[i][j] > avl[j]) {
                        exec = false
                        break
                    }
                }
 
                if (exec) {
                    print("\\nProcess \${i + 1} is executing.\\n")
                    running[i] = false
                    count--
                    safe = true
                    for (j in 0 until r) avl[j] += curr[i][j]
                    break
                }
            }
        }
 
        if (!safe) {
            print("The processes are in an unsafe state.")
            break
        }
 
        print("\\nThe process is in a safe state.")
        println("\\nAvailable Vector: \${avl.joinToString(" ")}")
    }
}`);
  assert.equal(code.language, "Kotlin");
});

test("average loop length", () => {
  const code = detectLang(`const val NMAX  = 20
    const val TESTS = 1000000
    val rand = java.util.Random()
     
    fun avg(n: Int): Double {
        var sum = 0
        for (t in 0 until TESTS) {
            val v = BooleanArray(NMAX)
            var x = 0
            while (!v[x]) {
                v[x] = true
                sum++
                x = rand.nextInt(n)
            }
        }
        return sum.toDouble() / TESTS
    }
     
    fun ana(n: Int): Double {
        val nn = n.toDouble()
        var term = 1.0
        var sum = 1.0
        for (i in n - 1 downTo 1) {
            term *= i / nn
            sum += term
        }
        return sum
    }
     
    fun main(args: Array<String>) {
        println(" N    average    analytical    (error)")
        println("===  =========  ============  =========")
        for (n in 1..NMAX) {
            val a = avg(n)
            val b = ana(n)
            println(String.format("%3d   %6.4f   %10.4f      (%4.2f%%)", n, a, b, Math.abs(a - b) / b * 100.0))
        }
    }`);
  assert.equal(code.language, "Kotlin");
});

test("gamma function", () => {
  const code = detectLang(`fun gammaStirling(x: Double): Double = Math.sqrt(2.0 * Math.PI / x) * Math.pow(x / Math.E, x)
 
    fun gammaLanczos(x: Double): Double {
        var xx = x
        val p = doubleArrayOf(
            0.99999999999980993, 
          676.5203681218851,
        -1259.1392167224028,			     	  
          771.32342877765313,
         -176.61502916214059,
           12.507343278686905,
           -0.13857109526572012,
            9.9843695780195716e-6,
            1.5056327351493116e-7
        )
        val g = 7
        if (xx < 0.5) return Math.PI / (Math.sin(Math.PI * xx) * gammaLanczos(1.0 - xx))
        xx--
        var a = p[0]
        val t = xx + g + 0.5
        for (i in 1 until p.size) a += p[i] / (xx + i)
        return Math.sqrt(2.0 * Math.PI) * Math.pow(t, xx + 0.5) * Math.exp(-t) * a
    }
     
    fun main(args: Array<String>) {
        println(" x\tStirling\t\tLanczos\n")
        for (i in 1 .. 20) {
            val d = i / 10.0
            print("%4.2f\t".format(d))
            print("%17.15f\t".format(gammaStirling(d)))
            println("%17.15f".format(gammaLanczos(d)))
        }
    }`);
  assert.equal(code.language, "Kotlin");
});

test("number calculation function", () => {
  const code = detectLang(`fun main(args: Array<String>) {

        var sum: Int = 0
        var input: String
    
        do {
            print("Enter an integer: ")
            input = readLine()!!
            sum += input.toInt()
    
        } while (input != "0")
    
        println("sum = $sum")
    }`);
  assert.equal(code.language, "Kotlin");
});

test("simple while loop implementation", () => {
  const code = detectLang(`fun main(args: Array) {
        var i: Int = 1
        while(true){
            println(i)
            i=i+1
            if(i>4)
                break;
        }
    }`);
  assert.equal(code.language, "Kotlin");
});

test("largest among 3 numbers programme", () => {
  const code = detectLang(`fun main(args: Array<String>) {

        val n1 = 3
        val n2 = 5
        val n3 = -2
    
        val max = if (n1 > n2) {
            if (n1 > n3)
                n1
            else
                n3
        } else {
            if (n2 > n3)
                n2
            else
                n3
        }
    
        println("max = $max")
    }`);
  assert.equal(code.language, "Kotlin");
});

test("bubble sort function", () => {
  const code = detectLang(`import java.util.Comparator
 
    fun <T> bubbleSort(a: Array<T>, c: Comparator<T>) {
        var changed: Boolean
        do {
            changed = false
            for (i in 0..a.size - 2) {
                if (c.compare(a[i], a[i + 1]) > 0) {
                    val tmp = a[i]
                    a[i] = a[i + 1]
                    a[i + 1] = tmp
                    changed = true
                }
            }
        } while (changed)
    }`);
  assert.equal(code.language, "Kotlin");
});

test.run();
