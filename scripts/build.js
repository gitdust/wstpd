process.env.NODE_ENV = 'production';

const path = require('path');
const ora = require('ora');
const fs = require('fs-extra');
const signale = require('signale');
const webpack = require('webpack');
const webpackConfig = require('../webpack/prod');

const spinner = ora('Start building...\n');

spinner.start();

// 清除 logs 目录
try {
  fs.emptyDir(path.resolve('logs'));
  signale.success('logs clear successfully!\n');
} catch (err) {
  console.error(err);
}

// 清除 dist 目录
try {
  fs.emptyDir(path.resolve('dist'));
  signale.success('dist clear successfully!\n');
} catch (err) {
  console.error(err);
}

spinner.text = 'Start webpack...\n';

setTimeout(() => {
  spinner.text = 'Webpack building...';
}, 1000);

webpack(webpackConfig, (err, stats) => {
  if (err) {
    signale.fatal(err);
    process.exit(1);
  }
  process.stdout.write(`${stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  })}\n\n`);

  if (stats.hasErrors()) {
    signale.fatal('Build failed with errors.\n');
    process.exit(1);
  }
  // 移动 dll 脚本
  spinner.text = 'copy dll scripts...';
  fs.copySync(path.resolve('public', 'statics', 'js'), path.resolve('dist', 'statics', 'js'));

  signale.success('Build complete.\n');
  spinner.stop();
});
