const Book = require("../models/book");


const books = {
    book: [
        new Book('Книга 1', 'Описание книги 1', 'Автор книги 1', 'favorite книги 1', 'fileCover книги 1', 'АвfileName книги 1') ,
        new Book('Книга 2', 'Описание книги 2', 'Автор книги 2', 'favorite книги 2', 'fileCover книги 2', 'АвfileName книги 2'),
    ],
};

module.exports = books;
