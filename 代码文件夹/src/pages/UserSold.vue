<template>
  <div class="page">
    <!-- 顶部黄色导航栏 -->
    <div class="top-bar">
      <div class="top-bar-content">
        <div class="logo">闲鱼</div>
        <div class="user-info">
          <img :src="user.avatar || defaultAvatar" alt="用户头像" class="avatar-img">
          <span class="username">{{ user.nickname }}</span>
        </div>
        <div class="order-btn">
          <span>订单</span>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="main-container">
      <!-- 左侧菜单 -->
      <div class="left-menu">
        <div class="menu-item" @click="goToMyXianyu">
          <img src="https://img.alicdn.com/imgextra/i2/O1CN01dGvMWM1H5r1rpcDXp_!!6000000000707-2-tps-40-40.png_.webp" alt="我的闲鱼" class="menu-icon">
          <span>我的闲鱼</span>
        </div>
        <div class="menu-item active" @click="toggleMenu(1)">
          <img src="https://img.alicdn.com/imgextra/i2/O1CN014R05RE1XdJoyo96dx_!!6000000002946-2-tps-40-40.png_.webp" alt="我的交易" class="menu-icon">
          <span>我的交易</span>
          <span class="arrow" :class="{ 'expanded': expandedMenus[1] }"></span>
          <div class="submenu" v-show="expandedMenus[1]">
            <div class="submenu-item" @click="goToPublished">我发布的</div>
            <div class="submenu-item active" @click="goToSold">我卖出的</div>
            <div class="submenu-item" @click="goToBought">我买到的</div>
          </div>
        </div>
        <div class="menu-item" @click="goToFavorites">
          <img src="https://img.alicdn.com/imgextra/i3/O1CN01uvxqkY21XJ5zBtLHz_!!6000000006994-2-tps-40-40.png_.webp" alt="我的收藏" class="menu-icon">
          <span>我的收藏</span>
        </div>
        <div class="menu-item" @click="toggleMenu(3)">
          <img src="https://img.alicdn.com/imgextra/i4/O1CN017VWyyI1gnhL12X8NN_!!6000000004187-2-tps-40-40.png_.webp" alt="账户设置" class="menu-icon">
          <span>账户设置</span>
          <span class="arrow" :class="{ 'expanded': expandedMenus[3] }"></span>
          <div class="submenu" v-show="expandedMenus[3]">
            <div class="submenu-item" @click="goToPersonalInfo">个人资料</div>
            <div class="submenu-item" @click="goToAccountSecurity">账号与安全</div>
          </div>
        </div>
      </div>

      <!-- 右侧卖出的订单列表区域 -->
      <div class="right-content">
        <div class="orders-container">
          <h2 class="title">我卖出的</h2>
          
          <div v-if="loading" class="loading">
            <div class="loading-spinner"></div>
            <span>加载中...</span>
          </div>
          
          <div v-else-if="orders.length === 0" class="empty-state">
            <img src="https://img.alicdn.com/imgextra/i1/O1CN013bK3qP1VYrqZ3x0hS_!!6000000002314-2-tps-80-80.png_.webp" alt="空状态" class="empty-icon">
            <div class="empty-text">暂无订单记录</div>
            <button class="go-publish-btn" @click="goToPublish">发布商品</button>
          </div>
          
          <div v-else class="orders-list">
            <div class="order-item" v-for="order in orders" :key="order.id">
              <div class="order-header">
                <div class="order-time">{{ formatDate(order.createdAt) }}</div>
                <div class="order-status" :class="getStatusClass(order.status)">
                  {{ getStatusText(order.status) }}
                </div>
              </div>
              
              <div class="order-content">
                <div class="product-info" @click="goToProductDetail(order.product.id)">
                  <div class="product-image">
                    <img :src="order.product.images[0] || defaultProductImage" alt="商品图片" class="product-img">
                  </div>
                  <div class="product-details">
                    <div class="product-title">{{ order.product.title }}</div>
                    <div class="product-attributes">
                      <div class="attr-item">新旧程度：{{ order.product.condition }}</div>
                      <div class="attr-item">交易方式：{{ order.transactionMethod }}</div>
                    </div>
                  </div>
                </div>
                
                <div class="order-price">
                  <div class="price-label">成交价</div>
                  <div class="price-value">¥{{ order.price }}</div>
                </div>
                
                <div class="order-actions">
                  <button class="chat-btn" @click="goToChat(order.buyer.id)">
                    <span>联系买家</span>
                  </button>
                  <button 
                    class="primary-btn" 
                    @click="handleOrderAction(order)"
                    :disabled="order.status !== 'pending'"
                  >
                    {{ getActionText(order.status) }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部版权信息 -->
    <div class="footer">
      <div class="footer-content">
        <span>统一社会信用代码: 91330100MA28H1F12Q | 增值电信业务经营许可证: 浙B2-20150151 | 增值电信业务经营许可证(跨地区): 浙B2-20241186 | 网络食品交易第三方平台提供者备案: 浙餐网备A3301000015</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const defaultAvatar = 'https://img.alicdn.com/bao/uploaded/i2/O1CN01MAVy7P1rpUlYTAthm_!!4611686018427380096-0-mtopupload.jpg_110x10000Q90.jpg_.webp'
const defaultProductImage = 'https://img.alicdn.com/imgextra/i1/O1CN013bK3qP1VYrqZ3x0hS_!!6000000002314-2-tps-80-80.png_.webp'

// 响应式数据控制子菜单展开/收起
const expandedMenus = ref({
  1: true, // 我的交易
  3: false   // 账户设置
})

// 用户信息
const user = ref({
  id: '',
  username: '',
  nickname: '',
  avatar: ''
})

// 订单列表
const orders = ref([])
const loading = ref(false)
const errorMessage = ref('')

// 页面加载时获取用户信息和订单列表
onMounted(() => {
  const savedUser = localStorage.getItem('user')
  if (savedUser) {
    user.value = JSON.parse(savedUser)
    fetchOrders()
  }
})

// 获取卖出的订单列表
const fetchOrders = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    const response = await fetch(`http://localhost:3002/api/orders/seller/${user.value.id}`)
    if (response.ok) {
      const data = await response.json()
      orders.value = data
    } else {
      const errorData = await response.json()
      errorMessage.value = errorData.error || '获取订单列表失败'
    }
  } catch (error) {
    errorMessage.value = '网络错误，请稍后重试'
  } finally {
    loading.value = false
  }
}

