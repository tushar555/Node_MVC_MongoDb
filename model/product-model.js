const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);






// const { ObjectId } = require('mongodb');

// const mongoConnect = require('../util/database').mongoConnect;
// const mongoDb = require('../util/database').mongoDb;

// class Product {
//     constructor(title, description, price, imageUrl, userId) {
//         this.title = title;
//         this.description = description;
//         this.price = price;
//         this.imageUrl = imageUrl;
//         this.userId = userId;
//     }

//     save(callback) {
//         const db = mongoDb();
//         db.collection('products').insertOne(this).then((result) => {
//             callback(result)
//         })
//     }

//     static fetchAll() {
//         const db = mongoDb();
//         return db.collection('products').find().toArray().then((products) => {
//             return products
//         })
//     }

//     static fetchById(productId) {
//         const db = mongoDb();

//         return db.collection('products').findOne({ _id: ObjectId(productId) }).then((products) => {
//             return products
//         })
//     }

//     updateProduct(productId) {
//         const db = mongoDb();
//         return db.collection('products').updateOne({ _id: ObjectId(productId) }, { $set: this }).then(result => {
//             return result
//         })

//     }

//     static deleteProduct(productId) {
//         const db = mongoDb();
//         let id = productId.trim();
//         console.log(id)
//         return db.collection('products').deleteOne({ _id: ObjectId(id) }).then(result => {
//             return result
//         })

//     }
// }




// module.exports = Product;
