const express = require('express');
<<<<<<< Updated upstream
const { v4: uuid } = require('uuid');


class Book {
    constructor(title = "", description = "", authors = "", favorite = "", fileCover = "", fileName = "", id = uuid()) {
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
        this.id = id;
=======
const booksRouter = require('./routes/api/books');
const userRouter = require('./routes/api/user');
const books = require('./DB/books');
const indexRouter = require('./routes/index');
var fs = require('fs');

fs.stat('public/img', function(err) {
    if (!err) {
        console.log('папка для изображений public/img');
    }
    else if (err.code == 'ENOENT') {         
        fs.mkdir('public/img', { recursive: true }, err => {
           if(err) throw err; // не удалось создать папки
           console.log('папка для изображений успешно создана public/img');
        });
>>>>>>> Stashed changes
    }
};

const books = {
    book: [
        new Book('Книга 1', 'Описание книги 1', 'Автор книги 1', 'favorite книги 1', 'fileCover книги 1', 'АвfileName книги 1') ,
        new Book('Книга 2', 'Описание книги 2', 'Автор книги 2', 'favorite книги 2', 'fileCover книги 2', 'АвfileName книги 2'),
    ],
};


const app = express();
app.use(express.urlencoded());
app.set("view engine", "ejs");

app.use(express.json());
<<<<<<< Updated upstream
=======
app.use('/book', booksRouter);
app.use('/user', userRouter);
app.use('/', indexRouter);
>>>>>>> Stashed changes


app.get('/api/books', (req, res) => {
    const {book} = books;
    res.json(book);
});

app.post('/api/user/login', (req, res) => {
    const {book} = books;
    res.status(201);
    res.json({ id: 1, mail: "test@mail.ru" });
});

app.get('/api/books/:id', (req, res) => {
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

app.post('/api/books', (req, res) => {
    const {book} = books;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName);
    book.push(newBook);

    res.status(201);
    res.json(newBook);
});

app.delete('/api/books/:id', (req, res) => {
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


app.put('/api/books/:id', (req, res) => {
    const {book} = books;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
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
            fileName
        }

        res.json(book[idx]);
    } else {
        res.status(404);
        res.json('404 | страница не найдена');
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT);