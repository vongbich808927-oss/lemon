<template>
  <div class="wrap">
    <header class="topbar">
      <div class="container bar">
        <button class="back" @click="$router.back()">‹</button>
        <div class="title">商品详情</div>
        <router-link class="home" to="/">首页</router-link>
      </div>
    </header>

    <main class="container main" v-if="product">
      <div class="grid">
        <div class="gallery">
          <img class="mainimg" :src="mainImg" alt="" />
          <div class="thumbs">
            <img
              v-for="(img,i) in (product.images || [])"
              :key="i"
              :src="img"
              :class="['thumb', i===active? 'active':'']"
              @click="active=i"
            />
          </div>
        </div>

        <div class="info">
          <div class="price">¥{{ product.price }} <span class="shipping-free">包邮</span></div>
          <h1 class="name">{{ product.title }}</h1>
          <div class="condition">新旧程度：{{ product.condition || '全新' }}</div>
          <p class="desc">{{ product.description }}</p>
          
          <!-- 商家信息 -->
          <div class="seller-info">
            <div class="seller-header" @click="goToSellerHome()" style="cursor: pointer;">
              <img :src="seller.avatar" alt="商家头像" class="seller-avatar" />
              <div class="seller-meta">
                <div class="seller-name">{{ seller.nickname }}</div>
                <div class="seller-stats">
                  <span class="stat">芝麻信用700+</span>
                  <span class="stat">成交100%</span>
                </div>
              </div>
              <div class="seller-level">
                <span class="level-icon">V</span>
                <span class="level-text">信用良好</span>
              </div>
            </div>
          </div>
          
          <!-- 操作按钮 -->
          <div class="action-buttons">
            <button class="chat-btn" @click="goToChat()">
              <img src="https://img.alicdn.com/imgextra/i1/O1CN01mI3p6e1r5q3x1yZ6D_!!6000000005981-2-tps-24-24.png" alt="聊一聊" class="btn-icon">
              聊一聊
            </button>
            <button class="buy-btn" @click="goToBuy()">立即购买</button>
            <button class="collect-btn" @click="collectProduct()">
              <img src="https://img.alicdn.com/imgextra/i2/O1CN019uQeF31mJc8qR4B6w_!!6000000004911-2-tps-24-24.png" alt="收藏" class="btn-icon" :class="{ collected: isCollected }">
              {{ isCollected ? '已收藏' : '收藏' }}
            </button>
          </div>
        </div>
      </div>
    </main>

    <main class="container main" v-else>
      加载中...
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../api'

const props = defineProps({
  id: { type: [String, Number], required: true },
})

const router = useRouter()
const product = ref(null)
const active = ref(0)
const isCollected = ref(false)

// 计算商家信息
const seller = computed(() => {
  if (product.value?.seller) {
    return {
      id: product.value.seller.id,
      avatar: product.value.seller.avatar || 'https://img.alicdn.com/bao/uploaded/i2/O1CN01MAVy7P1rpUlYTAthm_!!4611686018427380096-0-mtopupload.jpg_110x10000Q90.jpg_.webp',
      nickname: product.value.seller.nickname || '未知商家',
      username: product.value.seller.username
    }
  }
  return {
    id: 0,
    avatar: 'https://img.alicdn.com/bao/uploaded/i2/O1CN01MAVy7P1rpUlYTAthm_!!4611686018427380096-0-mtopupload.jpg_110x10000Q90.jpg_.webp',
    nickname: '加载中...',
    username: ''
  }
})

const mainImg = computed(() => {
  const imgs = product.value?.images || []
  return imgs[active.value] || imgs[0] || 'https://picsum.photos/seed/empty/600/600'
})

// 跳转到聊天页面（新窗口）
const goToChat = () => {
  window.open(`/chat/${seller.value.nickname}`, '_blank')
}

// 跳转到购买页面（新窗口）
const goToBuy = () => {
  window.open(`/buy/${props.id}`, '_blank')
}

// 跳转到商家主页（当前窗口）
const goToSellerHome = () => {
  router.push(`/user/${seller.value.id}`)
}

// 收藏商品
const collectProduct = () => {
  isCollected.value = !isCollected.value
  alert(isCollected.value ? '收藏成功' : '取消收藏成功')
}

