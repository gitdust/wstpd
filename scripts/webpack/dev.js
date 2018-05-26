const path = require('path');
const webpack = require('webpack');
const base = require('./base');
const WebpackMerge = require('webpack-merge');

module.exports = WebpackMerge(base, {
  devtool: 'cheap-module-source-map',
  // 开发服务器配置
  devServer: {
    host: 'localhost',
    port: 3002,
    contentBase: path.resolve('public'),
    publicPath: '/',
    hot: true,
    inline: true,
    historyApiFallback: true,
    disableHostCheck: true,
    // 关闭提示
    // quiet: true,
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
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
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
})