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
const User = require('./model/user-model');

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use((req, res, next) => {
    User.findById('5f03665895758af9bcb121d8').then((user) => {
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


