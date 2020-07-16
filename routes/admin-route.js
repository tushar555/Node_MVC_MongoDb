const express = require('express');
const adminController = require('../controllers/admin-controller')
const router = express.Router();
const isAuth = require('../middleware/is-auth');
const { check, body } = require('express-validator/check');

router.get('/', (req, res, next) => {
    res.send('Hello')
})

router.get('/add-product', isAuth, adminController.getAddProducts)
router.post('/add-product', isAuth, [
    body('title', 'Only chracters allowed').isAlpha().trim(),
    body('description', 'Enter atleast 5 characters').isLength({ min: 5 }).trim(),
    body('price', 'Enter only numbers').isNumeric().trim(),

], adminController.postAddProducts)

router.get('/admin-all-products', isAuth, adminController.showAllAdminProducts)
router.get('/edit-product/:productId', isAuth, adminController.getEditProduct)
router.post('/edit-product', [
    body('title', 'Only chracters allowed').isAlpha().trim(),
    body('description', 'Enter atleast 5 characters').isLength({ min: 5 }).trim(),
    body('price', 'Enter only numbers').isNumeric().trim(),

], isAuth, adminController.postEditProductsDetails);

router.post('/delete-product/:productId', isAuth, adminController.postdeleteProductsDetails);


exports.routes = router;
