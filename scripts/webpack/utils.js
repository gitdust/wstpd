// 是否开发环境
const DEV = process.env.NODE_ENV === 'development'; 
// 是否生产环境
const PRO = process.env.NODE_ENV === 'production'; 

const os = require('os');
const path = require('path');
const webpack = require('webpack');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
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
  ],
};

// TODO: dev环境使用非压缩库
// const DLLPath = DEV
//   ? resolve(SRC, 'statics', 'scripts')
//   : resolve(PUBLIC, 'statics', 'scripts');
const DLLPath = path.resolve('public', 'statics', 'js');

const DLLPlugin = () => new webpack.DllPlugin({
  path: path.join(DLLPath, '[name].manifest.json'), // manifest.json 输出路径
  name: '[name]_library',
});

const VendorKeys = Object.keys(VENDORS);
const DLLReferencePlugin = () => VendorKeys.map((vendorKey) => {
  const manifestFile = path.join(DLLPath, `${vendorKey}.manifest.json`);
  return new webpack.DllReferencePlugin({ manifest: manifestFile });
});

// css-loader.query
// const CssLoaderQuery = {
//   sourceMap: true,
//   modules: true,
//   importLoaders: 2,
//   localIdentName: '[name]-[local]-[hash:base64:5]',
// };

module.exports = {
  DEV,
  PRO,
  VENDORS,
  DefinePlugin,
  // CssLoaderQuery,
  UglifyJsPlugin,
  HappyJSPlugin,
  DLLPath,
  DLLPlugin,
  DLLReferencePlugin,
};
