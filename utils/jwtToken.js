var jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");

import  CONFIG from '../config/configs';

import User from '../models/User';

const JWT_SECRETE_KEY = { CONFIG };

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = JWT_SECRETE_KEY;

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  User.find({ where: {id: jwt_payload.id}}).then(user => {
    if(user) {
      next(null, user);
    } else {
      console.log('no such user');
      next(null, false);
    }
  }).catch(error=>{
    console.log('error happend when quering user');
    next(null, false);
  });
});

passport.use(strategy);

exports = module.exports = {
  passport,
  jwtOptions
}