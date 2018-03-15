var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Book = require("../models/booksModel.js");

/* GET books listing. */
router.get("/", function(req, res, next) {
  Book.find(function(err, books) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      console.log(`Get all books`);
      res.send({ books, message: "Get all books" });
    }
  });
});

router.get("/:title", function(req, res, next) {
  let title = req.params.title;
  let regex = new RegExp(title, "i");
  console.log(title);
  Book.find({ title: regex }, function(err, books) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      console.log(`Get book with title ${title}`);
      res.send({ books, message: `Get book with title ${title}` });
    }
  });
});

router.post("/", function(req, res, next) {
  let myBook = new Book({
    title: req.body.title,
    summary: req.body.summary,
    author: req.body.author
  });
  myBook
    .save()
    .then(function() {
      console.log(`Book Successfully Created`);
      res.send({ myBook, message: "Book Successfully Created" });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});

router.put("/:title", function(req, res, next) {
  let updateBook = {
    title: req.body.title,
    summary: req.body.summary,
    author: req.body.author
  };
  let title = req.params.title;
  let titleRegexMatcher = new RegExp(title, "i");
  Book.findOneAndUpdate(titleRegexMatcher, updateBook, function(err, books) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      console.log(`Book Successfully Updated`);
      res.send({ title: updateBook, message: "Book Successfully Updated" });
    }
  });
});

router.delete("/:title", function(req, res, next) {
  let title = req.params.title;
  let titleRegexMatcher = new RegExp(title, "i");
  Book.findOneAndRemove(titleRegexMatcher, function(err, books) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      console.log(`Book Successfully Deleted`);
      res.send({ title: title, message: "Book Successfully Deleted" });
    }
  });
});

module.exports = router;
