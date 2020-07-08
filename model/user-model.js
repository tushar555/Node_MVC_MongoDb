const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userScheme = new Schema({
    name: {
        type: String,
        required: true
    },
    email: { type: String, required: true },
    cart: {
        items: [
            {
                productId: { type: Schema.Types.ObjectId, ref: 'Product' },
                quantity: { type: Number, required: true }
            }
        ]
    },
    order: {

    }
})

userScheme.methods.addProductToCart = function (productId) {
    // const userId = user._id;
    const foundId = this.cart.items.findIndex(cp => cp.productId.toString() === productId.toString());
    console.log(this.cart, foundId)
    if (foundId < 0) {
        const newCart = [...this.cart.items];
        newCart.push({ productId: productId, quantity: 1 })
        const updateCart = { items: newCart }
        this.cart = updateCart;
        return this.save()

    } else {
        let newQty = this.cart.items[foundId].quantity + 1;
        this.cart.items[foundId].quantity = newQty
        return this.save()

    }

}

userScheme.methods.deleteCart = function (productId) {

    let newCart = { ...this.cart };
    newCart = this.cart.items.filter(pro => pro.productId !== productId);
    this.cart = newCart;
    return this.save()
}

userScheme.methods.clearCart = function () {
    this.cart = { items: [] }
    return this.save();
}

module.exports = mongoose.model('user', userScheme);

// const { mongoDb } = require('../util/database');
// const { ObjectId } = require('mongodb');

// const db = require('../util/database').mongoDb;

// class User {
//     constructor(username, email) {
//         this.username = username,
//             this.email = email
//     }

//     save() {
//         const db = mongoDb();
//         return db.collection('users').update({}, { $set: this }, { upsert: true }).then((user) => {
//             return user;
//         })
//     }

//     static findById(id) {
//         const db = mongoDb();
//         return db.collection('users').findOne({ _id: ObjectId(id) }).then(user => {
//             return user;
//         })
//     }
// }


// module.exports = User;