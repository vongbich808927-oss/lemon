const User = require('./User');
const Category = require('./Category');
const Tag = require('./Tag');
const Product = require('./Product');
const RecoBlock = require('./RecoBlock');
const Favorite = require('./Favorite');
const Order = require('./Order');

// associations
User.hasMany(Product, { foreignKey: 'sellerId', as: 'products' });
Product.belongsTo(User, { foreignKey: 'sellerId', as: 'seller' });

Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

// Favorite associations
User.hasMany(Favorite, { foreignKey: 'userId', as: 'favorites' });
Favorite.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Product.hasMany(Favorite, { foreignKey: 'productId', as: 'favorites' });
Favorite.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// Order associations
User.hasMany(Order, { as: 'buyOrders', foreignKey: 'buyerId' });
User.hasMany(Order, { as: 'sellOrders', foreignKey: 'sellerId' });
Order.belongsTo(User, { as: 'buyer', foreignKey: 'buyerId' });
Order.belongsTo(User, { as: 'seller', foreignKey: 'sellerId' });
Order.belongsTo(Product, { as: 'product', foreignKey: 'productId' });

module.exports = {
  User,
  Category,
  Tag,
  Product,
  RecoBlock,
  Favorite,
  Order,
};




