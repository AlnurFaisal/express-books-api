var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Books = require("../models/booksModel.js")

/* GET books listing. */
router.get("/", function(req, res) {
  Books.find(function(err, books){
    if(err){
      console.log(err);
      res.send(err);
    } else {
      console.log(`Get all books`);
      res.send({books, message: "Get all books"});
    }  
  });
});

router.get("/:title", function(req, res) {
  let title = req.params.title;
  let regex = new RegExp(title, "i");
  // var regex = new RegExp('/' + stringToGoIntoTheRegex + "#", "g");
  console.log(title);
  Books.find({ title: regex }, function(err, books){
    if(err){
      console.log(err);
      res.send(err);
    } else{
      console.log(`Get book with title ${title}`);
      res.send({books, message: `Get book with title ${title}` });
    }
  });
});

router.post("/", function(req, res) {
  let myBook = new Books({
    title: req.body.title,
    summary: req.body.summary,
    author: req.body.author
  });
  myBook.save().then(function(){
    console.log(`Book Successfully Created`);
    res.send({myBook, message:"Book Successfully Created"});
  })
  .catch((err) => console.log(err));
});

router.put("/:title", function(req, res) {
  // let body = req.body;
  let newtitle = {title: req.body.title};
  let title = req.params.title;
  Books.findOneAndUpdate(title, newtitle, function(err, books){
    if(err){
      console.log(err);
      res.send(err);
    } else{
      console.log(`Book Successfully Updated`);
      res.send({title:newtitle, message:"Book Successfully Updated"});
    }
  });
});

router.delete("/:title", function(req, res) {
  let title = req.params.title;
  Books.findOneAndRemove(title, function(err, books){
    if(err){
      console.log(err);
      res.send(err);
    } else{
      console.log(`Book Successfully Deleted`);
      res.send({title:title, message:"Book Successfully Deleted"});
    }
  })
});

module.exports = router;
