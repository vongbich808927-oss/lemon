<template>
  <div class="page">

    <!-- 顶部黄色导航栏 -->
    <div class="top-bar">
      <div class="top-bar-content">
        <!-- 左侧Logo -->
        <div class="logo">
          <img src="https://img.alicdn.com/imgextra/i1/O1CN012ysCmB1LTuMTCwXre_!!6000000001301-2-tps-480-144.png_360x10000.jpg_.webp" alt="闲鱼" class="logo-img">
        </div>

        <!-- 中间搜索区域 -->
        <div class="search-section">
          <div class="search-bar">
            <input type="text" v-model="searchQuery" placeholder="搜索你想要的宝贝">
            <button class="search-btn" @click="doSearch">搜索</button>
          </div>
          <div class="search-keywords">
            <span class="keyword" @click="doSearch('BJD娃娃')">BJD娃娃</span>
            <span class="keyword" @click="doSearch('Switch游戏')">Switch游戏</span>
            <span class="keyword" @click="doSearch('相机')">相机</span>
          </div>
        </div>

        <!-- 右侧用户操作区 -->
        <div class="top-actions">
          <!-- 用户头像和下拉菜单 -->
          <div class="user-dropdown" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
            <img src="https://img.alicdn.com/bao/uploaded/i2/O1CN01MAVy7P1rpUlYTAthm_!!4611686018427380096-0-mtopupload.jpg_110x10000Q90.jpg_.webp" alt="用户头像" class="avatar-img" @click="goToProfile">
            <div class="id" @click="goToProfile">lemon</div>
            
            <!-- 下拉菜单 -->
            <div class="dropdown-menu" v-show="showDropdown">
              <!-- 用户信息头部 -->
              <div class="dropdown-header">
                <img src="https://img.alicdn.com/bao/uploaded/i2/O1CN01MAVy7P1rpUlYTAthm_!!4611686018427380096-0-mtopupload.jpg_110x10000Q90.jpg_.webp" alt="用户头像" class="dropdown-avatar">
                <div class="user-info">
                  <div class="username">lemon</div>
                  <div class="stats">0粉丝 | 0关注</div>
                </div>
              </div>
              
              <!-- 菜单选项 -->
              <div class="dropdown-option" @click="goToBought">
                <span class="option-text">我买到的</span>
                <span class="option-count">0</span>
                <span class="option-arrow">></span>
              </div>
              <div class="dropdown-option" @click="goToSold">
                <span class="option-text">我卖出的</span>
                <span class="option-count">0</span>
                <span class="option-arrow">></span>
              </div>
              <div class="dropdown-option" @click="goToFavorites">
                <span class="option-text">我的收藏</span>
                <span class="option-count">1</span>
                <span class="option-arrow">></span>
              </div>
              
              <!-- 分割线 -->
              <div class="dropdown-divider"></div>
              
              <!-- 底部选项 -->
              <div class="dropdown-option logout">退出登录</div>
              <div class="dropdown-option save-login">
                <span class="option-text">保存登录信息</span>
                <span class="toggle-switch">
                  <span class="toggle-slider"></span>
                </span>
              </div>
            </div>
          </div>
          
          <!-- 订单按钮 -->
          <div class="order-btn" @click="goToOrder">
            <img src="https://img.alicdn.com/imgextra/i3/O1CN01XkRvjL1lX9Xy5RgUj_!!6000000004690-2-tps-24-24.png" alt="订单" class="order-icon">
            <span>订单</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="main-container">
      <div class="main-content">
        <!-- 左侧垂直分类列表 -->
        <div class="left-sidebar">
          <div class="category-item" @click="goToCategory('electronics')">
            <img src="https://img.alicdn.com/imgextra/i1/O1CN01GXrI1R25menQwvGkD_!!6000000007569-2-tps-60-60.png" alt="手机数码" class="category-icon">
            <span>手机/数码/电脑</span>
            <!-- 二级分类菜单 -->
            <div class="sub-category">
              <div class="sub-category-item">手机</div>
              <div class="sub-category-item">手机配件</div>
              <div class="sub-category-item">数码配件</div>
              <div class="sub-category-item">电脑</div>
              <div class="sub-category-item">笔记本</div>
              <div class="sub-category-item">平板电脑</div>
              <div class="sub-category-item">相机</div>
              <div class="sub-category-item">智能穿戴</div>
            </div>
          </div>
          <div class="category-item" @click="goToCategory('fashion')">
            <img src="https://img.alicdn.com/imgextra/i3/O1CN01ryLwQN1Pvcgh890IY_!!6000000001903-2-tps-60-60.png" alt="服饰箱包" class="category-icon">
            <span>服饰/箱包/运动</span>
            <!-- 二级分类菜单 -->
            <div class="sub-category">
              <div class="sub-category-item">女装</div>
              <div class="sub-category-item">男装</div>
              <div class="sub-category-item">童装</div>
              <div class="sub-category-item">鞋靴</div>
              <div class="sub-category-item">箱包</div>
              <div class="sub-category-item">运动服饰</div>
              <div class="sub-category-item">运动装备</div>
              <div class="sub-category-item">户外用品</div>
            </div>
          </div>
          <div class="category-item" @click="goToCategory('services')">
            <img src="https://img.alicdn.com/imgextra/i4/O1CN01mkKCcJ1R6RexwWk9z_!!6000000002062-2-tps-60-60.png" alt="技能卡券" class="category-icon">
            <span>技能/卡券/潮玩</span>
            <!-- 二级分类菜单 -->
            <div class="sub-category">
              <div class="sub-category-item">技能服务</div>
              <div class="sub-category-item">教育培训</div>
              <div class="sub-category-item">优惠券</div>
              <div class="sub-category-item">礼品卡</div>
              <div class="sub-category-item">潮玩手办</div>
              <div class="sub-category-item">盲盒</div>
              <div class="sub-category-item">模型玩具</div>
              <div class="sub-category-item">收藏品</div>
            </div>
          </div>
          <div class="category-item" @click="goToCategory('maternal')">
            <img src="https://img.alicdn.com/imgextra/i1/O1CN01AmNgvo1XBq1Jl1c5U_!!6000000002886-2-tps-60-60.png" alt="母婴美妆" class="category-icon">
            <span>母婴/美妆/个护</span>
            <!-- 二级分类菜单 -->
            <div class="sub-category">
              <div class="sub-category-item">奶粉辅食</div>
              <div class="sub-category-item">婴儿用品</div>
              <div class="sub-category-item">玩具</div>
              <div class="sub-category-item">童装童鞋</div>
              <div class="sub-category-item">美妆护肤</div>
              <div class="sub-category-item">彩妆</div>
              <div class="sub-category-item">个人护理</div>
              <div class="sub-category-item">香水</div>
            </div>
          </div>
          <div class="category-item" @click="goToCategory('home')">
            <img src="https://img.alicdn.com/imgextra/i1/O1CN01BHUykB1SV0WE5Pora_!!6000000002251-2-tps-60-60.png" alt="家具家电" class="category-icon">
            <span>家具/家电/家装</span>
            <!-- 二级分类菜单 -->
            <div class="sub-category">
              <div class="sub-category-item">家具</div>
              <div class="sub-category-item">家电</div>
              <div class="sub-category-item">厨房电器</div>
              <div class="sub-category-item">生活电器</div>
              <div class="sub-category-item">家装材料</div>
              <div class="sub-category-item">装修服务</div>
              <div class="sub-category-item">灯具</div>
              <div class="sub-category-item">家纺</div>
            </div>
          </div>
          <div class="category-item" @click="goToCategory('jewelry')">
            <img src="https://img.alicdn.com/imgextra/i3/O1CN01y2MQp21VslutM5GBM_!!6000000002709-2-tps-60-60.png" alt="文玩珠宝" class="category-icon">
            <span>文玩/珠宝/礼品</span>
            <!-- 二级分类菜单 -->
            <div class="sub-category">
              <div class="sub-category-item">文玩</div>
              <div class="sub-category-item">古玩</div>
              <div class="sub-category-item">珠宝</div>
              <div class="sub-category-item">首饰</div>
              <div class="sub-category-item">手表</div>
              <div class="sub-category-item">礼品</div>
              <div class="sub-category-item">定制礼品</div>
              <div class="sub-category-item">收藏品</div>
            </div>
          </div>
          <div class="category-item" @click="goToCategory('food')">
            <img src="https://img.alicdn.com/imgextra/i4/O1CN01OWZqw01QI45uxesce_!!6000000001952-2-tps-60-60.png" alt="食品宠物" class="category-icon">
            <span>食品/宠物/花卉</span>
            <!-- 二级分类菜单 -->
            <div class="sub-category">
              <div class="sub-category-item">零食</div>
              <div class="sub-category-item">饮料</div>
              <div class="sub-category-item">粮油</div>
              <div class="sub-category-item">宠物食品</div>
              <div class="sub-category-item">宠物用品</div>
              <div class="sub-category-item">花卉</div>
              <div class="sub-category-item">绿植</div>
              <div class="sub-category-item">园艺用品</div>
            </div>
          </div>
          <div class="category-item" @click="goToCategory('books')">
            <img src="https://img.alicdn.com/imgextra/i2/O1CN01e6yyBg1H6JO6piQrH_!!6000000000708-2-tps-60-60.png" alt="图书游戏" class="category-icon">
            <span>图书/游戏/音像</span>
            <!-- 二级分类菜单 -->
            <div class="sub-category">
              <div class="sub-category-item">图书</div>
              <div class="sub-category-item">小说</div>
              <div class="sub-category-item">教材</div>
              <div class="sub-category-item">游戏</div>
              <div class="sub-category-item">游戏机</div>
              <div class="sub-category-item">游戏配件</div>
              <div class="sub-category-item">音像制品</div>
              <div class="sub-category-item">CD/DVD</div>
            </div>
          </div>
          <div class="category-item" @click="goToCategory('automotive')">
            <img src="https://img.alicdn.com/imgextra/i4/O1CN01MJTzuz1KUXBQAcCLF_!!6000000001167-2-tps-60-60.png" alt="汽车" class="category-icon">
            <span>汽车/电动车/租房</span>
            <!-- 二级分类菜单 -->
            <div class="sub-category">
              <div class="sub-category-item">汽车用品</div>
              <div class="sub-category-item">汽车配件</div>
              <div class="sub-category-item">电动车</div>
              <div class="sub-category-item">自行车</div>
              <div class="sub-category-item">租房</div>
              <div class="sub-category-item">二手房</div>
              <div class="sub-category-item">商铺</div>
              <div class="sub-category-item">写字楼</div>
            </div>
          </div>
          <div class="category-item" @click="goToCategory('hardware')">
            <img src="https://img.alicdn.com/imgextra/i4/O1CN01mhFXdR1gWIFZfNG1q_!!6000000004149-2-tps-60-60.png" alt="五金设备" class="category-icon">
            <span>五金/设备/农牧</span>
            <!-- 二级分类菜单 -->
            <div class="sub-category">
              <div class="sub-category-item">五金工具</div>
              <div class="sub-category-item">电动工具</div>
              <div class="sub-category-item">机械设备</div>
              <div class="sub-category-item">工业设备</div>
              <div class="sub-category-item">农产品</div>
              <div class="sub-category-item">畜牧产品</div>
              <div class="sub-category-item">渔业产品</div>
              <div class="sub-category-item">林业产品</div>
            </div>
          </div>
        </div>

        <!-- 中间内容区 -->
        <div class="center-content">
          <!-- 橙色推广横幅 - 左侧 -->
          <div class="orange-banner">
            <img src="https://img.alicdn.com/imgextra/i4/O1CN01IWe4SW1zz7svQaW9d_!!6000000006784-2-tps-480-672.png_450x10000.jpg_.webp" alt="闲鱼抄底好物" class="banner-img">
          </div>

          <!-- 四个彩色板块 - 右侧 -->
          <div class="colorful-sections">
            <!-- 衣橱捡漏板块 -->
            <div class="section yellow">
              <div class="section-header">
                <div class="section-title">衣橱捡漏</div>
                <div class="section-subtitle">时光流逝折扣依旧</div>
                <img src="https://img.alicdn.com/imgextra/i2/O1CN01aeRKAA1W6yC0Rijbv_!!6000000002740-2-tps-480-480.png" alt="衣橱" class="section-icon">
              </div>
              <div class="section-products">
                <div class="product-card" :key="'yellow-1'" @click="goToProduct(1)">
                  <img src="https://img.alicdn.com/bao/uploaded/i4/O1CN01JSizVO1oHC5SVa2fc_!!53-fleamarket.heic_170x10000Q90.jpg_.webp" alt="商品" class="product-img">
                  <div class="product-price">¥99</div>
                </div>
                <div class="product-card" :key="'yellow-2'" @click="goToProduct(2)">
                  <img src="https://img.alicdn.com/bao/uploaded/i2/O1CN01HEiCDG2FBgwxmAYsM_!!0-fleamarket.jpg_170x10000Q90.jpg_.webp" alt="商品" class="product-img">
                  <div class="product-price">¥201</div>
                </div>
                <div class="product-card" :key="'yellow-3'" @click="goToProduct(3)">
                  <img src="https://img.alicdn.com/bao/uploaded/i3/O1CN016Tc3xL1h6viwbB7VU_!!0-fleamarket.jpg_170x10000Q90.jpg_.webp" alt="商品" class="product-img">
                  <div class="product-price">¥69</div>
                </div>
              </div>
            </div>

            <!-- 手机数码板块 -->
            <div class="section blue">
              <div class="section-header">
                <div class="section-title">手机数码</div>
                <div class="section-subtitle">热门，装备省心入</div>
                <img src="https://img.alicdn.com/imgextra/i1/O1CN01qyf4561Kudl4pQPuB_!!6000000001224-2-tps-480-480.png" alt="手机数码" class="section-icon">
              </div>
              <div class="section-products">
                <div class="product-card" :key="'blue-1'" @click="goToProduct(4)">
                  <img src="https://img.alicdn.com/bao/uploaded/i1/O1CN01Ppx0RS1F5HF5ahcLu_!!53-fleamarket.heic_170x10000Q90.jpg_.webp" alt="商品" class="product-img">
                  <div class="product-price">¥2380</div>
                </div>
                <div class="product-card" :key="'blue-2'" @click="goToProduct(5)">
                  <img src="https://img.alicdn.com/bao/uploaded/i4/O1CN01azWBAm22lnDiUfjQy_!!0-fleamarket.jpg_170x10000Q90.jpg_.webp" alt="商品" class="product-img">
                  <div class="product-price">¥99</div>
                </div>
                <div class="product-card" :key="'blue-3'" @click="goToProduct(6)">
                  <img src="https://img.alicdn.com/bao/uploaded/i4/O1CN01h7LpZG1KbP4FY27kY_!!0-fleamarket.jpg_170x10000Q90.jpg_.webp" alt="商品" class="product-img">
                  <div class="product-price">¥134</div>
                </div>
              </div>
            </div>

            <!-- 二次元板块 -->
            <div class="section green">
              <div class="section-header">
                <div class="section-title">二次元</div>
                <div class="section-subtitle">资深二次元通入</div>
                <img src="https://img.alicdn.com/imgextra/i3/O1CN01ZpVFTV1bvsIHUCUZ3_!!6000000003528-2-tps-480-480.png" alt="二次元" class="section-icon">
              </div>
              <div class="section-products">
                <div class="product-card" :key="'green-1'" @click="goToProduct(7)">
                  <img src="https://img.alicdn.com/bao/uploaded/i2/O1CN01dhZaEH1hRXjnM5gOe_!!0-fleamarket.jpg_170x10000Q90.jpg_.webp" alt="商品" class="product-img">
                  <div class="product-price">¥2400</div>
                </div>
                <div class="product-card" :key="'green-2'" @click="goToProduct(8)">
                  <img src="https://img.alicdn.com/bao/uploaded/i2/O1CN019CYMMv2Lu0oijVP20_!!0-fleamarket.jpg_170x10000Q90.jpg_.webp" alt="商品" class="product-img">
                  <div class="product-price">¥60</div>
                </div>
                <div class="product-card" :key="'green-3'" @click="goToProduct(9)">
                  <img src="https://img.alicdn.com/bao/uploaded/i3/O1CN01ePmiXG22ang6gaeEU_!!0-fleamarket.jpg_170x10000Q90.jpg_.webp" alt="商品" class="product-img">
                  <div class="product-price">¥29</div>
                </div>
              </div>
            </div>

            <!-- 省钱卡券板块 -->
            <div class="section pink">
              <div class="section-header">
                <div class="section-title">省钱卡券</div>
                <div class="section-subtitle">吃喝玩乐放心购</div>
                <img src="https://img.alicdn.com/imgextra/i4/O1CN01TPHySh29g1WPi5DzR_!!6000000008096-2-tps-480-480.png" alt="省钱卡券" class="section-icon">
              </div>
              <div class="section-products">
                <div class="product-card" :key="'pink-1'" @click="goToProduct(10)">
                  <img src="https://img.alicdn.com/bao/uploaded/i2/O1CN01sN06jU24bNHWKzV1d_!!53-fleamarket.heic_170x10000Q90.jpg_.webp" alt="商品" class="product-img">
                  <div class="product-price">¥3</div>
                </div>
                <div class="product-card" :key="'pink-2'" @click="goToProduct(11)">
                  <img src="https://img.alicdn.com/bao/uploaded/i4/O1CN01WefVZk1SXkzMRjIC7_!!4611686018427387505-53-fleamarket.heic_170x10000Q90.jpg_.webp" alt="商品" class="product-img">
                  <div class="product-price">¥799</div>
                </div>
                <div class="product-card" :key="'pink-3'" @click="goToProduct(12)">
                  <img src="https://img.alicdn.com/bao/uploaded/i3/O1CN01J0gCtc1YUuBrcvmYj_!!4611686018427387879-53-fleamarket.heic_170x10000Q90.jpg_.webp" alt="商品" class="product-img">
                  <div class="product-price">¥6</div>
                </div>
              </div>
            </div>
          </div>
        </div>



      </div>
    </div>
    
    <!-- 猜你喜欢标签栏 -->
    <div class="bottom-tabs">
      <div class="tab-item active">猜你喜欢</div>
      <div class="tab-item">个人闲置</div>
      <div class="tab-item">BJD娃娃</div>
      <div class="tab-item">垂钓</div>
      <div class="tab-item">吉他乐器</div>
      <div class="tab-item">台球</div>
      <div class="tab-item">摄影摄像</div>
      <div class="tab-item">钱币收藏</div>
      <div class="tab-item">女装穿搭</div>
      <div class="tab-item">居家好物</div>
      <div class="tab-item">大牌美妆</div>
      <div class="tab-item">机车</div>
    </div>
    
    <!-- 商品展示区域 -->
    <div class="products-container">
      <div class="product-item" @click="goToProduct(25)">
        <img src="https://img.alicdn.com/bao/uploaded/i4/O1CN01kjHx6G1JjMTzGUiff_!!4611686018427384360-0-fleamarket.jpg_790x10000Q90.jpg_.webp" alt="商品1" class="product-item-img">
        <div class="product-item-desc">全新商品，质量保证，欢迎咨询</div>
        <div class="product-item-price">¥199</div>
      </div>
      <div class="product-item" @click="goToProduct(26)">
        <img src="https://img.alicdn.com/bao/uploaded/i3/O1CN01QfMDaJ2FJwEUkcfMr_!!4611686018427384732-53-fleamarket.heic_450x10000Q90.jpg_.webp" alt="商品2" class="product-item-img">
        <div class="product-item-desc">几乎全新，闲置转让，价格优惠</div>
        <div class="product-item-price">¥299</div>
      </div>
      <div class="product-item" @click="goToProduct(27)">
        <img src="https://img.alicdn.com/bao/uploaded/i2/O1CN01UWToX52DuSWQ4iXxp_!!4611686018427387501-53-fleamarket.heic_450x10000Q90.jpg_.webp" alt="商品3" class="product-item-img">
        <div class="product-item-desc">正品保证，假一赔十，支持验货</div>
        <div class="product-item-price">¥399</div>
      </div>
      <div class="product-item" @click="goToProduct(28)">
        <img src="https://img.alicdn.com/bao/uploaded/i3/O1CN01kfNv6Z1nL1wSc1Esq_!!4611686018427384704-0-fleamarket.jpg_450x10000Q90.jpg_.webp" alt="商品4" class="product-item-img">
        <div class="product-item-desc">包邮商品，偏远地区除外，下单即发</div>
        <div class="product-item-price">¥499</div>
      </div>
      <div class="product-item" @click="goToProduct(29)">
        <img src="https://img.alicdn.com/bao/uploaded/i3/O1CN01ZmlvYD1fWSm4UR7OW_!!53-fleamarket.heic_450x10000Q90.jpg_.webp" alt="商品5" class="product-item-img">
        <div class="product-item-desc">二手商品，功能正常，成色如图</div>
        <div class="product-item-price">¥599</div>
      </div>
      <div class="product-item" @click="goToProduct(30)">
        <img src="https://img.alicdn.com/bao/uploaded/i3/O1CN01rkXZd81D1xHGcDftd_!!4611686018427386925-0-fleamarket.jpg_450x10000Q90.jpg_.webp" alt="商品6" class="product-item-img">
        <div class="product-item-desc">闲置物品，低价转让，先到先得</div>
        <div class="product-item-price">¥699</div>
      </div>
      <div class="product-item" @click="goToProduct(31)">
        <img src="https://img.alicdn.com/bao/uploaded/i2/2216480708602/O1CN01cCzkSc2DPm2YHVVyq-2216480708602.jpg_450x10000Q90.jpg_.webp" alt="商品7" class="product-item-img">
        <div class="product-item-desc">全新未拆封，正品保障，支持退换</div>
        <div class="product-item-price">¥799</div>
      </div>
      <div class="product-item" @click="goToProduct(32)">
        <img src="https://img.alicdn.com/bao/uploaded/i2/O1CN013tk0S11qgxhAVVzKr_!!4611686018427383206-0-fleamarket.jpg_450x10000Q90.jpg_.webp" alt="商品8" class="product-item-img">
        <div class="product-item-desc">九成新，保养良好，使用正常</div>
        <div class="product-item-price">¥899</div>
      </div>
      <div class="product-item" @click="goToProduct(33)">
        <img src="https://img.alicdn.com/bao/uploaded/i1/O1CN01aIDS3U1nhvfemlC3a_!!4611686018427386754-0-fleamarket.jpg_450x10000Q90.jpg_.webp" alt="商品9" class="product-item-img">
        <div class="product-item-desc">包邮到家，破损包赔，放心购买</div>
        <div class="product-item-price">¥999</div>
      </div>
      <div class="product-item" @click="goToProduct(34)">
        <img src="https://img.alicdn.com/bao/uploaded/i2/O1CN01gPek9N1GNQh31dfO1_!!4611686018427384546-53-fleamarket.heic_450x10000Q90.jpg_.webp" alt="商品10" class="product-item-img">
        <div class="product-item-desc">闲置转让，价格可议，支持同城自提</div>
        <div class="product-item-price">¥1099</div>
      </div>
      <div class="product-item" @click="goToProduct(35)">
        <img src="https://img.alicdn.com/bao/uploaded/i3/1646494902/O1CN01b8epsl1m5Acv5Dboa_!!4611686018427380918-53-xy_item.heic_450x10000Q90.jpg_.webp" alt="商品11" class="product-item-img">
        <div class="product-item-desc">全新商品，假一赔十，支持验货</div>
        <div class="product-item-price">¥1199</div>
      </div>
      <div class="product-item" @click="goToProduct(36)">
        <img src="https://img.alicdn.com/bao/uploaded/i1/678375190/TB2f1mhmXXXXXXZXpXXXXXXXXXX_!!678375190.jpg_450x10000Q90.jpg_.webp" alt="商品12" class="product-item-img">
        <div class="product-item-desc">闲置物品，低价处理，先到先得</div>
        <div class="product-item-price">¥1299</div>
      </div>
    </div>
    
    <!-- 右侧悬浮框 -->
    <div class="right-sidebar">
      <div class="sidebar-item">
        <img src="https://img.alicdn.com/imgextra/i3/O1CN01JlKely1DoV96p6S9n_!!6000000000263-2-tps-78-78.png" alt="发闲置" class="sidebar-icon">
        <span>发闲置</span>
      </div>
      <div class="sidebar-item">
        <img src="https://img.alicdn.com/imgextra/i4/O1CN01JJnKxp1CcIyywMSW6_!!6000000000101-2-tps-78-78.png" alt="消息" class="sidebar-icon">
        <span>消息</span>
      </div>
      <div class="sidebar-item">
        <img src="https://img.alicdn.com/imgextra/i1/O1CN01ui9GuM1tmPC9pBhjM_!!6000000005944-2-tps-78-78.png" alt="APP" class="sidebar-icon">
        <span>APP</span>
      </div>
      <div class="sidebar-item">
        <img src="https://img.alicdn.com/imgextra/i2/O1CN01rE5XoL1Gai4A7w4ZZ_!!6000000000639-2-tps-78-78.png" alt="反馈" class="sidebar-icon">
        <span>反馈</span>
      </div>
      <div class="sidebar-item">
        <img src="https://img.alicdn.com/imgextra/i4/O1CN01V410MT1gN8R2ISbMg_!!6000000004129-2-tps-78-78.png" alt="客服" class="sidebar-icon">
        <span>客服</span>
      </div>
      <div class="sidebar-item back-to-top" id="backToTop">
        <img src="https://img.alicdn.com/imgextra/i4/O1CN01hVkXVQ1U4YszjRcxC_!!6000000002464-2-tps-78-78.png" alt="回顶部" class="sidebar-icon">
        <span>回顶部</span>
      </div>
    </div>
  </div>
