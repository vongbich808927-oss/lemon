const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const RecoBlock = sequelize.define('RecoBlock', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subtitle: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  theme: {
    // yellow/blue/green/pink
    type: DataTypes.STRING,
    allowNull: false,
  },
  icon: {
    // small icon image url
    type: DataTypes.STRING,
    allowNull: true,
  },
  productIds: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [],
    field: 'product_ids',
  },
}, {
  tableName: 'reco_blocks',
  timestamps: false,
});

module.exports = RecoBlock;




