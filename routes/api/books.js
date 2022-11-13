const express = require('express');
const router = express.Router();
const fileMulter = require('../../middleware/file');
const books = require("../../DB/books.js");
const Book = require("../../models/book.js");


router.get('/', (req, res) => {
    const {book} = books;
    res.json(book);   
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
        let getFile = (book[idx].fileBook);
        if (getFile !== '' ){
        console.log (getFile);
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


router.post('/', fileMulter.single('fileBook'), (req, res) => {
    const {book} = books;
    const {title, description, authors, favorite, fileCover, fileName} = req.body; 
    var fileBook = "";
    if(req.file){
        fileBook = req.file.filename;
    }
    console.log(fileBook);



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


router.put('/:id', fileMulter.single('fileBook'), (req, res) => {
    const {book} = books;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);
    
    var fileBook = "";
    if(req.file){
        fileBook = req.file.filename;
    }
    console.log(fileBook);


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