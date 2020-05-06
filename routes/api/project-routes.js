const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const cors = require('cors');
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const projectsController = require("../../controllers/projectsController");

// Load input validation
// const validateRegisterInput = require("../../validation/register");
// const validateLoginInput = require("../../validation/login");

// Load User model
const Project = require("../../models/Project");
router.use(cors())
process.env.SECRET_KEY = 'secret';

router.post('/api/addProject', (req, res) => {
    // Form validation
    // const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }

    Project.findOne({
        planter_name: req.body.planter_name
    })
    .then( response => {
        if (response) {
            res.status(400).json({ planter_name: "Planter already exists" });
            return res.send("Planter already exists");
        }
        else {
            const today = new Date()
            const projectData = {
                planter_name: req.body.planter_name,
                volume: req.body.volume,
                chosenMaterial: req.body.chosenMaterial,
                reqTonne: req.body.reqTonne,
                reqCost: req.body.reqCost,
                created: today
            }
            
            Project.create(projectData)
            .then(project => {
                res.json(project);
            })
            .catch(err => {
                console.log(err);
            })
        }
    })
})

router.get('/api/displayprojects', (req, res) => {
    Project.find()
        .then(response => {
            if (response) {
                res.json(response)
            }
            else {
                res.status(400).json({ error: "Projectss do not exist" });
            }
        })
        .catch(err => {
            res.send('error: ' + err);
        })
})

router.delete('/api/deleteproject/:id', (req, res) => {
    Project.remove()
        .then(response => {
            if (response) {
                res.json(response)
            }
            else {
                res.status(400).json({ error: "Projects do not exist" });
            }
        })
        .catch(err => {
            res.send('error: ' + err);
        })
})

// Matches with "/api/books/:id"
router
  .route("/api/projects/:id")
  .get(projectsController.findById)
  .put(projectsController.update)
  .delete(projectsController.remove);

// Matches with "/api/books"
router.route("/api/projects")
  .get(projectsController.findAll)
  .post(projectsController.create);

module.exports = router;
