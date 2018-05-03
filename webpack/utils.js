// 是否开发环境
const DEV = process.env.NODE_ENV === 'development'; 
// 是否生产环境
const PRO = process.env.NODE_ENV === 'production'; 

const os = require('os');
const path = require('path');
const webpack = require('webpack');
const UglifyJsParallelPlugin = require('webpack-uglify-parallel');
const HappyPack = require('happypack');

// cpu 个数
const CPUS = os.cpus().length <= 0 ? 1 : os.cpus().length; 

// 自定义 path.resolve
const resolve = (...args) => path.resolve.apply(path, args); 
// 自定义 path.resolve
const join = (...args) => path.join.apply(path, args); 

const SRC = 'src';
const DIST = 'dist';
const PUBLIC = 'public';

// webpack-dev-server contentBase
const CONTENTBASE = resolve(SRC);
// webpack output path
const OUTPUTPATH = resolve(DIST);
// webpack publicPath
const PUBLICPATH = '/';
// webpack entry
const ENTRY = resolve(SRC, 'main.js');

// webpack 编译脚本环境变量设置
const DefinePlugin = () => new webpack.DefinePlugin({
  'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
});

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

/** 第三方库 */
const VENDORS = {
  frame: [
    'react',
    'react-dom',
    'prop-types',
    'react-router',
    'react-router-dom',
    'axios', 
    'nprogress',
  ]
};

const DLLPath = DEV
  ? resolve(SRC, 'statics', 'scripts')
  : resolve(PUBLIC, 'statics', 'scripts');

const DLLPlugin = () => new webpack.DllPlugin({
  path: join(DLLPath, '[name].manifest.json'), // manifest.json 输出路径
  name: '[name]_library',
});

const VendorKeys = Object.keys(VENDORS);
const DLLReferencePlugin = () => VendorKeys.map((vendorKey) => {
  const manifestFile = join(DLLPath, `${vendorKey}.manifest.json`);
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
  resolve,
  join,
  VENDORS,
  ENTRY,
  CONTENTBASE,
  OUTPUTPATH,
  PUBLICPATH,
  DefinePlugin,
  // CssLoaderQuery,
  UglifyJsPlugin,
  HappyJSPlugin,
  DLLPath,
  DLLPlugin,
  DLLReferencePlugin,
};
