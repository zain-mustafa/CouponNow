const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Customer = require('../models/customer');

function updateCustomerProfileInfo(req, res) {

  const requiredFields = ['firstName', 'lastName', 'email', 'gender', 'occupation', 'couponRadius'];

  const customerToken = jwt.decode(req.body.customerToken);
  const customerId = mongoose.Types.ObjectId(customerToken.userId);

  validateRequest(req, res, requiredFields)
    .then(() => {
      return Customer.findById(customerId).exec();
    })
    .then(customer => {
      return validateNewInfo(req, res, customer);
    })
    .then(customer => {
      if (!customer) {
        throw new Error('Customer with id ' + customerId + 'was not found!');
      }

      let newInfo = req.body.newInfo;

      customer.firstname = newInfo.firstName;
      customer.lastname = newInfo.lastName;
      customer.email = newInfo.email;
      customer.gender = newInfo.gender;
      customer.occupation = newInfo.occupation;
      customer.couponradius = newInfo.couponRadius;

      return customer.save()
    })
    .then(() => {
      res.status(200).json({message: 'New profile information successfully saved for customerId ' + customerId});
    })
    .catch(err => {
      res.status(400).json({error: 'Could not update profile information for customerId ' + customerId
          + ' -> ' + err.message});
    });

}

function validateRequest(req, res, requiredFields) {
  return Promise.resolve(() => {
    if (req.body.customerToken == null) {
      throw new Error('Request to update customer profile info was missing a token');
    } else if (req.body.newInfo == null) {
      throw new Error('Request to update customer profile info was missing the new info');
    }

    requiredFields.forEach(field => {
      if (!req.body.newInfo.hasOwnProperty(field)) {
        throw new Error('Required field was missing from the form: ' + field);
      }
    });
  });
}

function validateNewInfo(req, res, customer) {
  const newInfo = req.body.newInfo;

  return Promise.resolve(() => {
    const genderOptions = ['male', 'female', 'other'];

    if (!newInfo.firstName) {
      throw new Error('First name is invalid');
    } else if (!newInfo.lastName) {
      throw new Error('Last name is invalid');
    } else if (!newInfo.gender || !genderOptions.includes(newInfo.gender.toLowerCase())) {
      throw new Error('Gender is invalid');
    } else if (!newInfo.occupation) {
      throw new Error('Occupation is invalid');
    } else if (newInfo.couponRadius <= 0) {
      throw new Error('Coupon radius is invalid');
    }
  }).then(() => {
    if (customer.email !== newInfo.email) {
      if (!customer.email) {
        throw new Error('Email is invalid');
      } else {
        // check to see if new email is taken
        return Customer.find({email: newInfo.email, _id: {$ne: customer._id}})
          .then(otherCustomer => {
            if (otherCustomer) {
              throw new Error('Customer with same email already exists!');
            }
          });
      }
    }
  }).then(() => {
    return customer;
  });
}

module.exports = {updateCustomerProfileInfo};
