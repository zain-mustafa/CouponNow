const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Campaign = require('../models/campaign');

// Sets up the router coming in from the app.js file
const router = express.Router();

router.get("/list/:email", (req,res,next) => {
  Campaign.find({ownerEmail: req.params.email}).then(documents => {
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
    busId: req.body.busId,
    ownerEmail: req.body.ownerEmail,
    locations: req.body.location,
    tag: req.body.tag,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    maxQty: req.body.maxQty,
    image: req.body.image
  });
  cCampaign.save()
  .then(result => {
    res.status(201).json({ // 201 indicates creation and responds the result in json format
      message: 'Campaign Created!',
      campaignID: result._id,
      result: result
    });
    console.log("Campaign Created");
  })
  .catch(err => { // 500 indicates Server Error and returns the error in json format
    res.status(500).json({
      error: err
    });
  });
});

router.delete("/list/:id", (req, res, next) => {
  Campaign.deleteOne({_id: req.params.id}).then(result => {
    console.log("Successfully deleted backend", result);
    res.status(200).json({message: 'Campaign Deleted'});
  });
});

router.put("/edit/:id", (req, res, next) => {
  console.log(req.body);
  const post = new Campaign({
    name: req.body.campaign.name,
    business: req.body.campaign.business,
    location: [ req.body.campaign.location ],
    tag: req.body.campaign.tag,
    startDate: req.body.campaign.startDate,
    endDate: req.body.campaign.endDate,
    maxQty: req.body.campaign.maxQty
  })
  Campaign.updateOne({_id: req.params.campaign.id}, post).then(result => {
    console.log("Update Campaign", result);
    res.status(200).json({message: "Update Successful"});
  })
});

router.get("/campaign/edit/:_id", (req, res, next) => {
  Campaign.findById(req.params._id).then(campaign => {
    if (campaign){
      res.status(200).json(campaign);
    } else {
      res.status(404).json({ message: "Campaign not found" });
    }
  })
});

module.exports = router;
