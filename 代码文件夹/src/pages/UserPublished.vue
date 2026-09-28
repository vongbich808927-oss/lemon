<template>
  <div class="page">
    <!-- 顶部黄色导航栏 -->
    <div class="top-bar">
      <div class="top-bar-content">
        <div class="logo">闲鱼</div>
        <div class="title">我发布的商品</div>
        <div class="publish-btn" @click="goToPublish">发布新商品</div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="main-container">
      <!-- 商品列表 -->
      <div class="product-list">
        <div class="product-item" v-for="product in products" :key="product.id" @click="goToProductDetail(product.id)">
          <div class="product-image">
            <img :src="product.images[0]" alt="商品图片" class="product-img">
          </div>
          <div class="product-info">
            <div class="product-title">{{ product.title }}</div>
            <div class="product-price">¥{{ product.price.toFixed(2) }}</div>
            <div class="product-meta">
              <span class="location">{{ product.location }}</span>
              <span class="condition">{{ product.condition }}</span>
            </div>
          </div>
        </div>
        
        <!-- 暂无商品 -->
        <div class="no-products" v-if="products.length === 0">
          <img src="https://img.alicdn.com/imgextra/i4/O1CN01NI9CID249ted0IqLN_!!6000000007349-2-tps-360-360.png" alt="暂无商品" class="no-products-icon">
          <div class="no-products-text">您还没有发布任何商品</div>
          <button class="publish-new-btn" @click="goToPublish">发布商品</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { api } from '../api';

// 已发布商品列表
const products = ref([]);

// 获取已发布商品
onMounted(async () => {
  try {
    // 模拟获取已发布商品数据
    // 实际项目中应该调用后端API：const response = await api.getPublishedProducts();
    // products.value = response.data;
    
    // 模拟数据
    products.value = [
      {
        id: 1,
        title: '全新iPhone 14 Pro Max 256G 深空黑色',
        price: 8999,
        condition: '全新',
        location: '陕西省西安市',
        images: ['https://img.alicdn.com/bao/uploaded/i1/O1CN01M1xdzO1FkV1it189X_!!4611686018427379821-0-fleamarket.jpg_790x10000Q90.jpg_.webp']
      },
      {
        id: 2,
        title: 'Nike Air Max 97 运动鞋 38码',
        price: 699,
        condition: '几乎全新',
        location: '陕西省西安市',
        images: ['https://img.alicdn.com/bao/uploaded/i4/O1CN01kjHx6G1JjMTzGUiff_!!4611686018427384360-0-fleamarket.jpg_790x10000Q90.jpg_.webp']
      }
    ];
  } catch (error) {
    console.error('获取已发布商品失败:', error);
  }
});

// 跳转到商品详情页
const goToProductDetail = (productId) => {
  window.open(`/product/${productId}`, '_blank');
};

// 跳转到发布商品页面
const goToPublish = () => {
  window.open('/user/publish', '_blank');
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
  padding: 15px 0;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 100;
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

.title {
  font-size: 18px;
  color: #333;
  font-weight: 500;
}

.publish-btn {
  padding: 8px 16px;
  background: #ff4d00;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

/* 主要内容容器 */
.main-container {
  margin: 0 auto;
  padding: 20px;
  width: 100%;
  max-width: 1400px;
}

/* 商品列表 */
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.product-item {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,.1);
}

.product-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  padding: 12px;
}

.product-title {
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
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

.product-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
}

/* 暂无商品 */
.no-products {
  grid-column: 1 / -1;
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
  margin-bottom: 20px;
}

.publish-new-btn {
  padding: 8px 16px;
  background: #ff4d00;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.publish-new-btn:hover {
  background-color: #ff3d00;
}
</style>