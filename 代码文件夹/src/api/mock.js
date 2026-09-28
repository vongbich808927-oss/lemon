// Mock数据：模拟商品数据库
export const mockData = {
  products: [
    {
      id: 1,
      title: '计算机毕业设计 软件工程专业',
      price: 10,
      location: '全国',
      condition: '全新',
      description: '计算机毕业设计，软件工程专业，包含代码、文档、演示视频，全程包修改直到通过。',
      images: [
        'https://img.alicdn.com/bao/uploaded/i1/O1CN018zpyGx237JnhwHpQM_!!0-fleamarket.jpg_170x10000Q90.jpg_.webp',
        'https://img.alicdn.com/bao/uploaded/i2/O1CN019CYMMv2Lu0oijVP20_!!0-fleamarket.jpg_170x10000Q90.jpg_.webp'
      ],
      seller: '小王',
      sellerLevel: 'L5',
      views: 2761,
      interested: 2761
    },
    {
      id: 2,
      title: '急单 急单 打印玩具展示展示',
      price: 201,
      location: '北京',
      condition: '全新',
      description: '玩具展示展示，武战道洛洛历险记 高端还原玩具展示，需要的联系。',
      images: [
        'https://img.alicdn.com/bao/uploaded/i4/O1CN01JSizVO1oHC5SVa2fc_!!53-fleamarket.heic_170x10000Q90.jpg_.webp',
        'https://img.alicdn.com/bao/uploaded/i4/O1CN019mHxVR1t6GjdXvXTk_!!0-fleamarket.jpg_170x10000Q90.jpg_.webp'
      ],
      seller: '小李',
      sellerLevel: 'L5',
      views: 43,
      interested: 43
    },
    {
      id: 3,
      title: '计算机毕业设计，课程设计，大作业',
      price: 5,
      location: '全国',
      condition: '全新',
      description: '计算机毕业设计，课程设计，大作业，Java，Python，C++等各种编程语言。',
      images: [
        'https://img.alicdn.com/bao/uploaded/i2/O1CN01OZXbqi2FLJHTf7KpF_!!53-fleamarket.heic_170x10000Q90.jpg_.webp',
        'https://img.alicdn.com/bao/uploaded/i1/O1CN01PBaCZb25utu6ys235_!!0-fleamarket.jpg_170x10000Q90.jpg_.webp'
      ],
      seller: '小张',
      sellerLevel: 'L5',
      views: 529,
      interested: 529
    },
    {
      id: 4,
      title: 'JavaWeb程序代码代做',
      price: 7.99,
      location: '全国',
      condition: '全新',
      description: 'JavaWeb程序代码代做，Servlet，JSP，Spring，SpringMVC等框架，包修改直到通过。',
      images: [
        'https://img.alicdn.com/bao/uploaded/i1/O1CN01aED4vc1i8b4SIrz12_!!4611686018427387152-53-fleamarket.heic_170x10000Q90.jpg_.webp',
        'https://img.alicdn.com/bao/uploaded/i1/O1CN01RaohFU1l5L0uQfZOj_!!53-fleamarket.heic_170x10000Q90.jpg_.webp'
      ],
      seller: '小赵',
      sellerLevel: 'L4',
      views: 438,
      interested: 38
    },
    {
      id: 5,
      title: '变形金刚3代天元天尊',
      price: 2000,
      location: '上海',
      condition: '9成新',
      description: '变形金刚3代天元天尊 涂为主，小面积笔涂，上色，需要的联系。',
      images: [
        'https://img.alicdn.com/bao/uploaded/i3/O1CN01J0gCtc1YUuBrcvmYj_!!4611686018427387879-53-fleamarket.heic_170x10000Q90.jpg_.webp',
        'https://img.alicdn.com/bao/uploaded/i1/O1CN01HTmBQx1vGSlLP0O6L_!!53-fleamarket.heic_170x10000Q90.jpg_.webp'
      ],
      seller: '小钱',
      sellerLevel: 'L6',
      views: 65,
      interested: 65
    },
    {
      id: 6,
      title: '985博士毕业 本科论文 硕士论文',
      price: 29.99,
      location: '全国',
      condition: '全新',
      description: '985博士毕业，本科论文，硕士论文，各种专业，包通过，包修改。',
      images: [
        'https://img.alicdn.com/bao/uploaded/i2/O1CN01dxWqJ11OnY4MJvOoc_!!0-fleamarket.jpg_170x10000Q90.jpg_.webp',
        'https://img.alicdn.com/bao/uploaded/i4/O1CN018zpyGx237JnhwHpQM_!!0-fleamarket.jpg_170x10000Q90.jpg_.webp'
      ],
      seller: '小孙',
      sellerLevel: 'L4',
      views: 150,
      interested: 120
    },
    {
      id: 7,
      title: '计算机毕业设计指导',
      price: 29.99,
      location: '全国',
      condition: '全新',
      description: '计算机毕业设计指导，代码修改，文档编写，答辩技巧，全程辅导直到通过。',
      images: [
        'https://img.alicdn.com/bao/uploaded/i1/O1CN01HTmBQx1vGSlLP0O6L_!!53-fleamarket.heic_170x10000Q90.jpg_.webp',
        'https://img.alicdn.com/bao/uploaded/i2/O1CN01OZXbqi2FLJHTf7KpF_!!53-fleamarket.heic_170x10000Q90.jpg_.webp'
      ],
      seller: '小李',
      sellerLevel: 'L5',
      views: 329,
      interested: 329
    },
    {
      id: 8,
      title: '计算机专业作业代做',
      price: 15,
      location: '全国',
      condition: '全新',
      description: '计算机专业作业代做，Java，Python，C++，数据结构，算法等各种作业。',
      images: [
        'https://img.alicdn.com/bao/uploaded/i4/O1CN019mHxVR1t6GjdXvXTk_!!0-fleamarket.jpg_170x10000Q90.jpg_.webp',
        'https://img.alicdn.com/bao/uploaded/i2/O1CN019CYMMv2Lu0oijVP20_!!0-fleamarket.jpg_170x10000Q90.jpg_.webp'
      ],
      seller: '小王',
      sellerLevel: 'L4',
      views: 89,
      interested: 76
    }
  ],
  tags: [
    '个人闲置', 'BJD娃', '垂钓', '吉他乐器', '台球', '摄影摄像', '钱币收藏', '女装穿搭', '居家好物', '大牌美妆', '机车'
  ]
}
