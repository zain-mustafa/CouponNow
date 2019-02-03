const mongoose = require('mongoose'),
        Schema = mongoose.Schema;

const tagSchema = new Schema({
        customer_id: {
                type: Schema.Types.ObjectId,
                ref: 'Customer',
                required: true
        },
        tag_id: {
                type: Schema.Types.ObjectId,
                ref: 'Tag',
                required: true
        }
});

tagSchema.index({customer_id: 1, tag_id: 1}, {unique: true});

module.exports = mongoose.model("CustomerInterest", tagSchema);
