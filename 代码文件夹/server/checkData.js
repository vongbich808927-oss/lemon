const { sequelize } = require('./db');
const { User, Product } = require('./models');

async function checkData() {
  try {
    await sequelize.authenticate();
    const userCount = await User.count();
    const productCount = await Product.count();
    console.log(`Users: ${userCount}, Products: ${productCount}`);
    await sequelize.close();
  } catch (error) {
    console.error('Error checking data:', error);
    await sequelize.close();
  }
}

checkData();
