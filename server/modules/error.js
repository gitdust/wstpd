const log = require('debug')('node:error');
const _ = require('lodash');
const config = require('../config');

const ErrorTypes = ['Error', 'EvalError', 'RangeError', 'ReferenceError', 'SyntaxError', 'TypeError', 'URIError'];

module.exports = (app) => {
  app.use((err, req, res, next) => {
    if (err.message === config.CORS_ERR) {
      res.json({ ok: false, message: '不受信任的来源!' }); // cors 无效
    } else if (_.indexOf(ErrorTypes, err.name) > -1) {
      res.json({ ok: false, message: err.message });
    } else {
      next();
    }
  });
  /** 4xx / 5xx */
  app.use((req, res) => {
    const errorMessage = `http request(${req.method}-${req.originalUrl}) not found!`;
    log(errorMessage);
    res.json({ ok: false, message: errorMessage });
  });
};
