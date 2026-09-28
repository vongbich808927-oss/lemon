require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Faker, zh_CN } = require('@faker-js/faker');
const faker = new Faker({ locale: [zh_CN] });
const { sequelize } = require('./db');
const { User, Category, Tag, Product, RecoBlock } = require('./models');

// 确保静态资源目录存在
const staticDir = path.join(__dirname, 'static');
const imgDir = path.join(staticDir, 'img');

if (!fs.existsSync(staticDir)) {
  fs.mkdirSync(staticDir, { recursive: true });
  console.log(`创建静态资源目录: ${staticDir}`);
}

if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
  console.log(`创建图片目录: ${imgDir}`);
}

// 用户提供的商品图片URL
const productImages = [
  // 衣橱捡漏
  'https://img.alicdn.com/bao/uploaded/i3/O1CN01vzjGey23jn752cGZz_!!0-fleamarket.jpg_170x10000Q90.jpg_.webp',
  'https://img.alicdn.com/bao/uploaded/i4/O1CN012cfRQh1pNR1TyzhcR_!!53-fleamarket.heic_170x10000Q90.jpg_.webp',
  'https://img.alicdn.com/bao/uploaded/i4/O1CN019mHxVR1t6GjdXvXTk_!!0-fleamarket.jpg_170x10000Q90.jpg_.webp',
  // 手机数码
  'https://img.alicdn.com/bao/uploaded/i3/O1CN01bvG4zX1QFmAfvgTQ5_!!4611686018427382171-0-fleamarket.jpg_170x10000Q90.jpg_.webp',
  'https://img.alicdn.com/bao/uploaded/i4/O1CN01HNGdFJ1ZcWIYBWGiE_!!0-fleamarket.jpg_170x10000Q90.jpg_.webp',
  'https://img.alicdn.com/bao/uploaded/i2/O1CN01sMDrFf2DC21tnirr8_!!0-fleamarket.jpg_170x10000Q90.jpg_.webp',
  // 二次元
  'https://img.alicdn.com/bao/uploaded/i2/O1CN01dhZaEH1hRXjnM5gOe_!!0-fleamarket.jpg_170x10000Q90.jpg_.webp',
  'https://img.alicdn.com/bao/uploaded/i4/85470570/O1CN01mECFX61G56cQWFFIB_!!85470570.jpg_170x10000Q90.jpg_.webp',
  'https://img.alicdn.com/bao/uploaded/i1/O1CN01dQsI4j1ILFvBqrM9t_!!0-fleamarket.jpg_170x10000Q90.jpg_.webp',
  // 省钱卡券
  'https://img.alicdn.com/bao/uploaded/i2/O1CN01sN06jU24bNHWKzV1d_!!53-fleamarket.heic_170x10000Q90.jpg_.webp',
  'https://img.alicdn.com/bao/uploaded/i4/O1CN01WefVZk1SXkzMRjIC7_!!4611686018427387505-53-fleamarket.heic_170x10000Q90.jpg_.webp',
  'https://img.alicdn.com/bao/uploaded/i2/O1CN01cNkXcv2NaRREmFCDk_!!4611686018427387467-0-fleamarket.jpg_170x10000Q90.jpg_.webp'
];

// 获取商品图片，确保每个商品有3张图片，且不同推荐区块使用不同的图片范围
const getProductImages = (index) => {
  // 为每个推荐区块的前3个商品分配唯一的图片
  // wardrobe (1-3): 图片0,1,2
  // digital (7-9): 图片3,4,5
  // anime (13-15): 图片6,7,8
  // savings (19-21): 图片9,10,11
  let imageIndex;
  if (index === 1) imageIndex = 0;
  else if (index === 2) imageIndex = 1;
  else if (index === 3) imageIndex = 2;
  else if (index === 7) imageIndex = 3;
  else if (index === 8) imageIndex = 4;
  else if (index === 9) imageIndex = 5;
  else if (index === 13) imageIndex = 6;
  else if (index === 14) imageIndex = 7;
  else if (index === 15) imageIndex = 8;
  else if (index === 19) imageIndex = 9;
  else if (index === 20) imageIndex = 10;
  else if (index === 21) imageIndex = 11;
  else {
    // 其他商品ID，使用随机图片
    imageIndex = Math.floor(Math.random() * productImages.length);
  }
  
  // 每个商品使用3张连续的图片
  return [
    productImages[imageIndex],
    productImages[(imageIndex + 1) % productImages.length],
    productImages[(imageIndex + 2) % productImages.length]
  ];
};

