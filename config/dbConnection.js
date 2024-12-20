const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/Movie-card');

const database = mongoose.connection;

database.on('connected', (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log('database is Connected');
})

module.exports = database;