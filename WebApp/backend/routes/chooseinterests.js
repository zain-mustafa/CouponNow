const express = require('express');
const mongoose = require('mongoose');

const CustomerInterest = require('../models/customerinterest');
const Tag = require('../models/tag');

const router = express.Router();

function chooseInterests (req) {
    let customerId = mongoose.Types.ObjectId(req.customerId);
    let selectedInterests = req.interests;

    // get the actual entities so we can use their IDs
    findTags(selectedInterests)
        .then(function(tags) {
            let customerInterests = [];
            tags.forEach(function(tag) {
                let tagId = tag._id;
                let customerInterest = new CustomerInterest({customer_id: customerId, tag_id: tagId});

                customerInterest.save(function (err) {
                    if (err) {
                        console.log(err);
                    }
                });

                customerInterests += customerInterest;
            })
        })
}

function findTags(selectedInterests) {
    return Tag.find({
        'text': { $in: selectedInterests}
    })
}

module.exports = {chooseInterests};
