const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Model created for the schema to use with mongoose
const customerSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phone: { type: Number, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true}
});

// For validation checks with the unique attribute
customerSchema.plugin(uniqueValidator);

module.exports = mongoose.model("BusinessOwner", customerSchema);
