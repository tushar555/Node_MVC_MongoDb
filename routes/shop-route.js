const express = require('express');
const router = express.Router();
const products = require('./admin-route').products;
const shopController = require('../controllers/shop-controller');

router.get('/', shopController.getIndex);
router.get('/products', shopController.viewProducts);

router.get('/cart', shopController.showCartProducts);
router.post('/cart', shopController.addToCart);
router.post('/delete-cart-item', shopController.deleteCartItem);



router.get('/products/:productId', shopController.viewProductsDetails);

router.post('/order-checkout', shopController.postOrder)
// // router.get('/checkout', shopController.getCheckout);
router.get('/order', shopController.getOrder)
exports.routes = router;


