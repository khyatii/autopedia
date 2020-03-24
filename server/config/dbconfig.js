const mongoose = require('mongoose');
var dbUrl = require('../config/url').dbUrl;

mongoose.connect(`${dbUrl}`, { useNewUrlParser: true }, (err) => {
    if (err)
        console.log(err)
    else
        console.log("Database Connected")
});