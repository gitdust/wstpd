const base = require('./base');
const webpack = require('webpack');
const WebpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const utils = require('./utils');

module.exports = WebpackMerge(base, {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'less-loader']
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        }),
      },
    ]
  },
  plugins: [
    utils.UglifyJsPlugin(),
    // 根据模块相对路径生成模块标识，如果模块没有改变，那模块标识也不会改变
    new webpack.HashedModuleIdsPlugin(),
    // 单独处理 manifest
    new WebpackMd5Hash(),
    // conenthash 代表的是文本文件内容的 hash 值
    new ExtractTextPlugin('[name].[contenthash:5].css?v=[contenthash:5]'),
  ]
})