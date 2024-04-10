import { test } from "uvu";
import * as assert from "uvu/assert";
import detectLang from "../src/index";

test("hello world", () => {
  const code = detectLang("console.log(\"Hello world!\" as string);");
  assert.equal(code.language, "Typescript");
});

test("fizz buzz", () => {
  const code = detectLang(`
   const length: number = 100

   const numberArrays: number[] = Array.from({length: length}, (_, i: number) => i)

    numberArrays.forEach((item: number): void => {
        if (item % 15 === 0) console.log('FizzBuzz' as string)
        else if(item % 3 === 0) console.log('Fizz' as string)
        else if (item % 5 === 0) console.log('Buzz' as string)
    })
  `);
  assert.equal(code.language, "Typescript");
});

test("quick sort", () => {
  const code = detectLang(`
  function heapSort(arr: Array<number>): void {
    heapify(arr)
    let end: number = arr.length - 1
    while (end > 0) {
        [arr[end], arr[0]] = [arr[0], arr[end]]
        end--
        siftDown(arr, 0, end)
    }
}

function heapify(arr: Array<number>): void {
    let start: number = Math.floor(arr.length/2) - 1

    while (start >= 0) {
        siftDown(arr, start, arr.length - 1)
        start--
    }
}

function siftDown(arr: Array<number>, startPos: number, endPos: number): void {
    let rootPos: number = startPos

    while (rootPos * 2 + 1 <= endPos) {
        let childPos: number = rootPos * 2 + 1
        if (childPos + 1 <= endPos && arr[childPos] < arr[childPos + 1]) {
            childPos++
        }
        if (arr[rootPos] < arr[childPos]) {
            [arr[rootPos], arr[childPos]] = [arr[childPos], arr[rootPos]]
            rootPos = childPos
        } else {
            return
        }
    }
}
test('test code', (): void => {
    let arr: Array<number> = [12, 11, 15, 10, 9, 1, 2, 3, 13, 14, 4, 5, 6, 7, 8,]
    const result: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    heapSort(arr)
    expect(arr).toStrictEqual(result)
})
`);
  assert.equal(code.language, "Typescript");
});

test("http server", () => {
  const code = detectLang(`
  const http = require('http');

interface Error {
    message: string
}

http.get('http://rosettacode.org', (resp: any): void => {

    let data: string = '';

    resp.on('data', (chunk: any): void => {
        data += chunk;
    });

    resp.on('end', (): void => {
        console.log("Data:", data);
    });

}).on("error", (err: Error): void => {
    console.log("Error: " + err.message);
});
  `);

  assert.equal(code.language, "Typescript");
});

test("longest palindrome", () => {
  const code = detectLang(`
  function isPalindrome(s: string): boolean {
    return s === s.split('').reverse().join('')
}

function longestPalindrome(s: string): string {
    if (s.length < 2)
        return s

    const unique: Set<string> = new Set(s)
    if (unique.size === 1) {
        return s
    }

    let startPos: number = 0
    let nextPos: number = 1

    let startCharSubstring: string = s[0]
    let longestSubstring: string = s[0]
    let curSubString: string = s[0] + s[1]


    while (startPos !== s.length - 1) {
        if (startCharSubstring === s[nextPos]) {
            if (isPalindrome(curSubString) && curSubString.length > longestSubstring.length) {
                longestSubstring = curSubString
            }
        }

        if (nextPos === s.length - 1) {
            startPos += 1
            nextPos = startPos + 1
            curSubString = s[startPos] + s[nextPos]
            startCharSubstring = s[startPos]
        } else {
            nextPos += 1
            curSubString += s[nextPos]
        }
    }

    return longestSubstring
}
  `);
  assert.equal(code.language, "Typescript");
});

test("vue 3 component code", () => {
  const code = detectLang(`
enum VARIANT {
    'big'= 'BIG TITLE',
    'small'= 'SMALL TITLE'
}

type Variants = 'big' | 'small'
interface Props {
    title?: string,
    isView: string,
    variant: Variants
}

interface Emits {
    (e: 'click', item: string): void
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

const newTitle = ref<string>('')

const changeTitle = (): void => {
    if (props.variant === 'big') {
        newTitle.value = VARIANT.big
    } else if (props.variant === 'small') {
        newTitle.value = VARIANT.small
    }
}
  `);
  assert.equal(code.language, "Typescript");
});

test.run();