<template>
  <div class="page">
    <header class="topbar">
      <div class="container topbar-inner">
        <router-link class="logo" to="/">闲鱼</router-link>

        <form class="search" @submit.prevent="doSearch(true)">
          <input v-model.trim="q" class="search-input" placeholder="搜索闲置" />
          <button class="search-btn" type="submit">搜索</button>
        </form>

        <router-link class="backhome" to="/">返回</router-link>
      </div>
    </header>

    <div class="filter-bar">
      <div class="container">
        <div class="filter-item active">综合</div>
        <div class="filter-item" @click="toggleSortMenu">最新发布 ▼</div>
        <div class="filter-item" @click="togglePriceMenu">价格 ▼</div>
        <div class="filter-item">距我</div>
        <div class="filter-item">区域</div>
        <div class="filter-item" @click="toggleMoreFilterMenu">更多筛选</div>
      </div>
    </div>

    <!-- 排序菜单 -->
    <div v-if="showSortMenu" class="filter-dropdown">
      <div class="container">
        <div class="dropdown-item" @click="setSort('latest')">最新</div>
        <div class="dropdown-item" @click="setSort('1d')">1天内</div>
        <div class="dropdown-item" @click="setSort('3d')">3天内</div>
        <div class="dropdown-item" @click="setSort('7d')">7天内</div>
        <div class="dropdown-item" @click="setSort('14d')">14天内</div>
      </div>
    </div>

    <!-- 价格菜单 -->
    <div v-if="showPriceMenu" class="filter-dropdown">
      <div class="container price-filter">
        <div class="price-range">
          <input v-model.number="minPrice" type="number" placeholder="最低价格" />
          <span class="price-separator">-</span>
          <input v-model.number="maxPrice" type="number" placeholder="最高价格" />
          <button class="price-confirm" @click="applyPriceFilter">确定</button>
        </div>
        <div class="price-options">
          <div class="price-item" @click="setPriceRange(0, 100)">0-100元</div>
          <div class="price-item" @click="setPriceRange(100, 300)">100-300元</div>
          <div class="price-item" @click="setPriceRange(300, 500)">300-500元</div>
          <div class="price-item" @click="setPriceRange(500, 1000)">500-1000元</div>
          <div class="price-item" @click="setPriceRange(1000, 3000)">1000-3000元</div>
          <div class="price-item" @click="setPriceRange(3000, 5000)">3000-5000元</div>
          <div class="price-item" @click="setPriceRange(5000, null)">5000元以上</div>
        </div>
      </div>
    </div>

    <!-- 更多筛选菜单 -->
    <div v-if="showMoreFilterMenu" class="filter-dropdown more-filter">
      <div class="container">
        <div class="filter-section">
          <div class="filter-title">服务</div>
          <div class="filter-options">
            <div class="filter-option">
              <input type="checkbox" id="inspection" v-model="filters.inspection" />
              <label for="inspection">验货宝</label>
            </div>
            <div class="filter-option">
              <input type="checkbox" id="freeShipping" v-model="filters.freeShipping" />
              <label for="freeShipping">包邮</label>
            </div>
          </div>
        </div>
        <div class="filter-section">
          <div class="filter-title">新旧程度</div>
          <div class="filter-options">
            <div class="filter-option">
              <input type="checkbox" id="condition-1" v-model="filters.condition" value="全新" />
              <label for="condition-1">全新</label>
            </div>
            <div class="filter-option">
              <input type="checkbox" id="condition-2" v-model="filters.condition" value="几乎全新" />
              <label for="condition-2">几乎全新</label>
            </div>
            <div class="filter-option">
              <input type="checkbox" id="condition-3" v-model="filters.condition" value="九成新" />
              <label for="condition-3">九成新</label>
            </div>
            <div class="filter-option">
              <input type="checkbox" id="condition-4" v-model="filters.condition" value="八成新" />
              <label for="condition-4">八成新</label>
            </div>
            <div class="filter-option">
              <input type="checkbox" id="condition-5" v-model="filters.condition" value="七成新" />
              <label for="condition-5">七成新</label>
            </div>
          </div>
        </div>
        <div class="filter-actions">
          <button class="reset-btn" @click="resetFilters">重置</button>
          <button class="apply-btn" @click="applyFilters">确定</button>
        </div>
      </div>
    </div>

    <main class="container main">
      <section class="feed">
        <router-link v-for="p in products" :key="p.id" class="card" :to="`/product/${p.id}`">
          <div class="card-img">
            <img :src="firstImg(p)" alt="" />
            <div v-if="p.discount" class="discount-tag">降价{{ p.discount }}%</div>
          </div>
          <div class="card-body">
            <div class="card-title">{{ p.title }}</div>
            <div class="card-meta">
              <div class="price">¥{{ p.price }}</div>
              <div class="want">{{ p.want || 0 }}人想要</div>
            </div>
            <div class="card-location">{{ p.location || '' }}</div>
          </div>
        </router-link>
      </section>

      <div class="loadmore" v-if="hasMore" @click="doSearch(false)">加载更多</div>

      <!-- 分页信息 -->
      <div v-if="pagination" class="pagination">
        <div class="page-control">
          <button class="page-btn" :disabled="pagination.page === 1" @click="goToPage(pagination.page - 1)">上一页</button>
        </div>
        <div class="page-info">第 {{ pagination.page }}/{{ pagination.totalPages }} 页</div>
        <div class="page-count">共 {{ pagination.total }} 件商品</div>
        <div class="page-control">
          <button class="page-btn" :disabled="pagination.page >= pagination.totalPages" @click="goToPage(pagination.page + 1)">下一页</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '../api'

