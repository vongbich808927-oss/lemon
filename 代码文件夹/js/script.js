// 模拟商品数据 - 使用真实的商品图片
const products = [
    {
        id: 1,
        title: "iPhone 12 Pro 128G 深空灰 国行 全新未拆封",
        price: "¥4999",
        image: "https://img.alicdn.com/imgextra/i1/O1CN01GXrI1R25menQwvGkD_!!6000000007569-2-tps-480-480.png",
        seller: "数码达人",
        location: "上海",
        likes: 128
    },
    {
        id: 2,
        title: "戴森吸尘器V11 无线手持式 吸力强劲",
        price: "¥1899",
        image: "https://img.alicdn.com/imgextra/i1/O1CN01BHUykB1SV0WE5Pora_!!6000000002251-2-tps-480-480.png",
        seller: "家居小铺",
        location: "杭州",
        likes: 89
    },
    {
        id: 3,
        title: "小米空气净化器Pro H 除甲醛 除菌除病毒",
        price: "¥699",
        image: "https://img.alicdn.com/imgextra/i4/O1CN01IWe4SW1zz7svQaW9d_!!6000000006784-2-tps-480-480.png",
        seller: "科技生活",
        location: "北京",
        likes: 156
    },
    {
        id: 4,
        title: "索尼WH-1000XM4 无线降噪耳机 头戴式",
        price: "¥1299",
        image: "https://img.alicdn.com/imgextra/i2/O1CN01aeRKAA1W6yC0Rijbv_!!6000000002740-2-tps-480-480.png",
        seller: "音乐发烧友",
        location: "深圳",
        likes: 203
    },
    {
        id: 5,
        title: "MacBook Air M1芯片 8G+256G 银色 轻薄本",
        price: "¥5999",
        image: "https://img.alicdn.com/imgextra/i3/O1CN01ZpVFTV1bvsIHUCUZ3_!!6000000003528-2-tps-480-480.png",
        seller: "苹果粉丝",
        location: "广州",
        likes: 267
    },
    {
        id: 6,
        title: "任天堂Switch游戏机 国行 红蓝主机 + 游戏",
        price: "¥1599",
        image: "https://img.alicdn.com/imgextra/i1/O1CN01qyf4561Kudl4pQPuB_!!6000000001224-2-tps-480-480.png",
        seller: "游戏玩家",
        location: "成都",
        likes: 312
    },
    {
        id: 7,
        title: "雅诗兰黛小棕瓶精华液 50ml 抗老修护",
        price: "¥399",
        image: "https://img.alicdn.com/imgextra/i4/O1CN01TPHySh29g1WPi5DzR_!!6000000008096-2-tps-480-480.png",
        seller: "美妆小店",
        location: "南京",
        likes: 145
    },
    {
        id: 8,
        title: "乐高积木城市系列 警察局 60246 拼装玩具",
        price: "¥299",
        image: "https://img.alicdn.com/imgextra/i3/O1CN01ryLwQN1Pvcgh890IY_!!6000000001903-2-tps-480-480.png",
        seller: "玩具世界",
        location: "武汉",
        likes: 98
    },
    {
        id: 9,
        title: "华为Mate 40 Pro 5G 8+256G 亮黑色 99新",
        price: "¥3899",
        image: "https://img.alicdn.com/imgextra/i1/O1CN01GXrI1R25menQwvGkD_!!6000000007569-2-tps-480-480.png",
        seller: "手机专营",
        location: "深圳",
        likes: 234
    },
    {
        id: 10,
        title: "AirPods Pro 2代 主动降噪 无线蓝牙耳机",
        price: "¥1299",
        image: "https://img.alicdn.com/imgextra/i2/O1CN01aeRKAA1W6yC0Rijbv_!!6000000002740-2-tps-480-480.png",
        seller: "苹果授权",
        location: "北京",
        likes: 189
    },
    {
        id: 11,
        title: "iPad Pro 11寸 M2芯片 256G 深空灰",
        price: "¥5999",
        image: "https://img.alicdn.com/imgextra/i3/O1CN01ZpVFTV1bvsIHUCUZ3_!!6000000003528-2-tps-480-480.png",
        seller: "数码商城",
        location: "上海",
        likes: 312
    },
    {
        id: 12,
        title: "佳能EOS R6 Mark II 全画幅微单相机",
        price: "¥12999",
        image: "https://img.alicdn.com/imgextra/i1/O1CN01qyf4561Kudl4pQPuB_!!6000000001224-2-tps-480-480.png",
        seller: "摄影器材",
        location: "广州",
        likes: 456
    }
];

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 渲染商品列表
    renderProducts();
    
    // 初始化轮播图
    initBanner();
    
    // 绑定事件
    bindEvents();
});

// 渲染商品列表
function renderProducts() {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;
    
    products.forEach(product => {
        const productCard = document.createElement('a');
        productCard.href = `detail.html?id=${product.id}`;
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" onerror="this.src='https://img.alicdn.com/imgextra/i1/O1CN01GXrI1R25menQwvGkD_!!6000000007569-2-tps-480-480.png'">
            </div>
            <div class="product-info">
                <div class="product-price">${product.price}</div>
                <div class="product-title">${product.title}</div>
                <div class="product-meta">
                    <div class="seller-info">
                        <div class="seller-avatar"></div>
                        <span>${product.seller}</span>
                    </div>
                    <div class="product-likes">
                        <span style="color: #999; font-size: 12px;">♥</span> ${product.likes}
                    </div>
                </div>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
}

// 初始化轮播图
function initBanner() {
    const bannerItems = document.querySelectorAll('.banner-item');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    
    function showBanner(index) {
        bannerItems.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        bannerItems[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    // 自动轮播
    setInterval(() => {
        const nextIndex = (currentIndex + 1) % bannerItems.length;
        showBanner(nextIndex);
    }, 5000);
    
    // 点击指示器切换
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showBanner(index);
        });
    });
}

// 绑定事件
function bindEvents() {
    // 搜索功能
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    
    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            console.log('搜索:', searchTerm);
            // 实际应用中这里应该执行搜索逻辑
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.trim();
            if (searchTerm) {
                console.log('搜索:', searchTerm);
                // 实际应用中这里应该执行搜索逻辑
            }
        }
    });
    
    // 分类导航切换
    const categoryLinks = document.querySelectorAll('.category-list a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            categoryLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 底部导航切换
    const footerNavItems = document.querySelectorAll('.footer-nav-item');
    footerNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            footerNavItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 商品卡片点击
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            // 实际应用中这里应该跳转到商品详情页
            console.log('查看商品详情');
        });
    });
    
    // 点赞功能
    const likeButtons = document.querySelectorAll('.product-likes');
    likeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const heartIcon = this.querySelector('i');
            const likesCount = parseInt(this.textContent.trim().split(' ')[1]);
            
            if (heartIcon.classList.contains('far')) {
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas');
                this.innerHTML = `<i class="fas fa-heart"></i> ${likesCount + 1}`;
            } else {
                heartIcon.classList.remove('fas');
                heartIcon.classList.add('far');
                this.innerHTML = `<i class="far fa-heart"></i> ${likesCount - 1}`;
            }
        });
    });
}