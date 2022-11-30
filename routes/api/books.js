const express = require('express');
const router = express.Router();
const Book = require("../../models/book.js");

router.get('/', async (req, res) => {
    try {
        const books = await Book.find().select('-__v');
        res.json(books);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Book.deleteOne({ _id: id })
        res.json('ok');
    } catch (e) {
        res.status(500).json(e)
    }
});

router.post('/', async (req, res) => {

    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    var fileBook = "";
    if (req.file) {
        fileBook = req.file.filename;
    }

    const newBook = new Book({
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
        fileBook
    })

    try {
        await newBook.save()
        res.status(201);
        res.json(newBook);
    } catch (e) {
        res.status(500).json(e)
    }
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findById(id).select('-__v');
        res.json(book);

    } catch (e) {
        res.status(404);
        res.json('404 | страница не найдена');
    }
});

router.put('/:id', async (req, res) => {
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const { id } = req.params;

    try {
        await Book.findByIdAndUpdate(id, { title, description, authors, favorite, fileCover, fileName })
        res.redirect(`/api/books/${id}`)
    } catch (e) {
        res.status(404);
        res.json('404 | страница не найдена');
    }
});


module.exports = router;