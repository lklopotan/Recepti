const express = require("express");
const multer = require('multer');
const path = require('path');
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

module.exports = router;