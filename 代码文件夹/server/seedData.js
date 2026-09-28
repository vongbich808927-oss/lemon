const { sequelize } = require('./db');
const { User, Product, Category } = require('./models');
const bcrypt = require('bcrypt');

// 模拟商品标题
const productTitles = {
  1: ['苹果iPhone 14 Pro', '三星Galaxy S23', '华为Mate 60 Pro', '小米13', 'OPPO Find X6', 'vivo X90', '荣耀Magic5', '真我GT Neo5', 'IQOO 11', '联想ThinkPad X1 Carbon', 'Apple MacBook Pro', 'iPad Pro 12.9', '索尼A7M4相机', 'AirPods Pro 2', 'Apple Watch Series 8', '小米移动电源', '闪迪U盘', '三星存储卡', '戴尔台式机', 'LG显示器', '机械键盘', '罗技鼠标', 'JBL音箱', '惠普打印机', 'TP-Link路由器'],
  2: ['男士休闲衬衫', '女士连衣裙', '儿童卫衣', '纯棉内衣', '运动袜子', '棒球帽', '羊毛围巾', '皮手套', '真皮手提包', '双肩背包', '钱包', '行李箱', '公文包', '电脑包', '斜挎包', '运动鞋', '运动服', '健身器材', '瑜伽垫', '户外帐篷', '登山鞋', '篮球', '足球', '羽毛球拍', '乒乓球拍'],
  3: ['UI设计服务', 'Web开发', 'Python编程', '英语培训', '摄影课程', '吉他教学', '舞蹈培训', '烹饪课程', '肯德基优惠券', '电影票', '旅游券', '健身卡', '购物卡', '加油卡', '星巴克券', '盲盒手办', '高达模型', '收藏币', '游戏卡牌', '乐高积木', '潮玩公仔', '动漫周边', '手办展示盒', '卡牌收纳册', '模型工具'],
  4: ['婴儿奶粉', '尿不湿', '婴儿车', '儿童玩具', '童装', '玻璃奶瓶', '婴儿床', '口红', '面膜', '粉底液', '眼影盘', '腮红', '护肤品套装', '香水', '洗发水', '沐浴露', '牙膏', '电动牙刷', '毛巾', '剃须刀', '化妆品套装', '防晒霜', '爽肤水', '乳液', '面霜'],
  5: ['真皮沙发', '双人床', '实木餐桌', '办公椅子', '衣柜', '书架', '鞋柜', '智能电视', '双开门冰箱', '滚筒洗衣机', '空调', '电热水器', '微波炉', '电饭煲', '木地板', '瓷砖', '壁纸', 'LED灯具', '窗帘', '墙面涂料', '五金配件', '水龙头', '马桶', '洗手盆', '厨房橱柜'],
  6: ['小叶紫檀手串', '文玩核桃', '和田玉石', '翡翠手镯', '琥珀吊坠', '蜜蜡手串', '玛瑙手链', '金项链', '银耳环', '钻石戒指', '银手链', '玉手镯', '脚链', '水晶吊坠', '礼品盒', '鲜花束', '巧克力礼盒', '手表', '钢笔', '摆件', '工艺品', '茶叶礼盒', '红酒礼盒', '月饼礼盒', '保健品礼盒'],
  7: ['零食大礼包', '饮料', '新鲜水果', '有机蔬菜', '肉类', '海鲜', '粮油', '猫粮', '狗粮', '宠物玩具', '宠物用品', '宠物食品', '宠物药品', '鲜花', '盆栽', '多肉植物', '种子', '肥料', '花盆', '园艺工具', '绿植', '花瓶', '花架', '营养液', '杀虫剂'],
  8: ['小说', '教材', '杂志', '漫画', '绘本', '工具书', '文学书籍', '游戏光盘', '游戏手柄', '游戏账号', '游戏周边', '游戏配件', 'CD', 'DVD', '蓝光碟', '唱片', '磁带', '播放器', '耳机', '音响', '麦克风', '声卡', '吉他', '电子琴', '鼓'],
  9: ['二手车', '汽车配件', '汽车用品', '汽车装饰', '汽车维修', '电动车', '电动自行车', '摩托车', '电池', '充电器', '配件', '出租房', '二手房', '写字楼', '商铺', '厂房', '仓库', '汽车坐垫', '行车记录仪', '导航仪', '汽车香水', '雨刮器', '轮胎', '机油', '车载充电器'],
  10: ['工具套装', '螺丝', '螺母', '钉子', '钻头', '扳手', '钳子', '机械设备', '仪器仪表', '办公设备', '医疗设备', '工业设备', '农业机械', '饲料', '种子', '农药', '化肥', '畜牧设备', '养殖用品', '电线', '开关', '插座', '水管', '水龙头', '阀门']
};

