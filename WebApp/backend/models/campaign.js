const mongoose = require('mongoose');

// Model created for the schema to use with mongoose
const campaignSchema = mongoose.Schema({
  name: { type: String, required: true },
  business: { type: String, required: true },
  busId: { type: String, required: true },
  ownerEmail: { type: String, required: true },
  locNames: [{type: String, required: true}],
  locations: {
    type: {
      type: String,
      default: "MultiPoint"
    },
    coordinates: [[]]
  },
  tag: [ { type: String, required: true } ],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  maxQty: { type: Number, required: true},
  image: { type: String, required: false}
});

// For validation checks with the unique attribute

campaignSchema.index({locations: "2dsphere"});
module.exports = mongoose.model("Campaign", campaignSchema);
