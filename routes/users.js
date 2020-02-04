const bcrypt = require('bcryptjs');
const User = require('../models/User');
const express = require('express');
const router = express.Router();

// Login Page
router.get('/login', (req, res) => {
    console.log('test');
    res.render('login')
});

// Register Page
router.get('/users/register', (req, res) => res.render('register'));


router.post('/users/register',(req, res)=>{
    const { name, email, password, password2 } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }
    
    if (password != password2) {
        console.log('passwords do not match');
        errors.push({ msg: 'Passwords do not match' });
    }
    
    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }
    
    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } 
    else{
        User.findOne({email: email})
            .then(user => {
                if (user) {
                    errors.push('Email is already exist');
                    console.log('Email is already exist')
                   /* res.render('register',{
                        errors,
                        name,
                        email,
                        password,
                        password2
                    })*/
                }
                else{
                    const newUser = new User({
                        name,
                        email,
                        password
                    });

                    bcrypt.genSalt(10, (err, salt)=>{
                        bcrypt.hash(newUser.password, salt,(err,hash)=>{
                            if(err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    req.flash(
                                        'success_msg',
                                        'You are now registered and can log in'
                                    );
                                    res.redirect('user/login');
                                })
                                .catch(err => console.log(err));

                        });
                    });
                }
        
        
        });
    }


});

module.exports = router;