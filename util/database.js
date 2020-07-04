const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;
const url = "mongodb+srv://tusharsaindane02:FTOXXjTSl92P4BAq@cluster0-golou.mongodb.net/shop?retryWrites=true&w=majority"
const mongoConnect = () => new Promise((resolve, reject) => {
    MongoClient.connect(url)
        .then(result => {
            _db = result.db();
            resolve(_db);
        }).catch(err => reject(err));
})

exports.mongoDb = () => {
    if (_db) {
        return _db
    }

    // throw 'Error'
}

exports.mongoConnect = mongoConnect;

