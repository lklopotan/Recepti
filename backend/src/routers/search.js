const express = require("express");
const Recept = require("../models/recept");
const router = new express.Router();

router.post('/', async (req, res) => {
    try {
        const textPretraga = new RegExp(req.body.textPretraga, 'i');
        const results = await Recept.find({
            $or: [
            { Naziv: { $regex: textPretraga } },
            { Vrsta: { $regex: textPretraga } },
            { SastojciKategorije: { $regex: textPretraga } },
            { Sastojci: { $regex: textPretraga } },
            { Upute: { $regex: textPretraga } },
            { Savjet: { $regex: textPretraga } }
            ]
        });
        res.status(200).send(results);
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;