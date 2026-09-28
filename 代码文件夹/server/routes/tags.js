const express = require('express');
const { Tag } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  const tags = await Tag.findAll({ order: [['id', 'ASC']] });
  res.json(tags);
});

module.exports = router;




