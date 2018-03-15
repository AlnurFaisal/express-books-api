const mongoose = require("mongoose");
const bookSchema = mongoose.Schema({
    title: String,
    summary: String,
    author: String,
    created: {
        type: Date,
        default: Date.now
    } 
});

var Books = mongoose.model('Books', bookSchema);

module.exports = Books;