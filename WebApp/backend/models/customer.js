const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Model created for the schema to use with mongoose
const customerSchema = mongoose.Schema({
  type: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  dateofbirth: { type: Date },
  gender: { type: String },
  occupation: { type: String },
  couponradius: { type: Number, default: 10 },
  interests: [{
    interest: { type: String},
    rating: { type: Number}
  }],
  acceptedCoupons: []
});

// For validation checks with the unique attribute
customerSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Customer", customerSchema, 'users');