</template>

<script setup>
// 页面结构已经完全按照截图实现
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const router = useRouter();

// 下拉菜单显示状态
const showDropdown = ref(false);

// 搜索功能
const searchQuery = ref('');

// 执行搜索
const doSearch = (query) => {
  const searchText = query || searchQuery.value;
  if (searchText.trim()) {
    router.push({ name: 'search', query: { q: searchText.trim() } });
  }
};

// 跳转到个人页面（新窗口）
const goToProfile = () => {
  window.open('/user/profile', '_blank');
};

// 跳转到订单页面（新窗口）
const goToOrder = () => {
  window.open('/user/orders', '_blank');
};

// 跳转到我买到的页面（新窗口）
const goToBought = () => {
  window.open('/user/bought', '_blank');
};

// 跳转到我卖出的页面（新窗口）
const goToSold = () => {
  window.open('/user/sold', '_blank');
};

// 跳转到我的收藏页面（新窗口）
const goToFavorites = () => {
  window.open('/user/favorites', '_blank');
};

// 跳转到分类搜索页面
const goToCategory = (category) => {
  router.push({ name: 'search', query: { category } });
};

// 跳转到商品详情页面
const goToProduct = (productId) => {
  router.push(`/product/${productId}`);
};

// 回到顶部按钮功能
onMounted(() => {
  const backToTopBtn = document.getElementById('backToTop');
  
  if (backToTopBtn) {
    // 滚动事件监听
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'flex';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });

    // 点击回到顶部
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
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
  padding: 10px 0;
  width: 100%;
  position: relative;
}

