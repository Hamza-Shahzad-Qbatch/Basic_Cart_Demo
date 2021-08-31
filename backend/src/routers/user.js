const express = require('express');
const router = new express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Cart = require('../models/cart');

router.post('/login', async (req, res) => {
    const { email, password, old_token_id } = req.body;  //token in header ?
    try {
        const isExist = await User.findOne({ email: email });
        if (!isExist) {
            return res.status(404).send('User Not Exists');
        }

        if (await bcrypt.compare(password, isExist.password)) {
            await Cart.updateMany({ userId: old_token_id }, { userId: email })

            const token = jwt.sign(
                { email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: 450000,
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
            res.status(400).send("Invalid Credentials");
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

router.get('/user/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const isExist = await User.findOne({ email: email });
        if (isExist) {
            console.log('Good Request');
            const token = jwt.sign(
                { email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: 450000,
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
        else{
            return res.status(404).send('User Not Exists');
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
