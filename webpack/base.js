const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const utils = require('./utils');

module.exports = {
  // 入口文件
  entry: {
    app: utils.resolve('src', 'main.js'),
    // TODO: antd 按需
    vendors: [
      'react',
      'react-dom',
      'prop-types',
      'antd/es/auto-complete',
      'antd/es/card',
      'antd/es/backtop',
      'antd/es/message',
      'antd/es/icon',
    ],
  },
  // 出口文件
  output: {
    filename: '[name].[hash:5].js',
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
        use: ['babel-loader?compact=false'],
        //loader with query - use: [{ loader: 'bable-loader', query: { compact: false } }]
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
