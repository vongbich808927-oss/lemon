import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';

const { verbose } = sqlite3;
const db = new (verbose().Database)('xianyu.db');

// 生成虚拟商品数据
function generateProducts(count = 1000) {
    const locations = ["北京", "上海", "广州", "深圳", "杭州", "成都", "武汉", "南京", "西安", "重庆", "天津", "苏州", "长沙", "郑州", "青岛", "大连", "厦门", "福州", "济南", "合肥"];
    const sellers = ["数码达人", "时尚潮人", "生活好物", "精品小店", "正品专营", "二手好货", "闲置清理", "品质保证", "诚信卖家", "好物推荐", "精选好店", "实惠优选", "品牌直营", "个人闲置", "全新转卖", "搬家清仓", "换新出售", "闲置转让", "正品保证", "品质卖家"];
    const conditions = ["全新", "99新", "9成新", "8成新", "7成新"];
    const images = [
        "https://img.alicdn.com/imgextra/i1/O1CN01GXrI1R25menQwvGkD_!!6000000007569-2-tps-480-480.png",
        "https://img.alicdn.com/imgextra/i2/O1CN01aeRKAA1W6yC0Rijbv_!!6000000002740-2-tps-480-480.png",
        "https://img.alicdn.com/imgextra/i3/O1CN01ZpVFTV1bvsIHUCUZ3_!!6000000003528-2-tps-480-480.png",
        "https://img.alicdn.com/imgextra/i1/O1CN01qyf4561Kudl4pQPuB_!!6000000001224-2-tps-480-480.png",
        "https://img.alicdn.com/imgextra/i4/O1CN01TPHySh29g1WPi5DzR_!!6000000008096-2-tps-480-480.png",
        "https://img.alicdn.com/imgextra/i3/O1CN01ryLwQN1Pvcgh890IY_!!6000000001903-2-tps-480-480.png",
        "https://img.alicdn.com/imgextra/i1/O1CN01BHUykB1SV0WE5Pora_!!6000000002251-2-tps-480-480.png",
        "https://img.alicdn.com/imgextra/i4/O1CN01IWe4SW1zz7svQaW9d_!!6000000006784-2-tps-480-480.png",
        "https://img.alicdn.com/imgextra/i4/O1CN01OWZqw01QI45uxesce_!!6000000001952-2-tps-480-480.png",
        "https://img.alicdn.com/imgextra/i1/O1CN01AmNgvo1XBq1Jl1c5U_!!6000000002886-2-tps-480-480.png"
    ];
    
    const productTemplates = [
        {prefix: "iPhone", suffix: "Pro Max", priceRange: [5000, 8000], category: "手机/数码/电脑"},
        {prefix: "华为", suffix: "Pro", priceRange: [3000, 5000], category: "手机/数码/电脑"},
        {prefix: "小米", suffix: "Ultra", priceRange: [2000, 4000], category: "手机/数码/电脑"},
        {prefix: "MacBook", suffix: "Pro", priceRange: [8000, 15000], category: "手机/数码/电脑"},
        {prefix: "iPad", suffix: "Air", priceRange: [3000, 5000], category: "手机/数码/电脑"},
        {prefix: "AirPods", suffix: "Pro", priceRange: [1000, 2000], category: "手机/数码/电脑"},
        {prefix: "索尼", suffix: "降噪耳机", priceRange: [1500, 3000], category: "手机/数码/电脑"},
        {prefix: "Nike", suffix: "运动鞋", priceRange: [300, 800], category: "服饰/箱包/运动"},
        {prefix: "Adidas", suffix: "跑鞋", priceRange: [300, 700], category: "服饰/箱包/运动"},
        {prefix: "Zara", suffix: "大衣", priceRange: [200, 500], category: "服饰/箱包/运动"},
        {prefix: "Coach", suffix: "单肩包", priceRange: [800, 2000], category: "服饰/箱包/运动"},
        {prefix: "雅诗兰黛", suffix: "精华液", priceRange: [300, 600], category: "母婴/美妆/个护"},
        {prefix: "SK-II", suffix: "神仙水", priceRange: [600, 1200], category: "母婴/美妆/个护"},
        {prefix: "Dior", suffix: "口红", priceRange: [150, 300], category: "母婴/美妆/个护"},
        {prefix: "乐高", suffix: "积木", priceRange: [200, 500], category: "技能/卡券/潮玩"},
        {prefix: "任天堂", suffix: "Switch", priceRange: [1500, 2500], category: "技能/卡券/潮玩"},
        {prefix: "索尼", suffix: "PS5", priceRange: [3000, 4000], category: "技能/卡券/潮玩"},
        {prefix: "戴森", suffix: "吸尘器", priceRange: [2000, 4000], category: "家具/家电/家装"},
        {prefix: "小米", suffix: "扫地机器人", priceRange: [500, 1500], category: "家具/家电/家装"},
        {prefix: "宜家", suffix: "书桌", priceRange: [100, 400], category: "家具/家电/家装"}
    ];
    
    const products = [];
    for (let i = 1; i <= count; i++) {
        const template = productTemplates[Math.floor(Math.random() * productTemplates.length)];
        const condition = conditions[Math.floor(Math.random() * conditions.length)];
        const location = locations[Math.floor(Math.random() * locations.length)];
        const price = Math.floor(Math.random() * (template.priceRange[1] - template.priceRange[0]) + template.priceRange[0]);
        const likes = Math.floor(Math.random() * 500) + 10;
        const image = images[Math.floor(Math.random() * images.length)];
        const storage = ["128G", "256G", "512G", "1TB"][Math.floor(Math.random() * 4)];
        const color = ["黑色", "白色", "蓝色", "红色", "灰色", "金色"][Math.floor(Math.random() * 6)];
        
        let title = `${template.prefix} ${template.suffix}`;
        if (template.prefix.includes("iPhone") || template.prefix.includes("华为") || template.prefix.includes("小米")) {
            title = `${template.prefix} ${template.suffix} ${storage} ${color} ${condition} 全套配件`;
        } else if (template.prefix.includes("MacBook") || template.prefix.includes("iPad")) {
            title = `${template.prefix} ${template.suffix} ${storage} ${color} ${condition}`;
        } else {
            title = `${template.prefix} ${template.suffix} ${color} ${condition} 正品`;
        }
        
        const description = `${title}，${condition}，功能完好，支持验货，欢迎咨询。`;
        
        products.push({
            title: title,
            description: description,
            price: price,
            images: JSON.stringify([image]),
            category: template.category,
            condition: condition,
            location: location,
            likes: likes,
            views: Math.floor(Math.random() * 1000) + 50
        });
    }
    return products;
}

