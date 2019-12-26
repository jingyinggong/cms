const express = require('express');
const router = express.Router();

import Func  from '../models/Func';

const getAllFuncs = function(req, res, next) {
  Role.findAll().then(roles=>{
    res.send(roles);
  }).catch(error=>{
    res.send(error);
  });
}

const addAFunc = function(req, res, next) {
  role = req.body;
  Role.create(role).then(result=>{
    res.send(result);
  }).catch(error => {
    res.send(error);
  });
}

router.get('/', getAllFuncs);
router.post('/', addAFunc);


export default router;