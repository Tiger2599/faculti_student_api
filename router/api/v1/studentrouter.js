const express = require('express');
const routes = express.Router();
const controller = require('../../../controller/api/v1/studentcontoller');
const passport = require('../../../config/passport-jwt');

routes.post('/register',passport.authenticate('faculty',{failureRedirect:'/loginafiled'}) ,controller.register);

module.exports = routes;