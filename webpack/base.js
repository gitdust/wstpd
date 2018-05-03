const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const utils = require('./utils');

module.exports = {
  // 入口文件
  entry: {
    app: utils.resolve('src', 'main.js'),
    vendors: [
      'react',
      'react-dom',
      'prop-types',
      'react-router',
      'react-router-dom',
      'antd',
      // 'antd/es/auto-complete',
      // 'antd/es/card',
      // 'antd/es/back-top',
      // 'antd/es/message',
      // 'antd/es/icon',
      'axios',
      'nprogress',
    ],
  },
  // 出口文件
  output: {
    filename: '[name].js',
    path: utils.resolve('build'),
    chunkFilename: '[name].[hash:5].js',
    publicPath: '/',
  },
  // 处理对应模块
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader', query: { compact: false } }]
      },
    ]
  }, 
  // 插件
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
    }),
    new HtmlWebpackPlugin({
      template: utils.resolve('public', 'index.html'),
      // 会在打包好的bundle.js后面加上hash串
      hash: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendors' }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }), // 公共 js 和其引用的文件的映射关系文件，名称固定
  ],
  resolve: {
    alias: {
      '@': utils.resolve('src'),
    },
  },
};
