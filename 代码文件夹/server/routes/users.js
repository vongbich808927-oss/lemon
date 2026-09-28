const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');

const router = express.Router();

// 注册新用户
router.post('/register', async (req, res) => {
  try {
    const { username, password, nickname, avatar } = req.body;
    
    // 验证输入
    if (!username || !password || !nickname) {
      return res.status(400).json({ error: '用户名、密码和昵称不能为空' });
    }
    
    // 检查用户名是否已存在
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: '用户名已存在' });
    }
    
    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 创建新用户
    const newUser = await User.create({
      username,
      password: hashedPassword,
      nickname,
      avatar: avatar || null
    });
    
    // 返回用户信息（不包含密码）
    const userWithoutPassword = newUser.toJSON();
    delete userWithoutPassword.password;
    
    res.status(201).json({ message: '注册成功', user: userWithoutPassword });
  } catch (error) {
    console.error('注册失败:', error);
    res.status(500).json({ error: '注册失败，请稍后重试' });
  }
});

// 用户登录
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // 验证输入
    if (!username || !password) {
      return res.status(400).json({ error: '用户名和密码不能为空' });
    }
    
    // 查找用户
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: '用户名或密码错误' });
    }
    
    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: '用户名或密码错误' });
    }
    
    // 返回用户信息（不包含密码）
    const userWithoutPassword = user.toJSON();
    delete userWithoutPassword.password;
    
    res.json({ message: '登录成功', user: userWithoutPassword });
  } catch (error) {
    console.error('登录失败:', error);
    res.status(500).json({ error: '登录失败，请稍后重试' });
  }
});

// 获取用户信息
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // 查找用户
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: '用户不存在' });
    }
    
    // 返回用户信息（不包含密码）
    const userWithoutPassword = user.toJSON();
    delete userWithoutPassword.password;
    
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('获取用户信息失败:', error);
    res.status(500).json({ error: '获取用户信息失败，请稍后重试' });
  }
});

// 更新用户信息
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nickname, avatar } = req.body;
    
    // 查找用户
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: '用户不存在' });
    }
    
    // 更新用户信息
    await user.update({
      nickname: nickname || user.nickname,
      avatar: avatar || user.avatar
    });
    
    // 返回更新后的用户信息（不包含密码）
    const userWithoutPassword = user.toJSON();
    delete userWithoutPassword.password;
    
    res.json({ message: '更新成功', user: userWithoutPassword });
  } catch (error) {
    console.error('更新用户信息失败:', error);
    res.status(500).json({ error: '更新用户信息失败，请稍后重试' });
  }
});

module.exports = router;
