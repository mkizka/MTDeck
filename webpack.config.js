const path = require('path')
const webpack = require('webpack')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WebpackUserScript = require('webpack-userscript')

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'mtdeck.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new WebpackUserScript({
      headers: (data) => {
        return {
          name: 'MTDeck',
          grant: 'GM_addStyle',
          match: 'https://tweetdeck.twitter.com'
        }
      },
      metajs: false
    })
  ],
  module: {
    rules: [
      {
        test: /.(ts|tsx)?$/,
        loader: 'ts-loader',
        include: [path.resolve(__dirname, 'src')],
        exclude: [/node_modules/]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  devServer: {
    inline: false,
    host: '0.0.0.0',
    disableHostCheck: true
  }
}
