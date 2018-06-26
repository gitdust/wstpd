const path = require('path');
const fs = require('fs-extra');
// const webpack = require('webpack');
const merge = require('webpack-merge');
const utils = require('./utils');

// 默认 dev 配置
let dllConfig = {
  entry: utils.VENDORS,
  output: {
    path: utils.DLLPath,
    filename: '[name].js', // TODO: [name].[hash].js 使用
    library: '[name]_library', // 暴露的全局对象名，与 webpack.DllPlugin.name 保持一致
  },
  plugins: [
    utils.DefinePlugin(),
    utils.DLLPlugin(),
    utils.ScopeHoistingPlugin(), // scope hoisting
  ],
};

if (utils.DEBUG) {
  fs.emptyDirSync(path.resolve('public', 'statics', 'dll'));
  dllConfig = merge(dllConfig, {
    mode: 'development',
  });
} else {
  fs.emptyDirSync(path.resolve('public', 'statics', 'js'));
  dllConfig = merge(dllConfig, {
    mode: 'production',
    plugins: [
      utils.UglifyJsPlugin(),
    ],
  });
}

module.exports = dllConfig;