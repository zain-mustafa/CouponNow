const express = require('express');

const router = express.Router();

const Coupons = require('../../models/campaign');
const Customer = require('../../models/customer');

var couponsInRad = [];

router.get('/', (req, res, next) => {
  console.log(req.query);

  let longitude = parseFloat(req.query.longitude);
  let latitude = parseFloat(req.query.latitude);
  let radius = parseFloat(req.query.radius);

  // Finding Coupons using geoJSON queries
  Coupons.find({
    locations: {
      $nearSphere: {
        $geometry: { type: "Point", coordinates: [ longitude, latitude ] },
        $minDistance: 0,
        $maxDistance: radius * 1000
      }
    }
  })
// After the coupon has been searched
  .then(nearCoupons => {
    if (nearCoupons.length <= 0) { // In case the list comes back empty
      console.log(" No Coupons Available Nearby! ");

      throw new Error('Coupons within Radius not Found!');
    }
    couponsInRad = [];

    // console.log(nearCoupons);
    nearCoupons.forEach(coupon => {
      couponsInRad.push({
        name: coupon.name,
        campaignId: coupon._id,
        business: coupon.business,
        busId: coupon.busId,
        locNames: coupon.locNames,
        coordinates: coupon.locations.coordinates,
        tags: coupon.tag,
        startDate: coupon.startDate,
        endDate: coupon.endDate
      })
    });

    res.status(200).json({
      message: "Recieved CouponList Request",
      couponList: couponsInRad
    });
  })
// Error catch block
  .catch(err => {
    console.log(err);

    return res.status(401).json({
      message: "Account Authentication Failed"
    });
  });
});

router.post('/save', (req, res, next) => {
  console.log(req.body.coupon.tags);
  console.log(req.body.email);
  let tags = req.body.coupon.tags;
  Customer.update(
    {email: req.body.email},
    {$push: {acceptedCoupons: req.body.coupon}}
  ).then(result => {
    console.log("Successfully Saved Coupon", result);
    res.status(200).json({message: 'Coupon Appended'});
  })

  tags.forEach(tag => {
    Customer.update(
    {email: req.body.email, "interests.interest": tag},
    {$inc: {"interests.$.rating": 1 } }
    ).then(result => {
      console.log("Successfully Incremented Interest", result);
    })
  })
});

router.post('/unsave', (req, res, next) => {
  console.log(req.body.coupon);
  console.log(req.body.email);
  let tags = req.body.coupon.tags;
  Customer.update(
    {email: req.body.email},
    {$pull: {acceptedCoupons: req.body.coupon}}
  ).then(result => {
    console.log("Successfully Saved Coupon", result);
    res.status(200).json({message: 'Coupon Unsaved'});
  })

  tags.forEach(tag => {
    Customer.update(
    {email: req.body.email, "interests.interest": tag},
    {$inc: {"interests.$.rating": -1 } }
    ).then(result => {
      console.log("Successfully Decremented Interest", result);
    })
  })
});

router.post('/updateradius', (req, res, next) => {
  console.log(req.body.email);
  console.log(req.body.radius);
  Customer.update(
    {email: req.body.email},
    {$set: {couponradius: req.body.radius}}
  ).then(result => {
    console.log("Successfully Updated Radius", result);
    res.status(200).json({message: 'Radius Updated'});
  })
});




module.exports = router;
