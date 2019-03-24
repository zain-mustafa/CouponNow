const express = require('express');

const mobileApp = express();

const mobileLogin = require('./mobile/login');
const mobileSignup = require('./mobile/signup');
const mobileCoupons = require('./mobile/coupons');
const mobileInterests = require('./mobile/interests');

mobileApp.use("/login/", mobileLogin);
mobileApp.use("/signup/", mobileSignup);
mobileApp.use("/coupons/", mobileCoupons);
mobileApp.use('/interests/', mobileInterests);

module.exports = mobileApp;
