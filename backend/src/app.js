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

app.listen(port, () => {
    console.log(`Connection is setup at ${port}.`);
});
