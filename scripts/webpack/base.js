const path = require('path');
// const webpack = require('webpack');
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

const PublicPath = utils.DEBUG ? '/' : '//packagejson.oss-cn-qingdao.aliyuncs.com/';

module.exports = {
  mode: utils.DEBUG ? 'development' : 'production',
  entry: {
    app: path.resolve('src', 'main.js'),
  },
  output: {
    path: path.resolve('dist'),
    publicPath: PublicPath,
    filename: 'statics/js/[name].[hash:5].js',
    chunkFilename: 'statics/js/[name].[hash:5].js',
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=jsx',
      },
      {
        test: /\.worker\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'worker-loader',
          options: {
            name: 'statics/js/[name].[hash:5].js',
            publicPath: '/',
          },
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: 'url-loader?limit=8192&name=statics/img/[name]-[hash:5].[ext]',
        exclude: /node_modules/,
      },
    ],
  }, 
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('public', 'index.html'),
      cache: true, // 会在打包好的bundle.js后面加上hash串
      hash: true,
      minify: utils.DEV ? false : minifyConfig,
    }),
    utils.DefinePlugin(),
    utils.HappyJSPlugin(),
    ...utils.DLLReferencePlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve('src'),
      'Images': path.resolve('public', 'statics', 'img'),
    },
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
  },
};
