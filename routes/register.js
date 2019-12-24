var express = require('express');
var router = express.Router();

import User from '../models/User';

router.post('/', function(req, res, next) {
  req.log.info("REGISTER GET INTO REGISTER");
  User.create(req.body).then((u)=>{
    req.log.info("REGISTER NEW user registered", u);
    res.send(u);
  }).catch(x=> {
    req.log.error("REGISTER ERROR happened", x);
    res.send(x)
  });
  
});


export default router;