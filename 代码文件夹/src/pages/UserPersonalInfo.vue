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
        <div class="menu-item" @click="goToFavorites">
          <img src="https://img.alicdn.com/imgextra/i3/O1CN01uvxqkY21XJ5zBtLHz_!!6000000006994-2-tps-40-40.png_.webp" alt="我的收藏" class="menu-icon">
          <span>我的收藏</span>
        </div>
        <div class="menu-item active" @click="toggleMenu(3)">
          <img src="https://img.alicdn.com/imgextra/i4/O1CN017VWyyI1gnhL12X8NN_!!6000000004187-2-tps-40-40.png_.webp" alt="账户设置" class="menu-icon">
          <span>账户设置</span>
          <span class="arrow" :class="{ 'expanded': expandedMenus[3] }"></span>
          <div class="submenu" v-show="expandedMenus[3]">
            <div class="submenu-item active" @click="goToPersonalInfo">个人资料</div>
            <div class="submenu-item" @click="goToAccountSecurity">账号与安全</div>
          </div>
        </div>
      </div>

      <!-- 右侧个人资料编辑区域 -->
      <div class="right-content">
        <div class="personal-info-container">
          <h2 class="title">个人资料</h2>
          
          <form @submit.prevent="handleSave" class="info-form">
            <!-- 头像上传 -->
            <div class="form-section">
              <div class="label">头像</div>
              <div class="avatar-upload-section">
                <div class="avatar-preview">
                  <img :src="formData.avatar || defaultAvatar" alt="头像预览" class="avatar-img-large">
                </div>
                <input type="file" accept="image/*" class="avatar-file-input" id="avatar-upload" @change="handleAvatarUpload">
                <label for="avatar-upload" class="upload-btn">上传头像</label>
              </div>
            </div>

            <!-- 基本信息 -->
            <div class="form-section">
              <div class="label">账号</div>
              <div class="form-input-group">
                <input type="text" v-model="formData.username" disabled class="form-input disabled">
                <span class="input-tip">账号不可修改</span>
              </div>
            </div>

            <div class="form-section">
              <div class="label">昵称</div>
              <div class="form-input-group">
                <input type="text" v-model="formData.nickname" placeholder="请输入昵称" class="form-input" required>
                <span class="input-tip">{{ formData.nickname.length }}/20</span>
              </div>
            </div>

            <!-- 保存按钮 -->
            <div class="form-actions">
              <button type="submit" class="save-btn" :disabled="isSaving">
                {{ isSaving ? '保存中...' : '保存' }}
              </button>
              <div v-if="successMessage" class="success-message">
                {{ successMessage }}
              </div>
              <div v-if="errorMessage" class="error-message">
                {{ errorMessage }}
              </div>
            </div>
          </form>
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

// 响应式数据控制子菜单展开/收起
const expandedMenus = ref({
  1: false, // 我的交易
  3: true   // 账户设置
})

// 用户信息
const user = ref({
  id: '',
  username: '',
  nickname: '',
  avatar: ''
})

// 表单数据
const formData = ref({
  username: '',
  nickname: '',
  avatar: ''
})

// 保存状态
const isSaving = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// 页面加载时获取用户信息
onMounted(() => {
  const savedUser = localStorage.getItem('user')
  if (savedUser) {
    user.value = JSON.parse(savedUser)
    formData.value = { ...user.value }
  }
})

// 切换子菜单展开状态
const toggleMenu = (menuIndex) => {
  expandedMenus.value[menuIndex] = !expandedMenus.value[menuIndex]
}

// 头像上传处理
const handleAvatarUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // 这里只是简单显示本地图片，实际项目中应该上传到服务器
    const reader = new FileReader()
    reader.onload = (e) => {
      formData.value.avatar = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// 保存个人资料
const handleSave = async () => {
  if (formData.value.nickname.length < 2) {
    errorMessage.value = '昵称长度不能少于2个字符'
    return
  }

  isSaving.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    // 调用API保存用户信息
    const response = await fetch(`http://localhost:3002/api/users/${user.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nickname: formData.value.nickname,
        avatar: formData.value.avatar
      })
    })

    const data = await response.json()
    if (response.ok) {
      // 更新本地存储的用户信息
      const updatedUser = {
        ...user.value,
        nickname: formData.value.nickname,
        avatar: formData.value.avatar
      }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      user.value = updatedUser
      
      successMessage.value = '个人资料保存成功'
      setTimeout(() => {
        successMessage.value = ''
      }, 3000)
    } else {
      errorMessage.value = data.error || '保存失败'
    }
  } catch (error) {
    errorMessage.value = '网络错误，请稍后重试'
  } finally {
    isSaving.value = false
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

/* 个人资料容器 */
.personal-info-container {
  max-width: 600px;
  margin: 0 auto;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #333;
  text-align: center;
}

/* 表单样式 */
.info-form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.label {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

/* 头像上传区域 */
.avatar-upload-section {
  display: flex;
  align-items: center;
  gap: 20px;
}

.avatar-preview {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #d9d9d9;
}

.avatar-img-large {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-file-input {
  display: none;
}

.upload-btn {
  padding: 10px 20px;
  background: #f0f0f0;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  transition: background-color 0.3s;
}

.upload-btn:hover {
  background: #e0e0e0;
}

/* 输入框样式 */
.form-input-group {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-input {
  padding: 12px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #ff4d00;
}

.form-input.disabled {
  background: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}

.input-tip {
  font-size: 12px;
  color: #999;
  text-align: right;
}

/* 表单操作按钮 */
.form-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.save-btn {
  padding: 12px 40px;
  background: #ff4d00;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.save-btn:hover:not(:disabled) {
  background: #ff6a33;
}

.save-btn:disabled {
  background: #ffb899;
  cursor: not-allowed;
}

.success-message {
  color: #52c41a;
  font-size: 14px;
}

.error-message {
  color: #ff4d00;
  font-size: 14px;
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
