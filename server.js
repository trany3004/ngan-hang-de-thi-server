global.BASE_DIR = __dirname;

const http = require('http');
const express = require('express');
const config = require('./config');
const logger = require('./modules/logger');
const cors = require('cors');
const path = require('path');
const gateway = require('./modules/gateway');
const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/v1', gateway.router);
app.use(express.static('./public/education'));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/education/index.html'))
})

require('./modules/database').connectDB();
const forceSSL = function () {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
};
app.use(forceSSL());
const server = http.createServer(app);
server.listen(config.port.http, (err) => {
  if (err) {
    logger.error(`Start server error`, config, err);
  } else {
    logger.info(`Server is listening on port ${config.port.http}`);
  }
});

