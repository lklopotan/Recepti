const express = require("express");
const Recept = require("../models/recept");
const router = new express.Router();

router.get('/recepti', async (req, res) => {
    try {
        const recepti = await Recept.find({});
        res.status(200).send(recepti);
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;