const route = useRoute()

// 基本搜索和分页
const q = ref('')
const products = ref([])
const page = ref(1)
const pageSize = 24
const hasMore = ref(true)
const pagination = ref(null)

// 分类
const category = computed(() => route.query.category || undefined)

// 筛选和排序
const sort = ref('latest')
const minPrice = ref(null)
const maxPrice = ref(null)

// 筛选菜单显示状态
const showSortMenu = ref(false)
const showPriceMenu = ref(false)
const showMoreFilterMenu = ref(false)

// 高级筛选
const filters = ref({
  inspection: false,
  freeShipping: false,
  condition: []
})

function firstImg(p){
  if (Array.isArray(p.images) && p.images[0]) return p.images[0]
  if (p.image) return p.image
  return 'https://picsum.photos/seed/empty/400/400'
}

// 切换排序菜单
function toggleSortMenu() {
  showSortMenu.value = !showSortMenu.value
  showPriceMenu.value = false
  showMoreFilterMenu.value = false
}

// 切换价格菜单
function togglePriceMenu() {
  showPriceMenu.value = !showPriceMenu.value
  showSortMenu.value = false
  showMoreFilterMenu.value = false
}

// 切换更多筛选菜单
function toggleMoreFilterMenu() {
  showMoreFilterMenu.value = !showMoreFilterMenu.value
  showSortMenu.value = false
  showPriceMenu.value = false
}

// 设置排序
function setSort(value) {
  sort.value = value
  showSortMenu.value = false
  doSearch(true)
}

// 设置价格范围
function setPriceRange(min, max) {
  minPrice.value = min
  maxPrice.value = max
  applyPriceFilter()
}

// 应用价格筛选
function applyPriceFilter() {
  showPriceMenu.value = false
  doSearch(true)
}

// 重置筛选
function resetFilters() {
  filters.value = {
    inspection: false,
    freeShipping: false,
    condition: []
  }
}

// 应用高级筛选
function applyFilters() {
  showMoreFilterMenu.value = false
  doSearch(true)
}

// 跳转到指定页码
function goToPage(pageNum) {
  if (pageNum < 1 || pageNum > (pagination.value?.totalPages || 1)) return
  page.value = pageNum
  products.value = []
  hasMore.value = true
  doSearch(true)
}

async function doSearch(reset){
  if (reset){ page.value = 1; products.value = []; hasMore.value = true }
  if (!hasMore.value) return

  const params = {
    category: category.value,
    page: page.value,
    pageSize,
    sort: sort.value,
  }

  if (q.value.trim()) {
    params.q = q.value
  }

  // 价格筛选
  if (minPrice.value !== null) {
    params.minPrice = minPrice.value
  }
  if (maxPrice.value !== null) {
    params.maxPrice = maxPrice.value
  }

  // 高级筛选
  if (filters.value.inspection) {
    params.inspection = true
  }
  if (filters.value.freeShipping) {
    params.freeShipping = true
  }
  if (filters.value.condition.length > 0) {
    params.condition = filters.value.condition
  }

  const data = await api.products(params).catch(()=>({ products: [], pagination: {} }))

  const items = data.products || data || []
  if (items.length < pageSize) hasMore.value = false
  products.value.push(...items)
  pagination.value = data.pagination
  page.value += 1
}

watch(() => route.query, () => {
  q.value = String(route.query.q || '')
  doSearch(true)
}, { deep: true })

onMounted(() => {
  q.value = String(route.query.q || '')
  doSearch(true)
})
</script>

