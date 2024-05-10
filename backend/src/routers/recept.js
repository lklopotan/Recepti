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

router.post('/recepti', async (req, res) => {
    const recept = new Recept(req.body);
    try {
        await recept.save();
        res.status(201).send(recept);
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;