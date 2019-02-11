const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Campaign = require('../models/campaign');

// Sets up the router coming in from the app.js file
const router = express.Router();

router.get("/list/", (req,res,next) => {
  Campaign.find().then(documents => {
    res.status(200).json({
      message: 'Campaigns sent successfully',
      result: documents
    });
  });
});

router.post("/add", (req, res, next) => {
  const cCampaign = new Campaign ({
    name: req.body.name,
    business: req.body.business,
    locations: req.body.locations,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    maxQty: req.body.maxQty
  });

  cCampaign.save()
  .then(result => {
    res.status(201).json({ // 201 indicates creation and responds the result in json format
      message: 'Campaign Created!',
      campaignID: result._id,
      result: result
    });
  })
  .catch(err => { // 500 indicates Server Error and returns the error in json format
    res.status(500).json({
      error: err
    });
  });
});

router.delete("/list/:id", (req, res, next) => {
  Campaign.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'Campaign Deleted'});
  });
});

module.exports = router;
