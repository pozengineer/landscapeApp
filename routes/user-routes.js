const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const cors = require('cors');
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// Load User model
const User = require("../models/User");
router.use(cors())
process.env.SECRET_KEY = 'secret';

router.post('/api/register', (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({
        email: req.body.email
    })
    .then( user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        }
        else {
            const today = new Date()
            const userData = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password,
                created: today
            }
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) throw err;
                userData.password = hash
                User.create(userData)
                .then(user => {
                    res.json(user);
                })
                .catch(err => {
                    console.log(err);
                })
            })
        }
    })
})

router.post('/api/login', (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                if (bcrypt.compare(req.body.password, user.password)) {
                    const payload = {
                        _id: user._id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                }
                else {
                    res.json({ error: "User does not exist" });
                }
            }
            else {
                res.json({ error: "User does not exist" });
            }
        })
        .catch(err => {
            res.send('error: ' + err);
        })
})

router.get('/api/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    User.findOne({
        _id: decoded._id
    })
        .then(user => {
            if (user) {
                res.json(user)
            }
            else {
                res.json({ error: "User does not exist" });
            }
        })
        .catch(err => {
            res.send('error: ' + err);
        })
})

router.get('/api/displayusers', (req, res) => {
    User.find()
        .then(response => {
            if (response) {
                res.json(response)
            }
            else {
                res.json({ error: "Users do not exist" });
            }
        })
        .catch(err => {
            res.send('error: ' + err);
        })
})

module.exports = router;
