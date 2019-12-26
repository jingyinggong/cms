var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

const bcrypt = require('bcrypt');

import CONFIG from '../config/config';



import User from '../models/User';

import db from '../utils/db';

import ERRORS from '../config/errors';

import CONFIG from '../config/config';

import Utils from '../utils/tools';

const { client } = db;
const { saltRounds } = CONFIG;

const { PASS_SALT_ROUND } = CONFIG;

const { isEmail } = Utils;

const sendError = function(res, errorId) {
  res.send({
    error: ERRORS[errorId]
  });
}

router.post('/', function(req, res, next) {
  let IP = req.ip;
  let REG_COUNT_KEY = 'LOG_CNT' + IP;
  let CNT = 1;
  let CNT_THREAD = 10;
  const EXPIRE_DT = 1000;
  const REPEATED_ERROR = "SequelizeUniqueConstraintError";


  client.getAsync(REG_COUNT_KEY).then(cnt => {
    if( cnt ) {
      CNT = +cnt + 1
    }
    if(CNT > CNT_THREAD) {
      res.status(429).send({
        error: ERRORS['42901']
      });
    } else {
      client.SETEXAsync(REG_COUNT_KEY, EXPIRE_DT, CNT)
        .then(rs=>{
          let u = req.body;
          if(u && u.username && u.password && u.email) {
            let isValidEmail = isEmail(u.email);
            if(!isValidEmail) {
              req.log.error("REGISTER NEW user email invalid");
              sendError(res, '50004');
              return;
            }
            let p = u.password;
            bcrypt.hash(p, PASS_SALT_ROUND).then(function(hash) {
              u.password = hash;
              User.create(u).then( user => {
                req.log.info("REGISTER NEW user registered", user);
                res.send(user);
              }).catch( error => {
                console.log("REGISTER NEW user error happened", error);
                req.log.error("REGISTER NEW user error happened, duplicated Username or password", error);
                sendError(res, '40900');
              });
            }).catch(errBcrypt => {
              req.log.error("REGISTER NEW user error happened, ERROR HAPPENED WHILE DOING THE BCRYPT", errBcrypt);
              sendError(res, '50000');
            });
            
          } else {
            console.log('ERRORS', ERRORS['50003']);
            sendError(res, '50003');
          }
        }).catch(err=>{
          req.log.error("REGISTER NEW user error happened", err);
          console.log('err = ' + err);
        });
    }
  }).catch(err=>{
    console.log('error happend while query count from redis');
    req.log.error("REGISTER NEW user error happened", err);
  });
  
});


export default router;