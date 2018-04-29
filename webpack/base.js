// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const utils = require('./utils');

module.exports = {
  // 入口文件
  entry: {
    app: utils.resolve('src', 'main.js'),
    vendors: ['react', 'react-dom', 'prop-types'],
  },
  // 出口文件
  output: {
    filename: '[name].js',
    path: utils.resolve('build')
  },
  // 处理对应模块
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader?compact=false'],
        //loader with query - use: [{ loader: 'bable-loader', query: { compact: false } }]
      },
    ]
  }, 
  // 模式配置
  mode: 'development',
  // 插件
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
    // }),
    new HtmlWebpackPlugin({
      template: utils.resolve('public', 'index.html'),
      // 会在打包好的bundle.js后面加上hash串
      hash: true,
    })
  ],
  resolve: {
    alias: {
      '@': utils.resolve('src'),
    },
  },
};
