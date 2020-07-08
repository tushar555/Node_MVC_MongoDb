const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    products: [
        {
            productId: { type: Object, required: true },
            quantity: { type: Number, required: true }
        }
    ]
})

module.exports = mongoose.model('Order', orderSchema);

// const { mongoDb } = require('../util/database');
// const User = require('./user-model');
// const { ObjectId } = require('mongodb');
// const Cart = require('./cart-model');

// class Order {
//     constructor(userId, cart) {
//         this.userId = userId;
//         this.cart = cart;
//     }

//     postOrder() {
//         const db = mongoDb();
//         const cart = new Cart(this.cart);
//         return cart.fetchCartProducts().then((products) => {
//             const order = {
//                 items: products,
//                 user: {
//                     _id: ObjectId(this.userId)
//                 }
//             }
//             return db.collection('orders').insertOne(order).then(() => {
//                 this.cart.items = [];
//                 return db.collection('users').updateOne({ _id: ObjectId(this.userId) }, { $set: { cart: this.cart } }).then((result) => {
//                     return result
//                 })
//             })
//         })


//     }

//     getOrders() {

//         const db = mongoDb();

//         return db.collection('orders').find({ 'user._id': ObjectId(this.userId) }).toArray().then(orders => {
//             return orders;
//         })

//     }

// }

// module.exports = Order;