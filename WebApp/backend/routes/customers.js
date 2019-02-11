const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ChooseInterests = require('./chooseinterests');

const Customer = require('../models/customer');

// Sets up the router coming in from the app.js file
const router = express.Router();

// User Signup Post request
router.post("/signup", (req, res, next) => {
  // Hash function used to secure password
  bcrypt.hash(req.body.password, 10)
    // then command used to get the hash value and create customer
    .then(hash => {
      const customer = new Customer({
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
  let fetchedCustomer;
  // Using findOne to find the customer from the Database
  Customer.findOne({ email: req.body.email })
    .then(customer => {
      // If the email is not found
      if (!customer) {
        return res.status(401),json({
          message: "Account Authentication Failed"
        });
      }
      // If the email is found
      fetchedCustomer = customer;
      // Checks password and returns true of false depending if the password is correct or not
      return bcrypt.compare( req.body.password, customer.password )
    })
    .then(result => {
      // Using result from bcrypt to check result
      // If bcrypt returned false aka account credentials were invalid
      if (!result) {
          return res.status(401),json({
          message: "Account Authentication Failed"
        });
      }
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
        email: fetchedCustomer.email,
        firstname: fetchedCustomer.firstname,
        lastname: fetchedCustomer.lastname,
        userId: fetchedCustomer._id
      });
    })
        // Catch any errors
    .catch(err => {
        return res.status(401).json({
        message: "Account Authentication Failed"
      });
    });
});

router.post('/chooseinterests', (req, res, next) => {
  ChooseInterests.chooseInterests(req.body);
  console.log(req.body);
});

//Used to export the router so that it can be used externally
module.exports = router;
