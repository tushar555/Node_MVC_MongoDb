const { mongoDb } = require('../util/database');
const { ObjectId } = require('mongodb');

const db = require('../util/database').mongoDb;

class User {
    constructor(username, email) {
        this.username = username,
            this.email = email
    }

    save() {
        const db = mongoDb();
        return db.collection('users').update({}, { $set: this }, { upsert: true }).then((user) => {
            return user;
        })
    }

    static findById(id) {
        const db = mongoDb();
        return db.collection('users').findOne({ _id: ObjectId(id) }).then(user => {
            return user;
        })
    }
}


module.exports = User;