<template>
  <div class="wrap">
    <div class="register-container">
      <div class="register-header">
        <h1>注册</h1>
        <p>创建新账号，开始闲鱼之旅</p>
      </div>
      <form @submit.prevent="handleRegister" class="register-form">
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
        <div class="form-group">
          <label for="nickname">昵称</label>
          <input 
            type="text" 
            id="nickname" 
            v-model="formData.nickname" 
            placeholder="请输入昵称" 
            required
          />
        </div>
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        <button type="submit" class="register-btn">注册</button>
        <div class="login-link">
          <span>已有账号？</span>
          <a @click="goToLogin">立即登录</a>
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
  password: '',
  nickname: ''
})
const errorMessage = ref('')

const handleRegister = async () => {
  try {
    const response = await fetch('http://localhost:3002/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData.value)
    })
    
    const data = await response.json()
    if (response.ok) {
      // 注册成功后跳转到登录页面
      router.push('/login')
    } else {
      errorMessage.value = data.error || '注册失败'
    }
  } catch (error) {
    errorMessage.value = '网络错误，请稍后重试'
  }
}

const goToLogin = () => {
  router.push('/login')
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

.register-container {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
}

.register-header {
  text-align: center;
  margin-bottom: 32px;
}

.register-header h1 {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.register-header p {
  font-size: 14px;
  color: #666;
}

.register-form {
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

.register-btn {
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

.register-btn:hover {
  background: #ff6a33;
}

.login-link {
  display: flex;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
  margin-top: 8px;
}

.login-link a {
  color: #ff4d00;
  text-decoration: none;
  cursor: pointer;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
