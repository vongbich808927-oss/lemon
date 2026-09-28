const express = require('express');
const router = express.Router();
const { Favorite, Product, User } = require('../models');

// 获取用户的收藏列表
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const favorites = await Favorite.findAll({
      where: { userId },
      include: [
        {
          model: Product,
          as: 'product',
          include: [
            {
              model: User,
              as: 'seller',
              attributes: ['nickname', 'avatar']
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: '获取收藏列表失败' });
  }
});

// 添加收藏
router.post('/', async (req, res) => {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
      return res.status(400).json({ error: '用户ID和商品ID不能为空' });
    }
    // 检查是否已经收藏
    const existingFavorite = await Favorite.findOne({
      where: { userId, productId }
    });
    if (existingFavorite) {
      return res.status(400).json({ error: '已经收藏过该商品' });
    }
    const favorite = await Favorite.create({ userId, productId });
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ error: '添加收藏失败' });
  }
});

// 取消收藏
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Favorite.destroy({ where: { id } });
    if (result === 0) {
      return res.status(404).json({ error: '收藏记录不存在' });
    }
    res.json({ message: '取消收藏成功' });
  } catch (error) {
    res.status(500).json({ error: '取消收藏失败' });
  }
});

// 检查商品是否被收藏
router.get('/check', async (req, res) => {
  try {
    const { userId, productId } = req.query;
    if (!userId || !productId) {
      return res.status(400).json({ error: '用户ID和商品ID不能为空' });
    }
    const favorite = await Favorite.findOne({
      where: { userId, productId }
    });
    res.json({ isFavorite: !!favorite });
  } catch (error) {
    res.status(500).json({ error: '检查收藏状态失败' });
  }
});

module.exports = router;