.top-bar-content {
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 0 20px;
  gap: 30px;
  width: 100%;
  max-width: 1400px;
}

.logo-img {
  width: 180px;
  height: 60px;
  object-fit: contain;
}

.search-section {
  flex: 1;
  margin: 0 10px;
  max-width: none;
}

.search-bar {
  position: relative;
  width: 100%;
}

.search-bar input {
  width: 100%;
  border: 2px solid #000;
  outline: none;
  padding: 10px 120px 10px 20px;
  font-size: 16px;
  background: #fff;
  border-radius: 20px;
  height: 42px;
  box-sizing: border-box;
}

.search-btn {
  position: absolute;
  right: 5px;
  top: 5px;
  background: #ffe60f;
  border: none;
  color: #333;
  cursor: pointer;
  padding: 0 25px;
  border-radius: 18px;
  font-size: 16px;
  font-weight: bold;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0;
  box-sizing: border-box;
}

.search-keywords {
  display: flex;
  gap: 15px;
  margin-top: 8px;
  margin-left: 0;
  font-size: 12px;
  color: #000;
}

.keyword {
  font-size: 12px;
  color: #666;
  cursor: pointer;
}

.keyword:hover {
  color: #ff4d00;
}

.top-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #333;
  font-size: 14px;
}

/* 用户下拉菜单 */
.user-dropdown {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  position: relative;
}

