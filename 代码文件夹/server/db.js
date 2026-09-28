const { Sequelize } = require('sequelize');
const path = require('path');

// 使用SQLite数据库，避免MySQL配置问题
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'xianyu.db'),
  logging: false,
  define: {
    underscored: true,
    freezeTableName: true,
  },
});

module.exports = { sequelize };




