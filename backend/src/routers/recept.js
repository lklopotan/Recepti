const express = require("express");
const Recept = require("../models/recept");
const router = new express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', async (req, res) => {
    try {
        const recepti = await Recept.find({});
        res.status(200).send(recepti);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post('/', async (req, res) => {
    const recept = new Recept(req.body);
    try {
        await recept.save();
        res.status(201).send(recept);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const recept = await Recept.findById(req.params.id);
        if (!recept) {
            return res.status(404).send('Recipe not found');
        }

        const imagePath = path.join(__dirname, '..', '..', 'images', recept.Slika ? recept.Slika : '');
        fs.unlink(imagePath, async (err) => {
            if (err) {
                console.log(`Image ${recept.Slika} does not exist!`);
            }

            const recipe = await Recept.findByIdAndDelete(req.params.id);
            if (!recipe) {
                return res.status(404).send('Recipe not found');
            }
            res.send('Recipe deleted successfully');
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
  });


  router.put('/:id', async (req, res) => {
    try {
      const recept = await Recept.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!recept) {
        return res.status(404).send('Recept not found');
      }
      res.send(recept);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;