// 生成随机用户数据
const generateUsers = async (count = 30) => {
  console.log('生成用户数据...');
  const users = [];
  
  for (let i = 1; i <= count; i++) {
    users.push({
      username: `user${i}`,
      password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
      nickname: faker.person.fullName(),
      avatar: `https://i.pravatar.cc/150?u=${faker.string.uuid()}`,
    });
  }
  
  await User.bulkCreate(users);
  return users;
};

// 生成分类数据
const generateCategories = async () => {
  console.log('生成分类数据...');
  const categories = [
    { 
      name: '手机 / 数码 / 电脑', 
      icon: 'https://img.alicdn.com/imgextra/i1/O1CN01GXrI1R25menQwvGkD_!!6000000007569-2-tps-60-60.png',
      subcategories: [
        ['手机', '苹果手机', '三星手机', '华为手机', '小米手机', 'OPPO', 'vivo', '荣耀', '真我', 'IQOO'],
        ['数码', '笔记本电脑', '平板电脑', '相机', '耳机', '智能手表', '移动电源', 'U盘', '存储卡'],
        ['电脑', '台式机', '显示器', '键盘', '鼠标', '音箱', '打印机', '路由器']
      ]
    },
    { 
      name: '服饰 / 箱包 / 运动', 
      icon: 'https://img.alicdn.com/imgextra/i3/O1CN01ryLwQN1Pvcgh890IY_!!6000000001903-2-tps-60-60.png',
      subcategories: [
        ['服饰', '男装', '女装', '童装', '内衣', '袜子', '帽子', '围巾', '手套'],
        ['箱包', '手提包', '背包', '钱包', '行李箱', '公文包', '电脑包', '斜挎包'],
        ['运动', '运动鞋', '运动服', '运动器材', '健身装备', '户外用品', '瑜伽垫']
      ]
    },
    { 
      name: '技能 / 卡券 / 潮玩', 
      icon: 'https://img.alicdn.com/imgextra/i4/O1CN01mkKCcJ1R6RexwWk9z_!!6000000002062-2-tps-60-60.png',
      subcategories: [
        ['技能', '设计', '编程', '语言', '摄影', '音乐', '舞蹈', '烹饪'],
        ['卡券', '美食券', '电影票', '旅游券', '健身卡', '购物卡', '加油卡'],
        ['潮玩', '盲盒', '手办', '模型', '潮流玩具', '收藏币', '卡牌游戏']
      ]
    },
    { 
      name: '母婴 / 美妆 / 个护', 
      icon: 'https://img.alicdn.com/imgextra/i1/O1CN01AmNgvo1XBq1Jl1c5U_!!6000000002886-2-tps-60-60.png',
      subcategories: [
        ['母婴', '奶粉', '尿不湿', '婴儿车', '玩具', '童装', '奶瓶', '婴儿床'],
        ['美妆', '口红', '面膜', '粉底液', '眼影', '腮红', '护肤品', '香水'],
        ['个护', '洗发水', '沐浴露', '牙膏', '牙刷', '毛巾', '剃须刀', '化妆品']
      ]
    },
    { 
      name: '家具 / 家电 / 家装', 
      icon: 'https://img.alicdn.com/imgextra/i1/O1CN01BHUykB1SV0WE5Pora_!!6000000002251-2-tps-60-60.png',
      subcategories: [
        ['家具', '沙发', '床', '桌子', '椅子', '衣柜', '书架', '鞋柜'],
        ['家电', '电视', '冰箱', '洗衣机', '空调', '热水器', '微波炉', '电饭煲'],
        ['家装', '地板', '瓷砖', '壁纸', '灯具', '窗帘', '涂料', '五金件']
      ]
    },
    { 
      name: '文玩 / 珠宝 / 礼品', 
      icon: 'https://img.alicdn.com/imgextra/i3/O1CN01y2MQp21VslutM5GBM_!!6000000002709-2-tps-60-60.png',
      subcategories: [
        ['文玩', '手串', '核桃', '玉石', '翡翠', '琥珀', '蜜蜡', '玛瑙'],
        ['珠宝', '项链', '耳环', '戒指', '手链', '手镯', '脚链', '吊坠'],
        ['礼品', '礼盒', '鲜花', '巧克力', '手表', '钢笔', '摆件', '工艺品']
      ]
    },
    { 
      name: '食品 / 宠物 / 花卉', 
      icon: 'https://img.alicdn.com/imgextra/i4/O1CN01OWZqw01QI45uxesce_!!6000000001952-2-tps-60-60.png',
      subcategories: [
        ['食品', '零食', '饮料', '水果', '蔬菜', '肉类', '海鲜', '粮油'],
        ['宠物', '猫粮', '狗粮', '宠物玩具', '宠物用品', '宠物食品', '宠物药品'],
        ['花卉', '鲜花', '盆栽', '多肉', '种子', '肥料', '花盆', '园艺工具']
      ]
    },
    { 
      name: '图书 / 游戏 / 音像', 
      icon: 'https://img.alicdn.com/imgextra/i2/O1CN01e6yyBg1H6JO6piQrH_!!6000000000708-2-tps-60-60.png',
      subcategories: [
        ['图书', '小说', '教材', '杂志', '漫画', '绘本', '工具书', '文学'],
        ['游戏', '游戏光盘', '游戏手柄', '游戏账号', '游戏周边', '游戏配件'],
        ['音像', 'CD', 'DVD', '蓝光碟', '唱片', '磁带', '播放器', '耳机']
      ]
    },
    { 
      name: '汽车 / 电动车 / 租房', 
      icon: 'https://img.alicdn.com/imgextra/i4/O1CN01MJTzuz1KUXBQAcCLF_!!6000000001167-2-tps-60-60.png',
      subcategories: [
        ['汽车', '二手车', '汽车配件', '汽车用品', '汽车装饰', '汽车维修'],
        ['电动车', '电动车', '电动自行车', '摩托车', '电池', '充电器', '配件'],
        ['租房', '出租房', '二手房', '写字楼', '商铺', '厂房', '仓库']
      ]
    },
    { 
      name: '五金 / 设备 / 农牧', 
      icon: 'https://img.alicdn.com/imgextra/i4/O1CN01mhFXdR1gWIFZfNG1q_!!6000000004149-2-tps-60-60.png',
      subcategories: [
        ['五金', '工具', '螺丝', '螺母', '钉子', '钻头', '扳手', '钳子'],
        ['设备', '机械设备', '仪器仪表', '办公设备', '医疗设备', '工业设备'],
        ['农牧', '农业机械', '饲料', '种子', '农药', '化肥', '畜牧设备', '养殖用品']
      ]
    }
  ];
  
  // 确保subcategories以字符串形式存储，避免JSON解析问题
  const categoriesWithStringSubcategories = categories.map(category => {
    return {
      ...category,
      subcategories: JSON.stringify(category.subcategories)
    };
  });
  
  await Category.bulkCreate(categoriesWithStringSubcategories);
  return categories;
};

