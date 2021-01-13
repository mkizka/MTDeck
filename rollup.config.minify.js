import config from "./rollup.config";
import { terser } from "rollup-plugin-terser";

config.output = {
  file: "dist/mtdeck.min.user.js",
  format: "iife",
};

config.plugins = [...config.plugins, terser()];

export default config;
