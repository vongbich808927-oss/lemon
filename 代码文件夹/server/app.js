require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');

const { sequelize } = require('./db');
const apiRoutes = require('./routes');

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || true, credentials: true }));
app.use(express.json({ limit: '2mb' }));

// static images
const staticPrefix = process.env.STATIC_PREFIX || '/static';
app.use(staticPrefix, express.static(path.join(__dirname, 'static')));

app.get('/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.use('/api', apiRoutes);

const port = Number(process.env.PORT || 3003);
app.listen(port, () => {
  console.log(`[server] listening on http://localhost:${port}`);
  console.log(`[server] static at ${staticPrefix} -> ${path.join(__dirname, 'static')}`);
});




