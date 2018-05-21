process.env.NODE_ENV = 'production';

const path = require('path');
const ora = require('ora');
const rm = require('rimraf');
const chalk = require('chalk');
const ncp = require('ncp').ncp;
const webpack = require('webpack');
const webpackConfig = require('../webpack/prod');
const utils = require('../webpack/utils');

ncp.limit = 16;
const spinner = ora('building for production...');
spinner.start();

rm(path.resolve('logs/*'), (err) => {
  if (err) {
    throw err;
  }
});

rm(path.resolve('dist/*'), (err) => {
  if (err) {
    throw err;
  }
  ncp(
    path.resolve('public', 'statics'),
    path.resolve('dist', 'statics'),
    function(err) {
      if (err) {
        return console.error(err);
      }
      console.log(chalk.green('statics copy complete.\n'));
    },
  );
  webpack(webpackConfig, (err, stats) => {
    spinner.stop();
    if (err) {
      throw err;
    }
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
        children: false,
        chunks: false,
        chunkModules: false,
      }) + '\n\n',
    );

    if (stats.hasErrors()) {
      console.log(chalk.red('Build failed with errors.\n'));
      process.exit(1);
    }

    console.log(chalk.green('Build complete.\n'));
  });
});
