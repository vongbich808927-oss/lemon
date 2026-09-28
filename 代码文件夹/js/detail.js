// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化图片切换
    initImageSwitch();
    
    // 绑定事件
    bindEvents();
});

// 初始化图片切换
function initImageSwitch() {
    const mainImage = document.getElementById('main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // 移除所有缩略图的active类
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // 添加当前缩略图的active类
            this.classList.add('active');
            
            // 更新主图
            const newSrc = this.querySelector('img').getAttribute('data-src');
            mainImage.src = newSrc;
        });
    });
}

// 绑定事件
function bindEvents() {
    // 关注按钮
    const followBtn = document.querySelector('.follow-btn');
    let isFollowing = false;
    
    followBtn.addEventListener('click', function() {
        isFollowing = !isFollowing;
        
        if (isFollowing) {
            this.textContent = '已关注';
            this.style.backgroundColor = '#FFCE00';
            this.style.color = '#333';
        } else {
            this.textContent = '关注';
            this.style.backgroundColor = '#fff';
            this.style.color = '#FFCE00';
        }
    });
    
    // 收藏按钮
    const likeBtn = document.querySelector('.like-btn');
    let isLiked = false;
    
    likeBtn.addEventListener('click', function() {
        isLiked = !isLiked;
        
        const heartIcon = this.querySelector('i');
        
        if (isLiked) {
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
            heartIcon.style.color = '#ff5000';
        } else {
            heartIcon.classList.remove('fas');
            heartIcon.classList.add('far');
            heartIcon.style.color = '';
        }
    });
    
    // 联系卖家按钮和立即购买按钮的事件绑定已移到detail.html的script中
    
    // 分享按钮
    const shareBtn = document.querySelector('.nav-link .fa-share-alt').parentElement;
    shareBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 实际应用中这里应该调用系统分享API或显示分享弹窗
        if (navigator.share) {
            navigator.share({
                title: 'iPhone 12 Pro 128G 深空灰 国行 全新未拆封',
                text: '¥4999 - 闲鱼',
                url: window.location.href
            }).then(() => {
                console.log('分享成功');
            }).catch((error) => {
                console.log('分享失败', error);
            });
        } else {
            alert('当前浏览器不支持分享功能，请手动复制链接分享');
        }
    });
    
    // 更多操作按钮
    const moreBtn = document.querySelector('.nav-link .fa-ellipsis-v').parentElement;
    moreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 实际应用中这里应该显示更多操作菜单
        alert('更多操作：举报、不感兴趣等');
    });
}