const express = require('express');

const router = express.Router();
const categoriesRouter = require('./categories');
const tagsRouter = require('./tags');
const recoRouter = require('./reco');
const productsRouter = require('./products');
const usersRouter = require('./users');
const favoritesRouter = require('./favorites');
const ordersRouter = require('./orders');

// API routes
router.get('/', (req, res) => {
  res.json({ ok: true, message: 'api root' });
});

// Mount sub-routes
router.use('/categories', categoriesRouter);
router.use('/tags', tagsRouter);
router.use('/reco', recoRouter);
router.use('/products', productsRouter);
router.use('/users', usersRouter);
router.use('/favorites', favoritesRouter);
router.use('/orders', ordersRouter);

module.exports = router;




