<template>
  <div class="product-list">
    <!-- 商品标签栏 -->
    <div class="tags" v-if="tags">
      <div class="tag active">猜你喜欢</div>
      <div v-for="tag in tags" :key="tag" class="tag">{{ tag }}</div>
    </div>

    <!-- 商品网格 -->
    <div class="grid">
      <div 
        v-for="product in products" 
        :key="product.id" 
        class="product-item"
        @click="goToDetail(product.id)"
        @mouseenter="hoveredProduct = product"
        @mouseleave="hoveredProduct = null"
        :data-id="product.id"
      >
        <!-- 商品图片 -->
        <div class="product-img">
          <img :src="product.images[0]" :alt="product.title" />
        </div>

        <!-- 商品信息 -->
        <div class="product-info">
          <div class="product-title">{{ product.title }}</div>
          <div class="product-price">¥{{ product.price }}</div>
          <div class="product-meta">
            <span class="seller">{{ product.seller }} <span class="level">等级{{ product.sellerLevel }}</span></span>
            <span class="views">{{ product.views }}人想要</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 鼠标悬停预览 -->
    <div 
      v-if="hoveredProduct" 
      class="product-preview"
      :style="{
        left: previewPos.x + 'px',
        top: previewPos.y + 'px'
      }"
    >
      <div class="preview-content">
        <div class="preview-images">
          <div class="main-img">
            <img :src="hoveredProduct.images[0]" :alt="hoveredProduct.title" />
          </div>
          <div class="thumbnails" v-if="hoveredProduct.images.length > 1">
            <div 
              v-for="(img, index) in hoveredProduct.images" 
              :key="index" 
              class="thumbnail"
            >
              <img :src="img" :alt="hoveredProduct.title" />
            </div>
          </div>
        </div>
        <div class="preview-info">
          <div class="preview-title">{{ hoveredProduct.title }}</div>
          <div class="preview-price">¥{{ hoveredProduct.price }}</div>
          <div class="preview-location">{{ hoveredProduct.location }} · {{ hoveredProduct.condition }}</div>
          <div class="preview-desc">{{ hoveredProduct.description.substring(0, 100) }}...</div>
          <div class="preview-meta">
            <span class="preview-seller">{{ hoveredProduct.seller }}</span>
            <span class="preview-views">{{ hoveredProduct.views }}人想要</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../api'

const router = useRouter()

// Props
const props = defineProps({
  initialProducts: { type: Array, default: () => [] }
})

// 状态
const products = ref(props.initialProducts || [])
const tags = ref([])
const hoveredProduct = ref(null)
const previewPos = ref({ x: 0, y: 0 })

// 获取商品列表
const fetchProducts = async () => {
  try {
    const res = await api.products({ limit: 20 })
    products.value = res.list
  } catch (error) {
    console.error('获取商品列表失败:', error)
  }
}

// 获取标签
const fetchTags = async () => {
  try {
    const res = await api.tags()
    tags.value = res
  } catch (error) {
    console.error('获取标签失败:', error)
  }
}

// 进入商品详情页
const goToDetail = (id) => {
  router.push(`/product/${id}`)
}

// 处理鼠标移动事件，更新预览位置
const handleMouseMove = (e) => {
  if (hoveredProduct.value) {
    // 预览框显示在鼠标右侧，避免超出屏幕
    previewPos.value = {
      x: e.clientX + 20,
      y: e.clientY - 100
    }
  }
}

// 生命周期
onMounted(async () => {
  await Promise.all([fetchProducts(), fetchTags()])
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style scoped>
.product-list {
  padding: 10px;
}

/* 标签栏 */
.tags {
  display: flex;
  gap: 15px;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 10px;
  overflow-x: auto;
}

.tag {
  padding: 8px 15px;
  border-radius: 20px;
  background: #f5f5f5;
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.tag:hover {
  background: #e0e0e0;
}

.tag.active {
  background: #ff4d00;
  color: white;
}

/* 商品网格 */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 10px;
}

/* 商品项 */
.product-item {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
}

.product-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.product-img {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.product-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-item:hover .product-img img {
  transform: scale(1.05);
}

.product-info {
  padding: 10px;
}

.product-title {
  font-size: 13px;
  color: #333;
  line-height: 1.4;
  margin-bottom: 8px;
  height: 38px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-price {
  font-size: 16px;
  font-weight: bold;
  color: #ff4d00;
  margin-bottom: 5px;
}

.product-meta {
  font-size: 11px;
  color: #999;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.level {
  font-size: 10px;
  color: #ff9800;
  margin-left: 3px;
}

/* 预览框 */
.product-preview {
  position: fixed;
  z-index: 1000;
  width: 500px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 15px;
  pointer-events: none;
  border: 1px solid #e0e0e0;
}

.preview-content {
  display: flex;
  gap: 15px;
}

.preview-images {
  width: 200px;
}

.main-img {
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 8px;
}

.main-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnails {
  display: flex;
  gap: 5px;
  margin-top: 10px;
  overflow-x: auto;
}

.thumbnail {
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-info {
  flex: 1;
  min-width: 0;
}

.preview-title {
  font-size: 15px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.3;
}

.preview-price {
  font-size: 20px;
  font-weight: bold;
  color: #ff4d00;
  margin-bottom: 5px;
}

.preview-location {
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
}

.preview-desc {
  font-size: 12px;
  color: #666;
  line-height: 1.4;
  margin-bottom: 10px;
  height: 40px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.preview-meta {
  font-size: 11px;
  color: #999;
  display: flex;
  justify-content: space-between;
}
</style>