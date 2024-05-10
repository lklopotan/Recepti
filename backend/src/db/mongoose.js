const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Coolinarika"
).then(() => {
    console.log("Connected to database!");
}).catch(error => {
    console.log("Unable to connect to database", error);
})