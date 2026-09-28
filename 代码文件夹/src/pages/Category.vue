<template>
  <div class="wrap">
    <header class="topbar">
      <div class="container bar">
        <button class="back" @click="$router.back()">‹</button>
        <div class="title">{{ categoryName }}</div>
        <router-link class="home" to="/">首页</router-link>
      </div>
    </header>

    <main class="container main">
      <!-- 筛选和排序区域 -->
      <div class="filter-bar">
        <div class="filter-item" @click="toggleSort">
          <span>{{ sortText }}</span>
          <span class="icon">▼</span>
        </div>
        <div class="filter-item" @click="togglePriceFilter">
          <span>价格</span>
          <span class="icon">▼</span>
        </div>
        <div class="filter-item">
          <span>筛选</span>
          <span class="icon">▼</span>
        </div>
      </div>

      <!-- 价格筛选浮层 -->
      <div class="price-filter-overlay" v-if="showPriceFilter" @click="togglePriceFilter"></div>
      <div class="price-filter-panel" v-if="showPriceFilter">
        <div class="panel-header">
          <h3>价格区间</h3>
          <button class="close" @click="togglePriceFilter">×</button>
        </div>
        <div class="price-inputs">
          <div class="input-group">
            <span class="label">¥</span>
            <input type="number" v-model.number="minPrice" placeholder="最小" />
          </div>
          <span class="separator">-</span>
          <div class="input-group">
            <span class="label">¥</span>
            <input type="number" v-model.number="maxPrice" placeholder="最大" />
          </div>
        </div>
        <div class="filter-actions">
          <button class="reset" @click="resetPrice">重置</button>
          <button class="confirm" @click="applyPriceFilter">确定</button>
        </div>
      </div>

      <!-- 排序浮层 -->
      <div class="sort-overlay" v-if="showSort" @click="toggleSort"></div>
      <div class="sort-panel" v-if="showSort">
        <div class="panel-header">
          <h3>排序方式</h3>
          <button class="close" @click="toggleSort">×</button>
        </div>
        <div class="sort-options">
          <div class="sort-option" @click="selectSort('price-asc')">
            <span>价格从低到高</span>
            <span v-if="sort === 'price-asc'" class="check">✓</span>
          </div>
          <div class="sort-option" @click="selectSort('price-desc')">
            <span>价格从高到低</span>
            <span v-if="sort === 'price-desc'" class="check">✓</span>
          </div>
          <div class="sort-option" @click="selectSort('time')">
            <span>最新发布</span>
            <span v-if="sort === 'time'" class="check">✓</span>
          </div>
        </div>
      </div>

      <!-- 商品列表 -->
      <div class="products-grid">
        <div class="product-card" v-for="product in products" :key="product.id" @click="goToProduct(product.id)">
          <img class="product-img" :src="product.images?.[0] || 'https://picsum.photos/seed/' + product.id + '/300/300'" alt="" />
          <div class="product-info">
            <div class="price">¥{{ product.price }}</div>
            <div class="title">{{ product.title }}</div>
            <div class="location">{{ product.location || '全国' }}</div>
            <div class="seller-info">
              <img class="seller-avatar" :src="product.seller?.avatar || 'https://img.alicdn.com/bao/uploaded/i2/O1CN01MAVy7P1rpUlYTAthm_!!4611686018427380096-0-mtopupload.jpg_110x10000Q90.jpg_.webp'" alt="" />
              <span class="seller-name">{{ product.seller?.nickname || '未知卖家' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div class="empty" v-if="products.length === 0">
        <img src="https://img.alicdn.com/imgextra/i4/O1CN01ZJ8V3E1yD0y8j8Q9t_!!6000000006594-5-tps-460-460.png" alt="" class="empty-img" />
        <p class="empty-text">该分类暂无商品</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../api'

const route = useRoute()
const router = useRouter()

const categoryId = ref(1)
const products = ref([])

// 排序状态
const showSort = ref(false)
const sort = ref('time')

// 价格筛选状态
const showPriceFilter = ref(false)
const minPrice = ref('')
const maxPrice = ref('')

// 分类名称映射
const categoryNames = {
  '1': '手机/数码/电脑',
  '2': '服饰/箱包/运动',
  '3': '技能/卡券/潮玩',
  '4': '母婴/美妆/个护',
  '5': '家具/家电/家装',
  '6': '文玩/珠宝/礼品',
  '7': '食品/宠物/花卉',
  '8': '图书/游戏/音像',
  '9': '汽车/电动车/租房',
  '10': '五金/设备/农牧',
  electronics: '手机/数码/电脑',
  fashion: '服饰/箱包/运动',
  services: '技能/卡券/潮玩',
  maternal: '母婴/美妆/个护',
  home: '家具/家电/家装',
  jewelry: '文玩/珠宝/礼品',
  food: '食品/宠物/花卉',
  books: '图书/游戏/音像',
  automotive: '汽车/电动车/租房',
  hardware: '五金/设备/农牧'
}

// 计算显示的分类名称
const categoryName = computed(() => {
  return categoryNames[route.params.category] || '商品分类'
})

// 计算排序文本
const sortText = computed(() => {
  const sortMap = {
    'price-asc': '价格从低到高',
    'price-desc': '价格从高到低',
    'time': '最新发布'
  }
  return sortMap[sort.value] || '最新发布'
})

// 切换排序浮层
const toggleSort = () => {
  showSort.value = !showSort.value
  if (showSort.value) {
    showPriceFilter.value = false
  }
}

// 选择排序方式
const selectSort = (newSort) => {
  sort.value = newSort
  showSort.value = false
  fetchProducts()
}

// 切换价格筛选浮层
const togglePriceFilter = () => {
  showPriceFilter.value = !showPriceFilter.value
  if (showPriceFilter.value) {
    showSort.value = false
  }
}

// 重置价格筛选
const resetPrice = () => {
  minPrice.value = ''
  maxPrice.value = ''
}

// 应用价格筛选
const applyPriceFilter = () => {
  showPriceFilter.value = false
  fetchProducts()
}

// 跳转到商品详情页
const goToProduct = (id) => {
  router.push(`/product/${id}`)
}

// 获取商品列表
const fetchProducts = async () => {
  try {
    const params = {
      category: route.params.category,
      sort: sort.value,
      minPrice: minPrice.value || undefined,
      maxPrice: maxPrice.value || undefined
    }
    
    const response = await api.products(params)
    products.value = response.products || []
    console.log('获取分类商品成功:', products.value)
  } catch (error) {
    console.error('获取分类商品失败:', error)
    alert('获取商品列表失败，请稍后重试')
  }
}

// 监听路由变化
watch(() => route.params.category, () => {
  fetchProducts()
})

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
.topbar{background:var(--xianyu-yellow); padding:12px 0;}
.bar{display:flex; align-items:center; justify-content:space-between;}
.back{border:0; background:#fff; width:36px; height:36px; border-radius:18px; font-size:22px; cursor:pointer;}
.title{font-weight:900;}
.home{padding:6px 10px; border-radius:16px; background:rgba(255,255,255,.7)}

.main{padding:18px 0 60px;}

/* 筛选和排序区域 */
.filter-bar{
  display:flex;
  background:#fff;
  border-radius:10px;
  padding:10px;
  margin-bottom:15px;
  box-shadow:0 1px 10px rgba(0,0,0,.06);
}

.filter-item{
  flex:1;
  display:flex;
  align-items:center;
  justify:center;
  gap:5px;
  padding:10px;
  border-radius:8px;
  cursor:pointer;
  transition:background-color .2s;
  font-size:14px;
}

.filter-item:hover{
  background-color:#f5f5f5;
}

.filter-item .icon{
  font-size:12px;
  color:#999;
}

/* 浮层通用样式 */
.price-filter-overlay,
.sort-overlay{
  position:fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background:rgba(0,0,0,.3);
  z-index:100;
}

.price-filter-panel,
.sort-panel{
  position:fixed;
  bottom:0;
  left:0;
  right:0;
  background:#fff;
  border-radius:15px 15px 0 0;
  padding:20px;
  z-index:101;
  animation:slideUp .3s ease;
}

@keyframes slideUp{
  from{transform:translateY(100%);}
  to{transform:translateY(0);}
}

.panel-header{
  display:flex;
  align-items:center;
  justify-content: space-between;
  margin-bottom:20px;
  padding-bottom:15px;
  border-bottom:1px solid #f0f0f0;
}

.panel-header h3{
  margin:0;
  font-size:18px;
  font-weight:600;
}

.close{
  border:0;
  background:none;
  font-size:24px;
  cursor:pointer;
  color:#999;
  padding:0;
  width:30px;
  height:30px;
  display:flex;
  align-items:center;
  justify-content:center;
}

/* 价格筛选面板 */
.price-inputs{
  display:flex;
  align-items:center;
  gap:10px;
  margin-bottom:20px;
}

.input-group{
  flex:1;
  display:flex;
  align-items:center;
  border:1px solid #ddd;
  border-radius:8px;
  overflow:hidden;
}

.input-group .label{
  padding:0 10px;
  background:#f5f5f5;
  border-right:1px solid #ddd;
  color:#666;
}

.input-group input{
  flex:1;
  border:0;
  padding:12px;
  outline:none;
  font-size:14px;
}

.separator{
  color:#999;
}

.filter-actions{
  display:flex;
  gap:10px;
}

.filter-actions button{
  flex:1;
  padding:12px;
  border-radius:8px;
  font-size:16px;
  cursor:pointer;
  border:1px solid #ddd;
}

.reset{
  background:#fff;
  color:#333;
}

.confirm{
  background:#ffe60f;
  color:#333;
  border-color:#ffe60f;
  font-weight:600;
}

/* 排序面板 */
.sort-options{
  display:flex;
  flex-direction:column;
  gap:0;
}

.sort-option{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:15px;
  border-bottom:1px solid #f0f0f0;
  cursor:pointer;
  transition:background-color .2s;
}

.sort-option:hover{
  background-color:#f5f5f5;
}

.sort-option .check{
  color:#ff4d00;
  font-weight:bold;
}

/* 商品列表 */
.products-grid{
  display:grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap:20px;
}

.product-card{
  background:#fff;
  border-radius:12px;
  overflow:hidden;
  box-shadow:0 1px 10px rgba(0,0,0,.06);
  cursor:pointer;
  transition:transform .2s;
}

.product-card:hover{
  transform:translateY(-4px);
  box-shadow:0 4px 20px rgba(0,0,0,.1);
}

.product-img{
  width:100%;
  height:200px;
  object-fit:cover;
  background:#f5f5f5;
}

.product-info{
  padding:12px;
}

.price{
  color:#ff4d00;
  font-size:18px;
  font-weight:900;
  margin-bottom:6px;
}

.title{
  font-size:14px;
  line-height:1.5;
  margin-bottom:6px;
  overflow:hidden;
  display:-webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
}

.location{
  font-size:12px;
  color:#999;
  margin-bottom:8px;
}

.seller-info{
  display:flex;
  align-items:center;
  gap:6px;
}

.seller-avatar{
  width:24px;
  height:24px;
  border-radius:50%;
  object-fit:cover;
}

.seller-name{
  font-size:12px;
  color:#666;
}

/* 空状态 */
.empty{
  text-align:center;
  padding:60px 0;
}

.empty-img{
  width:200px;
  height:200px;
  object-fit:contain;
  margin-bottom:20px;
}

.empty-text{
  color:#999;
  font-size:16px;
}

@media (max-width: 768px){
  .products-grid{
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap:10px;
  }
  
  .product-img{
    height:150px;
  }
}
</style>