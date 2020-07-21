const Product = require('../model/product-model');
// const Cart = require('../model/cart-model');
// // const CartItem = require('../model/cart-item');
const Order = require('../model/order-model');
// // const OrderItem = require('../model/order-item-model');
// const { showAllAdminProducts } = require('./admin-controller');
const path = require('path');
const fs = require('fs');
const pdfcontent = require('pdfkit');
const { count } = require('console');

const ITEMS_PER_PAGE = 2;

exports.viewProducts = (req, res, next) => {
    Product.find().then((pro) => {
        res.render('shop/show-product', {
            docTitle: 'Show Products',
            path: '/products',
            products: pro,
            isProductavailable: pro.length > 0

        })
    }).catch(error => { console.log(error) })

}

exports.viewProductsDetails = (req, res, next) => {
    const productId = req.params.productId;

    Product.findById(productId).then(pr => {

        res.render('shop/product-details', {
            docTitle: 'Product details',
            path: '/product-details',
            product: pr
        })
    })
}

exports.getIndex = (req, res, next) => {

    const pageNo = req.query.page
    let TotalPages;
    Product.find().countDocuments().then(total => {
        TotalPages = total;

        return Product.find().skip((pageNo - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
    }).then(resp => {
        console.log(TotalPages)
        res.render('shop/index', {
            docTitle: 'Show Products',
            path: '/',
            products: resp,
            TotalPages: TotalPages,
            hasNext: (ITEMS_PER_PAGE * pageNo) < TotalPages,
            hasPrevious: pageNo > 1,
            isProductavailable: resp.length > 0

        })
    })

}

exports.showCartProducts = (req, res, next) => {

    req.user.populate('cart.items.productId').execPopulate().then((product) => {
        console.log(product.cart.items)
        const products = product.cart.items;
        res.render('shop/cart', { docTitle: 'Your Cart', path: '/cart', cart: products })
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

        res.render('shop/order', { docTitle: 'My Orders', path: '/order', orders: orders })
    })

}

exports.getInvoice = (req, res, next) => {
    console.log(req.params.orderId)
    const fileName = req.params.orderId + '.pdf'
    console.log(fileName)
    const Invoicepath = path.join('data', 'Invoices', fileName);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline');
    const pdf = new pdfcontent();

    pdf.pipe(fs.createWriteStream(Invoicepath));
    pdf.pipe(res)

    pdf.text('Invoice')
    pdf.text('------------------------------------')



    pdf.end();
    //const stream = fs.createReadStream(Invoicepath);
    // stream.pipe(res)    
    // fs.readFile(Invoicepath, (err, resp) => {
    //     if (err) {
    //         return next(err)
    //     }
    //     res.setHeader('Content-Type', 'application/pdf');
    //     res.setHeader('Content-Disposition', 'inline')
    //     res.send(resp);
    // })
}


exports.getCheckout = (req, res, next) => {

    req.user.populate('cart.items.productId').execPopulate().then((product) => {
        console.log(product.cart.items)
        const products = product.cart.items;

        res.render('shop/checkout', {
            docTitle: 'Checkout',
            path: '/checkout',
            cart: products,
            totalSum: products.reduce((sum, ele) => sum + (ele.quantity * ele.productId.price), 0)
        })
    })


}







