import { test } from "uvu";
import * as assert from "uvu/assert";
import detectLang from "../src/index";

test("hello world", () => {
  const code = detectLang(`(binding [*out* *err*]
    (println "Goodbye, world!"))`);
  assert.equal(code.language, "Clojure");
});

test("guess the number", () => {
  const code = detectLang(`(def target (inc (rand-int 10))
 
  (loop [n 0]
     (println "Guess a number between 1 and 10 until you get it right:")
     (let [guess (read)]
    (if (= guess target)
        (printf "Correct on the %d guess.\n" n)
        (do
         (println "Try again")
         (recur (inc n))))))`);
  assert.equal(code.language, "Clojure");
});

test("fizz buzz", () => {
  const code = detectLang(
    `(doseq [x (range 1 101)] (println x (str (when (zero? (mod x 3)) "fizz") (when (zero? (mod x 5)) "buzz"))))`
  );
  assert.equal(code.language, "Clojure");
});

test("bubble sort", () => {
  const code = detectLang(`(defn- bubble-step
    "was-changed: whether any elements prior to the current first element
    were swapped;
    returns a two-element vector [partially-sorted-sequence is-sorted]"
   [less? xs was-changed]
    (if (< (count xs) 2)
      [xs (not was-changed)]
      (let [[x1 x2 & xr] xs
      first-is-smaller   (less? x1 x2)
      is-changed         (or was-changed (not first-is-smaller))
      [smaller larger]   (if first-is-smaller [x1 x2] [x2 x1])
      [result is-sorted] (bubble-step
              less? (cons larger xr) is-changed)]
        [(cons smaller result) is-sorted])))
   
  (defn bubble-sort
    "Takes an optional less-than predicate and a sequence.
    Returns the sorted sequence.
    Very inefficient (O(n²))"
    ([xs] (bubble-sort <= xs))
    ([less? xs] 
       (let [[result is-sorted] (bubble-step less? xs false)]
         (if is-sorted
     result
     (recur less? result)))))
   
  (println (bubble-sort [10 9 8 7 6 5 4 3 2 1]))`);
  assert.equal(code.language, "Clojure");
});

test("heap sort", () => {
  const code = detectLang(`(defn- swap [a i j]
    (assoc a i (nth a j) j (nth a i)))
   
  (defn- sift [a pred k l]
    (loop [a a x k y (inc (* 2 k))]
      (if (< (inc (* 2 x)) l)
        (let [ch (if (and (< y (dec l)) (pred (nth a y) (nth a (inc y))))
                   (inc y)
                   y)]
          (if (pred (nth a x) (nth a ch))
            (recur (swap a x ch) ch (inc (* 2 ch)))
            a))
        a)))
   
  (defn- heapify[pred a len]
    (reduce (fn [c term] (sift (swap c term 0) pred 0 term))
            (reduce (fn [c i] (sift c pred i len))
                    (vec a)
                    (range (dec (int (/ len 2))) -1 -1))
            (range (dec len) 0 -1)))
   
  (defn heap-sort
    ([a pred]
     (let [len (count a)]
       (heapify pred a len)))
    ([a]
       (heap-sort a <)))`);
  assert.equal(code.language, "Clojure");
});

test("merge sort", () => {
  const code = detectLang(`(defn merge [left right]
    (cond (nil? left) right
          (nil? right) left
          :else (let [[l & *left] left
                      [r & *right] right]
                  (if (<= l r) (cons l (merge *left right))
                               (cons r (merge left *right))))))
   
  (defn merge-sort [list]
    (if (< (count list) 2)
      list
      (let [[left right] (split-at (/ (count list) 2) list)]
        (merge (merge-sort left) (merge-sort right)))))`);
  assert.equal(code.language, "Clojure");
});

test("quick sort", () => {
  const code = detectLang(`(defn qsort [[pivot & xs]]
    (when pivot
      (let [smaller #(< % pivot)]
        (lazy-cat (qsort (filter smaller xs))
      [pivot]
      (qsort (remove smaller xs))))))`);
  assert.equal(code.language, "Clojure");
});

test("is string numeric?", () => {
  const code = detectLang(`(defn numeric? [s]
    (if-let [s (seq s)]
      (let [s (if (= (first s) \\-) (next s) s)
            s (drop-while #(Character/isDigit %) s)
            s (if (= (first s) \\.) (next s) s)
            s (drop-while #(Character/isDigit %) s)]
        (empty? s))))`);
  assert.equal(code.language, "Clojure");
});

