const express = require('express');
const mongoose = require('mongoose');
const bookRouter = require('./routes/api/book');
const booksRouter = require('./routes/api/books'); //Роутер для задания 2.7
const userRouter = require('./routes/api/user');
const indexRouter = require('./routes/index');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require("./models/user");
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

//Настройка локальной аутентификации с помощью PassportJS

passport.use(new LocalStrategy(User.authenticate()));

app.use(require("express-session")({
  secret: "Secrt",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Конец Настройки локальной аутентификации с помощью PassportJS

app.use('/book', bookRouter);
app.use('/user', userRouter);
app.use('/', indexRouter);
app.use('/api/books', booksRouter); //Роутер для задания 2.7

async function start(PORT, UrlDB) {
    try {
        await mongoose.connect(UrlDB);
        app.listen(PORT)
    } catch (e) {
        console.log(e);
    }
}


const UrlDB = process.env.UrlDB;
const PORT = process.env.PORT || 3000;
start(PORT, UrlDB);
console.log(`http://localhost:${PORT}`)

