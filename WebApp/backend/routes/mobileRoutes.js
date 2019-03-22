const express = require('express');

const mobileApp = express();

const mobileLogin = require('./mobile/login');
const mobileSignup = require('./mobile/signup');
const mobileCoupons = require('./mobile/coupons');

mobileApp.use("/login/", mobileLogin);
mobileApp.use("/signup/", mobileSignup);
mobileApp.use("/coupons/", mobileCoupons);

module.exports = mobileApp;
