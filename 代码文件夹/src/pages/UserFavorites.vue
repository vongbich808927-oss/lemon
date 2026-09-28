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
        <div class="menu-item" @click="toggleMenu(1)">
          <img src="https://img.alicdn.com/imgextra/i2/O1CN014R05RE1XdJoyo96dx_!!6000000002946-2-tps-40-40.png_.webp" alt="我的交易" class="menu-icon">
          <span>我的交易</span>
          <span class="arrow" :class="{ 'expanded': expandedMenus[1] }"></span>
          <div class="submenu" v-show="expandedMenus[1]">
            <div class="submenu-item" @click="goToPublished">我发布的</div>
            <div class="submenu-item" @click="goToSold">我卖出的</div>
            <div class="submenu-item" @click="goToBought">我买到的</div>
          </div>
        </div>
        <div class="menu-item active" @click="goToFavorites">
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

      <!-- 右侧收藏列表区域 -->
      <div class="right-content">
        <div class="favorites-container">
          <h2 class="title">我的收藏</h2>
          
          <div v-if="loading" class="loading">
            <div class="loading-spinner"></div>
            <span>加载中...</span>
          </div>
          
          <div v-else-if="favorites.length === 0" class="empty-state">
            <img src="https://img.alicdn.com/imgextra/i1/O1CN013bK3qP1VYrqZ3x0hS_!!6000000002314-2-tps-80-80.png_.webp" alt="空状态" class="empty-icon">
            <div class="empty-text">暂无收藏的商品</div>
            <button class="go-shopping-btn" @click="goHome">去逛逛</button>
          </div>
          
          <div v-else class="favorites-list">
            <div class="favorite-item" v-for="favorite in favorites" :key="favorite.id">
              <div class="product-info" @click="goToProductDetail(favorite.product.id)">
                <div class="product-image">
                  <img :src="favorite.product.images[0] || defaultProductImage" alt="商品图片" class="product-img">
                </div>
                <div class="product-details">
                  <div class="product-title">{{ favorite.product.title }}</div>
                  <div class="product-price">¥{{ favorite.product.price }}</div>
                  <div class="product-seller">
                    <img :src="favorite.product.seller.avatar || defaultAvatar" alt="卖家头像" class="seller-avatar">
                    <span class="seller-name">{{ favorite.product.seller.nickname }}</span>
                  </div>
                </div>
              </div>
              <div class="action-buttons">
                <button class="buy-btn" @click="goToBuyConfirm(favorite.product.id)">
                  <img src="https://img.alicdn.com/imgextra/i3/O1CN017hH0iY1uWnqYV6ZcQw_!!6000000006064-2-tps-20-20.png_.webp" alt="购买" class="btn-icon">
                  <span>立即购买</span>
                </button>
                <button class="unfavorite-btn" @click="handleUnfavorite(favorite.id)">
                  <img src="https://img.alicdn.com/imgextra/i3/O1CN01dHf08M1sQjWtC5x9y_!!6000000005293-2-tps-20-20.png_.webp" alt="取消收藏" class="btn-icon">
                  <span>取消收藏</span>
                </button>
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
  1: false, // 我的交易
  3: false   // 账户设置
})

// 用户信息
const user = ref({
  id: '',
  username: '',
  nickname: '',
  avatar: ''
})

// 收藏列表
const favorites = ref([])
const loading = ref(false)
const errorMessage = ref('')

// 页面加载时获取用户信息和收藏列表
onMounted(() => {
  const savedUser = localStorage.getItem('user')
  if (savedUser) {
    user.value = JSON.parse(savedUser)
    fetchFavorites()
  }
})

// 获取收藏列表
const fetchFavorites = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    const response = await fetch(`http://localhost:3002/api/favorites/user/${user.value.id}`)
    if (response.ok) {
      const data = await response.json()
      favorites.value = data
    } else {
      const errorData = await response.json()
      errorMessage.value = errorData.error || '获取收藏列表失败'
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

// 取消收藏
const handleUnfavorite = async (favoriteId) => {
  if (!confirm('确定要取消收藏吗？')) {
    return
  }
  try {
    const response = await fetch(`http://localhost:3002/api/favorites/${favoriteId}`, {
      method: 'DELETE'
    })
    if (response.ok) {
      // 更新收藏列表
      favorites.value = favorites.value.filter(item => item.id !== favoriteId)
    } else {
      const errorData = await response.json()
      errorMessage.value = errorData.error || '取消收藏失败'
    }
  } catch (error) {
    errorMessage.value = '网络错误，请稍后重试'
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

const goToBuyConfirm = (productId) => {
  window.open(`/buy/${productId}`, '_blank')
}

const goHome = () => {
  window.open('/', '_blank')
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

/* 收藏容器 */
.favorites-container {
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

.go-shopping-btn {
  padding: 10px 24px;
  background: #ff4d00;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.go-shopping-btn:hover {
  background: #ff6a33;
}

/* 收藏列表 */
.favorites-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}

.favorite-item {
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.favorite-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,.1);
}

.product-info {
  padding: 12px;
  cursor: pointer;
}

.product-image {
  width: 100%;
  height: 180px;
  overflow: hidden;
  border-radius: 4px;
  margin-bottom: 12px;
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

.product-price {
  font-size: 16px;
  font-weight: bold;
  color: #ff4d00;
  margin-bottom: 8px;
}

.product-seller {
  display: flex;
  align-items: center;
  gap: 6px;
}

.seller-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
}

.seller-name {
  font-size: 12px;
  color: #999;
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  border-top: 1px solid #f0f0f0;
}

.buy-btn, .unfavorite-btn {
  flex: 1;
  padding: 10px;
  border: none;
  background: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 14px;
  transition: background-color 0.2s;
}

.buy-btn {
  color: #ff4d00;
  border-right: 1px solid #f0f0f0;
}

.buy-btn:hover {
  background: #fff5f0;
}

.unfavorite-btn {
  color: #999;
}

.unfavorite-btn:hover {
  background: #f9f9f9;
  color: #ff4d00;
}

.btn-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
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