// 初始化数据库
db.serialize(() => {
    console.log('开始初始化数据库...');
    
    // 检查是否已有商品数据
    db.get('SELECT COUNT(*) as count FROM products', (err, row) => {
        if (err) {
            console.error('检查商品数据失败:', err);
            db.close();
            return;
        }
        
        if (row.count > 0) {
            console.log(`数据库中已有 ${row.count} 个商品，跳过初始化`);
            db.close();
            return;
        }
        
        // 创建默认卖家用户（如果不存在）
        bcrypt.hash('admin123', 10).then(hashedPassword => {
            db.run(`INSERT OR IGNORE INTO users (id, username, password, email) VALUES (1, 'admin', ?, 'admin@xianyu.com')`, [hashedPassword], function(err) {
                if (err) {
                    console.error('创建默认用户失败:', err);
                    insertProducts(); // 即使失败也继续插入商品
                } else {
                    if (this.changes > 0) {
                        console.log('默认用户创建成功 (用户名: admin, 密码: admin123)');
                    } else {
                        console.log('默认用户已存在');
                    }
                }
                
                // 生成并插入商品数据
                insertProducts();
            });
        }).catch(err => {
            console.error('加密密码失败:', err);
            insertProducts(); // 即使失败也继续插入商品
        });
        
        // 插入商品数据的函数
        function insertProducts() {
            const products = generateProducts(1000);
            console.log(`准备插入 ${products.length} 个商品...`);
            
            const stmt = db.prepare(`INSERT INTO products (title, description, price, images, category, condition, seller_id, location, likes, views) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
            
            let inserted = 0;
            products.forEach((product, index) => {
                stmt.run([
                    product.title,
                    product.description,
                    product.price,
                    product.images,
                    product.category,
                    product.condition,
                    1, // 默认卖家ID
                    product.location,
                    product.likes,
                    product.views
                ], (err) => {
                    if (err) {
                        console.error(`插入商品 ${index + 1} 失败:`, err);
                    } else {
                        inserted++;
                        if (inserted % 100 === 0) {
                            console.log(`已插入 ${inserted} 个商品...`);
                        }
                    }
                    
                    if (inserted === products.length) {
                        stmt.finalize();
                        console.log(`成功插入 ${inserted} 个商品到数据库！`);
                        db.close();
                    }
                });
            });
        }
    });
});

