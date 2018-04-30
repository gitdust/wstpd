const log = require('debug')('node:www');
const http = require('http');
// require('./db/connect')
const app = require('./app');

const server = http.createServer(app);

server.listen(app.get('port'));

server.on('error', (err) => {
  log(`server start with error:${err.message}.`);
});

server.on('listening', () => {
  log(`server start successfully, listening port:${app.get('port')}.`);
});
