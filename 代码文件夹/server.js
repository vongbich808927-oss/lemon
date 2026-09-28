import express from 'express';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import fs from 'fs';

const { verbose } = sqlite3;
const db = new (verbose().Database)('xianyu.db');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'xianyu_secret_key_2024';

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.'));

// 创建上传目录
// 确保uploads目录存在
const uploadDir = path.join('./uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 配置文件上传
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// 数据库已在顶部初始化

// 初始化商品数据（如果数据库为空）
function initProducts() {
  db.get('SELECT COUNT(*) as count FROM products', (err, row) => {
    if (err) {
      console.error('检查商品数据失败:', err);
      return;
    }
    
    if (row.count === 0) {
      console.log('数据库为空，开始初始化商品数据...');
      console.log('提示：请运行 "node init-db.js" 来初始化商品数据');
      console.log('或者等待服务器启动后，在另一个终端运行初始化脚本');
    } else {
      console.log(`数据库中已有 ${row.count} 个商品`);
    }
  });
}

// 创建表
db.serialize(() => {
  // 用户表
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT,
    avatar TEXT,
    phone TEXT,
    location TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // 商品表
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    images TEXT,
    category TEXT,
    condition TEXT,
    seller_id INTEGER NOT NULL,
    location TEXT,
    status TEXT DEFAULT 'active',
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(id)
  )`);

  // 收藏表
  db.run(`CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    UNIQUE(user_id, product_id)
  )`);

  // 聊天表
  db.run(`CREATE TABLE IF NOT EXISTS chats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user1_id INTEGER NOT NULL,
    user2_id INTEGER NOT NULL,
    product_id INTEGER,
    last_message TEXT,
    last_message_time DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user1_id) REFERENCES users(id),
    FOREIGN KEY (user2_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  )`);

  // 消息表
  db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chat_id INTEGER NOT NULL,
    sender_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chat_id) REFERENCES chats(id),
    FOREIGN KEY (sender_id) REFERENCES users(id)
  )`);

  // 订单表
  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    buyer_id INTEGER NOT NULL,
    seller_id INTEGER NOT NULL,
    price REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (buyer_id) REFERENCES users(id),
    FOREIGN KEY (seller_id) REFERENCES users(id)
  )`);
  
  // 表创建完成后，初始化商品数据
  initProducts();
});

// JWT验证中间件
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: '未授权访问' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: '令牌无效' });
    }
    req.user = user;
    next();
  });
};

// ========== 用户认证API ==========

// 用户注册
app.post('/api/register', upload.single('avatar'), async (req, res) => {
  // 从表单数据中获取字段
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const phone = req.body.phone;
  const avatar = req.file ? `/uploads/${req.file.filename}` : null;

  if (!username || !password) {
    return res.status(400).json({ error: '用户名和密码不能为空' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.run(
      'INSERT INTO users (username, password, email, phone, avatar) VALUES (?, ?, ?, ?, ?)',
      [username, hashedPassword, email || null, phone || null, avatar],
      function(err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint')) {
            return res.status(400).json({ error: '用户名已存在' });
          }
          return res.status(500).json({ error: '注册失败' });
        }

        const token = jwt.sign({ id: this.lastID, username }, JWT_SECRET);
        res.json({ 
          token, 
          user: { id: this.lastID, username, email, phone, avatar } 
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: '注册失败' });
  }
});

// 用户登录
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: '用户名和密码不能为空' });
  }

  db.get(
    'SELECT * FROM users WHERE username = ?',
    [username],
    async (err, user) => {
      if (err) {
        return res.status(500).json({ error: '登录失败' });
      }

      if (!user) {
        return res.status(401).json({ error: '用户名或密码错误' });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: '用户名或密码错误' });
      }

      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);
      res.json({ 
        token, 
        user: { 
          id: user.id, 
          username: user.username, 
          email: user.email, 
          phone: user.phone,
          avatar: user.avatar,
          location: user.location
        } 
      });
    }
  );
});

// 获取当前用户信息
app.get('/api/user/me', authenticateToken, (req, res) => {
  db.get(
    'SELECT id, username, email, phone, avatar, location FROM users WHERE id = ?',
    [req.user.id],
    (err, user) => {
      if (err) {
        return res.status(500).json({ error: '获取用户信息失败' });
      }
      res.json(user);
    }
  );
});

// ========== 商品API ==========

// 获取商品列表
app.get('/api/products', (req, res) => {
  const { category, keyword, q, page = 1, limit = 20, pageSize } = req.query;
  const searchKeyword = keyword || q;
  const itemsPerPage = pageSize || limit;
  let query = 'SELECT p.*, u.username as seller_name, u.avatar as seller_avatar FROM products p JOIN users u ON p.seller_id = u.id WHERE p.status = "active"';
  const params = [];

  if (category) {
    query += ' AND p.category = ?';
    params.push(category);
  }

  if (searchKeyword) {
    query += ' AND (p.title LIKE ? OR p.description LIKE ?)';
    const searchTerm = `%${searchKeyword}%`;
    params.push(searchTerm, searchTerm);
  }

  query += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
  params.push(parseInt(itemsPerPage), (parseInt(page) - 1) * parseInt(itemsPerPage));

  db.all(query, params, (err, products) => {
    if (err) {
      return res.status(500).json({ error: '获取商品列表失败' });
    }

    // 解析图片数组
    const formattedProducts = products.map(product => ({
      ...product,
      images: product.images ? JSON.parse(product.images) : []
    }));

    res.json({ items: formattedProducts });
  });
});

// 获取商品详情
app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;

  db.get(
    `SELECT p.*, u.username as seller_name, u.avatar as seller_avatar, u.location as seller_location 
     FROM products p 
     JOIN users u ON p.seller_id = u.id 
     WHERE p.id = ?`,
    [productId],
    (err, product) => {
      if (err) {
        return res.status(500).json({ error: '获取商品详情失败' });
      }

      if (!product) {
        return res.status(404).json({ error: '商品不存在' });
      }

      // 增加浏览量
      db.run('UPDATE products SET views = views + 1 WHERE id = ?', [productId]);

      // 解析图片数组
      product.images = product.images ? JSON.parse(product.images) : [];

      res.json(product);
    }
  );
});

// 发布商品
app.post('/api/products', authenticateToken, upload.array('images', 5), (req, res) => {
  const { title, description, price, category, condition, location } = req.body;

  if (!title || !price) {
    return res.status(400).json({ error: '标题和价格不能为空' });
  }

  const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

  db.run(
    'INSERT INTO products (title, description, price, images, category, condition, seller_id, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [title, description || '', parseFloat(price), JSON.stringify(images), category || '', condition || '全新', req.user.id, location || ''],
    function(err) {
      if (err) {
        return res.status(500).json({ error: '发布商品失败' });
      }

      res.json({ id: this.lastID, message: '商品发布成功' });
    }
  );
});

// 更新商品
app.put('/api/products/:id', authenticateToken, (req, res) => {
  const productId = req.params.id;
  const { title, description, price, category, condition, status } = req.body;

  // 检查是否是商品所有者
  db.get('SELECT seller_id FROM products WHERE id = ?', [productId], (err, product) => {
    if (err || !product) {
      return res.status(404).json({ error: '商品不存在' });
    }

    if (product.seller_id !== req.user.id) {
      return res.status(403).json({ error: '无权修改此商品' });
    }

    const updates = [];
    const params = [];

    if (title) { updates.push('title = ?'); params.push(title); }
    if (description !== undefined) { updates.push('description = ?'); params.push(description); }
    if (price) { updates.push('price = ?'); params.push(parseFloat(price)); }
    if (category) { updates.push('category = ?'); params.push(category); }
    if (condition) { updates.push('condition = ?'); params.push(condition); }
    if (status) { updates.push('status = ?'); params.push(status); }

    if (updates.length === 0) {
      return res.status(400).json({ error: '没有要更新的字段' });
    }

    params.push(productId);

    db.run(
      `UPDATE products SET ${updates.join(', ')} WHERE id = ?`,
      params,
      (err) => {
        if (err) {
          return res.status(500).json({ error: '更新商品失败' });
        }
        res.json({ message: '商品更新成功' });
      }
    );
  });
});

// 删除商品
app.delete('/api/products/:id', authenticateToken, (req, res) => {
  const productId = req.params.id;

  db.get('SELECT seller_id FROM products WHERE id = ?', [productId], (err, product) => {
    if (err || !product) {
      return res.status(404).json({ error: '商品不存在' });
    }

    if (product.seller_id !== req.user.id) {
      return res.status(403).json({ error: '无权删除此商品' });
    }

    db.run('UPDATE products SET status = "deleted" WHERE id = ?', [productId], (err) => {
      if (err) {
        return res.status(500).json({ error: '删除商品失败' });
      }
      res.json({ message: '商品删除成功' });
    });
  });
});

// 收藏/取消收藏商品
app.post('/api/products/:id/favorite', authenticateToken, (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;

  db.get('SELECT * FROM favorites WHERE user_id = ? AND product_id = ?', [userId, productId], (err, favorite) => {
    if (err) {
      return res.status(500).json({ error: '操作失败' });
    }

    if (favorite) {
      // 取消收藏
      db.run('DELETE FROM favorites WHERE user_id = ? AND product_id = ?', [userId, productId], (err) => {
        if (err) {
          return res.status(500).json({ error: '取消收藏失败' });
        }
        db.run('UPDATE products SET likes = likes - 1 WHERE id = ?', [productId]);
        res.json({ favorited: false, message: '已取消收藏' });
      });
    } else {
      // 添加收藏
      db.run('INSERT INTO favorites (user_id, product_id) VALUES (?, ?)', [userId, productId], (err) => {
        if (err) {
          return res.status(500).json({ error: '收藏失败' });
        }
        db.run('UPDATE products SET likes = likes + 1 WHERE id = ?', [productId]);
        res.json({ favorited: true, message: '收藏成功' });
      });
    }
  });
});

// ========== 聊天API ==========

// 获取聊天列表
app.get('/api/chats', authenticateToken, (req, res) => {
  db.all(
    `SELECT c.*, 
     CASE WHEN c.user1_id = ? THEN u2.username ELSE u1.username END as other_username,
     CASE WHEN c.user1_id = ? THEN u2.avatar ELSE u1.avatar END as other_avatar,
     p.title as product_title, p.images as product_images
     FROM chats c
     LEFT JOIN users u1 ON c.user1_id = u1.id
     LEFT JOIN users u2 ON c.user2_id = u2.id
     LEFT JOIN products p ON c.product_id = p.id
     WHERE c.user1_id = ? OR c.user2_id = ?
     ORDER BY c.last_message_time DESC`,
    [req.user.id, req.user.id, req.user.id, req.user.id],
    (err, chats) => {
      if (err) {
        return res.status(500).json({ error: '获取聊天列表失败' });
      }

      const formattedChats = chats.map(chat => ({
        ...chat,
        product_images: chat.product_images ? JSON.parse(chat.product_images) : []
      }));

      res.json(formattedChats);
    }
  );
});

// 获取聊天消息
app.get('/api/chats/:chatId/messages', authenticateToken, (req, res) => {
  const chatId = req.params.chatId;

  // 验证用户是否有权限访问此聊天
  db.get('SELECT * FROM chats WHERE id = ? AND (user1_id = ? OR user2_id = ?)', 
    [chatId, req.user.id, req.user.id], 
    (err, chat) => {
      if (err || !chat) {
        return res.status(403).json({ error: '无权访问此聊天' });
      }

      db.all(
        'SELECT * FROM messages WHERE chat_id = ? ORDER BY created_at ASC',
        [chatId],
        (err, messages) => {
          if (err) {
            return res.status(500).json({ error: '获取消息失败' });
          }
          res.json(messages);
        }
      );
    }
  );
});

// 创建或获取聊天
app.post('/api/chats', authenticateToken, (req, res) => {
  const { userId, productId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: '用户ID不能为空' });
  }

  if (userId === req.user.id) {
    return res.status(400).json({ error: '不能与自己聊天' });
  }

  // 查找是否已存在聊天
  db.get(
    'SELECT * FROM chats WHERE ((user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)) AND product_id = ?',
    [req.user.id, userId, userId, req.user.id, productId || null],
    (err, existingChat) => {
      if (err) {
        return res.status(500).json({ error: '查找聊天失败' });
      }

      if (existingChat) {
        return res.json(existingChat);
      }

      // 创建新聊天
      db.run(
        'INSERT INTO chats (user1_id, user2_id, product_id) VALUES (?, ?, ?)',
        [req.user.id, userId, productId || null],
        function(err) {
          if (err) {
            return res.status(500).json({ error: '创建聊天失败' });
          }

          res.json({ id: this.lastID, message: '聊天创建成功' });
        }
      );
    }
  );
});

// ========== 订单API ==========

// 创建订单
app.post('/api/orders', authenticateToken, (req, res) => {
  const { productId } = req.body;

  db.get('SELECT * FROM products WHERE id = ? AND status = "active"', [productId], (err, product) => {
    if (err || !product) {
      return res.status(404).json({ error: '商品不存在或已下架' });
    }

    if (product.seller_id === req.user.id) {
      return res.status(400).json({ error: '不能购买自己的商品' });
    }

    db.run(
      'INSERT INTO orders (product_id, buyer_id, seller_id, price) VALUES (?, ?, ?, ?)',
      [productId, req.user.id, product.seller_id, product.price],
      function(err) {
        if (err) {
          return res.status(500).json({ error: '创建订单失败' });
        }

        // 更新商品状态
        db.run('UPDATE products SET status = "sold" WHERE id = ?', [productId]);

        res.json({ id: this.lastID, message: '订单创建成功' });
      }
    );
  });
});

// 获取我的订单
app.get('/api/orders', authenticateToken, (req, res) => {
  const { type = 'all' } = req.query;
  let query = 'SELECT o.*, p.title, p.images, u.username as seller_name, u2.username as buyer_name FROM orders o JOIN products p ON o.product_id = p.id JOIN users u ON o.seller_id = u.id JOIN users u2 ON o.buyer_id = u2.id WHERE ';

  if (type === 'buying') {
    query += 'o.buyer_id = ?';
  } else if (type === 'selling') {
    query += 'o.seller_id = ?';
  } else {
    query += '(o.buyer_id = ? OR o.seller_id = ?)';
  }

  query += ' ORDER BY o.created_at DESC';

  const params = type === 'all' ? [req.user.id, req.user.id] : [req.user.id];

  db.all(query, params, (err, orders) => {
    if (err) {
      return res.status(500).json({ error: '获取订单失败' });
    }

    const formattedOrders = orders.map(order => ({
      ...order,
      images: order.images ? JSON.parse(order.images) : []
    }));

    res.json(formattedOrders);
  });
});

// ========== Socket.IO 实时聊天 ==========

io.on('connection', (socket) => {
  console.log('用户连接:', socket.id);

  socket.on('join-chat', (chatId) => {
    socket.join(`chat-${chatId}`);
  });

  socket.on('send-message', async (data) => {
    const { chatId, senderId, content } = data;

    // 保存消息到数据库
    db.run(
      'INSERT INTO messages (chat_id, sender_id, content) VALUES (?, ?, ?)',
      [chatId, senderId, content],
      function(err) {
        if (err) {
          return socket.emit('error', { message: '发送消息失败' });
        }

        // 更新聊天最后消息
        db.run(
          'UPDATE chats SET last_message = ?, last_message_time = CURRENT_TIMESTAMP WHERE id = ?',
          [content, chatId]
        );

        // 获取消息详情
        db.get('SELECT * FROM messages WHERE id = ?', [this.lastID], (err, message) => {
          if (!err && message) {
            // 广播消息给聊天室内的所有用户
            io.to(`chat-${chatId}`).emit('new-message', message);
          }
        });
      }
    );
  });

  socket.on('disconnect', () => {
    console.log('用户断开连接:', socket.id);
  });
});

// 启动服务器
server.listen(PORT, () => {
  console.log(`闲鱼服务器运行在 http://localhost:${PORT}`);
});

