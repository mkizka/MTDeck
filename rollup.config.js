import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import sass from "rollup-plugin-sass";
import userscriptHeader from "rollup-plugin-userscript-header";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/mtdeck.user.js",
    format: "iife",
  },
  plugins: [
    typescript(),
    json(),
    sass({
      insert: true,
    }),
    userscriptHeader({
      overwrite: {
        name: "MTDeck",
        match: "https://tweetdeck.twitter.com",
      },
    }),
  ],
};
