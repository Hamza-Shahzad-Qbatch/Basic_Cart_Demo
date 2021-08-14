const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/product_api", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Connection is Successful");
}).catch((err) => {
    console.log("No Connection");
})
