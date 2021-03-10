const express = require('express');

const router = express.Router();
const ProductController = require('../controllers/product.controller');

router.get('', ProductController.getProducts);
router.get('/:sku', ProductController.getProductsSku);
router.post('', ProductController.postProduct);
router.delete('', ProductController.deleteProducts);
router.delete('/:sku', ProductController.deleteProductSku);
router.put('/:sku', ProductController.putProductSku);
router.patch('/:sku', ProductController.patchProductSku);

module.exports = router;
