const express = require('express');
const router = new express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Cart = require('../models/cart');
const auth = require('../middleware/auth');

router.post('/login', async (req, res) => {
    const { email, password, old_token_id } = req.body;  //token in header ?
    try {
        const isExist = await User.findOne({ email: email });
        if (!isExist) {
            return res.status(403).send('User Not Exists');
        }

        if (await bcrypt.compare(password, isExist.password)) {
            if (old_token_id) {
                const user = await Cart.find({ userId: email });
                console.log('User : ' + user);
                await Cart.updateMany({ userId: old_token_id }, { userId: email })
            }

            const token = jwt.sign(
                { email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: 500,
                }
            );
            const obj = {
                name: isExist.name,
                email: isExist.email,
                password: isExist.password,
                token: token
            };
            res.status(200).json(obj);
        }
        else {
            res.status(401).send("Invalid Credentials");
        }

    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const isExist = await User.findOne({ email: email });
        if (isExist) {
            console.log('IS Exists : ' + isExist)
            return res.status(409).send('User Already Exists');
        }

        const encryptedPassword = await bcrypt.hash(password, 15);
        const newUser = new User({
            name,
            email: email.toLowerCase(),
            password: encryptedPassword
        });

        const result = await newUser.save();
        console.log('Result : ' + result);
        res.status(201).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/user', auth, async (req, res) => {
    const { user_email } = req;
    try {
        const isExist = await User.findOne({ email: user_email });
        if (isExist) {
            const obj = {
                name: isExist.name,
                email: isExist.email,
                password: isExist.password,
            };
            res.status(200).json(obj);
        }
        else {
            return res.status(404).send('User Not Exists');
        }
    } catch (error) {
        res.status(400).send(error);
    }

});

module.exports = router;
