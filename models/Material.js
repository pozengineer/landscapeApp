const mongoose = require("mongoose");
const Float = require('mongoose-float').loadType(mongoose);
const Schema = mongoose.Schema;

// Create Schema
const MaterialSchema = new Schema({
  material_name: {
    type: String,
    required: true
  },
  density: {
    type: Float,
    required: true
  },
  cost: {
    type: Float,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Material = mongoose.model("materials", MaterialSchema);

module.exports = Material;

// module.exports = User = mongoose.model("users", UserSchema);
