const express = require('express');
const path = require('path');

const staticCache = (req, res, next) => {
  // 静态资源文件强缓存一周
  res.setHeader('Cache-Control', ['public', 'max-age=604800']);
  next();
};

module.exports = (app) => {
  app.use('/', staticCache);
  app.use('/', express.static(path.resolve('build')));
};