const DEV = process.env.NODE_ENV === 'development'; // 是否开发环境
const PRO = process.env.NODE_ENV === 'production'; // 是否生产环境

const os = require('os');
const path = require('path');
const UglifyJsParallelPlugin = require('webpack-uglify-parallel');
const HappyPack = require('happypack');

const CPUS = os.cpus().length <= 0 ? 1 : os.cpus().length; // cpu 个数

const resolve = (...args) => path.resolve.apply(path, args);// 自定义 path.resolve

// JS 压缩、混淆插件
const UglifyJsPlugin = () => new UglifyJsParallelPlugin({
  workers: CPUS,
  sourceMap: true,
  // 最紧凑的输出
  beautify: false,
  // 删除所有的注释
  comments: false,
  mangle: true,
  compressor: {
    // 在UglifyJs删除没有用到的代码时不输出警告
    warnings: false,
    // 不删除所有的 `console` 语句
    drop_console: false,
    // 内嵌定义了但是只用到一次的变量
    collapse_vars: true,

    drop_debugger: true,
    // 提取出出现多次但是没有定义成变量去引用的静态值
    reduce_vars: true,
    // 用于 tree-shaking,属性 getters 不存在 side effects
    pure_getters: true,
  },
});

// 多线程编译插件
const happyThreadPool = HappyPack.ThreadPool({ size: CPUS });
const HappyJSPlugin = () => new HappyPack({
  id: 'js',
  threadPool: happyThreadPool,
  // cacheDirectory有着2倍以上的速度提升，这对于 rebuild 有着非常大的性能提升
  loaders: ['babel-loader?cacheDirectory'],
}, {
  id: 'style',
  threadPool: happyThreadPool,
  loaders: ['style-loader'],
}, {
  id: 'css',
  threadPool: happyThreadPool,
  loaders: ['css-loader'],
}, {
  id: 'postcss',
  threadPool: happyThreadPool,
  loaders: ['postcss-loader'],
}, {
  id: 'less',
  threadPool: happyThreadPool,
  loaders: ['less-loader'],
});


// css-loader.query
const CssLoaderQuery = {
  sourceMap: true,
  modules: true,
  importLoaders: 2,
  localIdentName: '[name]-[local]-[hash:base64:5]',
};

module.exports = {
  DEV,
  PRO,
  resolve,
  CssLoaderQuery,
  UglifyJsPlugin,
  HappyJSPlugin,
};
