const mongoose = require("mongoose");

const receptSchema = new mongoose.Schema({
    ID: Number,
    Naziv: String,
    Vrsta: String, 
    ZaOsoba: Number, 
    Vrijeme: Number, 
    Ocjena: Number, 
    SastojciKategorije: [String], 
    Sastojci: [String], 
    Upute: String, 
    Savjet: String, 
}, { collection: "Recepti", timestamps: true });

const Recept = mongoose.model('Recept', receptSchema);
module.exports = Recept;