// 模拟商品描述
const productDescriptions = [
  '全新未拆封，包装完整，全国联保',
  '九成新，使用痕迹轻微，功能正常',
  '八成新，外观有轻微磨损，不影响使用',
  '二手闲置，功能完好，性价比高',
  '转让原因：闲置不用，寻找有缘人',
  '正品保证，假一赔十',
  '支持验货，不满意可退货',
  '包邮，偏远地区除外',
  '可小刀，大刀勿扰',
  '送精美礼品，数量有限'
];

// 模拟商品所在地
const locations = ['北京', '上海', '广州', '深圳', '杭州', '南京', '成都', '武汉', '西安', '重庆', '天津', '苏州', '郑州', '长沙', '沈阳'];

// 模拟商品新旧程度
const conditions = ['全新', '几乎全新', '九成新', '八成新', '七成新', '六成新'];

// 模拟用户昵称
const nicknames = ['阳光男孩', '快乐女孩', '时尚达人', '数码爱好者', '美食家', '旅行家', '健身教练', '设计师', '程序员', '老师', '医生', '工程师', '律师', '艺术家', '音乐家'];

// 生成随机图片URL
function generateRandomImages(count) {
  const images = [];
  for (let i = 0; i < count; i++) {
    const categoryId = Math.floor(Math.random() * 10) + 1;
    const imageId = Math.floor(Math.random() * 1000) + 1;
    images.push(`https://picsum.photos/seed/category${categoryId}${imageId}/400/400`);
  }
  return images;
}

// 生成随机价格
function generateRandomPrice(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

// 生成虚拟用户
async function generateUsers(count) {
  const users = [];
  const existingUsers = await User.count();
  for (let i = 0; i < count; i++) {
    const username = `user${existingUsers + i + 1}`;
    const password = await bcrypt.hash('123456', 10);
    const nickname = `${nicknames[Math.floor(Math.random() * nicknames.length)]}${Math.floor(Math.random() * 1000)}`;
    const avatar = `https://picsum.photos/seed/avatar${existingUsers + i + 1}/100/100`;
    
    users.push({
      username,
      password,
      nickname,
      avatar
    });
  }
  return users;
}

// 生成虚拟商品
async function generateProducts(count, users, categories) {
  const products = [];
  for (let i = 0; i < count; i++) {
    const categoryId = Math.floor(Math.random() * categories.length) + 1;
    const categoryTitles = productTitles[categoryId];
    const title = categoryTitles[Math.floor(Math.random() * categoryTitles.length)];
    const description = productDescriptions[Math.floor(Math.random() * productDescriptions.length)];
    const price = generateRandomPrice(10, 50000);
    const images = generateRandomImages(Math.floor(Math.random() * 9) + 1); // 1-9张图片
    const location = locations[Math.floor(Math.random() * locations.length)];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    const sellerId = users[Math.floor(Math.random() * users.length)].id;
    
    products.push({
      title,
      description,
      price,
      images,
      location,
      condition,
      sellerId,
      categoryId
    });
  }
  return products;
}

// 主函数
async function main() {
  try {
    // 连接数据库
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // 同步模型到数据库
    await sequelize.sync();
    console.log('Models synchronized with database.');
    
    // 检查是否已有用户数据
    const existingUsers = await User.count();
    let users;
    
    // 无论是否已有用户，都生成更多用户
    console.log('Generating virtual users...');
    const newUsers = await generateUsers(200);
    await User.bulkCreate(newUsers);
    console.log(`Created ${newUsers.length} virtual users.`);
    // 获取所有用户
    users = await User.findAll();
    console.log(`Total users: ${users.length}`);
    
    // 检查是否已有商品数据
    const existingProducts = await Product.count();
    
    // 无论是否已有商品，都生成更多商品
    // 获取所有分类
    const categories = await Category.findAll();
    
    // 生成2000个虚拟商品
    console.log('Generating virtual products...');
    const products = await generateProducts(2000, users, categories);
    await Product.bulkCreate(products);
    console.log(`Created ${products.length} virtual products.`);
    
    // 获取总商品数
    const totalProducts = await Product.count();
    console.log(`Total products: ${totalProducts}`);
    
    console.log('Seed data generated successfully!');
    
  } catch (error) {
    console.error('Error generating seed data:', error);
  } finally {
    // 关闭数据库连接
    await sequelize.close();
  }
}

// 执行主函数
main();
