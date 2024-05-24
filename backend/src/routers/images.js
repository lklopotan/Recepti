const express = require("express");
const multer = require('multer');
const path = require('path');
const Recept = require("../models/recept");
const fs = require('fs');
const router = new express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('slika'), (req, res) => {
    res.json({ filename: req.file.filename });
  });

router.delete('/from-recept/:id', async (req, res) => {
  const recept = await Recept.findById(req.params.id);
  if (!recept) {
      return res.status(404).send('Recipe not found');
  }

  const imagePath = path.join(__dirname, '..', '..', 'images', recept.Slika ? recept.Slika : '');
  fs.unlink(imagePath, async (err) => {
      if (err) {
        return res.status(404).send('Image not found');
      }
      const noviRecept = {
        ...recept,
        Slika: null
      };
      res.send(await Recept.findByIdAndUpdate(req.params.id, noviRecept, { new: true }));
  });
});

module.exports = router;