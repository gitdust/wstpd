const config = require('../config');
const log = require('debug')('node:mongodb');
const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.Promise = Promise;

if (config.DEV) {
  mongoose.connect(`mongodb://${config.DB_DOMIAN}:${config.DB_PORT}/${config.DB_NAME}`);
} else {
  mongoose.connect(`mongodb://${config.DB_USER}:${config.DB_PWD}@${config.DB_DOMIAN}:${config.DB_PORT}/${config.DB_NAME}`);
}
const db = mongoose.connection;
db.on('error', (err) => {
  log(`mongodb connect with error:${err.message}.`);
});
db.once('open', () => {
  log('mongodb connect successfully.');
});
