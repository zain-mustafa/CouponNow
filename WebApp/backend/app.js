const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const customerRoutes = require('./routes/customers');
const ownerRoutes = require('./routes/businessowner');
const campaignRoutes = require('./routes/campaign');
const chooseInterestRoutes = require('./routes/chooseinterests');
const mobileRoutes = require('./routes/mobileRoutes');

const app = express();

//Connection set to MongoDB
mongoose.connect("mongodb://localhost:27017/499CouponNow", { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection failed');
  });

  app.use(bodyParser.json({limit: "2mb"}));
  app.use(bodyParser.urlencoded({limit: "2mb", extended: true, parameterLimit:50000}));// Using bodyParser Module so that we can read and response in JSON data format.
  app.use(bodyParser.json());

// Setting Header Permissions since our servers are on different ports, this allows you to make specific API requests
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS, PUT"
      );
  next();
});

// Router paths set in the routes folder
app.use("/owner/", ownerRoutes);
app.use("/customer/", customerRoutes);
app.use("/campaign/", campaignRoutes);
app.use("/mobile/", mobileRoutes);

module.exports = app;
