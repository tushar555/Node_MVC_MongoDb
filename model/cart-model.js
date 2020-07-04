const { mongoDb } = require('../util/database');
const User = require('./user-model');
const { ObjectId } = require('mongodb');

class Cart {
    constructor(cart) {
        this.cart = cart;
    }
    addProductToCart(user, productId) {
        const db = mongoDb();
        const userId = user._id;
        const foundId = this.cart.items.findIndex(cp => cp.productId === productId);
        if (foundId < 0) {
            const newCart = [...this.cart.items];
            newCart.push({ productId: productId, quantity: 1 })
            const updateCart = { items: newCart }

            return db.collection('users').updateOne({ _id: ObjectId(userId) },
                { $set: { cart: updateCart }, }, { upsert: true }).then((result) => {
                    return result
                })

        } else {
            let newQty = this.cart.items[foundId].quantity + 1;
            this.cart.items[foundId].quantity = newQty
            return db.collection('users').updateOne({ _id: ObjectId(userId) },
                { $set: { cart: this.cart } }).then((result) => {
                    return result
                })

        }

    }

    fetchCartProducts() {
        const productIds = this.cart.items.map(pr => ObjectId(pr.productId))

        const db = mongoDb();

        return db.collection('products').find({ _id: { $in: productIds } }).toArray().then((pro) => {

            return pro.map(p => {
                return { ...p, quantity: this.cart.items.find(obj => obj.productId.toString() == p._id.toString()).quantity }
            })
        })

    }

    deleteCart(userId, productId) {
        const db = mongoDb();
        let newCart = { ...this.cart };
        newCart.items = this.cart.items.filter(pro => pro.productId !== productId);
        console.log(newCart)
        return db.collection('users').updateOne({ _id: ObjectId(userId) }, { $set: { cart: newCart } }).then((result) => {
            return result
        })
    }
}




module.exports = Cart;