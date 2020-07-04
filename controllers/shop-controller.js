const Product = require('../model/product-model');
const Cart = require('../model/cart-model');
// const CartItem = require('../model/cart-item');
const Order = require('../model/order-model');
// const OrderItem = require('../model/order-item-model');
const { showAllAdminProducts } = require('./admin-controller');


exports.viewProducts = (req, res, next) => {
    Product.fetchAll().then((pro) => {
        res.render('shop/show-product', {
            docTitle: 'Show Products',
            path: '/products',
            products: pro,
            isProductavailable: pro.length > 0,

        })
    }).catch(error => { console.log(error) })

}

exports.viewProductsDetails = (req, res, next) => {
    const productId = req.params.productId;

    Product.fetchById(productId).then(pr => {

        res.render('shop/product-details', {
            docTitle: 'Product details',
            path: '/product-details',
            product: pr
        })
    })
}

exports.getIndex = (req, res, next) => {

    Product.fetchAll().then(resp => {
        res.render('shop/index', {
            docTitle: 'Show Products',
            path: '/',
            products: resp,
            isProductavailable: resp.length > 0,

        })
    })
    // const products = Product.fetchAll().then(([pro, metadata]) => {
    //     res.render('shop/index', {
    //         docTitle: 'Show Products',
    //         path: '/',
    //         products: resp[0],
    //         isProductavailable: pro.length > 0,

    //     })
    // }).catch(error => { console.log(error) })
}

exports.showCartProducts = (req, res, next) => {
    const cart = new Cart(req.user.cart);
    cart.fetchCartProducts().then((product) => {
        //console.log(product)
        res.render('shop/cart', { docTitle: 'Your Cart', path: '/cart', cart: product })
    })
    // req.user.getCart().then((cart) => {
    //     return cart.getProducts().then((product) => {
    //         console.log(product)

    //     })
    // })

}

exports.addToCart = (req, res, next) => {

    const productId = req.body.productId;
    const user = req.user;
    const cart = new Cart(req.user.cart);

    cart.addProductToCart(user, productId).then(() => {
        res.redirect('/cart')
    })

    let fetchedCart;
    // //  let newQuantity = 1;
    // req.user.getCart().then((cart) => {
    //     fetchedCart = cart;
    //     return cart.getProducts({ where: { id: productId } });
    // }).then((products) => {
    //     let product;
    //     let newQuantity;
    //     if (products.length > 0) {
    //         product = products[0];
    //     }
    //     // if (product) {
    //     //     let qty = product.cartItem.quantity;
    //     //     newQuantity = qty + newQuantity;
    //     //     return product;
    //     // }
    //     // return Product.findByPk(productId);
    //     //console.log(peo)
    //     newQuantity = product ? product.cartItem.quantity + 1 : 1
    //     return Product.findByPk(productId).then((product) => {
    //         return fetchedCart.addProducts(product, { through: { quantity: newQuantity } });
    //     })

    // }).then(() => {
    //     res.redirect('/cart')
    // }).catch((error) => console.log(error))


}


exports.deleteCartItem = (req, res, next) => {
    const productId = req.body.id;
    const cart = new Cart(req.user.cart);
    cart.deleteCart(req.user._id, productId).then(() => {
        res.redirect('/cart')
    });
    // req.user.getCart().then((cart) => {
    //     return cart.getProducts({ where: { id: productId } }).then((product) => {
    //         return product[0].cartItem.destroy();
    //     })
    // }).then(() => {
    //     res.redirect('/cart')
    // })


}

exports.postOrder = (req, res, next) => {
    //  res.render('shop/order', { docTitle: 'My Orders', path: '/order' })

    const order = new Order(req.user._id, req.user.cart)
    order.postOrder().then(() => {
        res.redirect('/order')
    })

}


exports.getOrder = (req, res, next) => {

    const order = new Order(req.user._id, req.user.cart);
    order.getOrders().then((orders) => {
        console.log(orders)
        res.render('shop/order', { docTitle: 'My Orders', path: '/order', orders: orders })
    })

}

// exports.getCheckout = (req, res, next) => {
//     res.render('shop/checkout', { docTitle: 'Checkout', path: '/checkout' })
// }







