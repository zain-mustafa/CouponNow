const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NodeGeocoder = require('node-geocoder');
const googleMapsClient = require('@google/maps').createClient({
  key: '<< YOUR GOOGLE API KEY >>',
  Promise: Promise
});

var options = {
  provider: 'google',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: '<< YOUR GOOGLE API KEY >>', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);

const BusinessOwner = require('../models/businessowner');

// Sets up the router coming in from the app.js file
const router = express.Router();

const https = require('https');

// Business Owner Signup Post request
router.post("/signup", (req, res, next) => {
  // Hash function used to secure password
  bcrypt.hash(req.body.password, 10)
    // then command used to get the hash value and create business owner account
    .then(hash => {
      const owner = new BusinessOwner({
        type: req.body.type,
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

router.post('/addbusiness', (req, res, next) => {
  let business = {
    businessname: req.body.business.businessname,
    licensenum: req.body.business.licensenum,
  }
  BusinessOwner.findOne({email: req.body.owneremail})
  .then(owner => {
    // If the email is not found
    if (!owner) {
      return res.status(401),json({
        message: "Account Authentication Failed"
      });
    }
    owner.business.push(business);

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

router.post('/listbusiness', (req,res,next) => {

  //identify business owner
  BusinessOwner.findOne({email: req.body.owneremail})
  .then(owner =>{
    res.status(200).json({
        businesslist: owner.business,
        message: 'Businesses fetched'
    });
  })
    .catch(err => { // 500 indicates Server Error and returns the error in json format
      res.status(500).json({
        message: 'Business Retrieval Failed',
        error: err
      });
    });
  });

router.post('/addlocation', (req, res, next) => {

  let location = {
    streetnum: req.body.location.streetnum,
    streetname: req.body.location.streetname,
    city: req.body.location.city,
    postalcode: req.body.location.postalcode,
    lat: 0,
    lon: 0
  }

  googleMapsClient.geocode({address: location.streetnum + ' ' + location.streetname + ', ' + location.city + ', ON' }).asPromise()
  .then(response => {
    // console.log(response.json.results[0].geometry.location);
    location.lat =response.json.results[0].geometry.location.lat;
    location.lon = response.json.results[0].geometry.location.lng;

    BusinessOwner.findOne({email: req.body.owneremail})
    .then(owner => {
      // If the email is not found
      if (!owner) {
        return res.status(401).json({
          message: "Account Authentication Failed"
         });
       }

      //owner.business[req.body.businessindex].locations.push(req.body.location);
      let business = owner.business.id(req.body.businessindex);
      business.locations.push(location);
      owner.save()
         .then(result => {
           res.status(201).json({ // 201 indicates creation and responds the result in json format
            message: 'Location Added!'
            });
          })
          .catch(err => { // 500 indicates Server Error and returns the error in json format
          res.status(500).json({
            message: 'Whoops',
            error: err
          });
          });
      });

  });
});

router.post('/deletebusiness', (req, res, next) => {

   BusinessOwner.findOne({email: req.body.owneremail})
    .then(owner => {
      // If the email is not found
      if (!owner) {
        return res.status(401).json({
          message: "Account Authentication Failed"
         });
       }
       owner.business.id(req.body.businessindex).remove();

       owner.save()
         .then(result => {
           res.status(201).json({ // 201 indicates creation and responds the result in json format
            message: 'Business Deleted!'
            });
          })
          .catch(err => { // 500 indicates Server Error and returns the error in json format
          res.status(500).json({
            message: 'Whoops',
            error: err
          });
          });
      });

});

router.post('/deletelocation', (req, res, next) => {

  BusinessOwner.findOne({email: req.body.owneremail})
    .then(owner => {
      // If the email is not found
      if (!owner) {
        return res.status(401).json({
          message: "Account Authentication Failed"
         });
       }
      let business = owner.business.id(req.body.businessindex);

      business.locations.id(req.body.locationindex).remove();

       owner.save()
         .then(result => {
           res.status(201).json({ // 201 indicates creation and responds the result in json format
            message: 'Location Deleted!'
            });
          })
          .catch(err => { // 500 indicates Server Error and returns the error in json format
          res.status(500).json({
            message: 'Whoops',
            error: err
          });
          });
      });

});

router.post('/updatelocation', (req, res, next) => {

  BusinessOwner.findOne({email: req.body.owneremail})
   .then(owner => {
     // If the email is not found
     if (!owner) {
       return res.status(401).json({
         message: "Account Authentication Failed"
        });
      }

      let business = owner.business.id(req.body.businessindex);
      /*
      business.locations.updateOne({ _id: req.body.locationindex }, { $set: {
        streetnum: req.body.location.streetnum,
        streetname : req.body.location.streetname,
        city : req.body.location.city,
        postalcode : req.body.location.postalcode,
        lon : req.body.location.lon,
        lat : req.body.location.lat,
      } })
     */

     let location = business.locations.id(req.body.locationindex);
     location.streetnum = req.body.location.streetnum;
     location.streetname = req.body.location.streetname;
     location.city = req.body.location.city;
     location.postalcode = req.body.location.postalcode;
     location.lon = req.body.location.lon;
     location.lat = req.body.location.lat;

      owner.save()
        .then(result => {
          res.status(201).json({ // 201 indicates creation and responds the result in json format
           message: 'Location Updated!'
           });
         })
         .catch(err => { // 500 indicates Server Error and returns the error in json format
         res.status(500).json({
           message: 'Whoops',
           error: err
         });
         });
     });

});

router.post('/updatebusiness', (req, res, next) => {
  /*
  return res.status(201).json({
    message: 'Backend Update Business called'
   });
   */

  BusinessOwner.findOne({email: req.body.owneremail})
   .then(owner => {
     // If the email is not found
     if (!owner) {
       return res.status(401).json({
         message: "Account Authentication Failed"
        });
      }
      /*
      return res.status(201).json({
         message: 'Owner Found!'
         });
      */
      //owner.business.updateOne({ _id: req.body.businessindex }, { $set: { businessname: req.body.business.businessname, licensenum : req.body.business.licensenum} })
      let business = owner.business.id(req.body.businessindex);
      business.businessname = req.body.business.businessname;
      business.licensenum = req.body.business.licensenum;

      owner.save()
        .then(result => {
          res.status(201).json({
           message: 'Business Updated!'
           });
         })
         .catch(err => { // 500 indicates Server Error and returns the error in json format
         res.status(500).json({
           message: 'Whoops',
           error: err
         });
         });
     });

});

//Used to export the router so that it can be used externally
module.exports = router;
