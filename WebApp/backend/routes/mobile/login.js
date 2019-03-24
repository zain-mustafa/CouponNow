const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const Customer = require('../../models/customer');


router.post('/', (req, res, next) => {

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
        couponRadius: fetchedCustomer.couponradius,
        interests: fetchedCustomer.interests,
        acceptedCoupons: fetchedCustomer.acceptedCoupons
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



module.exports = router;
