const { sequelize } = require('./db');
const { Category } = require('./models');

async function testSubcategories() {
  try {
    console.log('Testing subcategories field...');
    
    // 直接查询categories表
    const categories = await Category.findAll({
      order: [['id', 'ASC']],
      raw: true // 获取原始数据，不进行模型转换
    });
    
    console.log('Categories with subcategories:');
    categories.forEach(category => {
      console.log(`ID: ${category.id}, Name: ${category.name}`);
      console.log(`Subcategories: ${JSON.stringify(category.subcategories, null, 2)}`);
      console.log('---');
    });
    
    await sequelize.close();
  } catch (error) {
    console.error('Error testing subcategories:', error);
    process.exit(1);
  }
}

testSubcategories();