// 生成标签数据
const generateTags = async () => {
  console.log('生成标签数据...');
  const tags = [
    '包邮', '全新', '99新', '95新', '9成新', '8成新', '7成新', '6成新',
    '有发票', '有包装', '验货担保', '同城自提', '可小刀', '不议价', '急出',
    '学生党', '搬家出', '年会奖品', '公司礼品', '闲置转让', '正品保障',
  ].map(name => ({ name }));
  
  await Tag.bulkCreate(tags);
  return tags;
};

// 生成商品数据
const generateProducts = async (userCount, categoryCount, tagCount, count = 500) => {
  console.log('生成商品数据...');
  const products = [];
  const conditions = ['全新', '99新', '95新', '9成新', '8成新', '7成新', '6成新'];
  const locations = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '南京', '重庆', '西安'];
  
  // 不同类别的商品标题模板
  const categoryTemplates = {
    1: ['iPhone {model} {storage}G {color}', '小米{model} 游戏手机', '华为{model} 麒麟芯片', 'OPPO{model} 拍照手机', 'VIVO{model} 快充手机'],
    2: ['MacBook Pro {year}款 {cpu}', 'ThinkPad X1 Carbon {gen}', 'Dell XPS {model}', '联想拯救者 {model} 游戏本', '机械键盘 青轴/红轴', '无线鼠标 静音'],
    3: ['索尼{model} 4K电视', '格力空调 {匹数}匹', '美的冰箱 {升数}升', '海尔洗衣机 {公斤}公斤', '戴森吹风机 {model}', '小米扫地机器人 {model}'],
    4: ['雅诗兰黛 {product}', '兰蔻 {product}', 'SK-II 神仙水 {ml}ml', '资生堂 {product}', '口红 {brand} {color}', '面膜 {brand} {type}'],
    5: ['Nike 运动鞋 {model}', 'Adidas 卫衣 {color}', '优衣库 羽绒服 {size}', 'ZARA 连衣裙 {style}', '牛仔裤 {type}', 'T恤 {design}'],
    6: ['婴儿奶粉 {brand} {stage}', '尿不湿 {brand} {size}', '婴儿车 {model}', '儿童玩具 {type}', '童装 {brand} {style}', '奶瓶 {material}'],
    7: ['Nike 篮球', '瑜伽垫 {thickness}mm', '跑步机 {brand} {model}', '健身器材 {type}', '运动服 {brand} {style}', '运动鞋 {type}'],
    8: ['编程书籍 {language}', '考研资料 {subject}', '小说 {genre}', '教材 {course}', 'Kindle电子书 {model}', 'CD {artist}'],
    9: ['乐高 {set}', '高达模型 {model}', '手办 {character}', '吉他 {brand} {type}', '尤克里里 {size}', '游戏机 {console}'],
    10: ['闲置家具 {type}', '二手自行车 {brand}', '旧书 {category}', '办公用品 {type}', '厨房用具 {type}', '数码配件 {type}']
  };
  
  // 更详细的商品描述
  const generateDescription = (categoryId, title) => {
    const descriptions = {
      1: ['手机无拆无修，功能正常，配件齐全', '刚买不久，几乎全新，有发票', '备用机，使用频率低，成色很好', '屏幕完美，无划痕，电池健康度高', '支持当面交易，可验机'],
      2: ['电脑运行流畅，适合办公/游戏', '配件齐全，带原装充电器', '无磕碰，成色新，保养很好', '已安装常用软件，到手即用', '可小刀，大刀勿扰'],
      3: ['家电使用正常，无故障', '搬家急出，价格实惠', '有包装，可邮寄', '同城可送货上门', '质保期内，有发票'],
      4: ['化妆品全新未拆封，正品保证', '闲置转让，日期新鲜', '支持验货，假一赔十', '可单出，也可打包', '数量有限，先到先得'],
      5: ['衣服只穿过几次，几乎全新', '尺码合适，面料舒适', '清洗干净，无异味', '包邮，可退换', '搭配建议：...']
    };
    return faker.helpers.arrayElement(descriptions[categoryId] || ['商品全新/几乎全新，欢迎咨询', '闲置物品，低价转让', '可小刀，同城自提优先', '喜欢的话可以留言或私信']);
  };
  
  for (let i = 1; i <= count; i++) {
    const categoryId = 1 + Math.floor(Math.random() * categoryCount);
    const template = faker.helpers.arrayElement(categoryTemplates[categoryId] || ['{product}']);
    
    // 生成更真实的商品标题
    let title = template
      .replace('{model}', faker.string.alphanumeric(3).toUpperCase())
      .replace('{storage}', [64, 128, 256, 512, 1024][Math.floor(Math.random() * 5)])
      .replace('{color}', ['黑色', '白色', '蓝色', '红色', '绿色', '紫色'][Math.floor(Math.random() * 6)])
      .replace('{year}', 2020 + Math.floor(Math.random() * 5))
      .replace('{cpu}', ['M1', 'M2', 'i5', 'i7', 'R5', 'R7'][Math.floor(Math.random() * 6)])
      .replace('{gen}', 8 + Math.floor(Math.random() * 5))
      .replace('{匹数}', [1, 1.5, 2, 3][Math.floor(Math.random() * 4)])
      .replace('{升数}', [180, 200, 250, 300, 400][Math.floor(Math.random() * 5)])
      .replace('{公斤}', [6, 7, 8, 9, 10][Math.floor(Math.random() * 5)])
      .replace('{ml}', [50, 100, 150, 200, 250, 300][Math.floor(Math.random() * 6)])
      .replace('{product}', faker.commerce.productName())
      .replace('{brand}', ['苹果', '小米', '华为', 'Nike', 'Adidas', '优衣库', '乐高', '索尼'][Math.floor(Math.random() * 8)])
      .replace('{color}', ['红色', '蓝色', '黑色', '白色', '粉色', '绿色'][Math.floor(Math.random() * 6)])
      .replace('{size}', ['S', 'M', 'L', 'XL', '2XL'][Math.floor(Math.random() * 5)])
      .replace('{style}', ['休闲', '运动', '正式', '可爱', '复古'][Math.floor(Math.random() * 5)])
      .replace('{type}', faker.commerce.department())
      .replace('{language}', ['Python', 'Java', 'JavaScript', 'C++', 'Go'][Math.floor(Math.random() * 5)])
      .replace('{subject}', ['数学', '英语', '政治', '专业课'][Math.floor(Math.random() * 4)])
      .replace('{genre}', ['科幻', '悬疑', '言情', '历史'][Math.floor(Math.random() * 4)])
      .replace('{course}', ['计算机', '经济学', '管理学', '文学'][Math.floor(Math.random() * 4)])
      .replace('{character}', ['海贼王', '火影忍者', '高达', '迪士尼'][Math.floor(Math.random() * 4)])
      .replace('{set}', faker.string.alphanumeric(6).toUpperCase())
      .replace('{stage}', [1, 2, 3, 4][Math.floor(Math.random() * 4)])
      .replace('{thickness}', [3, 5, 6, 8][Math.floor(Math.random() * 4)])
      .replace('{console}', ['PS5', 'Xbox', 'Switch'][Math.floor(Math.random() * 3)])
      .replace('{artist}', faker.person.fullName())
      .replace('{design}', ['简约', '印花', '条纹', '纯色'][Math.floor(Math.random() * 4)])
      .replace('{material}', ['玻璃', '塑料', '硅胶'][Math.floor(Math.random() * 3)]);
    
    // 每个商品固定3张图片，使用用户提供的图片URL
    const images = getProductImages(i);
    
    products.push({
      title,
      description: generateDescription(categoryId, title),
      price: parseFloat(faker.commerce.price(10, 9999, 2)),
      images,
      location: faker.helpers.arrayElement(locations),
      condition: faker.helpers.arrayElement(conditions),
      sellerId: 1 + Math.floor(Math.random() * userCount),
      categoryId,
      interested: Math.floor(Math.random() * 1000),
      views: Math.floor(Math.random() * 5000),
      createdAt: faker.date.recent({ days: 30 })
    });
  }
  
  await Product.bulkCreate(products);
  return products;
};

