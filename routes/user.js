const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const {secret,authenticateJwt} = require('../middleware/auth');
const router = express.Router();
const User = require('../db')


router.post('/signup', async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email})
    if (user) {
        res.status(201).json({ massage: "user Already exist" });
    } else {
        const obj = {
            email,
            password
        }
        const newUser = new User(obj);
        newUser.save();
        const token = jwt.sign({ email, password }, secret, { expiresIn: '3h' });
        res.status(200).json({ massage: "user account created sucessfully", token: token });
    }
})

router.post('/signin', async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email,password});
    if (!user) {
        res.status(201).json({ massage: "email or password incorrect" });
    } else {
        const token = jwt.sign({ email, password }, secret, { expiresIn: '3h' });
        res.status(200).json({ massage: "login sucessfully", token: token, email });
    }
})

router.get('/me', authenticateJwt, async(req, res) => {
    res.status(200).json({ email: req.user.email });
})

router.put('/updateUserInfo', authenticateJwt, async(req, res) => {
    const { email, password } = req.user;
    const userInfo = await User.findOneAndUpdate({ email, password }, req.body,{new:true});
    res.status(200).json({massage: "saved successfully"});
})

router.get('/getUserInfo', authenticateJwt, async(req, res) => {
    const { email, password } = req.user;
    const user = await User.findOne({ email, password });
    res.status(200).json(user);
})


module.exports = router;
