<template>
  <div class="wrap">
    <header class="topbar">
      <div class="container bar">
        <button class="back" @click="goBack">‹</button>
        <div class="title">我买的</div>
      </div>
    </header>

    <main class="container main">
      <div class="order-list">
        <div v-for="order in orders" :key="order.id" class="order-item">
          <div class="order-header">
            <div class="order-status">
              <span class="status-dot" :class="order.status"></span>
              <span class="status-text">{{ order.statusText }}</span>
            </div>
            <div class="order-time">{{ order.time }}</div>
          </div>
          
          <div class="order-content">
            <img :src="order.product.images[0]" alt="商品图片" class="order-product-img">
            <div class="order-product-info">
              <div class="order-product-name">{{ order.product.title }}</div>
              <div class="order-product-price">¥{{ order.product.price }}</div>
              <div class="order-product-count">x{{ order.count }}</div>
            </div>
          </div>
          
          <div class="order-total">
            <span class="total-label">实付款</span>
            <span class="total-value">¥{{ order.totalPrice }}</span>
          </div>
          
          <div class="order-actions">
            <button class="action-btn" @click="viewOrderDetail(order.id)">查看订单</button>
            <button class="action-btn primary" @click="confirmReceived(order.id)">确认收货</button>
          </div>
        </div>
        
        <div v-if="orders.length === 0" class="no-orders">
          <div class="no-orders-icon">📦</div>
          <div class="no-orders-text">暂无订单</div>
        </div>
      </div>
    </main>

    <!-- 右侧悬浮框 -->
    <div class="float-right">
      <div class="float-box">
        <div class="float-title">我的闲鱼</div>
        <div class="float-menu">
          <div class="float-item" @click="goToUserProfile()">
            <span class="float-item-icon">👤</span>
            <span class="float-item-text">个人主页</span>
          </div>
          <div class="float-item" @click="goToOrders()">
            <span class="float-item-icon">📋</span>
            <span class="float-item-text">我买的</span>
          </div>
          <div class="float-item" @click="goToSelling()">
            <span class="float-item-icon">🛍️</span>
            <span class="float-item-text">我卖的</span>
          </div>
          <div class="float-item" @click="goToFavorites()">
            <span class="float-item-icon">❤️</span>
            <span class="float-item-text">我的收藏</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 模拟订单数据
const orders = ref([
  {
    id: 1,
    product: {
      id: 1,
      title: '小米手环7 运动手环 智能手环 血氧检测 心率监测 120种运动模式',
      price: 199,
      images: ['https://img.alicdn.com/bao/uploaded/i1/O1CN01M1xdzO1FkV1it189X_!!4611686018427379821-0-fleamarket.jpg_790x10000Q90.jpg_.webp']
    },
    count: 1,
    totalPrice: 199,
    status: 'success',
    statusText: '交易成功',
    time: '2023-06-15 14:30'
  },
  {
    id: 2,
    product: {
      id: 2,
      title: 'Apple AirPods Pro 2 无线蓝牙耳机 主动降噪 空间音频',
      price: 1899,
      images: ['https://img.alicdn.com/bao/uploaded/i4/2206582518794/O1CN01l8g3o42Epi76oZLnK_!!4611686018427384842-0-xy_item.jpg_450x10000Q90.jpg_.webp']
    },
    count: 1,
    totalPrice: 1899,
    status: 'pending',
    statusText: '待收货',
    time: '2023-06-10 09:15'
  }
])

// 返回上一页
const goBack = () => {
  window.close() // 因为是新窗口打开，所以直接关闭窗口
}

// 查看订单详情
const viewOrderDetail = (orderId) => {
  window.open(`/order-detail/${orderId}`, '_blank')
}

// 确认收货
const confirmReceived = (orderId) => {
  const order = orders.value.find(o => o.id === orderId)
  if (order) {
    order.status = 'success'
    order.statusText = '交易成功'
  }
}

