const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Material collection and inserts the materials below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/landscapeapp"
);

const materialSeed = [
  {
    material_name: "Road Base",
    density: 1.75,
    cost: 71,
    date: new Date(Date.now())
  },
  {
    material_name: "Nepean River Pebble",
    density: 1.5,
    cost: 125,
    date: new Date(Date.now())
  },
  {
    material_name: "Garden Mix",
    density: 1.2,
    cost: 75,
    date: new Date(Date.now())
  },
  {
    material_name: "Turf Underlay",
    density: 1.4,
    cost: 73,
    date: new Date(Date.now())
  },
  {
    material_name: "Pine Bark Hort",
    density: 0.4,
    cost: 87.5,
    date: new Date(Date.now())
  },
  {
    material_name: "Yellow Brickie Sand",
    density: 1.75,
    cost: 71,
    date: new Date(Date.now())
  }
];

db.Material
  .remove({})
  .then(() => db.Material.collection.insertMany(materialSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
