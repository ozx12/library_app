const express = require('express');
const router = express.Router();
const User = require("../../models/user.js");
const passport = require('passport');


router.get('/login', (req, res) => {
    res.render("login", {
        title: "Cтраница входа"
    });
});

router.get('/me', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/user/login')
    }
    res.render("me", {
        title: "Cтраница профиля",
        user: req.user
    });
});

router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
      res.redirect('/'); 
    });
  });

router.get('/register', (req, res) => {
    res.render("register", {
        title: "Cтраница Регистрация",
        user: req.user
    });
})

router.post("/signup", passport.authenticate("local", { 
    failureRedirect: "/user/login"
}), function (req, res, next) {    
    res.redirect('/')
});



router.post('/register', (req, res, next) => {
    var email = req.body.email;
    var username = req.body.username;    
    var password = req.body.password;
    User.register(new User({ username: username, email: email }),
        password, function (err, user) {
            if (!err) {
                next();
                return res.redirect("/user/signup");
            } else {
                console.log(err);
            }
        });
});

module.exports = router;