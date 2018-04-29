const env = require('../config');
const log = require('debug')('node:mongodb');
const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.Promise = Promise;

if (env.DEV) {
  mongoose.connect(`mongodb://${env.DB_DOMIAN}:${env.DB_PORT}/${env.DB_NAME}`);
} else {
  mongoose.connect(`mongodb://${env.DB_USER}:${env.DB_PWD}@${env.DB_DOMIAN}:${env.DB_PORT}/${env.DB_NAME}`);
}
const db = mongoose.connection;
db.on('error', (err) => {
  log(`mongodb connect with error:${err.message}.`);
});
db.once('open', () => {
  log('mongodb connect successfully.');
});
