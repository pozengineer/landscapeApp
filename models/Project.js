const mongoose = require("mongoose");
const Float = require('mongoose-float').loadType(mongoose);
const Schema = mongoose.Schema;

// Create Schema
const ProjectSchema = new Schema({
  planter_name: {
    type: String,
    required: true
  },
  volume: {
    type: Float,
    required: true
  },
  chosenMaterial: {
    type: String,
    required: true
  },
  reqTonne: {
    type: Float,
    required: true
  },
  reqCost: {
    type: Float,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Project = mongoose.model("projects", ProjectSchema);

module.exports = Project;

// module.exports = User = mongoose.model("users", UserSchema);
