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

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;