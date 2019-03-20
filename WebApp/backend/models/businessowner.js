const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Model created for the schema to use with mongoose
const customerSchema = mongoose.Schema({
  type: { type: String, required: true},
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phone: { type: Number, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  business:[{
     businessname: { type: String},
      licensenum: { type: String},
      locations: [{
        streetnum: { type: String},
        streetname: { type: String},
        city: { type: String},
        postalcode: { type: String},
        geolocation: {
          type: { type: String },
          coordinates: [Number, Number]
          }
      }]
  }]
});

//need to verify index has been properly created
customerSchema.index({ "business.locations.geolocation": "2dsphere" });

// For validation checks with the unique attribute
customerSchema.plugin(uniqueValidator);

module.exports = mongoose.model("BusinessOwner", customerSchema, 'users');
