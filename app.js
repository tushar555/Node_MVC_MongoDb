const express = require('express');
const app = express();
const parser = require('body-parser');

const viewRoute = require('./routes/shop-route');
const adminRoute = require('./routes/admin-route');
const authRoute = require('./routes/auth-route');

const path = require('path');
const mainPath = require('./util/path');
const errorController = require('./controllers/error-controller');
const mongoose = require('mongoose');
const session = require('express-session');
const User = require('./model/user-model');
const MongoDBStore = require('connect-mongodb-session')(session);

app.set('view engine', 'ejs');
app.set('views', 'views');


const store = new MongoDBStore({
    uri: "mongodb+srv://tusharsaindane02:FTOXXjTSl92P4BAq@cluster0-golou.mongodb.net/shop",
    collection: 'session'

})

app.use(session({ secret: 'my secrete', resave: false, saveUninitialized: false, store: store }))
app.use((req, res, next) => {
    User.findById(req.session.user._id).then((user) => {
        req.user = user;
        next();
    })

});
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', viewRoute.routes);
app.use('/', adminRoute.routes);
app.use(authRoute);

// app.use(errorController.get404);

mongoose.connect("mongodb+srv://tusharsaindane02:FTOXXjTSl92P4BAq@cluster0-golou.mongodb.net/shop?retryWrites=true&w=majority"
).then((result) => {
    User.findOne().then((user) => {

        if (!user) {
            const user = new User({ name: 'Tushar', email: 'tushar@gmail.com', cart: { items: [] } })
            user.save().then(() => {

            })
        }
        app.listen(3000);

    })

})


