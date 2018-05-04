const config = require('../config');
const log = require('debug')('node:mongodb');
const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.Promise = Promise;

let CONNECT_STRING = 'mongodb://';
CONNECT_STRING += `${config.DB_DOMAIN}:${config.DB_PORT}/${config.DB_NAME}`;
// if (config.DEV) {
// } else {
//   CONNECT_STRING += `${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_DOMAIN}:${config.DB_PORT}/${config.DB_NAME}`
// }
// log(CONNECT_STRING);
mongoose.connect(CONNECT_STRING);

const db = mongoose.connection;
db.on('error', (err) => {
  log(`mongodb connect with error:${err.message}.`);
});
db.once('open', () => {
  log('mongodb connect successfully.');
});