/* 下拉菜单样式 */
.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 10px;
  width: 280px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,.15);
  z-index: 1000;
  overflow: hidden;
}

/* 下拉菜单头部 */
.dropdown-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f7f7f7;
  border-bottom: 1px solid #e5e5e5;
}

.dropdown-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info .username {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

.user-info .stats {
  font-size: 14px;
  color: #999;
}

/* 下拉菜单项 */
.dropdown-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 14px;
  color: #333;
}

.dropdown-option:hover {
  background-color: #f5f5f5;
}

.option-text {
  flex: 1;
}

.option-count {
  color: #999;
  margin-right: 8px;
}

.option-arrow {
  color: #999;
  font-size: 12px;
}

/* 分割线 */
.dropdown-divider {
  height: 1px;
  background-color: #e5e5e5;
  margin: 8px 0;
}

/* 退出登录选项 */
.dropdown-option.logout {
  color: #ff4d00;
  justify-content: flex-start;
}

/* 保存登录信息选项 */
.dropdown-option.save-login {
  justify-content: space-between;
}

/* 开关样式 */
.toggle-switch {
  position: relative;
  width: 40px;
  height: 20px;
  background-color: #ddd;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.toggle-slider {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background-color: #fff;
  border-radius: 50%;
  transition: transform 0.2s;
}

