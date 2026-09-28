// 创建测试订单数据的脚本
// 可以在浏览器控制台或通过其他方式运行

// 测试订单数据
const testOrders = [
  {
    id: Date.now() - 86400000, // 昨天
    product: {
      id: 1,
      title: 'iPhone 13 128G 午夜色',
      price: 4500,
      images: ['https://img.alicdn.com/bao/uploaded/i3/O1CN01vzjGey23jn752cGZz_!!0-fleamarket.jpg_170x10000Q90.jpg_.webp'],
      condition: '九成新'
    },
    seller: {
      id: 719795072,
      nickname: '专业手机卖家'
    },
    price: 4500,
    status: 'completed',
    transactionMethod: '线上支付',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: Date.now() - 172800000, // 前天
    product: {
      id: 2,
      title: 'AirPods Pro 第二代',
      price: 1200,
      images: ['https://img.alicdn.com/imgextra/i1/O1CN01t4Z7vL1O3e3u6Z6kT_!!6000000002580-2-tps-800-800.jpg'],
      condition: '全新未拆封'
    },
    seller: {
      id: 888888888,
      nickname: '数码产品专营店'
    },
    price: 1200,
    status: 'completed',
    transactionMethod: '线上支付',
    createdAt: new Date(Date.now() - 172800000).toISOString()
  }
];

// 将测试订单保存到localStorage
localStorage.setItem('orders', JSON.stringify(testOrders));
console.log('测试订单已成功保存到localStorage！');
console.log('保存的订单:', testOrders);
