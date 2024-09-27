const express = require('express');
const compressionMiddleware = require('./middlewares/compressionMiddleware');
const heartRateRoutes = require('./routes/heartRateRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(compressionMiddleware);
app.use('/api', heartRateRoutes);
app.use(errorHandler);

module.exports = app;
