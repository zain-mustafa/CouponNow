const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const CustomerInterest = require('../models/customerinterest');
const Tag = require('../models/tag');
const Customer = require('../models/customer');

function chooseInterests (req, res) {

  if (req.customerToken == null) {
    res.status(400);
    return;
  }

  const customerToken = jwt.decode(req.customerToken);
  const customerId = mongoose.Types.ObjectId(customerToken.userId);
  let selectedInterests = req.interests;

  console.log('New request to save interests for customerId ' + customerToken.userId);

  Customer.findById(customerId)
    // first check to see if the customer exists
    .then(customer => {
      if (!customer) {
        throw new Error('Customer with id ' + customerId + 'was not found!');
      }
    })
    // remove previous interests
    .then(() => {
      console.log('Removing previous interests with customerId ' + customerId);
      return CustomerInterest.deleteMany({customer_id: customerId})
    })
    // find existing tags
    .then(() => {
      console.log('Finding existing tags');
      return findTags(selectedInterests)
    })
    // save new tags if they do not exist
    .then(tags => {
      let newTags = [];

      if (tags.length < selectedInterests.length) {
        console.log('Need to create ' + (selectedInterests.length - tags.length) + ' new tags');

        // convert Tag object array to array of tag texts
        const tagTexts = tags.map(tag => {return tag.text});
        // create new array of interests that contains tags not in existing tags
        const newInterests = selectedInterests.filter(interest => !tagTexts.includes(interest));

        newTags = newInterests.map(interest => {return new Tag({text: interest}).save()});
      }

      return Promise.all(newTags).then(newlySaved => {return tags.concat(newlySaved)});
    })
    // save customer interests
    .then(tags => {
      console.log('Saving ' + tags.length + ' interests for customerId ' + customerId);

      return CustomerInterest.where({customer_id: customerId})
        .setOptions({ upsert: true })
        .updateOne({ $set: { tags: tags }}).exec();
    })
    // send response
    .then(() => {
      res.status(200).json({message: 'Interests successfully saved for customerId ' + customerId});
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({error: err});
    });

}

function findTags(selectedInterests) {
  return Tag.find({
    'text': { $in: selectedInterests}
  });
}

module.exports = {chooseInterests};
