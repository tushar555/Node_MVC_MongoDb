const Product = require('../model/product-model');

exports.getAddProducts = (req, res, next) => {
    res.render('admin/edit-product', {
        docTitle: 'Add Product', path: '/add-product', editing: false
    })
}


exports.postAddProducts = (req, res, next) => {
    let title = req.body.title
    let imageUrl = req.body.imgUrl
    let description = req.body.description
    let price = req.body.price
    let userId = req.user._id;
    const product = new Product(title, description, price, imageUrl, userId)
    product.save((result) => {
        //  console.log(result)
        res.redirect('/admin-all-products')
    })


    // req.user.createProduct({
    //     title: title,
    //     description: description,
    //     price: price,
    //     imageUrl: imageUrl
    // }).then((resp) => res.redirect('/admin-all-products')).catch(err => console.error(err));

}

exports.getEditProduct = (req, res, next) => {
    const edit = req.query.edit
    const id = req.params.productId
    //getProducts fn will be generated by sequelize get+ModelName
    // Product.findByPk(id)

    Product.fetchById(id).then((product) => {
        product.price = +product['price']

        res.render('admin/edit-product', {
            docTitle: 'Add Product', path: '/edit-product',
            editing: edit,
            product: product
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

    const product = new Product(title, description, price, imageUrl)

    product.updateProduct(id).then(result => {
        res.redirect('/admin-all-products')
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

    Product.fetchAll().then((products) => {

        res.render('admin/all-products', {
            docTitle: 'All Admin Products',
            path: '/admin-all-products',
            products: products,
            isProductavailable: products.length > 0,


        })
    })

    // req.user.getProducts().then((pro) => {
    //     res.render('admin/all-products', {
    //         docTitle: 'All Admin Products',
    //         path: '/admin-all-products',
    //         products: pro,
    //         isProductavailable: pro.length > 0,

    //     })
    // })


}


exports.postdeleteProductsDetails = (req, res, next) => {
    const productId = req.params.productId;
    Product.deleteProduct(productId).then((pr) => {
        console.log(pr)
        res.redirect('/admin-all-products')
    })

}
