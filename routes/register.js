var express = require('express');
var router = express.Router();

import User from '../models/User';

import db from '../utils/db';

import ERRORS from '../config/errors';

const { client } = db;

const sendError = function(res, errorId) {
  this.send({
    error: ERRORS[errorId]
  });
}

router.post('/', function(req, res, next) {
  let IP = req.ip;
  let REG_COUNT_KEY = 'LOG_CNT' + IP;
  let CNT = 1;
  let CNT_THREAD = 10;
  const EXPIRE_DT = 1000;


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
            User.create(u).then( user => {
              req.log.info("REGISTER NEW user registered", user);
              res.send(user);
            }).catch( error => {
              req.log.error("REGISTER ERROR happened", x);
              let fields = error['fields']
              if(fields) {
                if('username' in fields) {
                  sendError(res, '40901');
                } else if('email' in fields) {
                  sendError(res, '40902');
                } else {
                  sendError(res, '40900');
                }
              }
              res.send(x);
            });
          } else {
            console.log('ERRORS', ERRORS['50003']);
            sendError(res, '50003');
          }
        }).catch(err=>{
          console.log('err = ' + err);
        });
    }
  }).catch(err=>{
    console.log('error happend while query count from redis');
  })


  
  
});


export default router;