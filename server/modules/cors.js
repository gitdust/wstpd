/** 跨域设置 */
const config = require('../config');
// const cors = require('cors');
// origin undefined issue
// https://github.com/expressjs/cors/issues/71


/** 白名单 */
const whiteList = config.DEV ? 'http://localhost:3000' : 'https://packagejson.cn';

module.exports = (app) => {
  app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', whiteList);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('X-Frame-Options', 'SAMEORIGIN');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('X-XSS-Protection', '1; mode=block');

    if (req.method === 'OPTIONS') {
      res.sendStatus(200); // 让options请求快速返回
    } else {
      next();
    }
  });
};
