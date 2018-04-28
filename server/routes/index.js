const express = require('express');
const bodyParser = require('body-parser');
const mdlCors = require('../modules/cors');

const apiRoutes = require('./api');

module.exports = (app) => {
  const router = express.Router();

  router.use(bodyParser.json());
  mdlCors(router);

  router.use('/api', apiRoutes);

  app.use(router);
};
