<template>
  <div class="page">
    <!-- 顶部黄色导航栏 -->
    <div class="top-bar">
      <div class="top-bar-content">
        <div class="logo">闲鱼</div>
        <div class="title">发布宝贝</div>
        <div class="publish-btn" @click="publishProduct">发布</div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="main-container">
      <div class="publish-form">
        <!-- 商品图片上传 -->
        <div class="form-section">
          <div class="section-title">商品图片</div>
          <div class="image-upload-container">
            <div class="upload-area" @click="triggerImageUpload">
              <input type="file" ref="fileInput" multiple style="display: none;" accept="image/*" @change="handleImageUpload">
              <div class="upload-icon">+</div>
              <div class="upload-text">添加图片</div>
              <div class="upload-tip">最多可上传9张</div>
            </div>
            <div class="image-preview" v-for="(image, index) in images" :key="index">
              <img :src="image" alt="预览图" class="preview-img">
              <div class="delete-btn" @click="deleteImage(index)">×</div>
            </div>
          </div>
        </div>

        <!-- 商品信息 -->
        <div class="form-section">
          <div class="section-title">商品信息</div>
          
          <!-- 商品标题 -->
          <div class="form-item">
            <div class="label">商品标题</div>
            <input v-model="product.title" type="text" placeholder="请输入商品标题（20-50字）" class="input-field">
          </div>

          <!-- 商品分类 -->
          <div class="form-item">
            <div class="label">商品分类</div>
            <div class="select-field">
              <span class="select-text">{{ selectedCategory }}</span>
              <span class="select-arrow">▼</span>
              <div class="category-dropdown" v-show="showCategoryDropdown">
                <div class="category-item" @click="selectCategory('数码产品')">数码产品</div>
                <div class="category-item" @click="selectCategory('服装鞋包')">服装鞋包</div>
                <div class="category-item" @click="selectCategory('家居生活')">家居生活</div>
                <div class="category-item" @click="selectCategory('美妆护肤')">美妆护肤</div>
                <div class="category-item" @click="selectCategory('图书音像')">图书音像</div>
                <div class="category-item" @click="selectCategory('运动户外')">运动户外</div>
                <div class="category-item" @click="selectCategory('其他')">其他</div>
              </div>
            </div>
          </div>

          <!-- 商品价格 -->
          <div class="form-item">
            <div class="label">商品价格</div>
            <div class="price-input">
              <span class="currency-symbol">¥</span>
              <input v-model.number="product.price" type="number" placeholder="0.00" class="price-field" min="0" step="0.01">
            </div>
          </div>

          <!-- 商品新旧程度 -->
          <div class="form-item">
            <div class="label">新旧程度</div>
            <div class="condition-options">
              <div class="condition-option" :class="{ active: product.condition === '全新' }" @click="product.condition = '全新'">全新</div>
              <div class="condition-option" :class="{ active: product.condition === '几乎全新' }" @click="product.condition = '几乎全新'">几乎全新</div>
              <div class="condition-option" :class="{ active: product.condition === '九成新' }" @click="product.condition = '九成新'">九成新</div>
              <div class="condition-option" :class="{ active: product.condition === '八成新' }" @click="product.condition = '八成新'">八成新</div>
              <div class="condition-option" :class="{ active: product.condition === '七成新及以下' }" @click="product.condition = '七成新及以下'">七成新及以下</div>
            </div>
          </div>

          <!-- 商品描述 -->
          <div class="form-item">
            <div class="label">商品描述</div>
            <textarea v-model="product.description" placeholder="请详细描述商品信息（包括尺寸、颜色、购买时间、使用情况等）" class="textarea-field" rows="8"></textarea>
          </div>
        </div>

        <!-- 交易信息 -->
        <div class="form-section">
          <div class="section-title">交易信息</div>
          
          <!-- 所在地 -->
          <div class="form-item">
            <div class="label">所在地</div>
            <input v-model="product.location" type="text" placeholder="请输入您的所在地" class="input-field">
          </div>

          <!-- 交易方式 -->
          <div class="form-item">
            <div class="label">交易方式</div>
            <div class="trade-options">
              <div class="trade-option" :class="{ active: product.tradeMethod === '邮寄' }" @click="product.tradeMethod = '邮寄'">邮寄</div>
              <div class="trade-option" :class="{ active: product.tradeMethod === '当面交易' }" @click="product.tradeMethod = '当面交易'">当面交易</div>
              <div class="trade-option" :class="{ active: product.tradeMethod === '两种方式都可以' }" @click="product.tradeMethod = '两种方式都可以'">两种方式都可以</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

