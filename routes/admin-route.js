const express = require('express');
const adminController = require('../controllers/admin-controller')
const router = express.Router();
router.get('/', (req, res, next) => {
    res.send('Hello')
})

router.get('/add-product', adminController.getAddProducts)
router.post('/add-product', adminController.postAddProducts)

router.get('/admin-all-products', adminController.showAllAdminProducts)
router.get('/edit-product/:productId', adminController.getEditProduct)
router.post('/edit-product', adminController.postEditProductsDetails);

router.post('/delete-product/:productId', adminController.postdeleteProductsDetails);


exports.routes = router;