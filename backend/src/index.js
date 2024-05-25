const express = require("express");
const receptiRouter = require("./routers/recept");
const receptiSearchRouter = require("./routers/search");
const categoriesRouter = require("./routers/categories");
const imagesRouter = require("./routers/images");
require("./db/mongoose");

const app = express();

app.use(express.json());

app.all('/*', (req, res, next) => {
    // Enable CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,Content-Length,X-Requested-With');
    next();
})

app.use('/recepti', receptiRouter);
app.use('/recepti/pretraga', receptiSearchRouter);
app.use('/kategorije', categoriesRouter);
app.use('/images', imagesRouter);

app.use('/images/download', express.static('images'));

app.listen(3000, () => {
    console.log("Application is running on the port 3000!")
})