<style scoped>
.topbar{background:var(--xianyu-yellow); padding:14px 0;}
.topbar-inner{display:flex; align-items:center; gap:18px;}
.logo{font-size:34px; font-weight:900; letter-spacing:2px;}
.search{flex:1; display:flex; align-items:center; background:#fff; border-radius:22px; height:40px; padding:0 6px 0 14px;} 
.search-input{flex:1; border:0; outline:none; font-size:14px;}
.search-btn{border:0; background:var(--xianyu-yellow); height:30px; padding:0 14px; border-radius:16px; font-weight:700; cursor:pointer;}
.backhome{padding:6px 10px; border-radius:16px; background:rgba(255,255,255,.7)}

.filter-bar{background:#fff; border-bottom:1px solid #f0f0f0; padding:12px 0; position:sticky; top:0; z-index:100;}
.filter-bar .container{display:flex; gap:24px;}
.filter-item{padding:6px 12px; cursor:pointer; color:#666; font-size:14px;}
.filter-item.active{color:#ff4d00; font-weight:700;}

/* 筛选下拉菜单 */
.filter-dropdown{background:#fff; border-bottom:1px solid #f0f0f0; padding:12px 0; box-shadow:0 2px 8px rgba(0,0,0,0.1);}
.dropdown-item{padding:10px 12px; cursor:pointer; font-size:14px; color:#666; transition:background-color 0.2s;}
.dropdown-item:hover{background-color:#f5f5f5;}

/* 价格筛选 */
.price-filter{display:flex; flex-direction:column; gap:16px;}
.price-range{display:flex; align-items:center; gap:10px;}
.price-range input{width:100px; height:32px; padding:0 8px; border:1px solid #ddd; border-radius:4px; font-size:14px;}
.price-separator{color:#999;}
.price-confirm{height:32px; padding:0 16px; background:#ff4d00; color:#fff; border:none; border-radius:4px; cursor:pointer; font-size:14px;}
.price-options{display:grid; grid-template-columns: repeat(4, 1fr); gap:10px;}
.price-item{padding:8px 12px; border:1px solid #ddd; border-radius:4px; text-align:center; cursor:pointer; font-size:14px; color:#666; transition:all 0.2s;}
.price-item:hover{border-color:#ff4d00; color:#ff4d00;}

/* 更多筛选 */
.more-filter{padding:20px 0;}
.filter-section{margin-bottom:20px;}
.filter-title{font-size:16px; font-weight:700; margin-bottom:12px; color:#333;}
.filter-options{display:flex; gap:20px; flex-wrap:wrap;}
.filter-option{display:flex; align-items:center; gap:6px; cursor:pointer;}
.filter-option input[type="checkbox"]{width:16px; height:16px; accent-color:#ff4d00;}
.filter-actions{display:flex; justify-content:flex-end; gap:10px; margin-top:24px;}
.reset-btn{height:36px; padding:0 20px; border:1px solid #ddd; background:#fff; border-radius:4px; cursor:pointer; font-size:14px;}
.apply-btn{height:36px; padding:0 20px; background:#ff4d00; color:#fff; border:none; border-radius:4px; cursor:pointer; font-size:14px;}

.main{padding:16px 0 60px;}

.feed{display:grid; grid-template-columns: repeat(6, 1fr); gap:16px;}
.card{background:#fff; border-radius:0; overflow:hidden; transition:transform 0.2s;}
.card:hover{transform:translateY(-2px);}
.card-img{position:relative; height:0; padding-bottom:100%; overflow:hidden; background:#f7f7f7;}
.card-img img{position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover;}
.discount-tag{position:absolute; top:8px; left:0; background:#ff4d00; color:#fff; font-size:12px; padding:2px 6px;}
.card-body{padding:12px;}
.card-title{font-size:14px; line-height:1.4; height:40px; overflow:hidden; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;}
.card-meta{margin-top:8px; display:flex; justify-content:space-between; align-items:center;}
.price{color:#ff4d00; font-weight:900; font-size:18px;}
.want{color:#999; font-size:12px;}
.card-location{margin-top:6px; color:#999; font-size:12px;}

.loadmore{margin:24px auto 0; width:140px; text-align:center; padding:10px 0; border-radius:18px; background:#fff; box-shadow:0 1px 10px rgba(0,0,0,.06); cursor:pointer;}

/* 分页信息 */
.pagination{display:flex; justify-content:center; align-items:center; gap:20px; margin-top:30px; padding:20px 0; font-size:14px; color:#666;}

.page-control {
  display: flex;
  gap: 8px;
}

.page-btn {
  padding: 6px 12px;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  transition: all 0.2s;
}

.page-btn:hover {
  border-color: #ff4d00;
  color: #ff4d00;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  border-color: #eee;
  color: #999;
}

.page-btn:disabled:hover {
  border-color: #eee;
  color: #999;
}

@media (max-width: 1200px){
  .feed{grid-template-columns: repeat(5, 1fr); gap:14px;}
  .price-options{grid-template-columns: repeat(3, 1fr);}
}
@media (max-width: 980px){
  .feed{grid-template-columns: repeat(4, 1fr); gap:12px;}
  .price-options{grid-template-columns: repeat(2, 1fr);}
}
@media (max-width: 768px){
  .feed{grid-template-columns: repeat(3, 1fr); gap:10px;}
  .filter-bar .container{gap:16px;}
  .filter-item{padding:6px 8px; font-size:13px;}
}
@media (max-width: 576px){
  .feed{grid-template-columns: repeat(2, 1fr); gap:8px;}
  .filter-bar .container{gap:10px;}
  .filter-item{padding:4px 6px; font-size:12px;}
  .price-range input{width:80px;}
  .price-options{grid-template-columns: 1fr;}
}
</style>




