const path = require("path");
const webpack = require("webpack");

const WebpackUserScript = require("webpack-userscript");
const CopyPlugin = require("copy-webpack-plugin");

const packageJson = require("./package");

module.exports = (env) => {
  return {
    entry: "./src/index.ts",
    output: {
      filename: env.minimize ? "mtdeck.min.js" : "mtdeck.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new WebpackUserScript({
        headers: (data) => {
          return {
            name: "MTDeck",
            match: "https://tweetdeck.twitter.com",
          };
        },
        metajs: false,
      }),
      new CopyPlugin({
        patterns: [
          {
            from: "./src/manifest.json",
            transform: (buffer) => {
              const manifest = JSON.parse(buffer.toString());
              manifest.version = packageJson.version;
              manifest.developer = {
                name: packageJson.author,
                url: packageJson.homepage,
              };
              return JSON.stringify(manifest, null, 2);
            },
          },
          {
            from: "./src/icons",
            to: "icons",
          },
          {
            from: "./src/_locales",
            to: "_locales",
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: "ts-loader",
          include: [path.resolve(__dirname, "src")],
          exclude: [/node_modules/],
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    optimization: {
      minimize: env.minimize ? true : false,
    },
    devServer: {
      inline: false,
      host: "0.0.0.0",
      disableHostCheck: true,
    },
  };
};
