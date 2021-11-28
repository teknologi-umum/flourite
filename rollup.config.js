import ts from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.cjs",
      format: "cjs",
      exports: "default"
    },
    {
      file: "dist/index.mjs",
      format: "es"
    },
    {
      file: "dist/index.iife.js",
      format: "iife",
      name: "flourite",
      plugins: [terser()]
    }
  ],
  plugins: [ts({ tsconfig: "./tsconfig.json" })]
};
