const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const BusinessOwner = require('../models/businessowner');

// Sets up the router coming in from the app.js file
const router = express.Router();

// Business Owner Signup Post request
router.post("/signup", (req, res, next) => {
  // Hash function used to secure password
  bcrypt.hash(req.body.password, 10)
    // then command used to get the hash value and create business owner account
    .then(hash => {
      const owner = new BusinessOwner({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
        password: hash
    });
    // Saving the customer into the Database
    owner.save()
      .then(result => {
        res.status(201).json({ // 201 indicates creation and responds the result in json format
          message: 'Business Owner Account Created!',
          result: result
        });
      })
      .catch(err => { // 500 indicates Server Error and returns the error in json format
        res.status(500).json({
          error: err
        });
      });
  });
});

// Business Owner Login Post Request
router.post('/login', (req, res, next) => {
  let fetchedOwner; //To use owner Information through out the function

  // Using findOne to find the owner from the Database
  BusinessOwner.findOne({ email: req.body.email })
    .then(owner => {
      // If the email is not found
      if (!owner) {
        return res.status(401),json({
          message: "Account Authentication Failed"
        });
      }
      // If the email is found
      fetchedOwner = owner;
      // Checks password and returns true of false depending if the password is correct or not
      return bcrypt.compare( req.body.password, owner.password )
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
        email: fetchedOwner.email,
        firstname: fetchedOwner.firstname,
        lastname: fetchedOwner.lastname,
        userId: fetchedOwner._id
      }, 'secret_this_should_be_longer', { expiresIn: '1h' } );

      //returns the token and user information as a response to frontend
      res.status(200).json({
        token: token,
        email: fetchedOwner.email,
        firstname: fetchedOwner.firstname,
        lastname: fetchedOwner.lastname,
        phone: fetchedOwner.phone,
        userId: fetchedOwner._id
      });
    })
    // Catch any errors
    .catch(err => {
        return res.status(401),json({
        message: "Account Authentication Failed"
      });
    });
});

router.post('/addbusiness', (req, res, next) => {

  BusinessOwner.findOne({email: req.body.owneremail})
  .then(owner => {
    // If the email is not found
    if (!owner) {
      return res.status(401),json({
        message: "Account Authentication Failed"
      });
    }
    owner.business.push(req.body.business);
  
    owner.save()
    .then(result => {
      res.status(201).json({ // 201 indicates creation and responds the result in json format
        message: 'Business Added!',
      });
    })
    .catch(err => { // 500 indicates Server Error and returns the error in json format
      res.status(500).json({
        error: err
      });
    });
  });
});

router.get('/listbusiness', (req,res,next) => {
  
  //identify business owner
  BusinessOwner.findOne({email: 'bilbo@mail.com'})//req.body.owneremail
  .then(owner =>{
    res.status(200).json({
        businesslist: owner.business,
        message: 'Businesses fetched'
    })
  .catch(err => {
    return res.status(401),json({
    message: "Business Retrival Failed"
    });
   });
  });

});

//Used to export the router so that it can be used externally
module.exports = router;
