const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const Customer = require('../../models/customer');


router.post("/", (req, res, next) => {
  console.log('Sign up request for: ' + req.body.email);
  // Hash function used to secure password
  bcrypt.hash(req.body.password, 10)
  // then command used to get the hash value and create customer
    .then(hash => {
      const customer = new Customer({
        type: req.body.type,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash
      });
      // Saving the customer into the Database
      customer.save()
        .then(result => {
          res.status(201).json({ // 201 indicates creation and responds the result in json format
            message: 'Customer Created!',
            result: result
          });
          console.log('Customer created with email ' + customer.email);
        })
        .catch(err => { // 500 indicates Server Error and returns the error in json format
          console.log(err.name);
          if(err.name === 'ValidationError') {
            res.status(500).json({
              error: err,
              message: err.name
            });
          }
          res.status(500).json({
            error: err,
          });
        });
    });
});

router.post('/savecustomersetupinfo', (req, res, next) => {
  console.log("Received request to save:");
  console.log(req.body);

  Customer.findOne({email: req.body.email})
    .then(customer => {
      if (!customer) {
        throw new Error('Customer ' + req.body.email + " was not found");
      }
      console.log("Customer found");

      customer.dateofbirth = new Date(req.body.birthYear, req.body.birthMonth - 1, req.body.birthDay);
      customer.gender = req.body.gender;
      customer.occupation = req.body.occupation;

      customer.save();

      console.log('Updated customer with new personal info');
      res.status(200)
        .json(
          {
            message: 'Updated customer with new personal info',
            customerInfo: {
              dateOfBirth: customer.dateofbirth,
              gender: customer.gender,
              occupation: customer.occupation
            }
          });
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json('Unable to save customer personal information');
    })
});

module.exports = router;
