const express = require('express');

const mobileApp = express();

const mobileLogin = require('./mobile/login');
const mobileSignup = require('./mobile/signup');

mobileApp.use("/login/", mobileLogin);
mobileApp.use("/signup/", mobileSignup);

module.exports = mobileApp;
