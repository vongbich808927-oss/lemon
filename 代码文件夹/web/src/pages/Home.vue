<template>
  <div class="page">
    <!-- 顶部黄色导航 -->
    <header class="topbar">
      <div class="container topbar-inner">
        <div class="logo">闲鱼</div>

        <form class="search" @submit.prevent="onSearchSubmit">
          <input v-model.trim="q" class="search-input" placeholder="搜索闲置" />
          <button class="search-btn" type="submit">搜索</button>
        </form>

        <div class="top-right">
          <div class="user">
            <div class="avatar"></div>
            <div class="name">lemon</div>
          </div>
          <router-link class="order" to="/placeholder-orders">订单</router-link>
        </div>
      </div>

      <div class="container subnav">
        <a v-for="(t,i) in hotKeywords" :key="i" href="#" class="subnav-item" @click.prevent="quickSearch(t)">{{ t }}</a>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="container main">
      <section class="hero">
        <!-- 左侧类目（不占额外左边空间：它在内容区内） -->
        <aside class="cats">
          <div v-for="c in categories" :key="c.id" class="cat" @click="goCategory(c)">
            <span class="cat-icon">•</span>
            <span class="cat-name">{{ c.name }}</span>
          </div>
        </aside>

        <!-- 右侧推荐区域：左大图 + 2x2 推荐块 -->
        <div class="hero-right">
          <div class="big-banner" @click="goBanner">
            <div class="big-banner-inner">
              <div class="big-title">闲鱼抄底好物</div>
              <div class="big-sub">超绝性价比 省到底</div>
              <button class="big-btn">去看看</button>
            </div>
          </div>

          <div class="reco-grid">
            <div v-for="b in recoBlocks" :key="b.key" class="reco" :class="`theme-${b.theme}`" @click="goReco(b)">
              <div class="reco-head">
                <div>
                  <div class="reco-title">{{ b.title }}</div>
                  <div class="reco-sub">{{ b.subtitle }}</div>
                </div>
                <div class="reco-more">›</div>
              </div>

              <!-- 关键：三图同一水平线，尺寸不大，不挤占下面空间 -->
              <div class="reco-row">
                <div class="reco-icon" aria-hidden="true">{{ b.icon || '★' }}</div>
                <div class="reco-items">
                  <div v-for="p in (b.products || []).slice(0,3)" :key="p.id" class="reco-item" @click.stop="goProduct(p.id)">
                    <div class="reco-img">
                      <img :src="p.image" alt="" />
                    </div>
                    <div class="reco-price">¥{{ p.price }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 标签条（猜你喜欢那行） -->
      <section class="tabs">
        <div class="tab active">猜你喜欢</div>
        <div v-for="t in tagTabs" :key="t" class="tab" @click="quickSearch(t)">{{ t }}</div>
      </section>

      <!-- 商品瀑布流 / 网格 -->
      <section class="feed">
        <router-link v-for="p in products" :key="p.id" class="card" :to="`/product/${p.id}`">
          <div class="card-img"><img :src="firstImg(p)" alt="" /></div>
          <div class="card-body">
            <div class="card-title">{{ p.title }}</div>
            <div class="card-meta">
              <div class="price">¥{{ p.price }}</div>
              <div class="loc">{{ p.location || '' }}</div>
            </div>
          </div>
        </router-link>
      </section>

      <div class="loadmore" v-if="hasMore" @click="loadMore">加载更多</div>
    </main>

    <!-- 右侧悬浮栏：白底圆角长条 + 分割线 + 图标/文字一一对应 -->
    <div class="floatbar">
      <div class="fb-item" @click="go('/publish')">
        <div class="fb-ico">＋</div>
        <div class="fb-txt">发闲置</div>
      </div>
      <div class="fb-split"></div>
      <div class="fb-item" @click="go('/msg')">
        <div class="fb-ico">💬<span class="badge">4</span></div>
        <div class="fb-txt">消息</div>
      </div>
      <div class="fb-split"></div>
      <div class="fb-item" @click="go('/app')">
        <div class="fb-ico">📱</div>
        <div class="fb-txt">APP</div>
      </div>
      <div class="fb-split"></div>
      <div class="fb-item" @click="go('/feedback')">
        <div class="fb-ico">✎</div>
        <div class="fb-txt">反馈</div>
      </div>
      <div class="fb-split"></div>
      <div class="fb-item" @click="go('/service')">
        <div class="fb-ico">☺</div>
        <div class="fb-txt">客服</div>
      </div>
      <div class="fb-split"></div>
      <div class="fb-item" @click="scrollTop">
        <div class="fb-ico">↑</div>
        <div class="fb-txt">回顶部</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../api'

const router = useRouter()

const q = ref('')
const hotKeywords = ['计算机毕业项目','q宠大乐斗','ensp作业','网安作业','信息安全','武战道','热水袋','穿戴甲','电动车']
const tagTabs = ['个人闲置','BJD娃娃','垂钓','吉他乐器','台球','摄影摄像','钱币收藏','女装穿搭','居家好物','大牌美妆','机车']

const categories = ref([])
const recoBlocks = ref([])
const products = ref([])

const page = ref(1)
const pageSize = 24
const hasMore = ref(true)

function firstImg(p){
  if (Array.isArray(p.images) && p.images[0]) return p.images[0]
  if (p.image) return p.image
  return 'https://picsum.photos/seed/empty/400/400'
}

function go(path){ router.push(path) }
function scrollTop(){ window.scrollTo({ top: 0, behavior: 'smooth' }) }

function onSearchSubmit(){
  if (!q.value) return
  router.push({ name: 'search', query: { q: q.value } })
}

function quickSearch(text){
  router.push({ name: 'search', query: { q: text } })
}

function goProduct(id){ router.push(`/product/${id}`) }
function goCategory(c){ router.push({ name: 'search', query: { category: c.id } }) }
function goReco(b){ router.push({ name: 'search', query: { reco: b.key } }) }
function goBanner(){ router.push({ name: 'search', query: { q: '抄底' } }) }

async function loadHome(){
  const [cs, rs] = await Promise.all([
    api.categories().catch(()=>[]),
    api.reco().catch(()=>[]),
  ])
  categories.value = cs
  recoBlocks.value = rs

  await loadMore(true)
}

async function loadMore(reset=false){
  if (reset){ page.value = 1; products.value = []; hasMore.value = true }
  if (!hasMore.value) return

  const data = await api.products({ page: page.value, pageSize }).catch(()=>({ items: [] }))
  const items = data.items || data || []
  if (items.length < pageSize) hasMore.value = false
  products.value.push(...items)
  page.value += 1
}

onMounted(loadHome)
</script>

<style scoped>
.page{min-height:100vh;}

/* topbar */
.topbar{background:var(--xianyu-yellow); padding:14px 0 10px; box-shadow:0 2px 0 rgba(0,0,0,.06);}
.topbar-inner{display:flex; align-items:center; gap:18px;}
.logo{font-size:42px; font-weight:800; letter-spacing:2px;}

.search{flex:1; display:flex; align-items:center; background:#fff; border-radius:22px; height:40px; padding:0 6px 0 14px; box-shadow: inset 0 0 0 1px rgba(0,0,0,.06);} 
.search-input{flex:1; border:0; outline:none; font-size:14px;}
.search-btn{border:0; background:var(--xianyu-yellow); height:30px; padding:0 14px; border-radius:16px; font-weight:700; cursor:pointer;}

.top-right{display:flex; align-items:center; gap:14px; font-size:14px;}
.user{display:flex; align-items:center; gap:8px;}
.avatar{width:28px;height:28px;border-radius:50%; background:#333;}
.order{padding:6px 10px; border-radius:16px; background:rgba(255,255,255,.7)}

.subnav{display:flex; gap:14px; padding:8px 0 0; overflow:hidden; color:#222; font-size:13px;}
.subnav-item{opacity:.9}

/* main hero */
.main{padding:18px 0 60px;}
.hero{display:grid; grid-template-columns: 260px 1fr; gap:18px;}

.cats{background:#fff; border-radius:18px; padding:12px 14px; box-shadow:0 1px 10px rgba(0,0,0,.06);} 
.cat{display:flex; align-items:center; gap:10px; padding:8px 6px; border-radius:10px; cursor:pointer;}
.cat:hover{background:#fafafa;}
.cat-icon{width:18px; color:#999;}
.cat-name{font-size:14px; color:#222;}

.hero-right{display:grid; grid-template-columns: 280px 1fr; gap:14px; align-items:stretch;}

.big-banner{border-radius:18px; background:linear-gradient(180deg,#ff8a3d,#ffb84d); position:relative; overflow:hidden; cursor:pointer; box-shadow:0 1px 10px rgba(0,0,0,.08);} 
.big-banner-inner{padding:16px; color:#fff; height:100%; display:flex; flex-direction:column; justify-content:flex-end; gap:6px;}
.big-title{font-size:22px; font-weight:900;}
.big-sub{font-size:13px; opacity:.95;}
.big-btn{margin-top:10px; width:110px; height:34px; border:0; border-radius:18px; background:#ffe60f; font-weight:800; cursor:pointer;}

.reco-grid{display:grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap:14px;}
.reco{border-radius:18px; padding:14px; cursor:pointer; position:relative; overflow:hidden; box-shadow:0 1px 10px rgba(0,0,0,.06);} 
.reco-head{display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;}
.reco-title{font-size:18px; font-weight:900;}
.reco-sub{font-size:12px; color:rgba(0,0,0,.55)}
.reco-more{font-size:20px; opacity:.6;}

/* 关键：同一水平线，尺寸不大 */
.reco-row{display:flex; align-items:center; gap:14px;}
.reco-icon{width:44px; height:44px; display:flex; align-items:center; justify-content:center; font-size:22px; border-radius:12px; background:rgba(255,255,255,.55);} 
.reco-items{display:flex; gap:12px; align-items:flex-end; flex:1;}
.reco-item{width:96px;}
.reco-img{width:96px; height:96px; border-radius:14px; background:rgba(255,255,255,.6); overflow:hidden;}
.reco-img img{width:100%; height:100%; object-fit:cover; display:block;}
.reco-price{margin-top:6px; text-align:center; font-weight:900; color:#ff4d00;}

.theme-yellow{background:linear-gradient(180deg,#fff6b8,#fff0a8); border:2px solid #f3d94b;}
.theme-blue{background:linear-gradient(180deg,#d8f0ff,#cfeaff); border:2px solid #6ec7ff;}
.theme-pink{background:linear-gradient(180deg,#ffe0ef,#ffd7ea); border:2px solid #f4a0c6;}
.theme-green{background:linear-gradient(180deg,#dfffe4,#d5ffdc); border:2px solid #88e49b;}

/* tabs */
.tabs{margin:16px 0 12px; display:flex; gap:12px; overflow:auto; padding:10px 0;}
.tab{background:#fff; border-radius:18px; padding:8px 14px; box-shadow:0 1px 8px rgba(0,0,0,.06); white-space:nowrap; cursor:pointer; font-size:14px;}
.tab.active{background:var(--xianyu-yellow); font-weight:900;}

/* feed */
.feed{display:grid; grid-template-columns: repeat(4, 1fr); gap:14px;}
.card{background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 1px 10px rgba(0,0,0,.06);} 
.card-img{height:180px; background:#f2f2f2;}
.card-img img{width:100%; height:100%; object-fit:cover; display:block;}
.card-body{padding:10px 12px;}
.card-title{font-size:14px; line-height:1.3; height:36px; overflow:hidden;}
.card-meta{margin-top:8px; display:flex; justify-content:space-between; align-items:center; color:#999; font-size:12px;}
.price{color:#ff4d00; font-weight:900; font-size:16px;}

.loadmore{margin:18px auto 0; width:140px; text-align:center; padding:10px 0; border-radius:18px; background:#fff; box-shadow:0 1px 10px rgba(0,0,0,.06); cursor:pointer;}

/* right floating bar */
.floatbar{position:fixed; right:18px; top:220px; width:84px; background:#fff; border-radius:24px; box-shadow:0 8px 24px rgba(0,0,0,.14); padding:10px 0; display:flex; flex-direction:column; align-items:center; z-index:50;}
.fb-item{width:100%; padding:8px 0; display:flex; flex-direction:column; align-items:center; gap:6px; cursor:pointer; position:relative;}
.fb-ico{width:44px; height:44px; border-radius:50%; background:var(--xianyu-yellow); display:flex; align-items:center; justify-content:center; font-weight:900; position:relative;}
.fb-txt{font-size:13px; color:#222;}
.fb-split{width:54px; height:1px; background:#eee; margin:4px 0;}
.badge{position:absolute; right:-4px; top:-6px; background:#ff3b30; color:#fff; font-size:12px; line-height:16px; height:16px; min-width:16px; padding:0 4px; border-radius:10px; text-align:center;}

@media (max-width: 1200px){
  .feed{grid-template-columns: repeat(3, 1fr);} 
  .hero-right{grid-template-columns: 260px 1fr;}
}
@media (max-width: 980px){
  .hero{grid-template-columns: 1fr;} 
  .hero-right{grid-template-columns: 1fr;} 
  .feed{grid-template-columns: repeat(2, 1fr);} 
  .floatbar{display:none;}
}
</style>




