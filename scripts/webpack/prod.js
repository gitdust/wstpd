const base = require('./base');
// const webpack = require('webpack');
const WebpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const WebpackMd5Hash = require('webpack-md5-hash');
// const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
// new ScriptExtHtmlWebpackPlugin({ defaultAttribute: 'defer' })
const CompressionPlugin = require('compression-webpack-plugin');

const utils = require('./utils');

module.exports = WebpackMerge(base, {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            query: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    utils.UglifyJsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'statics/css/[name].[contenthash:5].css',
      chunkFilename: 'statics/css/[name].[contenthash:5].css',
    }),
    // 根据模块相对路径生成模块标识，如果模块没有改变，那模块标识也不会改变
    // new webpack.HashedModuleIdsPlugin(),
    // 单独处理 manifest
    // new WebpackMd5Hash(),
    // conenthash 代表的是文本文件内容的 hash 值
    // new ExtractTextPlugin('statics/css/[name].[contenthash:5].css'),
    // scope hoisting
    utils.ScopeHoistingPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
})