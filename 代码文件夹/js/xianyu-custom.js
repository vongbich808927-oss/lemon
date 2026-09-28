// 闲鱼自定义JavaScript功能

document.addEventListener('DOMContentLoaded', function() {
    // 搜索功能
    const searchInput = document.querySelector('.search-input--m2Jk5n6P');
    const searchIcon = document.querySelector('.search-btn--n5J8k2lM');
    const searchTip = null; // 当前页面没有搜索提示
    const searchItems = []; // 当前页面没有搜索提示项
    
    // 搜索输入框事件
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            if (searchTip) {
                searchTip.style.display = 'block';
            }
        });
        
        searchInput.addEventListener('blur', function() {
            // 延迟隐藏搜索提示，以便点击搜索项
            setTimeout(() => {
                if (searchTip) {
                    searchTip.style.display = 'none';
                }
            }, 200);
        });
        
        searchInput.addEventListener('input', function() {
            // 这里可以添加搜索建议的逻辑
            console.log('搜索内容:', this.value);
        });
        
        // 回车键搜索
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
    
    // 搜索按钮点击事件
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            if (searchInput) {
                performSearch(searchInput.value);
            }
        });
    }
    
    // 搜索提示项点击事件
    searchItems.forEach(item => {
        item.addEventListener('click', function() {
            if (searchInput) {
                searchInput.value = this.textContent;
                performSearch(this.textContent);
            }
            if (searchTip) {
                searchTip.style.display = 'none';
            }
        });
    });
    
    // 执行搜索功能
    function performSearch(query) {
        if (query.trim() === '') {
            alert('请输入搜索内容');
            return;
        }
        
        // 这里可以添加实际的搜索逻辑
        console.log('执行搜索:', query);
        // 示例: window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
    
    // 用户菜单功能
    const userAvatar = document.querySelector('.user-avatar--j3K5n8lQ');
    
    if (userAvatar) {
        userAvatar.addEventListener('click', function(e) {
            e.preventDefault();
            // 这里可以添加用户菜单显示/隐藏逻辑
            console.log('用户菜单点击');
        });
    }
    
    // 导航链接点击事件
    const navLinks = document.querySelectorAll('.nav-item--d4K8m2nR');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 这里可以添加导航逻辑
            console.log('导航点击:', this.textContent);
        });
    });
    
    // 页面滚动效果
    let lastScrollTop = 0;
    const header = document.querySelector('.header-main--m2Jk5n6P');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (header) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // 向下滚动 - 隐藏头部
                header.style.transform = 'translateY(-100%)';
            } else {
                // 向上滚动 - 显示头部
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop;
    });
    
    // 添加页面加载动画
    document.body.classList.add('fade-in');
    
    // 响应式菜单切换（移动端）
    function createMobileMenu() {
        // 检查是否需要创建移动端菜单
        if (window.innerWidth <= 768) {
            // 这里可以添加移动端菜单逻辑
            console.log('移动端视图');
        }
    }
    
    // 初始化
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);
    
    // 轮播图功能
    const bannerSlider = document.querySelector('.banner-slider--h9K2m4nQ');
    const bannerItems = document.querySelectorAll('.banner-item--m2Jk5n6P');
    const bannerDots = document.querySelectorAll('.dot--d4K8m2nR');
    let currentSlide = 0;
    let slideInterval;
    
    // 初始化轮播图
    function initBannerSlider() {
        if (!bannerItems.length || !bannerDots.length) return;
        
        // 设置初始状态
        updateSlide(0);
        
        // 开始自动播放
        startAutoSlide();
        
        // 添加点击事件到指示点
        bannerDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });
        
        // 鼠标悬停时暂停自动播放
        if (bannerSlider) {
            bannerSlider.addEventListener('mouseenter', stopAutoSlide);
            bannerSlider.addEventListener('mouseleave', startAutoSlide);
        }
    }
    
    // 更新轮播图显示
    function updateSlide(index) {
        // 更新轮播项
        bannerItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        
        // 更新指示点
        bannerDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
    }
    
    // 切换到指定幻灯片
    function goToSlide(index) {
        updateSlide(index);
        resetAutoSlide();
    }
    
    // 下一张幻灯片
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % bannerItems.length;
        updateSlide(nextIndex);
    }
    
    // 开始自动播放
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000); // 每5秒切换一次
    }
    
    // 停止自动播放
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }
    
    // 重置自动播放
    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }
    
    // 初始化轮播图
    initBannerSlider();
    
    // 商品卡片悬停效果
    const productCards = document.querySelectorAll('.product-card--j3K5n8lQ');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
            // 添加悬停效果
            const productImage = this.querySelector('.product-image--h9K2m4nQ img');
            if (productImage) {
                productImage.style.transform = 'scale(1.05)';
                productImage.style.transition = 'transform 0.3s ease';
            }
            
            // 显示快速操作按钮
            const quickActions = this.querySelector('.quick-actions');
            if (quickActions) {
                quickActions.style.opacity = '1';
                quickActions.style.visibility = 'visible';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
            // 移除悬停效果
            const productImage = this.querySelector('.product-image--h9K2m4nQ img');
            if (productImage) {
                productImage.style.transform = 'scale(1)';
            }
            
            // 隐藏快速操作按钮
            const quickActions = this.querySelector('.quick-actions');
            if (quickActions) {
                quickActions.style.opacity = '0';
                quickActions.style.visibility = 'hidden';
            }
        });
        
        // 添加点击事件
        card.addEventListener('click', function(e) {
            // 如果点击的是快速操作按钮，不触发卡片点击事件
            if (e.target.closest('.quick-actions')) {
                return;
            }
            
            // 获取商品ID或链接
            const productId = this.dataset.productId;
            if (productId) {
                console.log('查看商品详情:', productId);
                // 实际应用中可以跳转到商品详情页
                // window.location.href = `/product/${productId}`;
            }
        });
        
        // 快速操作按钮事件
        const likeBtn = card.querySelector('.like-btn');
        const shareBtn = card.querySelector('.share-btn');
        
        if (likeBtn) {
            likeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const productId = card.dataset.productId;
                console.log('喜欢商品:', productId);
                
                // 切换喜欢状态
                this.classList.toggle('liked');
                
                // 更新喜欢数
                const likesElement = card.querySelector('.product-likes--d4K8m2nR');
                if (likesElement) {
                    const likesText = likesElement.textContent;
                    const currentLikes = parseInt(likesText.match(/\d+/)[0]);
                    const newLikes = this.classList.contains('liked') ? currentLikes + 1 : currentLikes - 1;
                    likesElement.textContent = `${newLikes}人想要`;
                }
                
                // 显示提示
                showToast(this.classList.contains('liked') ? '已添加到想要' : '已取消想要');
            });
        }
        
        if (shareBtn) {
            shareBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const productId = card.dataset.productId;
                console.log('分享商品:', productId);
                
                // 实际应用中可以调用分享API
                // shareProduct(productId);
                
                // 显示提示
                showToast('分享链接已复制');
            });
        }
    });
    
    // 显示提示消息
    function showToast(message) {
        // 创建提示元素
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 10px 20px;
            border-radius: 4px;
            z-index: 1000;
            font-size: 14px;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        // 3秒后移除提示
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 2000);
    }
    
    // 分类导航交互
    const categoryItems = document.querySelectorAll('.category-item--m2Jk5n6P');
    
    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('hover');
            // 显示子分类（如果有）
            const subCategories = this.querySelector('.sub-categories');
            if (subCategories) {
                subCategories.style.display = 'block';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
            // 隐藏子分类
            const subCategories = this.querySelector('.sub-categories');
            if (subCategories) {
                subCategories.style.display = 'none';
            }
        });
        
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const categoryName = this.querySelector('.category-name--d4K8m2nR').textContent;
            console.log('分类点击:', categoryName);
            // 实际应用中可以跳转到分类页面
            // window.location.href = `/category/${encodeURIComponent(categoryName)}`;
        });
    });
    
    // 搜索建议和自动完成功能
    const searchSuggestions = [
        '手机', '笔记本', '耳机', 'iPad', '相机', '手表', '游戏机', '相机镜头',
        '键盘', '显示器', '显卡', 'CPU', '主板', '内存', '硬盘', '音响',
        '平板', '智能手表', '运动手环', '耳机', '充电宝', '数据线', '手机壳'
    ];
    
    // 创建搜索建议下拉框
    function createSearchSuggestions() {
        if (!searchInput) return;
        
        // 创建建议下拉框
        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'search-suggestions';
        suggestionsContainer.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #eee;
            border-top: none;
            border-radius: 0 0 4px 4px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            max-height: 300px;
            overflow-y: auto;
            z-index: 100;
            display: none;
        `;
        
        // 将建议下拉框添加到搜索容器
        const searchContainer = document.querySelector('.search-container--mD4RMUzE');
        if (searchContainer) {
            searchContainer.style.position = 'relative';
            searchContainer.appendChild(suggestionsContainer);
        }
        
        // 监听输入事件
        searchInput.addEventListener('input', function() {
            const query = this.value.trim().toLowerCase();
            
            if (query.length === 0) {
                suggestionsContainer.style.display = 'none';
                return;
            }
            
            // 过滤建议
            const filteredSuggestions = searchSuggestions.filter(suggestion => 
                suggestion.toLowerCase().includes(query)
            );
            
            // 显示建议
            if (filteredSuggestions.length > 0) {
                suggestionsContainer.innerHTML = '';
                filteredSuggestions.forEach(suggestion => {
                    const suggestionItem = document.createElement('div');
                    suggestionItem.className = 'suggestion-item';
                    suggestionItem.textContent = suggestion;
                    suggestionItem.style.cssText = `
                        padding: 10px 15px;
                        cursor: pointer;
                        border-bottom: 1px solid #f0f0f0;
                    `;
                    
                    // 高亮匹配部分
                    const regex = new RegExp(`(${query})`, 'gi');
                    suggestionItem.innerHTML = suggestion.replace(regex, '<strong>$1</strong>');
                    
                    // 点击建议项
                    suggestionItem.addEventListener('click', function() {
                        searchInput.value = suggestion;
                        suggestionsContainer.style.display = 'none';
                        performSearch(suggestion);
                    });
                    
                    // 悬停效果
                    suggestionItem.addEventListener('mouseenter', function() {
                        this.style.backgroundColor = '#f5f5f5';
                    });
                    
                    suggestionItem.addEventListener('mouseleave', function() {
                        this.style.backgroundColor = 'white';
                    });
                    
                    suggestionsContainer.appendChild(suggestionItem);
                });
                
                suggestionsContainer.style.display = 'block';
            } else {
                suggestionsContainer.style.display = 'none';
            }
        });
        
        // 点击其他地方隐藏建议
        document.addEventListener('click', function(e) {
            if (!searchContainer.contains(e.target)) {
                suggestionsContainer.style.display = 'none';
            }
        });
    }
    
    // 初始化搜索建议
    createSearchSuggestions();
    
    // 图片懒加载
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // 回退方案：直接加载所有图片
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
    
    // 错误处理
    window.addEventListener('error', function(e) {
        console.error('页面错误:', e.error);
    });
    
    console.log('闲鱼页面初始化完成');
});