import { test } from "uvu";
import * as assert from "uvu/assert";
import detectLang from "../src/index";

test("should detect Unknown", () => {
  assert.equal(detectLang("Hello world!").language, "Unknown");
});

test("should detect Unknown", () => {
  assert.equal(detectLang("ooga booga").language, "Unknown");
});

test("should not gives unknown", () => {
  assert.equal(
    detectLang("a very random text", { noUnknown: true }).language,
    ""
  );
});

test.run();
