import { test } from "uvu";
import * as assert from "uvu/assert";
import detectLang from "../src/index";

test("hello world", () => {
  const code = detectLang(`main() {
    var bye = 'Hello world!';
    print("$bye");
}`);
  assert.equal(code.language, "Dart");
});

test("async", () => {
  const code = detectLang(`Future<void> main() async {
  checkVersion();
  print('In main: version is \${await lookUpVersion()}');
}`);
  assert.equal(code.language, "Dart");
});

test("async loop", () => {
  const code = detectLang(`await for (final request in requestServer) {
  handleRequest(request);
}`);
  assert.equal(code.language, "Dart");
});

test("typedef", () => {
  const code = detectLang(`typedef Compare<T> = int Function(T a, T b);

int sort(int a, int b) => a - b;

void main() {
  assert(sort is Compare<int>); // True!
}`);
  assert.equal(code.language, "Dart");
});

test("happy numbers", () => {
  const code = detectLang(`main() {
  HashMap<int,bool> happy = new HashMap<int,bool>();
  happy[1] = true;

  int count = 0;
  int i = 0;

  while (count<8) {
    if (happy[i] == null) {
      int j = i;
      Set<int> sequence = new Set<int>();
      while (happy[j] == null && !sequence.contains(j)) {
        sequence.add(j);
        int sum = 0;
        int val = j;
        while (val>0) {
          int digit = val % 10;
          sum += digit * digit;
          val = (val/10).toInt();
        }
        j = sum;
      }
      bool sequenceHappy = happy[j];
      Iterator<int> it = sequence.iterator();
      while (it.hasNext()) {
        happy[it.next()]=sequenceHappy;
      }
    }
    if (happy[i]) {
      print(i);
      count++;
    }
    i++;
  }
}`);
  assert.equal(code.language, "Dart");
});

test("fizz buzz", () => {
  const code = detectLang(`void main() {
  for (int i = 1; i <= 100; i++) {
    List<String> out = [];
    if (i % 3 == 0)
      out.add("Fizz");
    if (i % 5 == 0)
      out.add("Buzz");
    print(out.length > 0 ? out.join("") : i);
  }
}`);
  assert.equal(code.language, "Dart");
});

test("guess the number", () => {
  const code = detectLang(`import 'dart:math';
import 'dart:io';

main() {
  final n = (1 + new Random().nextInt(10)).toString();
  print("Guess which number I've chosen in the range 1 to 10");
  do { stdout.write(" Your guess : "); } while (n != stdin.readLineSync());
  print("\nWell guessed!");
}`);
  assert.equal(code.language, "Dart");
});

test("bubble sort", () => {
  const code = detectLang(`List<num> bubbleSort(List<num> list) {
  var retList = new List<num>.from(list);
  var tmp;
  var swapped = false;
  do {
    swapped = false;
    for (var i = 1; i < retList.length; i++) {
      if (retList[i - 1] > retList[i]) {
        tmp = retList[i - 1];
        retList[i - 1] = retList[i];
        retList[i] = tmp;
        swapped = true;
      }
    }
  } while(swapped);

  return retList;
}`);
  assert.equal(code.language, "Dart");
});

test("merge sort", () => {
  const code = detectLang(`void main() {
  MergeSortInDart sampleSort = MergeSortInDart();

  List<int> theResultingList = sampleSort.sortTheList([54, 89, 125, 47899, 32, 61, 42, 895647, 215, 345, 6, 21, 2, 78]);

  print('Here\\'s the sorted list: \${theResultingList}');
}

class MergeSortInDart {

  List<int> sortedList;

  // In Dart we often put helper functions at the bottom.
  // You could put them anywhere, we just like it this way
  // for organizational purposes. It's nice to be able to
  // read them in the order they're called.

  // Start here
  List<int> sortTheList(List<int> sortThis){
    // My parameters are listed vertically for readability. Dart
    // doesn't care how you list them, vertically or horizontally.
    sortedList = mSort(
      sortThis,
      sortThis.sublist(0, sortThis.length),
      sortThis.length,
    );
    return sortThis;
  }

  mSort(
    List<int> sortThisList,
    List<int> tempList,
    int thisListLength) {

    if (thisListLength == 1) {
      return;
    }

    // In Dart using ~/ is more efficient than using .floor()
    int middle = (thisListLength ~/ 2);

    // If you use something in a try/on/catch/finally block then
    // be sure to declare it outside the block (for scope)
    List<int> tempLeftList;

    // This was used for troubleshooting. It was left here to show
    // how a basic block try/on can be better than a debugPrint since
    // it won't print unless there's a problem.
    try {
      tempLeftList = tempList.sublist(0, middle);
    } on RangeError {
      print(
          'tempLeftList length = \${tempList.length}, thisListLength '
            'was supposedly $thisListLength and Middle was $middle');
    }

    // If you see "myList.getRange(x,y)" that's a sign the code is
    // from Dart 1 and needs to be updated. It's "myList.sublist" in Dart 2
    List<int> tempRightList = tempList.sublist(middle);

    // Left side.
    mSort(
      tempLeftList,
      sortThisList.sublist(0, middle),
      middle,
    );

    // Right side.
    mSort(
      tempRightList,
      sortThisList.sublist(middle),
      sortThisList.length - middle,
    );

    // Merge it.
    dartMerge(
      tempLeftList,
      tempRightList,
      sortThisList,
    );
  }

  dartMerge(
    List<int> leftSide,
    List<int> rightSide,
    List<int> sortThisList,
    ) {
    int index = 0;
    int elementValue;

    // This should be human readable.
    while (leftSide.isNotEmpty && rightSide.isNotEmpty) {
      if (rightSide[0] < leftSide[0]) {
        elementValue = rightSide[0];
        rightSide.removeRange(0, 1);
      } else {
        elementValue = leftSide[0];
        leftSide.removeRange(0, 1);
      }
      sortThisList[index++] = elementValue;
    }

    while (leftSide.isNotEmpty) {
      elementValue = leftSide[0];
      leftSide.removeRange(0, 1);
      sortThisList[index++] = elementValue;
    }

    while (rightSide.isNotEmpty) {
      elementValue = rightSide[0];
      rightSide.removeRange(0, 1);
      sortThisList[index++] = elementValue;
    }
    sortedList = sortThisList;
  }
}`);
  assert.equal(code.language, "Dart");
});

