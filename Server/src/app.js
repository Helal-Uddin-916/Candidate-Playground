const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const profileRoutes = require('./routes/profile.routes');
const healthRoutes = require('./routes/health.routes');
const rateLimiter = require('./middleware/rateLimit');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

const app = express(); // ✅ app must be initialized FIRST

connectDB();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

// logging middleware
app.use((req, res, next) => {
  logger.info({
    method: req.method,
    url: req.url
  });
  next();
});

app.use('/api/profile', profileRoutes);
app.use('/health', healthRoutes);

// error handler MUST be last
app.use(errorHandler);

module.exports = app;
