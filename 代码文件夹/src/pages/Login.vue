<template>
  <div class="wrap">
    <div class="login-container">
      <div class="login-header">
        <h1>登录</h1>
        <p>欢迎回到闲鱼</p>
      </div>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">账号</label>
          <input 
            type="text" 
            id="username" 
            v-model="formData.username" 
            placeholder="请输入账号" 
            required
          />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input 
            type="password" 
            id="password" 
            v-model="formData.password" 
            placeholder="请输入密码" 
            required
          />
        </div>
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        <button type="submit" class="login-btn">登录</button>
        <div class="register-link">
          <span>还没有账号？</span>
          <a @click="goToRegister">立即注册</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const formData = ref({
  username: '',
  password: ''
})
const errorMessage = ref('')

const handleLogin = async () => {
  try {
    const response = await fetch('http://localhost:3002/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData.value)
    })
    
    const data = await response.json()
    if (response.ok) {
      // 保存用户信息到 localStorage
      localStorage.setItem('user', JSON.stringify(data.user))
      // 跳转到用户个人中心
      router.push('/user/profile')
    } else {
      errorMessage.value = data.error || '登录失败'
    }
  } catch (error) {
    errorMessage.value = '网络错误，请稍后重试'
  }
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<style scoped>
.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-container {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-header h1 {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.login-header p {
  font-size: 14px;
  color: #666;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.form-group input {
  padding: 12px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #ff4d00;
}

.error-message {
  color: #ff4d00;
  font-size: 14px;
  text-align: center;
}

.login-btn {
  background: #ff4d00;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background: #ff6a33;
}

.register-link {
  display: flex;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
  margin-top: 8px;
}

.register-link a {
  color: #ff4d00;
  text-decoration: none;
  cursor: pointer;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
