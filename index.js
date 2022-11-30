const express = require('express');
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
    }
});



const app = express();
app.use(express.urlencoded());
app.set("view engine", "ejs");

app.use(express.json());
app.use('/book', booksRouter);
app.use('/user', userRouter);
app.use('/', indexRouter);




const PORT = process.env.PORT || 3000;
console.log(`http://localhost:${PORT}`)
app.listen(PORT);
