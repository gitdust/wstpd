const base = require('./base');
const WebpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const utils = require('./utils');

module.exports = WebpackMerge(base, {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'less-loader'],
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        }),
      },
    ]
  },
  plugins: [
    utils.UglifyJsPlugin(),
    new ExtractTextPlugin('[name].[contenthash:5].css?v=[contenthash:5]'), // conenthash 代表的是文本文件内容的 hash 值
  ]
})