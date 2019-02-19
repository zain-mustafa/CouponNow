const mongoose = require('mongoose'),
        Schema = mongoose.Schema;
const TagSchema = require('./tag').schema;

const customerInterestSchema = new Schema({
        customer_id: {
                type: Schema.Types.ObjectId,
                ref: 'Customer',
                required: true
        },
        tags: [TagSchema]
});

module.exports = mongoose.model("CustomerInterest", customerInterestSchema);