// 生成推荐区块
const generateRecoBlocks = async (productCount) => {
  console.log('生成推荐区块...');
  const recoBlocks = [
    {
      key: 'wardrobe',
      title: '衣橱捡漏',
      subtitle: '低价清仓',
      theme: 'yellow',
      icon: 'https://img.alicdn.com/imgextra/i2/O1CN01aeRKAA1W6yC0Rijbv_!!6000000002740-2-tps-480-480.png',
      productIds: [1, 2, 3, 4, 5, 6],
    },
    {
      key: 'digital',
      title: '手机数码',
      subtitle: '限时特惠',
      theme: 'blue',
      icon: 'https://img.alicdn.com/imgextra/i3/O1CN01ZpVFTV1bvsIHUCUZ3_!!6000000003528-2-tps-480-480.png',
      productIds: [7, 8, 9, 10, 11, 12],
    },
    {
      key: 'anime',
      title: '二次元',
      subtitle: '动漫周边',
      theme: 'pink',
      icon: 'https://img.alicdn.com/imgextra/i1/O1CN01qyf4561Kudl4pQPuB_!!6000000001224-2-tps-480-480.png',
      productIds: [13, 14, 15, 16, 17, 18],
    },
    {
      key: 'savings',
      title: '省钱卡券',
      subtitle: '超值优惠',
      theme: 'green',
      icon: 'https://img.alicdn.com/imgextra/i4/O1CN01TPHySh29g1WPi5DzR_!!6000000008096-2-tps-480-480.png',
      productIds: [19, 20, 21, 22, 23, 24],
    },
  ];
  
  // 确保商品ID在有效范围内
  recoBlocks.forEach(block => {
    block.productIds = block.productIds.map(id => (id % productCount) + 1);
  });
  
  await RecoBlock.bulkCreate(recoBlocks);
  return recoBlocks;
};

// 主函数
const main = async () => {
  try {
    // 同步数据库（创建表）
    console.log('正在同步数据库...');
    await sequelize.sync({ force: true });
    
    // 生成基础数据
    const users = await generateUsers(30);
    const categories = await generateCategories();
    const tags = await generateTags();
    const products = await generateProducts(users.length, categories.length, tags.length, 200);
    const recoBlocks = await generateRecoBlocks(products.length);
    
    console.log('\n数据初始化完成！');
    console.log(`- 用户: ${users.length} 个`);
    console.log(`- 分类: ${categories.length} 个`);
    console.log(`- 标签: ${tags.length} 个`);
    console.log(`- 商品: ${products.length} 个`);
    console.log(`- 推荐区块: ${recoBlocks.length} 个`);
    
    // 关闭数据库连接
    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('初始化失败:', error);
    process.exit(1);
  }
};

// 执行主函数
main();
