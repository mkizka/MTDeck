import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import sass from "rollup-plugin-sass";
import userscriptHeader from "rollup-plugin-userscript-header";
import copy from "rollup-plugin-copy";
import pkg from "./package.json";

export const bundlePlugins = [
  typescript(),
  json(),
  sass(),
];

export const userscriptPlugin = userscriptHeader({
  overwrite: {
    name: "MTDeck",
    match: "https://tweetdeck.twitter.com",
  },
});

const copyPlugin = copy({
  targets: [
    {
      src: "./src/manifest.json",
      transform: (buffer) => {
        const manifest = JSON.parse(buffer.toString());
        manifest.version = pkg.version;
        manifest.developer = {
          name: pkg.author,
          url: pkg.homepage,
        };
        return JSON.stringify(manifest, null, 2);
      },
      dest: "./dist",
    },
    {
      src: "./src/icons",
      dest: "./dist",
    },
    {
      src: "./src/_locales",
      dest: "./dist",
    },
  ],
});

export default {
  input: "./src/index.ts",
  output: {
    file: "./dist/mtdeck.user.js",
    format: "iife",
  },
  plugins: [...bundlePlugins, userscriptPlugin, copyPlugin],
};
