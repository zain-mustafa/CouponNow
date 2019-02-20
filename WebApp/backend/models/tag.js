const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const tagSchema = new Schema({
  text: {
    type: String,
    required: true,
    unique: true
  }
});

tagSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Tag", tagSchema);
