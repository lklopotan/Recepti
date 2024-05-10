const express = require("express");
const receptiRouter = require("./routers/recept");
require("./db/mongoose");

const app = express();

app.use(express.json());

app.use(receptiRouter);

app.listen(3000, () => {
    console.log("Application is running on the port 3000!")
})