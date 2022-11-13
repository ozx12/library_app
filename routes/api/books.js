const express = require('express');
const router = express.Router();
const fileMulter = require('../../middleware/file');
const books = require("../../models/book.js");



router.get('/', (req, res) => {
    const {book} = books;
    res.json(book);
});

router.post('/api/user/login', (req, res) => {
    const {book} = books;
    res.status(201);
    res.json({ id: 1, mail: "test@mail.ru" });
});

router.get('/:id', (req, res) => {
    const {book} = books;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if( idx !== -1) {
        res.json(book[idx]);
    } else {
        res.status(404);
        res.json('404 | страница не найдена');
    }
});

router.get('/:id/download', (req, res) => {
    const {book} = books;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if( idx !== -1) {
        res.json(book[idx]);
    } else {
        res.status(404);
        res.json('404 | страница не найдена');
    }
});

router.post('', (req, res) => {
    const {book} = books;
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body;

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);
    book.push(newBook);

    res.status(201);
    res.json(newBook);
});

router.delete('/:id', (req, res) => {
    const {book} = books;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);
     
    if(idx !== -1){
        book.splice(idx, 1);
        res.json('ok');
    } else {
        res.status(404);
        res.json('404 | страница не найдена');
    }
});


router.put('/:id', (req, res) => {
    const {book} = books;
    const {title, description, authors, favorite, fileCover, fileName,  fileBook} = req.body;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1){
        book[idx] = {
            ...book[idx],
            title, 
            description, 
            authors, 
            favorite, 
            fileCover, 
            fileName,
            fileBook
        }

        res.json(book[idx]);
    } else {
        res.status(404);
        res.json('404 | страница не найдена');
    }
});

module.exports = router;