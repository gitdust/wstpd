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
};

module.exports = {
  // 入口文件
  entry: {
    app: utils.ENTRY,
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
    filename: '[name].js',
    path: utils.OUTPUTPATH,
    chunkFilename: '[name].[hash:5].js',
    publicPath: utils.PUBLICPATH,
  },
  // 处理对应模块
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=jsx',
      },
    ],
  }, 
  // 插件
  plugins: [
    utils.DefinePlugin(),
    ...utils.DLLReferencePlugin(),
    new HtmlWebpackPlugin({
      template: utils.resolve('public', 'index.html'),
      favicon: utils.resolve('public', 'favicon.ico'),
      // 会在打包好的bundle.js后面加上hash串
      hash: true,
      inject: false,
      minify: utils.DEV ? false : minifyConfig,
      cache: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'ui' }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }), // 公共 js 和其引用的文件的映射关系文件，名称固定
    utils.HappyJSPlugin(),
  ],
  resolve: {
    alias: {
      '@': utils.resolve('src'),
    },
  },
};
