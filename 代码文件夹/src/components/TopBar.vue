<template>
  <header class="topbar">
    <div class="container">
      <div class="row1">
        <img class="logo" :src="logo" alt="logo" />

        <form class="search" @submit.prevent="$emit('search', kw.trim())">
          <input v-model="kw" placeholder="搜索闲置" />
          <button type="submit">搜索</button>
        </form>

        <div class="user-wrap">
          <img class="avatar" :src="avatar" alt="avatar" />
          <span class="uname">lemon</span>
          <img class="order-ico" :src="orderIco" alt="order" />
          <span class="order" @click="$emit('order')">订单</span>
        </div>
      </div>

      <!-- 热词：放在搜索框左边下面（对齐搜索框左边） -->
      <div class="row2">
        <ul class="hotwords">
          <li v-for="h in hots" :key="h" @click="$emit('search', h)">{{ h }}</li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  logo: {
    type: String,
    default:
      'https://img.alicdn.com/imgextra/i1/O1CN012ysCmB1LTuMTCwXre_!!6000000001301-2-tps-480-144.png_360x10000.jpg_.webp',
  },
})

defineEmits(['search', 'order'])

const kw = ref('')
const hots = ['手办', '手机', '游戏账号']
const avatar =
  'https://img.alicdn.com/bao/uploaded/i2/O1CN01MAVy7P1rpUlYTAthm_!!4611686018427380096-0-mtopupload.jpg_110x10000Q90.jpg_.webp'
const orderIco =
  'https://gw.alicdn.com/imgextra/i4/O1CN01l75mCd1QVo1FDKkBQ_!!6000000001982-2-tps-72-72.png'
</script>

<style scoped>
/* 黄条更窄 */
.topbar {
  background: var(--xianyu-yellow, #ffe60f);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.06);
  padding: 2px 0 2px;
}

.row1 {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 18px;
}

/* 闲鱼更靠左 */
.logo {
  height: 50px;
  margin-left: -8px;
}

.search {
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 5px 0 14px;
  background: #fff;
  border-radius: 25px;
  box-shadow: 0 0 0 1.5px #111 inset;
}

.search input {
  flex: 1;
  border: 0;
  font-size: 15px;
  outline: none;
}

.search button {
  border: 0;
  background: var(--xianyu-yellow);
  height: 34px;
  padding: 0 18px;
  border-radius: 22px;
  cursor: pointer;
  font-weight: 700;
  margin-left: 2px;
}

.user-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 8px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.uname {
  font-size: 14px;
}

.order-ico {
  width: 18px;
  height: 18px;
}

.order {
  font-size: 14px;
  cursor: pointer;
}

/* 第二行：让热词在搜索框左边下面（而不是居中） */
.row2 {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 18px;
  margin-top: 4px;
}

.hotwords {
  grid-column: 2;
  max-width: 980px;
  margin: 0 auto;

  /* 关键：左对齐，而不是居中 */
  justify-content: flex-start;

  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 13px;
  height: 18px;
  line-height: 18px;
}

.hotwords li {
  cursor: pointer;
}
</style>
