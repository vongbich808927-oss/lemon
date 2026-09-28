<template>
  <div class="wrap">
    <header class="topbar">
      <div class="container bar">
        <button class="back" @click="$router.back()">‹</button>
        <div class="title">{{ sellerInfo.nickname }}的主页</div>
        <router-link class="home" to="/">首页</router-link>
      </div>
    </header>

    <main class="container main">
      <!-- 商家信息卡片 -->
      <div class="seller-card">
        <div class="seller-header">
          <img :src="sellerInfo.avatar" alt="商家头像" class="seller-avatar" />
          <div class="seller-meta">
            <div class="seller-name">{{ sellerInfo.nickname }}</div>
            <div class="seller-username">@{{ sellerInfo.username }}</div>
          </div>
          <button class="chat-btn" @click="goToChat()">聊一聊</button>
        </div>
        <div class="seller-stats">
          <div class="stat-item">
            <div class="stat-value">{{ sellerInfo.productsCount }}</div>
            <div class="stat-label">在售商品</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">100%</div>
            <div class="stat-label">成交率</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">700+</div>
            <div class="stat-label">芝麻信用</div>
          </div>
        </div>
      </div>

      <!-- 商家商品列表 -->
      <div class="products-section">
        <h2 class="section-title">{{ sellerInfo.nickname }}的商品</h2>
        <div class="products-container" v-if="products.length > 0">
          <div 
            v-for="product in products" 
            :key="product.id" 
            class="product-item"
            @click="goToProduct(product.id)"
          >
            <img :src="product.images?.[0] || 'https://picsum.photos/seed/placeholder/200/200'" alt="商品图片" class="product-image" />
            <div class="product-info">
              <div class="product-title">{{ product.title }}</div>
              <div class="product-price">¥{{ product.price }}</div>
            </div>
          </div>
        </div>
        <div class="empty-state" v-else>
          <div class="empty-icon">📦</div>
          <div class="empty-text">暂无商品</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '../api'

const route = useRoute()
const sellerInfo = ref({
  id: '',
  nickname: '加载中...',
  username: '',
  avatar: 'https://img.alicdn.com/bao/uploaded/i2/O1CN01MAVy7P1rpUlYTAthm_!!4611686018427380096-0-mtopupload.jpg_110x10000Q90.jpg_.webp',
  productsCount: 0
})
const products = ref([])

const goToProduct = (productId) => {
  window.open(`/product/${productId}`, '_blank')
}

const goToChat = () => {
  window.open(`/chat/${sellerInfo.value.username}`, '_blank')
}

onMounted(async () => {
  try {
    const sellerId = Number(route.params.id)
    
    // 获取商家信息和其发布的商品
    const [sellerResponse, productsResponse] = await Promise.all([
      api.user(sellerId),
      api.sellerProducts(sellerId)
    ])
    
    sellerInfo.value = {
      id: sellerResponse.user.id,
      nickname: sellerResponse.user.nickname || sellerResponse.user.username,
      username: sellerResponse.user.username,
      avatar: sellerResponse.user.avatar || 'https://img.alicdn.com/bao/uploaded/i2/O1CN01MAVy7P1rpUlYTAthm_!!4611686018427380096-0-mtopupload.jpg_110x10000Q90.jpg_.webp',
      productsCount: productsResponse.products.length
    }
    
    products.value = productsResponse.products
  } catch (error) {
    console.error('获取商家信息失败:', error)
    alert('获取商家信息失败')
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

/* 商家信息卡片样式 */
.seller-card{
  background:#fff;
  border-radius:18px;
  padding:20px;
  margin-bottom:20px;
  box-shadow:0 1px 10px rgba(0,0,0,.06);
}
.seller-header{
  display:flex;
  align-items:center;
  gap:15px;
  margin-bottom:20px;
}
.seller-avatar{
  width:80px;
  height:80px;
  border-radius:50%;
  object-fit:cover;
}
.seller-meta{
  flex:1;
}
.seller-name{
  font-size:20px;
  font-weight:600;
  margin-bottom:5px;
}
.seller-username{
  font-size:14px;
  color:#666;
}
.chat-btn{
  padding:8px 16px;
  border:1px solid #ff4d00;
  border-radius:20px;
  background:#fff;
  color:#ff4d00;
  font-size:14px;
  cursor:pointer;
}
.seller-stats{
  display:flex;
  justify-content:space-around;
  padding-top:15px;
  border-top:1px solid #f0f0f0;
}
.stat-item{
  text-align:center;
}
.stat-value{
  font-size:20px;
  font-weight:600;
  color:#333;
}
.stat-label{
  font-size:12px;
  color:#999;
  margin-top:5px;
}

/* 商品列表样式 */
.products-section{
  background:#fff;
  border-radius:18px;
  padding:20px;
  box-shadow:0 1px 10px rgba(0,0,0,.06);
}
.section-title{
  font-size:18px;
  font-weight:600;
  margin-bottom:15px;
  padding-bottom:10px;
  border-bottom:1px solid #f0f0f0;
}
.products-container{
  display:grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap:15px;
}
.product-item{
  cursor:pointer;
  border-radius:8px;
  overflow:hidden;
  transition:transform 0.2s;
}
.product-item:hover{
  transform:translateY(-2px);
  box-shadow:0 4px 12px rgba(0,0,0,.1);
}
.product-image{
  width:100%;
  height:200px;
  object-fit:cover;
}
.product-info{
  padding:10px;
}
.product-title{
  font-size:14px;
  margin-bottom:5px;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.product-price{
  font-size:16px;
  font-weight:600;
  color:#ff4d00;
}

/* 空状态样式 */
.empty-state{
  text-align:center;
  padding:40px 0;
  color:#999;
}
.empty-icon{
  font-size:48px;
  margin-bottom:10px;
}
.empty-text{
  font-size:16px;
}
</style>