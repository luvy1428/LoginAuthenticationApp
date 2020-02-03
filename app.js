const mongoose = require('mongoose');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();


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

// Routes
app.use('/', require('./routes/index.js'));



const PORT = process.env.PORT || 5000;
app.listen(PORT,console.log(`Server Running on Port No :- ${PORT}`));