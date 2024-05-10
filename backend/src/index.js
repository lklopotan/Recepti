const express = require("express");
const receptiRouter = require("./routers/recept");
require("./db/mongoose");

const app = express();

app.use(express.json());

app.all('/*', (req, res, next) => {
    // Enable CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Method', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
})

app.use(receptiRouter);

app.listen(3000, () => {
    console.log("Application is running on the port 3000!")
})