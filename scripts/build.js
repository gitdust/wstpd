process.env.NODE_ENV = 'production';

const path = require('path');
const fs = require('fs-extra');
const signale = require('signale');
const webpack = require('webpack');
const webpackConfig = require('./webpack/prod');

signale.time('Start');
signale.await('building for production...');

(async () => {
  try {
    // 清除 logs 目录
    await fs.emptyDir(path.resolve('server', 'logs'));
    signale.success('server/logs removed.');

    // 清除 dist 目录
    await fs.emptyDir(path.resolve('dist'));
    signale.success('dist/ removed.');

    signale.await('start webpack...');

    webpack(webpackConfig, (errWP, stats) => {
      if (errWP) {
        signale.fatal(errWP);
        process.exit(1);
      }
      process.stdout.write(`${stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
      })}\n`);

      if (stats.hasErrors()) {
        signale.fatal('webpack building failed.');
        process.exit(1);
      }

      signale.success('webpack build complete.');
      signale.await('start move statics...');

      (async () => {
        try {
          await fs.copy(path.resolve('public', 'statics'), path.resolve('dist', 'statics'));
          signale.success('statics moved.');

          signale.success('build complete.');
          signale.timeEnd('Start');
        } catch (errFS) {
          signale.fatal(errFS);
        }
      })();
    });
  } catch (err) {
    signale.fatal(err);
  }
})();

