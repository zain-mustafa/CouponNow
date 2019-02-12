const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const CustomerInterest = require('../models/customerinterest');
const Tag = require('../models/tag');
const Customer = require('../models/customer');

const router = express.Router();

function chooseInterests (req, res) {
  const customerToken = jwt.decode(req.customerToken);
  const customerId = mongoose.Types.ObjectId(customerToken.userId);
  let selectedInterests = req.interests;

  Customer.findById(customerId)
    // first check to see if the customer exists
    .then(customer => {
      if (!customer) {
        throw new Error('Customer with id ' + customerId + 'was not found!');
      }
    })
    // find existing tags
    .then(() => {
      return findTags(selectedInterests)
    })
    // save tags
    .then(tags => {
      let customerInterests = [];

      tags.forEach(tag => {
        let tagId = tag._id;
        let customerInterest = new CustomerInterest({customer_id: customerId, tag_id: tagId});

        customerInterest.save(err => {
          if (err) {
            console.log(err);
            throw new Error('Error saving customer interest: ' + tag.text);
          }
        });

        customerInterests += customerInterest;
      })
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({error: err});
    });

}

function findTags(selectedInterests) {
  return Tag.find({
    'text': { $in: selectedInterests}
  })
}

module.exports = {chooseInterests};
