
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();

// Passport Config
require('./config/passport')(passport);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27018/loginAuth', { useNewUrlParser: true })
.then(()=>console.log('connected to mongodb....'))
.catch(err => console.log('could not connect to mongodb'));


//ejs

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', 'layouts')


app.use(express.json());
app.use(express.urlencoded({extended:false}));
//app.use(cookieParser());

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/users.js'));



const PORT = process.env.PORT || 5000;
app.listen(PORT,console.log(`Server Running on Port No :- ${PORT}`));