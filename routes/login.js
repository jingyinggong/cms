const express = require('express');

const AuthModel = require('../models/OauthModel');

const { getUser } = AuthModel;

const router = express.Router();

function findUsers(req, res, next) {
  if(req && req.body && req.body.username && req.body.password) {
    var x = getUser(req.body.username, req.body.password);
    x.then(user=>{
      res.send({
        data: user
      });
    });
  } else {
    console.log('xxxxxxxx')
  }
}

router.post('/', findUsers);


export default router;
