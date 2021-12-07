import { test } from "uvu";
import * as assert from "uvu/assert";
import detectLang from "../src/index";

test("1", () => {
  const code = detectLang(`{
  "key": "value",

  "keys": "must always be enclosed in double quotes",
  "numbers": 0,
  "strings": "Hellø, wørld. All unicode is allowed, along with \\"escaping\\".",
  "has bools?": true,
  "nothingness": null,

  "big number": 1.2e+100,

  "objects": {
    "comment": "Most of your structure will come from objects.",

    "array": [0, 1, 2, 3, "Arrays can have anything in them.", 5],

    "another object": {
      "comment": "These things can be nested, very useful."
    }
  },

  "silliness": [
    {
      "sources of potassium": ["bananas"]
    },
    [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, "neo"],
      [0, 0, 0, 1]
    ]
  ],

  "alternative style": {
    "comment": "check this out!"
  , "comma position": "doesn't matter, if it's before the next key, it's valid"
  , "another comment": "how nice"
  },



  "whitespace": "Does not matter.",



  "that was short": "And done. You now know everything JSON has to offer."
}`);
  assert.equal(code.language, "JSON");
});

test("2", () => {
  const code = detectLang(`{
    "name": "John Doe",
    "age": 43,
    "address": {
        "street": "10 Downing Street",
        "city": "London"
    },
    "phones": [
        "+44 1234567",
        "+44 2345678"
    ]
}`);
  assert.equal(code.language, "JSON");
});

test("3", () => {
  const code = detectLang(`{
  "keywords": [
    "JSON",
    "server",
    "fake",
    "REST",
    "API",
    "prototyping",
    "mock",
    "mocking",
    "test",
    "testing",
    "rest",
    "data",
    "dummy",
    "sandbox"
  ]
}`);
  assert.equal(code.language, "JSON");
});

test("4", () => {
  const code = detectLang(`{
    "/api/": "/",
    "/blog/:resource/:id/show": "/:resource/:id",
    "/blog/:category": "/posts?category=:category"
  }`);
  assert.equal(code.language, "JSON");
});

test("5", () => {
  const code = detectLang(`{
    "posts": [
      { "id": 1, "title": "json-server", "author": "typicode" }
    ],
    "comments": [
      { "id": 1, "body": "some comment", "postId": 1 }
    ],
    "profile": { "name": "typicode" }
  }`);
  assert.equal(code.language, "JSON");
});

test("6", () => {
  const code = detectLang(`{
    "middlewares": ["./fixtures/middlewares/en", "./fixtures/middlewares/jp"]
  }`);
  assert.equal(code.language, "JSON");
});

test.run();
