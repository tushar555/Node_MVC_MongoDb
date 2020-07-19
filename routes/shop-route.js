const express = require('express');
const router = express.Router();
const products = require('./admin-route').products;
const shopController = require('../controllers/shop-controller');
const isAuth = require('../middleware/is-auth');

router.get('/', shopController.getIndex);
router.get('/products', shopController.viewProducts);

router.get('/cart', isAuth, shopController.showCartProducts);
router.post('/cart', isAuth, shopController.addToCart);
router.post('/delete-cart-item', isAuth, shopController.deleteCartItem);



router.get('/products/:productId', isAuth, shopController.viewProductsDetails);

router.post('/order-checkout', isAuth, shopController.postOrder)
// // router.get('/checkout', shopController.getCheckout);
router.get('/order', isAuth, shopController.getOrder)

router.get('/order/:orderId', shopController.getInvoice)
exports.routes = router;


