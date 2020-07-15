const express = require('express');
const adminController = require('../controllers/admin-controller')
const router = express.Router();
const isAuth = require('../middleware/is-auth');
router.get('/', (req, res, next) => {
    res.send('Hello')
})

router.get('/add-product', isAuth, adminController.getAddProducts)
router.post('/add-product', isAuth, adminController.postAddProducts)

router.get('/admin-all-products', isAuth, adminController.showAllAdminProducts)
router.get('/edit-product/:productId', isAuth, adminController.getEditProduct)
router.post('/edit-product', isAuth, adminController.postEditProductsDetails);

router.post('/delete-product/:productId', isAuth, adminController.postdeleteProductsDetails);


exports.routes = router;
