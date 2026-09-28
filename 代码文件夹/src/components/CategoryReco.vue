<template>
  <section class="hero">
    <!-- 左侧分类列表 -->
    <div class="categories">
      <div v-for="(category, index) in categories.slice(0, 10)" :key="index" class="category-item">
      <img class="category-icon" :src="category.icon" alt="" />
      <span class="category-name">{{ category.text }}</span>
    </div>
    </div>

    <!-- 中间内容区 -->
    <div class="center-content">
      <!-- 橙色推广横幅 -->
      <div class="banner-orange">
        <div class="banner-content">
          <div class="banner-text">
            <h3>闲鱼抄底好物</h3>
            <p>限时特惠，不容错过</p>
            <button class="banner-btn">去看看</button>
          </div>
          <div class="banner-cartoon">
            🎉
          </div>
        </div>
      </div>

      <!-- 彩色背景的商品板块 -->
      <div class="product-sections">
        <div v-for="b in blocks.slice(0, 4)" :key="b.key" class="section-block" :class="`t-${b.theme}`">
          <div class="section-header">
            <img class="section-icon" :src="b.icon" alt="" />
            <div class="section-title">{{ b.title }}</div>
          </div>
          
          <!-- 横向商品卡片 -->
          <div class="section-products" v-if="b.products">
            <div v-for="(product, index) in b.products.slice(0, 4)" :key="index" class="product-card">
              <div class="product-img"><img :src="product.img" alt="" /></div>
              <div class="product-price">¥{{ product.price }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <!-- 推荐栏 -->
  <section class="recommendation-bar">
    <div class="recommend-item active">
      <span>猜你喜欢</span>
    </div>
    <div class="recommend-item">
      <span>个人闲置</span>
    </div>
    <div class="recommend-item">
      <span>BJD娃挂</span>
    </div>
    <div class="recommend-item">
      <span>番约</span>
    </div>
    <div class="recommend-item">
      <span>吉他乐器</span>
    </div>
    <div class="recommend-item">
      <span>台球</span>
    </div>
    <div class="recommend-item">
      <span>摄影摄像</span>
    </div>
    <div class="recommend-item">
      <span>钱币收藏</span>
    </div>
    <div class="recommend-item">
      <span>女装穿搭</span>
    </div>
    <div class="recommend-item">
      <span>居家好物</span>
    </div>
    <div class="recommend-item">
      <span>大鹏美妆</span>
    </div>
    <div class="recommend-item">
      <span>机车</span>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  categories: { type: Array, default: () => [] },
  banner: { type: String, default: '' },
  blocks: { type: Array, default: () => [] },
})

// 跟踪当前悬浮的分类索引
const hoveredIndex = ref(-1)
</script>

<style scoped>
/* 两列布局：左侧分类列表、中间内容区 */
.hero{display:grid;grid-template-columns:120px 1fr;gap:10px;margin:6px auto 0;max-width:1200px;padding:10px 16px 0;background:#fff;border-radius:10px;}

/* 左侧分类列表样式 */
.categories{
  display:flex;
  flex-direction:column;
  gap:8px;
  background:#fff;
  border-radius:8px;
  padding:8px;
  box-shadow:0 1px 2px rgba(0,0,0,.03);
  height:200px;
}

.category-item{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:3px;
  cursor:pointer;
  transition:all 0.2s ease;
  padding:4px 0;
}

.category-icon{
  width:26px;
  height:26px;
  object-fit:contain;
}

.category-name{
  font-size:11px;
  color:#333;
}

.category-item:hover{
  color:#ff4d00;
}

/* 中间内容区 */
.center-content{
  display:flex;
  flex-direction:column;
  gap:10px;
}

/* 橙色推广横幅 */
.banner-orange{
  background:linear-gradient(90deg,#ff6b00,#ff8533);
  border-radius:8px;
  overflow:hidden;
  box-shadow:0 1px 6px rgba(0,0,0,.08);
  height:120px;
}

.banner-content{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:20px 30px;
  height:100%;
}

.banner-text h3{
  color:#fff;
  font-size:24px;
  font-weight:700;
  margin:0 0 5px 0;
}

.banner-text p{
  color:#fff;
  font-size:14px;
  margin:0 0 10px 0;
}

.banner-btn{
  background:#fff;
  color:#ff6b00;
  border:none;
  padding:8px 16px;
  border-radius:20px;
  font-size:14px;
  font-weight:700;
  cursor:pointer;
  transition:all 0.2s ease;
}

.banner-btn:hover{
  background:#f5f5f5;
  transform:scale(1.05);
}

.banner-cartoon{
  font-size:60px;
}

/* 彩色背景的商品板块容器 */
.product-sections{
  display:flex;
  flex-direction:column;
  gap:10px;
}

/* 单个彩色板块样式 */
.section-block{
  border-radius:8px;
  padding:10px;
  position:relative;
  overflow:hidden;
  box-shadow:0 1px 2px rgba(0,0,0,.03);
  display:flex;
  flex-direction:column;
  transition: all 0.2s ease;
  height:120px;
}

/* 板块头部样式 */
.section-header{
  display:flex;
  align-items:center;
  gap:8px;
  margin-bottom:8px;
}

.section-icon{
  width:24px;
  height:24px;
  object-fit:contain;
}

.section-title{
  font-size:14px;
  font-weight:700;
  color:#333;
}

/* 横向产品展示区域 */
.section-products{
  display:flex;
  align-items:flex-start;
  justify:space-between;
  gap:10px;
  width:100%;
}

/* 单个产品卡片样式 */
.product-card{
  display:flex;
  flex-direction:column;
  gap:5px;
  width:calc(25% - 8px);
}

.product-img{
  width:100%;
  height:70px;
  border-radius:4px;
  overflow:hidden;
  background:#f8f8f8;
}

.product-img img{
  width:100%;
  height:100%;
  object-fit:cover;
  display:block;
}

/* 产品价格样式 */
.product-price{
  display:block;
  font-weight:700;
  color:#ff4d00;
  line-height:1;
  font-size:12px;
  text-align:center;
}

/* 主题颜色 */
.t-yellow{background:linear-gradient(180deg,#fff6d1,#fff8e6);border:1px solid #f3d94b;}
.t-blue{background:linear-gradient(180deg,#e6f7ff,#f0f9ff);border:1px solid #6ec7ff;}
.t-green{background:linear-gradient(180deg,#eaffea,#f0fff0);border:1px solid #88e49b;}
.t-pink{background:linear-gradient(180deg,#ffe6f0,#fff0f5);border:1px solid #f4a0c6;}

/* 板块悬停效果 */
.section-block:hover{
  box-shadow:0 2px 8px rgba(0,0,0,.1);
  transform: translateY(-2px);
}

@media (max-width: 980px){
  .hero{grid-template-columns:1fr;margin:10px 10px 0;}
  .section-products{flex-direction:column;}
  .product-card{width:100%;}
}

/* 推荐栏样式 */
.recommendation-bar{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:10px;
  background:#fff;
  padding:5px 10px;
  margin:8px auto;
  max-width:1600px;
}

.recommend-item{
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:13px;
  color:#333;
  padding:7px 13px;
  cursor:pointer;
}

.recommend-item.active{
  color:#ff4d00;
  font-weight:bold;
}
</style>
