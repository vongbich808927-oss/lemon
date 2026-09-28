const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Favorite = sequelize.define('Favorite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'product_id',
  },
}, {
  tableName: 'favorites',
  timestamps: true,
});

module.exports = Favorite;
