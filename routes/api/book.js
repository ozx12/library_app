const express = require('express');
const router = express.Router();
const fileMulter = require('../../middleware/file');
const Book = require("../../models/book.js");



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

router.get('/update/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.find({ id: id });
        res.render("update", {
            title: "Редактируем книгу",
            books: book[0]
        });

    } catch (e) {
        res.status(404);
        res.json('404 | страница не найдена');
    }
});

router.get('/create', (req, res) => {
    res.render("create", {
        title: "Новая книга",
        books: "",
    });
});



router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.find({ id: id });
        res.render("view", {
            title: "Просмотр книги",
            books: book[0]
        });

    } catch (e) {
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


router.post('/create', fileMulter.single('fileBook'), async (req, res) => {

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
        res.redirect('/');
    } catch (e) {
        res.status(500).json(e)
    }
});

router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Book.deleteOne({ id: id })
        res.redirect('/');
    } catch (e) {
        res.status(500).json(e)
    }
});


router.post('/update/:id', fileMulter.single('fileBook'), async (req, res) => {

    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const { id } = req.params;

    var fileBook = "";
    if (req.file) {
        fileBook = req.file.filename;
    };

    try {
        const book = await Book.findOneAndUpdate({ id: id },
            {
                $set: {
                    title: title,
                    description: description,
                    authors: authors,
                    favorite: favorite,
                    fileCover: fileCover,
                    fileName: fileName,
                    fileBook: fileBook
                }

            }
        );
        res.redirect('/');

    } catch (e) {
        res.status(404);
        res.json('404 | страница не найдена');
    }
});




module.exports = router;