// 跳转个人主页
const goToUserProfile = () => {
  window.open('/profile', '_blank')
}

// 跳转我买的
const goToOrders = () => {
  window.open('/orders', '_blank')
}

// 跳转我卖的
const goToSelling = () => {
  window.open('/selling', '_blank')
}

// 跳转我的收藏
const goToFavorites = () => {
  window.open('/favorites', '_blank')
}
</script>

<style scoped>
.topbar{background:var(--xianyu-yellow); padding:12px 0;}
.bar{display:flex; align-items:center; justify-content:space-between;}
.back{border:0; background:#fff; width:36px; height:36px; border-radius:18px; font-size:22px; cursor:pointer;}
.title{font-weight:900;}

.main{padding:18px 0 60px;}

/* 订单列表样式 */
.order-list{
  display:flex;
  flex-direction:column;
  gap:15px;
}

.order-item{
  background:#fff;
  border-radius:12px;
  padding:15px;
  box-shadow:0 1px 10px rgba(0,0,0,.06);
}

.order-header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:12px;
}

.order-status{
  display:flex;
  align-items:center;
  gap:6px;
}

.status-dot{
  width:8px;
  height:8px;
  border-radius:50%;
  background:#ff4d00;
}

.status-dot.pending{background:#ffaa00;}
.status-dot.success{background:#52c41a;}

.status-text{
  font-size:14px;
  color:#333;
  font-weight:600;
}

.order-time{
  font-size:12px;
  color:#999;
}

.order-content{
  display:flex;
  gap:12px;
  margin-bottom:12px;
}

.order-product-img{
  width:80px;
  height:80px;
  object-fit:cover;
  border-radius:8px;
  background:#f2f2f2;
}

.order-product-info{
  flex:1;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
}

.order-product-name{
  font-size:14px;
  line-height:1.4;
  color:#333;
  margin-bottom:8px;
}

.order-product-price{
  font-size:16px;
  color:#ff4d00;
  font-weight:600;
}

.order-product-count{
  font-size:12px;
  color:#666;
  align-self:flex-end;
}

.order-total{
  display:flex;
  justify-content:flex-end;
  align-items:center;
  gap:8px;
  margin-bottom:12px;
  padding-bottom:12px;
  border-bottom:1px solid #f0f0f0;
}

.total-label{
  font-size:14px;
  color:#666;
}

.total-value{
  font-size:16px;
  color:#ff4d00;
  font-weight:600;
}

.order-actions{
  display:flex;
  justify-content:flex-end;
  gap:12px;
}

.action-btn{
  padding:8px 16px;
  border:1px solid #d9d9d9;
  background:#fff;
  border-radius:6px;
  font-size:14px;
  cursor:pointer;
}

.action-btn.primary{
  border-color:#ff4d00;
  color:#ff4d00;
}

/* 暂无订单样式 */
.no-orders{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  padding:60px 0;
  color:#999;
}

.no-orders-icon{
  font-size:48px;
  margin-bottom:16px;
}

.no-orders-text{
  font-size:16px;
}

/* 右侧悬浮框样式 */
.float-right{
  position:fixed;
  right:20px;
  top:50%;
  transform:translateY(-50%);
}

.float-box{
  background:#fff;
  border-radius:24px;
  padding:12px;
  box-shadow:0 4px 20px rgba(0,0,0,.15);
}

.float-title{
  text-align:center;
  font-size:12px;
  color:#999;
  margin-bottom:8px;
}

.float-menu{
  display:flex;
  flex-direction:column;
  gap:8px;
}

.float-item{
  display:flex;
  flex-direction:column;
  align-items:center;
  padding:8px;
  border-radius:12px;
  cursor:pointer;
  transition:background-color .2s;
}

.float-item:hover{
  background-color:#f5f5f5;
}

.float-item-icon{
  font-size:24px;
  margin-bottom:4px;
}

.float-item-text{
  font-size:12px;
  color:#333;
}
</style>