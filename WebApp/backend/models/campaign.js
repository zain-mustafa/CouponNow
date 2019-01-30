const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Model created for the schema to use with mongoose
const campaignSchema = mongoose.Schema({
  name: { type: String, required: true },
  business: { type: String, required: true },
  locations: { type: [String], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  maxQty: { type: Number, required: true}
});

// For validation checks with the unique attribute
campaignSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Campaign", campaignSchema);
