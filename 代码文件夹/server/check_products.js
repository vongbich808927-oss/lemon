require('dotenv').config();
const { sequelize } = require('./db');
const { Product } = require('./models');
const { Op } = require('sequelize');

(async () => {
  try {
    console.log('正在连接数据库...');
    await sequelize.authenticate();
    console.log('数据库连接成功！');
    
    console.log('查询商品ID 25-36的数据...');
    const products = await Product.findAll({
      where: {
        id: {
          [Op.between]: [25, 36]
        }
      },
      attributes: ['id', 'title', 'price', 'images']
    });
    
    console.log('查询结果：');
    console.log(`共找到 ${products.length} 个商品`);
    products.forEach(product => {
      console.log(`商品ID: ${product.id}, 标题: ${product.title}, 价格: ${product.price}`);
      console.log(`图片: ${product.images}`);
      console.log('---');
    });
    
    console.log('查询完成！');
    await sequelize.close();
  } catch (error) {
    console.error('查询失败：', error);
    if (sequelize.connectionManager) {
      await sequelize.close();
    }
  }
})();
