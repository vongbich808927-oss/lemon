const express = require('express');
const router = express.Router();
const { Order, Product, User } = require('../models');

// 获取用户买到的订单
router.get('/buyer/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.findAll({
      where: { buyerId: userId },
      include: [
        {
          model: Product,
          as: 'product'
        },
        {
          model: User,
          as: 'seller',
          attributes: ['nickname', 'avatar']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: '获取买到的订单失败' });
  }
});

// 获取用户卖出的订单
router.get('/seller/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.findAll({
      where: { sellerId: userId },
      include: [
        {
          model: Product,
          as: 'product'
        },
        {
          model: User,
          as: 'buyer',
          attributes: ['nickname', 'avatar']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: '获取卖出的订单失败' });
  }
});

// 创建订单
router.post('/', async (req, res) => {
  try {
    const { buyerId, productId, transactionMethod } = req.body;
    if (!buyerId || !productId) {
      return res.status(400).json({ error: '买家ID和商品ID不能为空' });
    }
    // 获取商品信息
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: '商品不存在' });
    }
    if (product.sellerId === parseInt(buyerId)) {
      return res.status(400).json({ error: '不能购买自己的商品' });
    }
    // 创建订单
    const order = await Order.create({
      buyerId,
      sellerId: product.sellerId,
      productId,
      price: product.price,
      transactionMethod,
      status: 'pending'
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: '创建订单失败' });
  }
});

// 更新订单状态
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: '订单不存在' });
    }
    order.status = status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: '更新订单状态失败' });
  }
});

// 获取订单详情
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id, {
      include: [
        {
          model: Product,
          as: 'product'
        },
        {
          model: User,
          as: 'buyer',
          attributes: ['nickname', 'avatar', 'username']
        },
        {
          model: User,
          as: 'seller',
          attributes: ['nickname', 'avatar', 'username']
        }
      ]
    });
    if (!order) {
      return res.status(404).json({ error: '订单不存在' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: '获取订单详情失败' });
  }
});

module.exports = router;
