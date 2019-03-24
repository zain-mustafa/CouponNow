const express = require('express');

const router = express.Router();

const Customer = require('../../models/customer');

router.post('/add', (req, res, next) => {
  console.log(req.body.interests);
  console.log(req.body.email);
  Customer.update(
    {email: req.body.email},
    {$push: { interests:  req.body.interests }}
  ).then(result => {
    console.log("Successfully added to backend", result);
    res.status(200).json({message: 'Interest Appended'});
  });
});

router.delete('/delete/:email/:name', (req, res, next) => {
  console.log(req.params.email);
  console.log(req.params.name);

  Customer.update(
    {email: req.params.email},
    {$pull: { interests: { interest: req.params.name }}}
  ).then(result => {
    console.log("Successfully deleted backend", result);
    res.status(200).json({message: 'Interest Deleted'});
  });
});

module.exports = router;
