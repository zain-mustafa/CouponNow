const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ChooseInterests = require('./chooseinterests');
const CustomerProfile = require('./customerprofile');

const Customer = require('../models/customer');

// Sets up the router coming in from the app.js file
const router = express.Router();

// User Signup Post request
router.post("/signup", (req, res, next) => {
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

// Customer Login Post Request
router.post('/login', (req, res, next) => {

  console.log('Login request for: ' + req.body.email);

  let fetchedCustomer;
  // Using findOne to find the customer from the Database
  Customer.findOne({ email: req.body.email })
    .then(customer => {
      // If the email is not found
      if (!customer) {
        console.log('Customer not found');

        throw new Error('Customer not found');
      }
      console.log('Customer found');
      // If the email is found
      fetchedCustomer = customer;
      // Checks password and returns true of false depending if the password is correct or not
      return bcrypt.compare( req.body.password, customer.password )
    })
    .then(result => {
      // Using result from bcrypt to check result
      // If bcrypt returned false aka account credentials were invalid
      if (!result) {
        console.log('Password was incorrect');
        throw new Error('Password was incorrect');
      }
      console.log('Login successful. Creating token.');

      // If credentials returned true creates a token, setting up the secret for the token and the time it should expire in.
      // This token is will be used to authenticate routes in the future.
      const token = jwt.sign({
        email: fetchedCustomer.email,
        firstname: fetchedCustomer.firstname,
        lastname: fetchedCustomer.lastname,
        userId: fetchedCustomer._id
      }, 'secret_this_should_be_longer', { expiresIn: '1h' } );
      //returns the token and user information as a response to frontend
      res.status(200).json({
        token: token,
        type: fetchedCustomer.type,
        email: fetchedCustomer.email,
        firstname: fetchedCustomer.firstname,
        lastname: fetchedCustomer.lastname,
        userId: fetchedCustomer._id,
        dateOfBirth: fetchedCustomer.dateofbirth,
        gender: fetchedCustomer.gender,
        occupation: fetchedCustomer.occupation,
        couponRadius: fetchedCustomer.couponradius
      });
    })
    // Catch any errors
    .catch(err => {
      console.log(err);

      return res.status(401).json({
        message: "Account Authentication Failed"
      });
    });
});

router.post('/chooseinterests', (req, res, next) => {
  ChooseInterests.chooseInterests(req.body, res);
});

router.post('/getcustomerinterests', (req, res) => {
  ChooseInterests.findCustomerInterests(req.body, res);
});

// save personal information received from the first time setup form
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

router.post('/savecustomerinterests', (req, res, next) => {
  console.log("Received request to save:");
  console.log(req.body);

  Customer.findOne({email: req.body.customerEmail})
    .then(customer => {
      if (!customer) {
        throw new Error('Customer ' + req.body.customerEmail + " was not found");
      }
      console.log("Customer found");

      customer.interests = req.body.interests;

      customer.save();

      console.log('Updated customer with new personal info');
      res.status(200)
        .json(
          {
            message: 'Updated customer Interests',
            customerInfo: {
              Interests: customer.interests
            }
          });
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json('Unable to save customer Interests');
    })
});

router.post('/updatecustomerprofileinfo', (req, res) => {
  CustomerProfile.updateCustomerProfileInfo(req, res);
});

//Used to export the router so that it can be used externally
module.exports = router;
