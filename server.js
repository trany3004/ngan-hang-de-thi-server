global.BASE_DIR = __dirname;

const http = require('http');
const express = require('express');
const config = require('./config');
const logger = require('./modules/logger');
const cors = require('cors');
const path = require('path');
const gateway = require('./modules/gateway');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());
app.use('/api/v1', gateway.router);

app.use((req, res) => {
  res.status(404).json({ message: `CANNOT ${req.method} API ${req.originalUrl}` });
});

app.use((err, req, res, _next) => res.status(500).json({ message: err.message || String(err) }));

require('./modules/database').connectDB();

const server = http.createServer(app);
server.listen(config.port.http, (err) => {
  if (err) {
    logger.error(`Start server error`, config, err);
  } else {
    logger.info(`Server is listening on port ${config.port.http}`);
  }
});

