const express = require('express');
require('./db/conn');
const cors = require('cors');

const productRouter = require('./routers/product');
const cart_productRouter = require('./routers/cartProduct');


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(productRouter);
app.use(cart_productRouter);


app.listen(port, () => {
    console.log(`Connection is setup at ${port}.`);
});
