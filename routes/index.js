const express = require('express');
const router = express.Router();

const books = require("../DB/books.js");
const Book = require("../models/book.js");



router.get('/', (req, res) => {      
    res.render("index", {
        title: "Список всех книг",
        books
    });
});



module.exports = router;