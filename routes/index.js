const express = require('express');
const router = express.Router();
const Book = require("../models/book.js");

router.get('/', async (req, res) => {
    try {
        const books = await Book.find().select('-__v');
        res.render("index", {
            title: "Список книг",
            books
        });
    } catch (e) {
        res.status(500).json(e);
    }
});


module.exports = router;