.id {
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.avatar-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}

.order-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  font-size: 16px;
}

.order-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

/* 主要内容容器 */
.main-container {
  background: #fff;
  border-radius: 12px;
  padding: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,.08);
  max-width: 90%; /* 恢复原来的宽度 */
  margin: 10px auto;
  overflow: hidden;
}

/* 主要内容区域 */
.main-content {
  display: flex;
  gap: 1px;
  width: 100%;
  height: 350px; /* 增高 */
}

/* 左侧垂直分类列表 */
.left-sidebar {
  background: #fff;
  border-radius: 8px;
  padding: 4px;
  width: 18%; /* 进一步减小宽度，减少中间空白 */
  box-shadow: 0 1px 2px rgba(0,0,0,.03);
  height: 100%; /* 高度覆盖整个界面 */
}

.category-item {
  display: flex;
  align-items: center;
  padding: 8px 5px; /* 增加垂直内边距，提高高度 */
  cursor: pointer;
  transition: none;
  font-size: 15px;
  line-height: 1.5; /* 加大行高 */
  letter-spacing: 0.8px; /* 加大字间距 */
  color: #333;
  border-bottom: none;
}

.category-item:hover {
  background-color: transparent;
  color: #333;
}

.category-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
  margin-right: 8px;
}

/* 二级分类菜单 */
.sub-category {
  position: absolute;
  left: 100%; /* 相对于父元素宽度定位，确保始终在左侧菜单右侧 */
  top: 0;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,.15);
  padding: 10px;
  min-width: 200px;
  max-height: 400px; /* 增加高度以显示更多内容 */
  overflow-y: auto;
  display: none;
  z-index: 10;
  transform: translateX(0); /* 确保位置稳定 */
}

