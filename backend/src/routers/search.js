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

router.post('/napredna', async (req, res) => {
    try {
        const { textPretraga, ZaOsobaOd, ZaOsobaDo, vrijemeOd, vrijemeDo, ocjenaOd, ocjenaDo, SastojciKategorije } = req.body;

        const query = {};

        if (textPretraga) {
            const textPretragaRegex = new RegExp(textPretraga, 'i');
            query.$or = [
                { Naziv: { $regex: textPretragaRegex } },
                { Vrsta: { $regex: textPretragaRegex } },
                { SastojciKategorije: { $regex: textPretragaRegex } },
                { Sastojci: { $regex: textPretragaRegex } },
                { Upute: { $regex: textPretragaRegex } },
                { Savjet: { $regex: textPretragaRegex } }
            ];
        }

        if (ZaOsobaOd !== undefined && ZaOsobaDo !== undefined) {
            query.ZaOsoba = { $gte: ZaOsobaOd, $lte: ZaOsobaDo };
        }

        if (vrijemeOd !== undefined && vrijemeDo !== undefined) {
            query.Vrijeme = { $gte: vrijemeOd, $lte: vrijemeDo };
        }

        if (ocjenaOd !== undefined && ocjenaDo !== undefined) {
            query.Ocjena = { $gte: ocjenaOd, $lte: ocjenaDo };
        }

        if (SastojciKategorije && SastojciKategorije.length > 0) {
            query.SastojciKategorije = { $all: SastojciKategorije };
        }

        const results = await Recept.find(query);
        res.status(200).send(results);
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;