require('dotenv').config();
const express = require('express');
require('./db/conn');
const cors = require('cors');

const productRouter = require('./routers/product');
const cartRouter = require('./routers/cart');

const app = express();
const port = process.env.SERVER_PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(productRouter);
app.use(cartRouter);

const jwt = require('jsonwebtoken');
const createToken = async() => {
    // jwt.sign(payload, secretOrPrivateKey, [options, callback])
    const token = await jwt.sign({_id: 'wjegyfjhebfn3121'}, 'secret key');
    console.log(token);
};
createToken();

app.listen(port, () => {
    console.log(`Connection is setup at ${port}.`);
});