// 商品信息
const product = reactive({
  title: '',
  category: '',
  price: 0,
  condition: '全新',
  description: '',
  location: '陕西省',
  tradeMethod: '两种方式都可以',
  images: []
});

// 已上传图片
const images = ref([]);

// 文件输入引用
const fileInput = ref(null);

// 分类选择
const selectedCategory = ref('请选择分类');
const showCategoryDropdown = ref(false);

// 触发图片上传
const triggerImageUpload = () => {
  fileInput.value.click();
};

// 处理图片上传
const handleImageUpload = (e) => {
  const files = e.target.files;
  if (files && files.length > 0) {
    // 计算可上传数量
    const remainingSlots = 9 - images.value.length;
    const uploadCount = Math.min(files.length, remainingSlots);
    
    for (let i = 0; i < uploadCount; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        images.value.push(event.target.result);
      };
      reader.readAsDataURL(files[i]);
    }
  }
};

// 删除图片
const deleteImage = (index) => {
  images.value.splice(index, 1);
};

// 选择分类
const selectCategory = (category) => {
  selectedCategory.value = category;
  product.category = category;
  showCategoryDropdown.value = false;
};

// 发布商品
const publishProduct = () => {
  // 表单验证
  if (!product.title.trim()) {
    alert('请输入商品标题');
    return;
  }
  
  if (!product.category) {
    alert('请选择商品分类');
    return;
  }
  
  if (product.price <= 0) {
    alert('请输入有效的商品价格');
    return;
  }
  
  if (images.value.length === 0) {
    alert('请至少上传一张商品图片');
    return;
  }
  
  if (!product.description.trim()) {
    alert('请输入商品描述');
    return;
  }
  
  // 模拟发布成功
  alert('商品发布成功！');
  
  // 重置表单
  product.title = '';
  product.category = '';
  product.price = 0;
  product.condition = '全新';
  product.description = '';
  product.location = '陕西省';
  product.tradeMethod = '两种方式都可以';
  images.value = [];
  selectedCategory.value = '请选择分类';
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

/* 发布表单 */
.publish-form {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0,0,0,.03);
  padding: 20px;
}

/* 表单区域 */
.form-section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}

/* 图片上传 */
.image-upload-container {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.upload-area {
  width: 120px;
  height: 120px;
  border: 2px dashed #d9d9d9;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.upload-area:hover {
  border-color: #ff4d00;
  background-color: #fff2e8;
}

.upload-icon {
  font-size: 32px;
  color: #d9d9d9;
  margin-bottom: 8px;
}

.upload-text {
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}

.upload-tip {
  font-size: 12px;
  color: #999;
}

.image-preview {
  width: 120px;
  height: 120px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.delete-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 24px;
  height: 24px;
  background: rgba(0,0,0,.6);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
}

/* 表单项目 */
.form-item {
  margin-bottom: 20px;
}

.label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
}

.input-field, .textarea-field {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.input-field:focus, .textarea-field:focus {
  outline: none;
  border-color: #ff4d00;
}

.textarea-field {
  resize: vertical;
  min-height: 120px;
}

/* 选择字段 */
.select-field {
  position: relative;
  width: 100%;
  height: 40px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  cursor: pointer;
}

.select-text {
  font-size: 14px;
  color: #333;
}

.select-arrow {
  font-size: 12px;
  color: #999;
}

.category-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 2px;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,.15);
  z-index: 10;
}

.category-item {
  padding: 10px 12px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s;
}

.category-item:hover {
  background-color: #f5f5f5;
  color: #ff4d00;
}

/* 价格输入 */
.price-input {
  display: flex;
  align-items: center;
  width: 200px;
}

.currency-symbol {
  font-size: 16px;
  color: #333;
  margin-right: 8px;
}

.price-field {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.price-field:focus {
  outline: none;
  border-color: #ff4d00;
}

/* 条件选项 */
.condition-options, .trade-options {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.condition-option, .trade-option {
  padding: 8px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
}

.condition-option:hover, .trade-option:hover {
  border-color: #ff4d00;
  color: #ff4d00;
}

.condition-option.active, .trade-option.active {
  border-color: #ff4d00;
  background-color: #ff4d00;
  color: #fff;
}
</style>