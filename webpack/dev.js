require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const base = require('./base');
const WebpackMerge = require('webpack-merge');

module.exports = WebpackMerge(base, {
  devtool: 'cheap-module-source-map',
  // 开发服务器配置
  devServer: {
    host: process.env.FRONT_HOST,
    port: process.env.FRONT_PORT,
    contentBase: path.resolve('src'),
    publicPath: '/',
    hot: true,
    inline: true,
    historyApiFallback: true,
    disableHostCheck: true,
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
})