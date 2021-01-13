import typescript from "@rollup/plugin-typescript";
import json from '@rollup/plugin-json';
import sass from "rollup-plugin-sass";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/mtdeck.user.js",
    format: "iife",
  },
  plugins: [
    typescript(),
    json({
        
    }),
    sass({
      insert: true,
    }),
  ],
};
