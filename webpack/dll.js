const webpack = require('webpack');
const merge = require('webpack-merge');
const utils = require('./utils');

/** 默认 dev 配置 */
let dllConfig = {
  entry: utils.VENDORS,
  output: {
    // publicPath: 'http://host:port/build', // cdn
    path: utils.DLLPath,
    // TODO: [name].[hash].js 映射
    filename: '[name].js',
    // 暴露的全局对象名，与 webpack.DllPlugin.name 保持一致
    library: '[name]_library',
  },
  plugins: [
    utils.DefinePlugin(),
    utils.DLLPlugin(),
    // scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
};

if (utils.PRO) {
  dllConfig = merge(dllConfig, {
    plugins: [
      utils.UglifyJsPlugin(),
    ],
  });
}

module.exports = dllConfig;