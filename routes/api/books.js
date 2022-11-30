const express = require('express');
const router = express.Router();
const fileMulter = require('../../middleware/file');
const books = require("../../DB/books.js");
const Book = require("../../models/book.js");


router.get('/', (req, res) => {
    res.render("index", {
        title: "Список книг",
        books
    });
});

router.get('/update/:id', (req, res) => {
    res.render("update", {
        title: "Редактировать книгу",
        books
    });
});

router.get('/create', (req, res) => {
    res.render("create", {
        title: "Новая книга",
        books
    });
});



router.get('/:id', (req, res) => {
    const { book } = books;
    const { id } = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.render("view", {
            title: "Просмотр книги",
            books: book[idx],
        });
    }
    else {
        res.status(404);
        res.json('404 | страница не найдена');
    }
});

router.get('/:id/download', (req, res) => {
    const { book } = books;
    const { id } = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        let getFile = (book[idx].fileBook);
        if (getFile !== '') {
            console.log(getFile);
            res.sendFile(getFile, { root: 'public\\img' });
        } else {
            res.status(404);
            res.json('404 | страница не найдена');
        }


    } else {
        res.status(404);
        res.json('404 | страница не найдена');
    }
});


router.post('/create', fileMulter.single('fileBook'), (req, res) => {
    const { book } = books;
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    var fileBook = "";
    if (req.file) {
        fileBook = req.file.filename;
    }
    console.log(fileBook);



    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);
    book.push(newBook);

    res.status(201);
    res.redirect('/');
});

router.post('/delete/:id', (req, res) => {
    const { book } = books;
    const { id } = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        book.splice(idx, 1);
        res.redirect('/');
    } else {
        res.status(404);
        res.json('404 | страница не найдена');
    }
});


router.post('/update/:id', fileMulter.single('fileBook'), (req, res) => {
    const { book } = books;
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const { id } = req.params;
    const idx = book.findIndex(el => el.id === id);

    var fileBook = "";
    if (req.file) {
        fileBook = req.file.filename;
    }
    


    if (idx !== -1) {
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

        res.redirect('/');
    } else {
        res.status(404);
        res.json('404 | страница не найдена');
    }
});

module.exports = router;