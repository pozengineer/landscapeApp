const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const cors = require('cors');
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
// const validateRegisterInput = require("../../validation/register");
// const validateLoginInput = require("../../validation/login");

// Load User model
const Material = require("../../models/Material");
router.use(cors())
process.env.SECRET_KEY = 'secret';

router.post('/api/addMaterial', (req, res) => {
    // Form validation
    // const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }

    Material.findOne({
        material_name: req.body.material_name
    })
    .then( response => {
        if (response) {
            res.status(400).json({ email: "Material already exists" });
            return res.send("Material already exists");
        }
        else {
            const today = new Date()
            const materialData = {
                material_name: req.body.material_name,
                density: req.body.density,
                cost: req.body.cost,
                created: today
            }
            
            Material.create(materialData)
            .then(user => {
                res.json(user);
            })
            .catch(err => {
                console.log(err);
            })
        }
    })
})

router.get('/api/displaymaterials', (req, res) => {
    Material.find()
        .then(response => {
            if (response) {
                res.json(response)
            }
            else {
                res.status(400).json({ error: "Materials do not exist" });
            }
        })
        .catch(err => {
            res.send('error: ' + err);
        })
})

module.exports = router;