test("heap sort", () => {
  const code = detectLang(`void heapSort(List a) {
int count = a.length;

// first place 'a' in max-heap order
heapify(a, count);

int end = count - 1;
while (end > 0) {
  // swap the root (maximum value) of the heap with the
  // last element of the heap
  int tmp = a[end];
  a[end] = a[0];
  a[0] = tmp;

  // put the heap back in max-heap order
  siftDown(a, 0, end - 1);

  // decrement the size of the heap so that the previous
  // max value will stay in its proper place
  end--;
}
}



void heapify(List a, int count) {
// start is assigned the index in 'a' of the last parent node
int start = ((count - 2)/2).toInt(); // binary heap

while (start >= 0) {
  // sift down the node at index 'start' to the proper place
  // such that all nodes below the 'start' index are in heap
  // order
  siftDown(a, start, count - 1);
  start--;
}
}

void siftDown(List a, int start, int end) {
// end represents the limit of how far down the heap to shift
int root = start;

while ((root*2 + 1) <= end) { // While the root has at least one child
  int child = root*2 + 1; // root*2+1 points to the left child
  // if the child has a sibling and the child's value is less than its sibling's...
  if (child + 1 <= end && a[child] < a[child + 1]) {
    child = child+1; // .. then point to the right child instead
  }

  if (a[root] < a[child]) { // out of max-heap order
    int tmp = a[root];
    a[root] = a[child];
    a[child] = tmp;
    root = child; // repeat to continue shifting down the child now
  } else {
    return;
  }
}

}

void main() {
var arr=[1,5,2,7,3,9,4,6,8];
print("Before sort");
arr.forEach((var i)=>print("$i"));
heapSort(arr);
print("After sort");
arr.forEach((var i)=>print("$i"));
}`);
  assert.equal(code.language, "Dart");
});

test("quick sort", () => {
  const code = detectLang(`quickSort(List a) {
  if (a.length <= 1) {
    return a;
  }

  var pivot = a[0];
  var less = [];
  var more = [];
  var pivotList = [];

  // Partition
  a.forEach((var i){
    if (i.compareTo(pivot) < 0) {
      less.add(i);
    } else if (i.compareTo(pivot) > 0) {
      more.add(i);
    } else {
      pivotList.add(i);
    }
  });

  // Recursively sort sublists
  less = quickSort(less);
  more = quickSort(more);

  // Concatenate results
  less.addAll(pivotList);
  less.addAll(more);
  return less;
}

void main() {
  var arr=[1,5,2,7,3,9,4,6,8];
  print("Before sort");
  arr.forEach((var i)=>print("$i"));
  arr = quickSort(arr);
  print("After sort");
  arr.forEach((var i)=>print("$i"));
}`);
  assert.equal(code.language, "Dart");
});

test("regular expression", () => {
  const code = detectLang(`RegExp regexp = new RegExp(r'\\w+\\!');

String capitalize(Match m) => '\${m[0].substring(0, m[0].length-1).toUpperCase()}';

void main(){
  String hello = 'hello hello! world world!';
  String hellomodified = hello.replaceAllMapped(regexp, capitalize);
  print(hello);
  print(hellomodified);
}`);
  assert.equal(code.language, "Dart");
});

