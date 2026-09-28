// API工具类
const API_BASE_URL = 'http://localhost:3000/api';

// 获取token
function getToken() {
  return localStorage.getItem('token');
}

// 设置token
function setToken(token) {
  localStorage.setItem('token', token);
}

// 移除token
function removeToken() {
  localStorage.removeItem('token');
}

// 获取当前用户信息
function getCurrentUser() {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

// 设置当前用户信息
function setCurrentUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

// 通用请求函数
async function request(url, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || '请求失败');
    }

    return data;
  } catch (error) {
    console.error('API请求错误:', error);
    throw error;
  }
}

// 用户API
const userAPI = {
  // 注册
  register: async (username, password, email, phone, avatar) => {
    // 如果有头像文件，使用FormData
    if (avatar) {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      if (email) formData.append('email', email);
      if (phone) formData.append('phone', phone);
      formData.append('avatar', avatar);

      const token = getToken();
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers,
        body: formData
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || '注册失败');
      }
      setToken(data.token);
      setCurrentUser(data.user);
      return data;
    } else {
      // 没有头像文件，使用JSON
      const data = await request('/register', {
        method: 'POST',
        body: JSON.stringify({ username, password, email, phone })
      });
      setToken(data.token);
      setCurrentUser(data.user);
      return data;
    }
  },

  // 登录
  login: async (username, password) => {
    const data = await request('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
    setToken(data.token);
    setCurrentUser(data.user);
    return data;
  },

  // 登出
  logout: () => {
    removeToken();
    localStorage.removeItem('user');
    window.location.href = 'index.html';
  },

  // 获取当前用户信息
  getCurrentUser: async () => {
    return request('/user/me');
  }
};

// 商品API
const productAPI = {
  // 获取商品列表
  getProducts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return request(`/products?${queryString}`);
  },

  // 获取商品详情
  getProduct: async (id) => {
    return request(`/products/${id}`);
  },

  // 发布商品
  publishProduct: async (productData, images) => {
    const formData = new FormData();
    formData.append('title', productData.title);
    formData.append('description', productData.description || '');
    formData.append('price', productData.price);
    formData.append('category', productData.category || '');
    formData.append('condition', productData.condition || '全新');
    formData.append('location', productData.location || '');

    if (images && images.length > 0) {
      images.forEach(image => {
        formData.append('images', image);
      });
    }

    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || '发布商品失败');
    }
    return data;
  },

  // 更新商品
  updateProduct: async (id, productData) => {
    return request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData)
    });
  },

  // 删除商品
  deleteProduct: async (id) => {
    return request(`/products/${id}`, {
      method: 'DELETE'
    });
  },

  // 收藏/取消收藏
  toggleFavorite: async (productId) => {
    return request(`/products/${productId}/favorite`, {
      method: 'POST'
    });
  }
};

// 聊天API
const chatAPI = {
  // 获取聊天列表
  getChats: async () => {
    return request('/chats');
  },

  // 获取聊天消息
  getMessages: async (chatId) => {
    return request(`/chats/${chatId}/messages`);
  },

  // 创建或获取聊天
  createOrGetChat: async (userId, productId) => {
    return request('/chats', {
      method: 'POST',
      body: JSON.stringify({ userId, productId })
    });
  }
};

// 订单API
const orderAPI = {
  // 创建订单
  createOrder: async (productId) => {
    return request('/orders', {
      method: 'POST',
      body: JSON.stringify({ productId })
    });
  },

  // 获取订单列表
  getOrders: async (type = 'all') => {
    return request(`/orders?type=${type}`);
  }
};

// 导出API
window.userAPI = userAPI;
window.productAPI = productAPI;
window.chatAPI = chatAPI;
window.orderAPI = orderAPI;
window.getToken = getToken;
window.getCurrentUser = getCurrentUser;






