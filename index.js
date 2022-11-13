const express = require('express');
const booksRouter = require('./routes/api/books');
const userRouter = require('./routes/api/user');
const books = require('./models/book');


const app = express();
app.use(express.json());
app.use('/api/books', booksRouter);
app.use('/api/user', userRouter);


console.log (books);

const PORT = process.env.PORT || 3000;
app.listen(PORT);

console.log(`http://localhost:${PORT}`)