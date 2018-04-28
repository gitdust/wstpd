/** 跨域设置 */
// const log = require('debug')('movie:cors');
// const _ = require('lodash');
const { DEV } = require('../config');
// const cors = require('cors');

// let whiteList = ['http://localhost:3000'];
// if (PROD) {
//   whiteList = [
//     'https://www.m1994.com',
//     'https://m1994.com',
//   ];
// }
// const corsSetting = (req, callback) => {
//   const corsOptions = {
//     origin: (origin, cb) => {
//       // origin undefined issue
//       // https://github.com/expressjs/cors/issues/71
//       const { host } = req.headers;
//       const trusted = whiteList.some(d => d.indexOf(host) > -1);
//       if (trusted) {
//         cb(null, true);
//       } else {
//         cb(new Error(CORS_ERR));
//       }
//     },
//     credentials: false,
//   };
//   callback(null, corsOptions);
// };

/** 白名单 */
const whiteList = DEV ? 'http://localhost:3000' : 'https://packagejson.cn';

module.exports = (app) => {
  // app.use(cors(corsSetting));
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