onMounted(async () => {
  try {
    console.log('组件初始化，props.id:', props.id, '类型:', typeof props.id)
    
    // 确保id是数字类型
    const productId = Number(props.id)
    console.log('转换后的productId:', productId)
    
    product.value = await api.product(productId)
    console.log('商品详情获取成功:', product.value)
    console.log('商品图片:', product.value.images)
  } catch (error) {
    console.error('获取商品详情失败:', error)
    console.error('错误详情:', error.response?.data || error.message)
    console.error('错误状态码:', error.response?.status)
    console.error('完整错误对象:', error)
    alert(`获取商品详情失败: ${error.response?.data?.error || error.message}`)
  }
})
</script>

<style scoped>
.topbar{background:var(--xianyu-yellow); padding:12px 0;}
.bar{display:flex; align-items:center; justify-content:space-between;}
.back{border:0; background:#fff; width:36px; height:36px; border-radius:18px; font-size:22px; cursor:pointer;}
.title{font-weight:900;}
.home{padding:6px 10px; border-radius:16px; background:rgba(255,255,255,.7)}

.main{padding:18px 0 60px;}
.grid{display:grid; grid-template-columns: 520px 1fr; gap:18px;}
.gallery{background:#fff; border-radius:14px; padding:10px; box-shadow:0 1px 10px rgba(0,0,0,.06);} 
.mainimg{width:100%; height:520px; object-fit:cover; border-radius:10px; background:#f2f2f2;}
.thumbs{display:flex; gap:8px; margin-top:10px; overflow:auto;}
.thumb{width:68px; height:68px; object-fit:cover; border-radius:8px; opacity:.7; cursor:pointer; border:2px solid transparent;}
.thumb.active{opacity:1; border-color:#ff4d00;}

.info{background:#fff; border-radius:14px; padding:16px; box-shadow:0 1px 10px rgba(0,0,0,.06);} 
.price{color:#ff4d00; font-size:32px; font-weight:900; margin-bottom:8px;}
.shipping-free{color:#5fb95f; font-size:14px; font-weight:normal; margin-left:8px;}
.name{font-size:20px; line-height:1.4; margin-bottom:10px;}
.condition{font-size:14px; color:#999; margin-bottom:12px;}
.desc{line-height:1.6; color:#666; margin-bottom:16px;}

/* 商家信息样式 */
.seller-info{
  margin-top:20px;
  padding-top:15px;
  border-top:1px solid #f0f0f0;
}
.seller-header{
  display:flex;
  align-items:center;
  gap:10px;
  justify-content: space-between;
}
.seller-avatar{
  width:40px;
  height:40px;
  border-radius:50%;
  object-fit:cover;
}
.seller-meta{
  display:flex;
  flex-direction:column;
  flex:1;
}
.seller-name{
  font-weight:600;
  font-size:14px;
}
.seller-stats{
  display:flex;
  gap:10px;
  font-size:12px;
  color:#999;
  margin-top:2px;
}
.seller-level{
  display:flex;
  align-items:center;
  gap:4px;
  color:#ff4d00;
  font-size:12px;
}
.level-icon{
  background:#ff4d00;
  color:#fff;
  width:16px;
  height:16px;
  border-radius:50%;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:10px;
  font-weight:bold;
}
.level-text{
  color:#ff4d00;
}

/* 操作按钮样式 */
.action-buttons{
  display:flex;
  gap:10px;
  margin-top:20px;
}
.chat-btn, .collect-btn{
  flex:1;
  padding:12px;
  border:1px solid #ff4d00;
  border-radius:8px;
  background:#fff;
  color:#ff4d00;
  font-size:16px;
  cursor:pointer;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:5px;
}
.buy-btn{
  flex:1;
  padding:12px;
  border:none;
  border-radius:8px;
  background:#ff4d00;
  color:#fff;
  font-size:16px;
  font-weight:600;
  cursor:pointer;
}
.btn-icon{
  width:18px;
  height:18px;
}
.collect-btn img.collected{
  filter: brightness(0) saturate(100%) invert(54%) sepia(87%) saturate(5247%) hue-rotate(356deg) brightness(102%) contrast(105%);
}
.collect-btn:active{
  background:#fff0e6;
}

@media (max-width: 980px){
  .grid{grid-template-columns:1fr;}
  .mainimg{height:360px;}
}
</style>




