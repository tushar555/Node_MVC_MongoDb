const Product = require('../model/product-model');
// const Cart = require('../model/cart-model');
// // const CartItem = require('../model/cart-item');
const Order = require('../model/order-model');
// // const OrderItem = require('../model/order-item-model');
// const { showAllAdminProducts } = require('./admin-controller');


exports.viewProducts = (req, res, next) => {
    Product.find().then((pro) => {
        res.render('shop/show-product', {
            docTitle: 'Show Products',
            path: '/products',
            products: pro,
            isProductavailable: pro.length > 0, isAuthenticateUser: req.user

        })
    }).catch(error => { console.log(error) })

}

exports.viewProductsDetails = (req, res, next) => {
    const productId = req.params.productId;

    Product.findById(productId).then(pr => {

        res.render('shop/product-details', {
            docTitle: 'Product details',
            path: '/product-details',
            product: pr, isAuthenticateUser: req.user
        })
    })
}

exports.getIndex = (req, res, next) => {

    Product.find().then(resp => {
        res.render('shop/index', {
            docTitle: 'Show Products',
            path: '/',
            products: resp,
            isProductavailable: resp.length > 0, isAuthenticateUser: req.user

        })
    })

}

exports.showCartProducts = (req, res, next) => {

    req.user.populate('cart.items.productId').execPopulate().then((product) => {
        console.log(product.cart.items)
        const products = product.cart.items;
        res.render('shop/cart', { docTitle: 'Your Cart', path: '/cart', cart: products, isAuthenticateUser: req.user })
    })
    // req.user.getCart().then((cart) => {
    //     return cart.getProducts().then((product) => {
    //         console.log(product)

    //     })
    // })

}

exports.addToCart = (req, res, next) => {

    const productId = req.body.productId;

    req.user.addProductToCart(productId).then(() => {
        res.redirect('/cart')
    })

}


exports.deleteCartItem = (req, res, next) => {
    const productId = req.body.id;

    req.user.deleteCart(productId).then(() => {
        res.redirect('/cart')
    });


}

exports.postOrder = (req, res, next) => {
    //  res.render('shop/order', { docTitle: 'My Orders', path: '/order' })
    const items = [...req.user.cart.items]
    //  console.log(items.map(i => { return { quantity: i.quantity, productId: { ...i.productId } } }))
    const order = new Order({
        userId: req.user._id,
        products: items.map(i => { return { quantity: i.quantity, productId: { ...i.productId._doc } } })
    })

    order.save().then(() => {
        return req.user.clearCart()

    }).then(() => {
        res.redirect('/order')
    })

}


exports.getOrder = (req, res, next) => {


    Order.find({ userId: req.user._id }).then((orders) => {

        res.render('shop/order', { docTitle: 'My Orders', path: '/order', orders: orders, isAuthenticateUser: req.user })
    })

}