.category-item {
  position: relative;
}

.category-item:hover .sub-category {
  display: block;
  top: 0; /* 确保始终显示在顶部位置 */
}

.sub-category-item {
  padding: 8px 12px;
  cursor: pointer;
  font-size: 12px;
  color: #333;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.sub-category-item:hover {
  background-color: #f5f5f5;
  color: #ff4d00;
}

/* 中间内容区 */
.center-content {
  flex: 1;
  display: grid;
  grid-template-columns: 22% 78%; /* 调整比例，减少左侧横幅宽度 */
  grid-template-rows: 1fr 1fr;
  gap: 1px;
  height: 100%;
}

/* 橙色推广横幅 */
.orange-banner {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,.08);
  height: 100%;
  width: 100%;
  grid-area: 1 / 1 / 3 / 2;
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 8px;
  background-color: #ff7300;
}

/* 四个彩色板块 */
.colorful-sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 2px;
  grid-area: 1 / 2 / 3 / 3;
}

.section {
  border-radius: 8px;
  padding: 4px 6px;
  box-shadow: 0 1px 2px rgba(0,0,0,.03);
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: none;
}

/* 板块定位 */
.top-right-top {
  grid-area: 1 / 2 / 2 / 3;
}

.top-right-bottom {
  grid-area: 2 / 1 / 3 / 2;
}