// 切换子菜单展开状态
const toggleMenu = (menuIndex) => {
  expandedMenus.value[menuIndex] = !expandedMenus.value[menuIndex]
}

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 获取订单状态文本
const getStatusText = (status) => {
  const statusMap = {
    pending: '等待发货',
    shipped: '已发货',
    completed: '交易完成',
    cancelled: '已取消'
  }
  return statusMap[status] || status
}

// 获取订单状态样式类
const getStatusClass = (status) => {
  const classMap = {
    pending: 'status-pending',
    shipped: 'status-shipped',
    completed: 'status-completed',
    cancelled: 'status-cancelled'
  }
  return classMap[status] || ''
}

// 获取操作按钮文本
const getActionText = (status) => {
  const actionMap = {
    pending: '标记发货',
    shipped: '等待确认',
    completed: '已完成',
    cancelled: '已取消'
  }
  return actionMap[status] || '操作'
}

// 处理订单操作
const handleOrderAction = async (order) => {
  if (order.status === 'pending') {
    if (!confirm('确认已经发货了吗？')) {
      return
    }
    try {
      const response = await fetch(`http://localhost:3002/api/orders/${order.id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'shipped' })
      })
      if (response.ok) {
        order.status = 'shipped'
      } else {
        const errorData = await response.json()
        errorMessage.value = errorData.error || '操作失败'
      }
    } catch (error) {
      errorMessage.value = '网络错误，请稍后重试'
    }
  }
}

// 页面跳转函数
const goToMyXianyu = () => {
  window.open('/user/profile', '_blank')
}

const goToPublished = () => {
  window.open('/user/published', '_blank')
}

const goToSold = () => {
  window.open('/user/sold', '_blank')
}

const goToBought = () => {
  window.open('/user/bought', '_blank')
}

const goToFavorites = () => {
  window.open('/user/favorites', '_blank')
}

const goToPersonalInfo = () => {
  window.open('/user/personal-info', '_blank')
}

const goToAccountSecurity = () => {
  window.open('/user/account-security', '_blank')
}

const goToProductDetail = (productId) => {
  window.open(`/product/${productId}`, '_blank')
}

const goToChat = (buyerId) => {
  // 这里可以跳转到聊天页面，暂时用弹窗代替
  alert('联系买家功能开发中...')
}

const goToPublish = () => {
  window.open('/user/publish', '_blank')
}
</script>

<style scoped>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
}

.page {
  min-height: 100vh;
  background: #f5f5f5;
  font-family: Arial, sans-serif;
  width: 100%;
}

/* 顶部黄色导航栏 */
.top-bar {
  background: #ffe60f;
  padding: 10px 0;
  width: 100%;
}

.top-bar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
  max-width: 1400px;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}

.username {
  font-size: 16px;
  color: #333;
}

.order-btn {
  cursor: pointer;
  font-size: 16px;
  color: #333;
}

/* 主要内容容器 */
.main-container {
  display: flex;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
  max-width: 1400px;
  gap: 20px;
}

/* 左侧菜单 */
.left-menu {
  width: 180px;
  background: #fff;
  border-radius: 8px;
  padding: 10px 0;
  box-shadow: 0 1px 2px rgba(0,0,0,.03);
}

.menu-item {
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.2s;
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
}

.menu-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.menu-item:hover {
  background-color: #f5f5f5;
}

.menu-item.active {
  background-color: #f5f5f5;
  border-radius: 8px;
  font-weight: bold;
}

.arrow {
  background-image: url("https://img.alicdn.com/imgextra/i3/O1CN01XkRvjL1lX9Xy5RgUj_!!6000000004690-2-tps-24-24.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 16px;
  height: 16px;
  display: inline-block;
  transition: transform 0.2s;
  transform: rotate(0deg);
}

.arrow.expanded {
  transform: rotate(180deg);
}

.submenu {
  background: #f9f9f9;
  padding-left: 50px;
  overflow: hidden;
}

.submenu-item {
  padding: 8px 0;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  transition: color 0.2s;
}

.submenu-item:hover {
  color: #ff4d00;
}

.submenu-item.active {
  color: #ff4d00;
  font-weight: bold;
}

/* 右侧内容 */
.right-content {
  flex: 1;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0,0,0,.03);
  padding: 20px;
}

/* 订单容器 */
.orders-container {
  max-width: 1000px;
  margin: 0 auto;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #333;
  text-align: center;
}

/* 加载状态 */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 12px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f0f0f0;
  border-top: 4px solid #ff4d00;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 16px;
  text-align: center;
}

.empty-icon {
  width: 80px;
  height: 80px;
  opacity: 0.6;
}

.empty-text {
  font-size: 16px;
  color: #999;
}

.go-publish-btn {
  padding: 10px 24px;
  background: #ff4d00;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.go-publish-btn:hover {
  background: #ff6a33;
}

/* 订单列表 */
.orders-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order-item {
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.2s;
}

.order-item:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,.1);
}

/* 订单头部 */
.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f9f9f9;
  border-bottom: 1px solid #f0f0f0;
}

.order-time {
  font-size: 14px;
  color: #999;
}

.order-status {
  font-size: 14px;
  font-weight: bold;
}

.status-pending {
  color: #ff9500;
}

.status-shipped {
  color: #007aff;
}

.status-completed {
  color: #52c41a;
}

.status-cancelled {
  color: #ff4d4f;
}

/* 订单内容 */
.order-content {
  padding: 16px;
  display: flex;
  gap: 20px;
  align-items: center;
}

.product-info {
  flex: 1;
  display: flex;
  gap: 12px;
  cursor: pointer;
}

.product-image {
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 4px;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-info:hover .product-img {
  transform: scale(1.05);
}

.product-details {
  flex: 1;
  min-width: 0;
}

.product-title {
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 8px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-attributes {
  display: flex;
  gap: 16px;
}

.attr-item {
  font-size: 12px;
  color: #999;
}

.order-price {
  min-width: 100px;
  text-align: right;
}

.price-label {
  font-size: 12px;
  color: #999;
  margin-bottom: 4px;
}

.price-value {
  font-size: 18px;
  font-weight: bold;
  color: #ff4d00;
}

.order-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 100px;
}

.chat-btn, .primary-btn {
  padding: 8px 16px;
  border: 1px solid #ff4d00;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.chat-btn {
  background: #fff;
  color: #ff4d00;
}

.chat-btn:hover {
  background: #fff5f0;
}

.primary-btn {
  background: #ff4d00;
  color: #fff;
}

.primary-btn:hover:not(:disabled) {
  background: #ff6a33;
  border-color: #ff6a33;
}

.primary-btn:disabled {
  background: #ffb899;
  border-color: #ffb899;
  cursor: not-allowed;
  opacity: 0.6;
}

/* 底部版权信息 */
.footer {
  background: #fff;
  padding: 15px 0;
  margin-top: 30px;
  border-top: 1px solid #f0f0f0;
}

.footer-content {
  text-align: center;
  font-size: 12px;
  color: #999;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>