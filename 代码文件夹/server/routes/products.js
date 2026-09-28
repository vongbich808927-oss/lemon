const express = require('express');
const { Product, User, Category } = require('../models');
const { Op } = require('sequelize');

const router = express.Router();

// 获取商品列表
router.get('/', async (req, res) => {
  const { category, categoryId, sort = 'time', minPrice, maxPrice, page = 1, pageSize = 20, q, keyword } = req.query;
  
  const where = {};
  
  // 处理搜索关键词
  const searchKeyword = q || keyword;
  if (searchKeyword) {
    where[Op.or] = [
      { title: { [Op.like]: `%${searchKeyword}%` } },
      { description: { [Op.like]: `%${searchKeyword}%` } }
    ];
  }
  
  // 处理分类参数
  if (categoryId) {
    where.categoryId = Number(categoryId);
  } else if (category) {
    // 根据分类名称获取分类ID
    const categoryObj = await Category.findOne({ where: { name: category } });
    if (categoryObj) {
      where.categoryId = categoryObj.id;
    }
  }
  
  // 处理商家ID参数
  if (req.query.sellerId) {
    where.sellerId = Number(req.query.sellerId);
  }
  
  // 处理价格筛选
  if (minPrice) {
    where.price = { ...where.price, [Op.gte]: Number(minPrice) };
  }
  if (maxPrice) {
    where.price = { ...where.price, [Op.lte]: Number(maxPrice) };
  }
  
  // 处理服务筛选
  if (req.query.inspection === 'true') {
    where.inspection = true;
  }
  if (req.query.freeShipping === 'true') {
    where.freeShipping = true;
  }
  
  // 处理新旧程度筛选
  if (req.query.condition) {
    let conditions = req.query.condition;
    if (typeof conditions === 'string') {
      conditions = [conditions];
    }
    where.condition = { [Op.in]: conditions };
  }
  
  // 处理排序和时间范围筛选
  let order = [['createdAt', 'DESC']];
  let timeRangeCondition = {};
  
  // 处理价格排序
  if (sort === 'price-asc') {
    order = [['price', 'ASC']];
  } else if (sort === 'price-desc') {
    order = [['price', 'DESC']];
  }
  
  // 处理时间范围筛选
  const now = new Date();
  if (sort === '1d') {
    // 1天内
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    timeRangeCondition.createdAt = { [Op.gte]: oneDayAgo };
  } else if (sort === '3d') {
    // 3天内
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
    timeRangeCondition.createdAt = { [Op.gte]: threeDaysAgo };
  } else if (sort === '7d') {
    // 7天内
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    timeRangeCondition.createdAt = { [Op.gte]: sevenDaysAgo };
  } else if (sort === '14d') {
    // 14天内
    const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    timeRangeCondition.createdAt = { [Op.gte]: fourteenDaysAgo };
  } else if (sort === 'latest') {
    // 最新发布（默认）
    order = [['createdAt', 'DESC']];
  }
  
  // 合并时间范围筛选条件
  Object.assign(where, timeRangeCondition);
  
  try {
    const products = await Product.findAll({
      where,
      include: [
        { model: User, as: 'seller', attributes: ['id', 'username', 'avatar', 'nickname'] },
        { model: Category, as: 'category', attributes: ['id', 'name', 'icon'] }
      ],
      limit: Number(pageSize),
      offset: (Number(page) - 1) * Number(pageSize),
      order
    });
    
    const total = await Product.count({ where });
    
    res.json({
      products,
      pagination: {
        page: Number(page),
        pageSize: Number(pageSize),
        total,
        totalPages: Math.ceil(total / Number(pageSize))
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取单个商品详情
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const product = await Product.findOne({
      where: { id: Number(id) },
      include: [
        { model: User, as: 'seller', attributes: ['id', 'username', 'avatar', 'nickname'] },
        { model: Category, as: 'category', attributes: ['id', 'name', 'icon'] }
      ]
    });
    
    if (!product) {
      return res.status(404).json({ error: '商品不存在' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