.bottom-left {
  grid-area: 2 / 2 / 3 / 3;
}

.bottom-right {
  grid-area: 2 / 3 / 3 / 4;
  display: flex;
}

.section:hover {
  transform: none;
  box-shadow: 0 1px 2px rgba(0,0,0,.03);
}

.section-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 8px;
  text-align: center;
  width: 30%;
}

.section-title {
  font-size: 14px;
  font-weight: 700;
  color: #333;
}

.section-subtitle {
  font-size: 10px;
  color: #666;
}

.section-icon {
  width: 80px;
  height: 80px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.section-icon:hover {
  transform: scale(1.2);
}

.section-products {
  display: flex;
  gap: 0px;
  width: 70%;
}

.product-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  transition: none;
}

.product-img {
  background: #f5f5f5;
  border-radius: 6px;
  height: 70px;
  border: 2px solid #333;
  object-fit: cover;
  width: 100%;
}

.product-price {
  font-size: 11px;
  font-weight: 700;
  color: #ff4d00;
  text-align: center;
}

/* 板块颜色 */
.section.yellow {
  background: linear-gradient(180deg, #fff6d1, #fff8e6);
  border: 2px solid #f3d94b;
}

.section.blue {
  background: linear-gradient(180deg, #e6f7ff, #f0f9ff);
  border: 2px solid #6ec7ff;
}

.section.green {
  background: linear-gradient(180deg, #eaffea, #f0fff0);
  border: 2px solid #88e49b;
}

.section.pink {
  background: linear-gradient(180deg, #ffe6f0, #fff0f5);
  border: 2px solid #f4a0c6;
}

/* 商品图片边框颜色与板块边框颜色一致 */
.section.yellow .product-img {
  border-color: #f3d94b;
}

.section.blue .product-img {
  border-color: #6ec7ff;
}

.section.green .product-img {
  border-color: #88e49b;
}

.section.pink .product-img {
  border-color: #f4a0c6;
}

/* 底部横向标签栏 */
.bottom-tabs {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background: #fff;
  padding: 8px 15px;
  margin: 8px auto;
  max-width: 90%; /* 与主容器对齐 */
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,.08);
  flex-wrap: nowrap;
}

/* 猜你喜欢标签图标 */
.tab-item.active {
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 15px;
}

.tab-item.active::before {
  content: '';
  width: 20px;
  height: 20px;
  background-image: url('https://img.alicdn.com/imgextra/i2/O1CN011DWpQw1yxvEUN8TAm_!!6000000006646-2-tps-60-60.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.tab-item {
  padding: 7px 13px;
  font-size: 13px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s;
  border-radius: 15px;
  background-color: #f5f5f5;
  flex: 1;
  text-align: center;
  min-width: max-content;
}

.tab-item:hover {
  background-color: #ffe60f;
}

.tab-item.active {
  color: #ff4d00;
  font-weight: bold;
  background-color: #fff;
}

.tab-item.active:hover {
  background-color: #ffe60f;
}

/* 商品展示区域 */
.products-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  padding: 10px 10px 20px;
  margin: 0 auto;
  max-width: 90%;
}

.product-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: transform 0.2s;
}

.product-item:hover {
  transform: translateY(-2px);
}

.product-item-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  background-color: #f5f5f5;
}

.product-item-desc {
  font-size: 14px;
  color: #333;
  line-height: 1.5;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-item-price {
  font-size: 16px;
  font-weight: bold;
  color: #ff4d00;
}

/* 右侧悬浮框 */
.right-sidebar {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: #fff;
  padding: 8px 4px;
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0,0,0,.03);
  width: 60px;
  z-index: 1000;
}

.sidebar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  padding: 6px 2px;
  border-radius: 6px;
  width: 100%;
  background-color: #fff;
}

.sidebar-item:hover {
  background-color: #ffe60f;
}

.sidebar-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.sidebar-item span {
  font-size: 12px;
  color: #333;
}

/* 回到顶部按钮默认隐藏 */
.back-to-top {
  display: none;
}
</style>
