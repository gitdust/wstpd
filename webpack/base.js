const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const utils = require('./utils');

// 压缩 html 内联 js 和 css
const minifyConfig = {
  // 仅压缩内联在html里面的js
  minifyJS: true,
  // 仅压缩内联在html里面的css
  minifyCSS: true,
  // 以html5的文档格式解析html的模板文件
  html5: true,
  // 删除Html文件里面的注释
  removeComments: true,
  // 删除空格
  collapseWhitespace: true,
  // 删除换行
  preserveLineBreaks: false,
  collapseInlineTagWhitespace: true,
  removeRedundantAttributes: true,
};

module.exports = {
  // 入口文件
  entry: {
    app: path.resolve('src', 'main.js'),
    ui: [
      'antd/es/auto-complete',
      'antd/es/card',
      'antd/es/back-top',
      'antd/es/message',
      'antd/es/icon',
    ],
  },
  // 出口文件
  output: {
    path: path.resolve('dist'),
    // TODO: cdn
    publicPath: '/',
    filename: '[name].[hash:5].js',
    chunkFilename: '[name].[hash:5].js',
  },
  // 处理对应模块
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=jsx',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: 'url-loader?limit=8192&name=statics/img/[name]-[hash:5].[ext]',
        exclude: /node_modules/,
      },
    ],
  }, 
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('public', 'index.html'),
      favicon: path.resolve('public', 'favicon.ico'),
      // 会在打包好的bundle.js后面加上hash串
      cache: true,
      hash: true,
      minify: utils.DEV ? false : minifyConfig,
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'ui' }),
    // 公共 js 和其引用的文件的映射关系文件，名称固定
    new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }),
    utils.DefinePlugin(),
    utils.HappyJSPlugin(),
    ...utils.DLLReferencePlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve('src'),
      statics: path.resolve('public', 'statics'),
    },
  },
};
