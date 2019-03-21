const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport")
//const db = require("./configs/database");
var logger = require('morgan');
const app = express();


//var usersRouter = require('./routes/users');
app.set('view engine', 'ejs');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/reddit-clone1', {useNewUrlParser: true})
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

// making the connection to mongo database
//mongoose.connect(db.config.uri, db.config.options);

// middlewares for express routes
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(require('express-session')({
    secret: 'iditchedangular',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    res.locals.isauth = req.isAuthenticated();
    next();
});

// express routes that exist
app.use(logger('dev'));
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/front'));
app.use('/', require('./routes/index'));
app.use('/r/', require('./routes/subreddit'));
app.use('/api', require('./routes/api'));
app.use('/', require('./routes/auth_twitter'));
//app.use('/', require('./routes'));


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

//app.use('/users', usersRouter);

//var auth1 = require('./routes/auth1');
//app.use('/auth1', auth1);

app.get('*', function (req, res) {
    res.status(404);
    res.render("./error")
});

validator = require('express-validator/check');

app.get('/show/:id', [

    validator.param('id').isMongoId().trim()

], function(req, res) {

    // validation result
    var errors = validator.validationResult(req);

    // check if there are errors
    if ( !errors.isEmpty() ) {
        return res.send('404');
    }

    // else 
    model.findById(req.params.id, function(err, doc) { 
        return res.send(doc);
    });

});

/*
// functions for persistant sessions
passport.serializeUser(function (user_id, done) {
    done(null, user_id);
});
passport.deserializeUser(function (user_id, done) {
    done(null, user_id);
});

*/


app.listen(process.env.PORT || 5000, function () {
    console.log("listening");
});