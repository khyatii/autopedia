require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const db = require('./config/dbconfig');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require("passport");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
require('./config/passport')(passport);

const auth = require('./routes/auth');
const favourites = require('./routes/favourites');
const discover = require('./routes/discover');
const autopedia = require('./routes/autopedia');
// put the HTML file containing your form in a directory named "public" (relative to where this script is located)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(function (req, res, next) {
    //set headers to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json({ limit: '50mb' }));
// // app.use(session({
// //     secret: process.env.SESSION_SECRET,
// //     name: 'SSID',
// //     resave: true,
// //     saveUninitialized: false,
// //     cookie: {
// //         httpOnly: true,
// //         //siempre false sino no funcionará el auth
// //         secure: false,
// //         //miliseconds
// //         maxAge: 12 * 30 * 24 * 60 * 60 * 1000
// //     },
// //     store: new MongoStore({
// //         mongooseConnection: mongoose.connection,
// //         //seconds
// //         ttl: 12 * 30 * 24 * 60 * 60
// //     })
// }));
app.use(passport.initialize());
app.use(passport.session());



//routes
app.use('/', auth);
app.use('/favourites', favourites);
app.use('/discover', discover);
app.use('/autopedia', autopedia);

var port = process.env.port || 4000

app.listen(port);
console.log(`server started on ${port}`)

