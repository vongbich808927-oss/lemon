<template>
  <div class="wrap">
    <header class="topbar">
      <div class="container bar">
        <button class="back" @click="$router.back()">‹</button>
        <div class="title">确认订单</div>
      </div>
    </header>

    <main class="container main" v-if="product">
      <!-- 收货地址 -->
      <div class="section">
        <div class="section-title">收货地址</div>
        <div class="address-container">
          <div class="add-address">
            <span class="add-icon">+</span>
            <span>添加收货地址</span>
          </div>
        </div>
      </div>

      <!-- 订单信息 -->
      <div class="section">
        <div class="section-title">订单信息</div>
        <div class="order-info">
          <img :src="product.images[0]" alt="商品图片" class="order-product-img">
          <div class="order-product-info">
            <div class="order-product-name">{{ product.title }}</div>
            <div class="order-product-price">¥{{ product.price }}</div>
          </div>
        </div>
      </div>

      <!-- 价格明细 -->
      <div class="section">
        <div class="section-title">价格明细</div>
        <div class="price-details">
          <div class="price-item">
            <span class="price-label">商品总价</span>
            <span class="price-value">¥{{ product.price }}</span>
          </div>
          <div class="price-item">
            <span class="price-label">运费</span>
            <span class="price-value">¥0.00</span>
          </div>
          <div class="price-item total">
            <span class="price-label">合计</span>
            <span class="price-value total">¥{{ product.price }}</span>
          </div>
        </div>
      </div>

      <!-- 确认购买按钮 -->
      <div class="confirm-button-container">
        <button class="confirm-button" @click="confirmPurchase">确认购买</button>
      </div>
    </main>

    <main class="container main" v-else>
      加载中...
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { api } from '../api'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  id: { type: [String, Number], required: true },
})

const product = ref(null)

// 确认购买功能
const confirmPurchase = () => {
  if (!product.value) return
  
  // 创建订单对象
  const order = {
    id: Date.now(), // 使用时间戳作为唯一ID
    product: {
      id: product.value.id,
      title: product.value.title,
      price: product.value.price,
      images: product.value.images,
      condition: product.value.condition
    },
    seller: {
      id: product.value.seller?.id || 1,
      nickname: product.value.seller?.nickname || '未知商家'
    },
    price: product.value.price,
    status: 'completed', // 直接设置为已完成
    transactionMethod: '线上支付',
    createdAt: new Date().toISOString()
  }
  
  // 从localStorage获取已有的订单列表
  let existingOrders = []
  try {
    existingOrders = JSON.parse(localStorage.getItem('orders')) || []
    console.log('Existing orders before save:', existingOrders)
  } catch (e) {
    console.error('Error parsing existing orders:', e)
    existingOrders = []
  }
  
  // 添加新订单
  existingOrders.push(order)
  console.log('New order to save:', order)
  console.log('Orders to save:', existingOrders)
  
  // 保存到localStorage
  localStorage.setItem('orders', JSON.stringify(existingOrders))
  console.log('Orders saved to localStorage:', localStorage.getItem('orders'))
  
  // 显示保存成功提示
  alert('购买成功！订单已保存。')
  
  // 跳转到购买成功页面
  window.open('/purchase-success', '_blank')
}

onMounted(async () => {
  product.value = await api.product(props.id)
})
</script>

<style scoped>
.topbar{background:var(--xianyu-yellow); padding:12px 0;}
.bar{display:flex; align-items:center; justify-content:space-between;}
.back{border:0; background:#fff; width:36px; height:36px; border-radius:18px; font-size:22px; cursor:pointer;}
.title{font-weight:900;}

.main{padding:18px 0 60px;}

/* 通用区块样式 */
.section{
  background:#fff;
  border-radius:12px;
  padding:15px;
  margin-bottom:15px;
  box-shadow:0 1px 10px rgba(0,0,0,.06);
}

.section-title{
  font-weight:600;
  font-size:16px;
  margin-bottom:15px;
}

/* 收货地址样式 */
.address-container{
  padding:10px;
  border:1px dashed #e0e0e0;
  border-radius:8px;
  text-align:center;
  cursor:pointer;
}

.add-address{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  color:#999;
}

.add-icon{
  font-size:20px;
}

/* 订单信息样式 */
.order-info{
  display:flex;
  gap:12px;
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
}

.order-product-price{
  font-size:16px;
  color:#ff4d00;
  font-weight:600;
}

/* 价格明细样式 */
.price-details{
  display:flex;
  flex-direction:column;
  gap:12px;
}

.price-item{
  display:flex;
  justify-content:space-between;
  font-size:14px;
}

.price-label{
  color:#666;
}

.price-value{
  color:#333;
}

.price-item.total{
  font-weight:600;
  margin-top:8px;
  padding-top:12px;
  border-top:1px solid #f0f0f0;
}

.price-item.total .price-value{
  color:#ff4d00;
  font-size:18px;
}

/* 确认购买按钮样式 */
.confirm-button-container{
  position:fixed;
  bottom:0;
  left:0;
  right:0;
  background:#fff;
  padding:15px;
  box-shadow:0 -2px 10px rgba(0,0,0,.1);
}

.confirm-button{
  width:100%;
  padding:15px;
  background:#ff4d00;
  color:#fff;
  border:none;
  border-radius:8px;
  font-size:18px;
  font-weight:600;
  cursor:pointer;
}
</style>