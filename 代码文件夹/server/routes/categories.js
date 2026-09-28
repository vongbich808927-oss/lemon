const express = require('express');
const { Category } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  const categories = await Category.findAll({ order: [['id', 'ASC']] });
  // 将subcategories字符串解析为JSON对象
  const formattedCategories = categories.map(category => {
    return {
      ...category.toJSON(),
      subcategories: category.subcategories ? JSON.parse(category.subcategories) : null
    };
  });
  res.json(formattedCategories);
});

module.exports = router;




