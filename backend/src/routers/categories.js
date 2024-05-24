const express = require("express");
const Recept = require("../models/recept");
const router = new express.Router();

router.get('/', async (req, res) => {
    const categories = await Recept.distinct('SastojciKategorije');
    res.json(categories);
  });

module.exports = router;