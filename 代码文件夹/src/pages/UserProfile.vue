<template>
  <div class="page">
    <!-- 顶部黄色导航栏 -->
    <div class="top-bar">
      <div class="top-bar-content">
        <div class="logo">闲鱼</div>
        <div class="user-info">
          <img src="https://img.alicdn.com/bao/uploaded/i2/O1CN01MAVy7P1rpUlYTAthm_!!4611686018427380096-0-mtopupload.jpg_110x10000Q90.jpg_.webp" alt="用户头像" class="avatar-img">
          <span class="username">lemon</span>
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
        <div class="menu-item active" @click="goToMyXianyu">
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

      <!-- 右侧个人信息区 -->
      <div class="right-content">
        <!-- 用户信息头部 -->
        <div class="user-profile-header">
          <div class="avatar-section">
            <img src="https://img.alicdn.com/bao/uploaded/i2/O1CN01MAVy7P1rpUlYTAthm_!!4611686018427380096-0-mtopupload.jpg_110x10000Q90.jpg_.webp" alt="用户头像" class="large-avatar">
          </div>
          <div class="user-details">
            <div class="username">lemon</div>
            <div class="location">陕西省</div>
            <div class="stats">
              <span class="stat">0粉丝</span>
              <span class="stat">0关注</span>
            </div>
          </div>
          <div class="edit-profile-btn">
            <span>编辑资料</span>
          </div>
        </div>

        <!-- 标签页 -->
        <div class="tabs">
          <div class="tab-item active">宝贝</div>
          <div class="tab-item">信用及评价</div>
        </div>

        <!-- 暂无商品 -->
        <div class="no-products">
          <img src="https://img.alicdn.com/imgextra/i4/O1CN01NI9CID249ted0IqLN_!!6000000007349-2-tps-360-360.png" alt="暂无商品" class="no-products-icon">
          <div class="no-products-text">暂无商品</div>
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
import { ref } from 'vue';

// 响应式数据控制子菜单展开/收起
const expandedMenus = ref({
  1: false, // 我的交易
  3: false  // 账户设置
});

// 切换子菜单展开状态
const toggleMenu = (menuIndex) => {
  expandedMenus.value[menuIndex] = !expandedMenus.value[menuIndex];
};

// 跳转到我发布的页面（新窗口）
const goToPublished = () => {
  window.open('/user/published', '_blank');
};

// 跳转到我卖出的页面（新窗口）
const goToSold = () => {
  window.open('/user/sold', '_blank');
};

// 跳转到我买到的页面（新窗口）
const goToBought = () => {
  window.open('/user/bought', '_blank');
};

// 跳转到个人资料页面（新窗口）
const goToPersonalInfo = () => {
  window.open('/user/personal-info', '_blank');
};

// 跳转到账号与安全页面（新窗口）
const goToAccountSecurity = () => {
  window.open('/user/account-security', '_blank');
};

// 跳转到我的收藏页面（新窗口）
const goToFavorites = () => {
  window.open('/user/favorites', '_blank');
};

// 跳转到我的闲鱼页面（新窗口）
const goToMyXianyu = () => {
  window.open('/user/profile', '_blank');
};
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
  padding: 10px 0;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  transition: color 0.2s;
}

.submenu-item {
  padding: 8px 0;
  cursor: pointer;
  font-size: 14px;
  color: #666;
}

.submenu-item:hover {
  color: #ff4d00;
}



/* 右侧内容 */
.right-content {
  flex: 1;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0,0,0,.03);
  padding: 20px;
}

/* 用户信息头部 */
.user-profile-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.avatar-section {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
}

.large-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-details {
  flex: 1;
}

.user-details .username {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
}

.location {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.stats {
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #666;
}

.edit-profile-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  transition: all 0.2s;
}

.edit-profile-btn:hover {
  border-color: #ff4d00;
  color: #ff4d00;
}

/* 标签页 */
.tabs {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.tab-item {
  padding: 8px 0;
  cursor: pointer;
  font-size: 16px;
  color: #666;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.tab-item:hover {
  color: #ff4d00;
}

.tab-item.active {
  color: #ff4d00;
  border-bottom-color: #ff4d00;
  font-weight: bold;
}

/* 暂无商品 */
.no-products {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  color: #999;
}

.no-products-icon {
  width: 120px;
  height: 120px;
  object-fit: contain;
  margin-bottom: 20px;
}

.no-products-text {
  font-size: 16px;
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