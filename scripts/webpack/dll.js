const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const merge = require('webpack-merge');
const utils = require('./utils');

if (utils.PRO) { 
  fs.emptyDir(path.resolve('public', 'statics', 'js'));
} else {
  fs.emptyDir(path.resolve('public', 'statics', 'dll'));
}

/** 默认 dev 配置 */
let dllConfig = {
  entry: utils.VENDORS,
  output: {
    path: utils.DLLPath,
    // TODO: [name].[hash].js 使用
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
    // output: {
    //   publicPath: 'http://host:port/build', // cdn
    // },
    plugins: [
      utils.UglifyJsPlugin(),
    ],
  });
}

module.exports = dllConfig;