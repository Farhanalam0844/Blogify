// const {Router} = require('express');
const express = require('express');
const User = require('../model/user')
const router = express.Router();

router.get('/signup', (req, res) => {
    res.render('signup');
})

router.get('/signin', (req, res) => {
    res.render('signin');
})
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try{

        const token = await User.checkPasswordAndGenerateToken(email, password);
        res.cookie('token', token).redirect('../');
        
    }
    catch(err){
        res.render('signin',{
            error:"Incorrect Email or Password"
        })
    }

})

router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        const user = await User.create({
            fullName,
            email,
            password
        });
        await user.save()
        res.render("home");
    }
    catch (error) {
        console.error(error);
    }
})

module.exports = router;