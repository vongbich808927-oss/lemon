<template>
  <div class="wrap">
    <div class="container">
      <h1 class="title">{{ title }}</h1>
      <p class="desc">占位页：后续可继续完善。</p>
      <router-link class="back" to="/">返回首页</router-link>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: '页面' },
})
</script>

<style scoped>
.wrap{padding:40px 0;}
.title{font-size:24px;margin:0 0 10px;}
.desc{color:#666;margin:0 0 16px;}
.back{display:inline-block;padding:10px 14px;background:#fff;border-radius:10px;box-shadow:0 1px 6px rgba(0,0,0,.06)}
</style>