test("pascal triangle", () => {
  const code = detectLang(`
import 'dart:io';

pascal(n) {
  if(n<=0) print("Not defined");

  else if(n==1) print(1);

  else {
    List<List<int>> matrix = new List<List<int>>();
    matrix.add(new List<int>());
    matrix.add(new List<int>());
    matrix[0].add(1);
    matrix[1].add(1);
    matrix[1].add(1);
    for (var i = 2; i < n; i++) {
      List<int> list = new List<int>();
      list.add(1);
      for (var j = 1; j<i; j++) {
        list.add(matrix[i-1][j-1]+matrix[i-1][j]);
      }
      list.add(1);
      matrix.add(list);
    }
    for(var i=0; i<n; i++) {
      for(var j=0; j<=i; j++) {
        stdout.write(matrix[i][j]);
        stdout.write(' ');
      }
      stdout.write('\n');
    }
  }
}

void main() {
  pascal(0);
  pascal(1);
  pascal(3);
  pascal(6);
}`);
  assert.equal(code.language, "Dart");
});

test("perfect numbers", () => {
  const code = detectLang(`/*
* Function to test if a number is a perfect number
* A number is a perfect number if it is equal to the sum of all its divisors
* Input: Positive integer n
* Output: true if n is a perfect number, false otherwise
*/
bool isPerfect(int n){
    //Generate a list of integers in the range 1 to n-1 : [1, 2, ..., n-1]
    List<int> range = new List<int>.generate(n-1, (int i) => i+1);

    //Create a list that filters the divisors of n from range
    List<int> divisors = new List.from(range.where((i) => n%i == 0));

    //Sum the all the divisors
    int sumOfDivisors = 0;
    for (int i = 0; i < divisors.length; i++){
        sumOfDivisors = sumOfDivisors + divisors[i];
    }

    // A number is a perfect number if it is equal to the sum of its divisors
    // We return the test if n is equal to sumOfDivisors
    return n == sumOfDivisors;
}`);
  assert.equal(code.language, "Dart");
});

test("http server", () => {
  const code = detectLang(`// Copyright (c) 2013-2014, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

/// Use the \`route\` Pub package, and associate callbacks with URL patterns.
import 'dart:io';
import 'package:route/server.dart';
import 'package:route/url_pattern.dart';

// Pattern for all posts (plural).
final postsUrl = new UrlPattern(r'/posts\\/?');

// Pattern for a single post('/post/24', for example).
final postUrl = new UrlPattern(r'/post/(\\d+)\\/?');

// Callback for all posts (plural).
servePosts(req) {
  req.response.write("All blog posts");
  req.response.close();
}

// Callback for a single post('/post/24', for example).
servePost(req) {
  var postId = postUrl.parse(req.uri.path)[0];
  req.response.write('Blog post $postId');
  req.response.close();
}

// Callback to handle illegal urls.
serveNotFound(req) {
  req.response.statusCode = HttpStatus.NOT_FOUND;
  req.response.write('Not found');
  req.response.close();
}

main() async {
  var server = await HttpServer.bind(InternetAddress.LOOPBACK_IP_V4, 8080);
  var router = new Router(server)
    // Associate callbacks with URLs.
    ..serve(postsUrl, method: 'GET').listen(servePosts)
    ..serve(postUrl, method: 'GET').listen(servePost)
    ..defaultStream.listen(serveNotFound);
}`);
  assert.equal(code.language, "Dart");
});

test("some api", () => {
  const code = detectLang(`// Copyright (c) 2019, the Dart project authors. Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

/// This is an API that we wrap with extension methods elsewhere. There is
/// no extension method to be seen here.
///
/// Imagine that this code is coming from a different package, so we can't
/// directly change it.
library some_api;

final betty = Person('Betty Holberton', DateTime(1917, 3, 7));

final jean = Person('Jean Bartik', DateTime(1924, 12, 27));

final kay = Person('Kay Antonelli', DateTime(1921, 2, 12));

final marlyn = Person('Marlyn Meltzer', DateTime(1922));

Group getTeam() => Group({jean, betty, kay, marlyn});

class Group {
  final Set<Person> people;

  const Group(this.people);

  @override
  String toString() => people.map((p) => p.name).join(', ');
}

class Person {
  final String name;
  final DateTime dayOfBirth;

  const Person(this.name, this.dayOfBirth);
}`);
  assert.equal(code.language, "Dart");
});

test("finding a type of a filesystem object", () => {
  const code = detectLang(`// Copyright (c) 2013, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

/// Use the \`FileSystemEntity.type()\` method to get the type of a file system
/// object. This method is inherited by File, Directory, and Link.
import 'dart:io';
import 'dart:async'; // Import not needed but added here to explicitly assign type for clarity below.

main() async {
  // List the contents of the system temp directory.
  Stream<FileSystemEntity> entityList =
      Directory.systemTemp.list(recursive: true, followLinks: false);

  await for (FileSystemEntity entity in entityList) {
    // Get the type of the FileSystemEntity, apply the appropiate label, and
    // print the entity path.
    FileSystemEntityType type = await FileSystemEntity.type(entity.path);

    String label;
    switch (type) {
      case FileSystemEntityType.DIRECTORY:
        label = 'D';
        break;
      case FileSystemEntityType.FILE:
        label = 'F';
        break;
      case FileSystemEntityType.LINK:
        label = 'L';
        break;
      default:
        label = 'UNKNOWN';
    }
    print('$label: \${entity.path}');
  }
}`);
  assert.equal(code.language, "Dart");
});

test.run();