test("palindrome", () => {
  const code = detectLang(`(defn palindrome? [^String s]
    (loop [front 0 back (dec (.length s))]
      (or (>= front back)
          (and (= (.charAt s front) (.charAt s back))
               (recur (inc front) (dec back)))))`);
  assert.equal(code.language, "Clojure");
});

test("ludic numbers", () => {
  const code = detectLang(`(defn ints-from [n]
    (cons n (lazy-seq (ints-from (inc n)))))
   
  (defn drop-nth [n seq] 
     (cond 
        (zero?    n) seq
        (empty? seq) []
        :else (concat (take (dec n) seq) (lazy-seq (drop-nth n (drop n seq))))))
   
  (def ludic ((fn ludic
     ([] (ludic 1))
     ([n] (ludic n (ints-from (inc n))))
     ([n [f & r]] (cons n (lazy-seq (ludic f (drop-nth f r))))))))
   
  (defn ludic? [n]  (= (first (filter (partial <= n) ludic)) n))
   
  (print "First 25: ")
  (println (take 25 ludic))
  (print "Count below 1000: ")
  (println (count (take-while (partial > 1000) ludic)))
  (print "2000th through 2005th: ")
  (println (map (partial nth ludic) (range 1999 2005)))
  (print "Triplets < 250: ")
  (println (filter (partial every? ludic?) 
           (for [i (range 250)] (list i (+ i 2) (+ i 6)))))`);
  assert.equal(code.language, "Clojure");
});

test("date manipulation", () => {
  const code = detectLang(`(import java.util.Date
    java.text.SimpleDateFormat)
   
  (defn time+12 [s]
    (let [sdf (SimpleDateFormat. "MMMM d yyyy h:mma zzz")]
      (-> (.parse sdf s)
    (.getTime ,)
    (+ , 43200000)
    long
    (Date. ,)
    (->> , (.format sdf ,)))))`);
  assert.equal(code.language, "Clojure");
});

test("perfect shuffle", () => {
  const code = detectLang(`(defn perfect-shuffle [deck]
    (let [half (split-at (/ (count deck) 2) deck)]
      (interleave (first half) (last half))))
   
  (defn solve [deck-size]
    (let [original (range deck-size) 
          trials (drop 1 (iterate perfect-shuffle original))
          predicate #(= original %)]
      (println (format "%5s: %s" deck-size
        (inc (some identity (map-indexed (fn [i x] (when (predicate x) i)) trials)))))))
   
  (map solve [8 24 52 100 1020 1024 10000])`);
  assert.equal(code.language, "Clojure");
});

test("conditional", () => {
  const code = detectLang(`(cond
    (= 1 2) :no)
   
  (cond
    (= 1 2) :no
    (= 1 1) :yes)`);
  assert.equal(code.language, "Clojure");
});

test("currying", () => {
  const code = detectLang(`(def plus-a-hundred (partial + 100))
  (assert (= 
             (plus-a-hundred 1)
             101))`);
  assert.equal(code.language, "Clojure");
});

test("100 doors", () => {
  const code = detectLang(`(defn doors []
    (reduce (fn [doors toggle-idx] (update-in doors [toggle-idx] not))
            (into [] (repeat 100 false))
            (for [pass   (range 1 101)
                  i      (range (dec pass) 100 pass) ]
              i)))
   
  (defn open-doors [] (for [[d n] (map vector (doors) (iterate inc 1)) :when d] n))
   
  (defn print-open-doors []
    (println 
      "Open doors after 100 passes:"
      (apply str (interpose ", " (open-doors)))))`);
  assert.equal(code.language, "Clojure");
});

test("looooop", () => {
  const code = detectLang(
    `(doseq [s (map #(str %1 %2 %3) "abc" "ABC" "123")])`
  );
  assert.equal(code.language, "Clojure");
});

test("nested loop", () => {
  const code = detectLang(`(ns nested)
 
  (defn create-matrix [width height]
    (for [_ (range width)]
      (for [_ (range height)]
        (inc (rand-int 20)))))
   
  (defn print-matrix [matrix]
    (loop [[row & rs] matrix]
      (when (= (loop [[x & xs] row]
                 (cond (= x 20) :stop
                       xs (recur xs)
                       :else :continue))
               :continue)
        (when rs (recur rs)))))
   
  (print-matrix (create-matrix 10 10))`);
  assert.equal(code.language, "Clojure");
});

test.run();
