const express = require('express');
const cors = require('cors');
const pinoHttp = require('pino-http');

const logger = require('./config/logger');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(pinoHttp({ logger }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', eventRoutes);

module.exports = app;