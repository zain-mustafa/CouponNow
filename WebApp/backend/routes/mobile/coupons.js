const express = require('express');

const router = express.Router();

const Coupons = require('../../models/campaign');

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
        tag: coupon.tag
        // image: coupon.image
      })
    });

    // couponsInRad.forEach(coupon => {
    //   console.log(coupon.name);
    //   console.log(coupon.campaignId);
    //   console.log(coupon.business);
    //   console.log(coupon.busId);
    //   console.log(coupon.locNames);
    //   console.log(coupon.tag);
    // });

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


module.exports = router;
