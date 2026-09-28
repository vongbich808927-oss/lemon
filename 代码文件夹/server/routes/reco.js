const express = require('express');
const { RecoBlock, Product } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  console.log('Received request for reco API');
  const blocks = await RecoBlock.findAll({ order: [['id', 'ASC']] });

  const result = [];
  for (const b of blocks) {
    const ids = Array.isArray(b.productIds) ? b.productIds : [];
    const products = ids.length
      ? await Product.findAll({ where: { id: ids }, limit: 6 })
      : [];

    result.push({
      id: b.id,
      key: b.key,
      title: b.title,
      subtitle: b.subtitle,
      theme: b.theme,
      icon: b.icon,
      products: products.map(p => ({
        id: p.id,
        title: p.title,
        price: Number(p.price),
        image: Array.isArray(p.images) && p.images[0] ? p.images[0] : null,
      })),
    });
  }

  res.json(result);
});

module.exports = router;




