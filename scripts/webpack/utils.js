const NODE_ENV = process.env.NODE_ENV || 'development';
const DEBUG = NODE_ENV === 'development';

const os = require('os');
const path = require('path');
const webpack = require('webpack');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
const HappyPack = require('happypack');

// cpu 个数
const CPUS = os.cpus().length <= 0 ? 1 : os.cpus().length; 

// webpack 编译脚本环境变量设置
const DefinePlugin = () => new webpack.DefinePlugin({
  'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
});

// https://github.com/mishoo/UglifyJS2/tree/harmony#minify-options
const UglifyJsPlugin = () => new UglifyJsWebpackPlugin({
  test: /\.js$/i,
  cache: true,
  parallel: CPUS,
  sourceMap: true,
});

// 多线程编译插件
const happyThreadPool = HappyPack.ThreadPool({ size: CPUS });

// TODO: 样式的多线程编译
const HappyJSPlugin = () => new HappyPack(
  {
    id: 'jsx',
    threadPool: happyThreadPool,
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          // cacheDirectory有着2倍以上的速度提升，这对于 rebuild 有着非常大的性能提升
          cacheDirectory: true,
          compact: false,
        },
      },
    ],
  },
);

// 第三方库
const VENDORS = {
  base: [
    'react',
    'react-dom',
    'prop-types',
    'react-router',
    'react-router-dom',
    'axios', 
    'nprogress',
    'react-helmet',
  ],
};

const DLLPath = DEBUG
  ? path.resolve('public', 'statics', 'dll')
  : path.resolve('public', 'statics', 'js');
const DLLPlugin = () => new webpack.DllPlugin({
  path: path.join(DLLPath, '[name].manifest.json'), // manifest.json 输出路径
  name: '[name]_library',
});
const VendorKeys = Object.keys(VENDORS);
const DLLReferencePlugin = () => VendorKeys.map((vendorKey) => {
  const manifestFile = path.join(DLLPath, `${vendorKey}.manifest.json`);
  return new webpack.DllReferencePlugin({ manifest: manifestFile });
});

const ScopeHoistingPlugin = () => new ModuleConcatenationPlugin();

// css-loader.query
const CssLoaderQuery = {
  sourceMap: true,
  modules: true,
  importLoaders: 2,
  localIdentName: '[local]___[hash:base64:5]',
};

module.exports = {
  DEBUG,
  VENDORS,
  DefinePlugin,
  CssLoaderQuery,
  UglifyJsPlugin,
  HappyJSPlugin,
  ScopeHoistingPlugin,
  DLLPath,
  DLLPlugin,
  DLLReferencePlugin,
};
