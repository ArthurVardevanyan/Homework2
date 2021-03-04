const Express = require('express');

const BodyParser = require('body-parser');
const ProductController = require('../controllers/product.controller');

const router = Express.Router();

router.use(BodyParser.json());

router.get('/products', ProductController.getProducts);
router.get('/products/:sku', ProductController.getProductsSku);
router.post('/products', ProductController.postProduct);
router.delete('/products', ProductController.deleteProducts);
router.delete('/products/:sku', ProductController.deleteProductSku);
router.put('/products/:sku', ProductController.putProductSku);
router.patch('/products/:sku', ProductController.patchProductSku);

module.exports = router;
