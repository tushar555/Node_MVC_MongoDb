const Product = require('../model/product-model');

exports.getAddProducts = (req, res, next) => {
    res.render('admin/edit-product', {
        docTitle: 'Add Product', path: '/add-product', editing: false, isAuthenticateUser: req.user
    })
}


exports.postAddProducts = (req, res, next) => {
    let title = req.body.title
    let imageUrl = req.body.imgUrl
    let description = req.body.description
    let price = req.body.price
    let userId = req.user;
    const product = new Product({ title, price, description, imageUrl, userId })
    product.save((result) => {
        //  console.log(result)
        res.redirect('/admin-all-products')
    })

}

exports.getEditProduct = (req, res, next) => {
    const edit = req.query.edit
    const id = req.params.productId
    //getProducts fn will be generated by sequelize get+ModelName
    // Product.findByPk(id)

    Product.findById(id).then((product) => {
        product.price = +product['price']

        res.render('admin/edit-product', {
            docTitle: 'Add Product', path: '/edit-product',
            editing: edit,
            product: product, isAuthenticateUser: req.user
        })
    })
    // req.user.getProducts({ where: { id: id } }).then(product => {


    // });

}


exports.postEditProductsDetails = (req, res, next) => {
    let title = req.body.title
    let imageUrl = req.body.imgUrl
    let price = req.body.price
    let description = req.body.description
    let id = req.body.id.trim()
    // const updatedProduct = { ...product }
    // delete updatedProduct['id'];
    // delete updatedProduct['imgUrl'];
    // updatedProduct.imageUrl = imageUrl;


    Product.findById(id).then(product => {
        product.title = title;
        product.price = price;
        product.description = description;
        product.imageUrl = imageUrl;

        product.save().then(result => {
            res.redirect('/admin-all-products')
        })
    })
    // Product.findByPk(req.body.id).then(pro => {
    //     pro.title = req.body.title
    //     pro.imageUrl = req.body.imgUrl
    //     pro.price = req.body.price
    //     pro.description = req.body.description
    //     return pro.save();

    // }).then(() => {  })

}



exports.showAllAdminProducts = (req, res, next) => {

    Product.find().then((products) => {

        res.render('admin/all-products', {
            docTitle: 'All Admin Products',
            path: '/admin-all-products',
            products: products,
            isProductavailable: products.length > 0, isAuthenticateUser: req.user


        })
    })


}


exports.postdeleteProductsDetails = (req, res, next) => {
    const productId = req.params.productId;
    Product.deleteOne({ _id: productId }).then((pr) => {
        console.log(pr)
        res.redirect('/admin-all-products')
    })

}
