<template>
  <div class="wrap">
    <header class="topbar">
      <div class="container bar">
        <button class="back" @click="closeChat()">‹</button>
        <div class="title">与{{ sellerName }}聊天</div>
        <div class="more" @click="showMore = !showMore">•••</div>
      </div>
    </header>

    <main class="chat-container">
      <!-- 聊天消息区域 -->
      <div class="messages">
        <div v-for="(message, index) in messages" :key="index" 
             :class="['message', message.isMe ? 'me' : 'seller']">
          <div class="message-content">
            <div class="message-text">{{ message.text }}</div>
            <div class="message-time">{{ message.time }}</div>
          </div>
        </div>
      </div>

      <!-- 消息输入区域 -->
      <div class="input-area">
        <input 
          type="text" 
          v-model="inputText" 
          class="message-input" 
          placeholder="输入消息..."
          @keyup.enter="sendMessage"
        />
        <button class="send-btn" @click="sendMessage" :disabled="!inputText.trim()">
          <img src="https://img.alicdn.com/imgextra/i3/O1CN010pG1Xx1YFj7F1wZ8F_!!6000000002545-2-tps-32-32.png" alt="发送" class="send-icon">
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 商家名称
const sellerName = ref(route.params.nickname || '未知商家')

// 聊天消息
const messages = ref([
  { text: '您好，请问这件商品还在吗？', isMe: false, time: '10:30' },
  { text: '您好，商品还在的哦', isMe: true, time: '10:31' },
  { text: '请问可以优惠一点吗？', isMe: false, time: '10:32' }
])

// 输入框文本
const inputText = ref('')

// 发送消息
const sendMessage = () => {
  if (!inputText.value.trim()) return
  
  const now = new Date()
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
  
  messages.value.push({
    text: inputText.value,
    isMe: true,
    time: time
  })
  
  inputText.value = ''
  
  // 模拟商家回复
  setTimeout(() => {
    const reply = ['好的，让我看看', '稍等一下', '可以的，给您优惠10元', '没问题，我现在给您改价格']
    const randomReply = reply[Math.floor(Math.random() * reply.length)]
    messages.value.push({
      text: randomReply,
      isMe: false,
      time: time
    })
  }, 1000)
}

// 关闭聊天
const closeChat = () => {
  // 如果是新窗口打开的，直接关闭
  if (window.opener) {
    window.close()
  } else {
    router.back()
  }
}

// 页面加载时滚动到底部
onMounted(() => {
  scrollToBottom()
})

// 滚动到底部
const scrollToBottom = () => {
  const messagesContainer = document.querySelector('.messages')
  if (messagesContainer) {
    messagesContainer.scrollTop = messagesContainer.scrollHeight
  }
}
</script>

<style scoped>
.topbar{background:var(--xianyu-yellow); padding:12px 0; position: sticky; top: 0; z-index: 100;}
.bar{display:flex; align-items:center; justify-content:space-between;}
.back{border:0; background:#fff; width:36px; height:36px; border-radius:18px; font-size:22px; cursor:pointer;}
.title{font-weight:900;}
.more{font-size:24px; cursor:pointer;}

.chat-container{
  display: flex;
  flex-direction: column;
  height: calc(100vh - 56px);
  background-color: #f5f5f5;
}

.messages{
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message{
  max-width: 70%;
  display: flex;
}

.message.me{
  align-self: flex-end;
}

.message.seller{
  align-self: flex-start;
}

.message-content{
  padding: 10px 14px;
  border-radius: 18px;
  position: relative;
}

.message.me .message-content{
  background-color: #ff4d00;
  color: white;
  border-bottom-right-radius: 4px;
}

.message.seller .message-content{
  background-color: white;
  color: #333;
  border-bottom-left-radius: 4px;
}

.message-text{
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 4px;
}

.message-time{
  font-size: 10px;
  color: #999;
  text-align: right;
}

.message.me .message-time{
  color: rgba(255, 255, 255, 0.7);
}

.input-area{
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background-color: white;
  border-top: 1px solid #e0e0e0;
}

.message-input{
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #d9d9d9;
  border-radius: 20px;
  font-size: 14px;
  outline: none;
}

.message-input:focus{
  border-color: #ff4d00;
}

.send-btn{
  width: 40px;
  height: 40px;
  border: none;
  background-color: #ff4d00;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.send-btn:disabled{
  background-color: #ffb380;
  cursor: not-allowed;
}

.send-icon{
  width: 20px;
  height: 20px;
}
</style>