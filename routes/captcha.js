const express = require('express');
const svgCaptcha = require('svg-captcha');
const router = express.Router();
const uuid = require('uuid/v1');

import db from '../utils/db';
import ERRORS from '../config/errors';

const EXPIRE_DAT = 6000;
const { client } = db;

function getCaptcha(req, res, next) {
  let COOKIE_KEY   = 'CPATCHA_KEY';
  let COOKIE_VALUE = '';

  let d = new Date();
  d.setTime(d.getTime()  + EXPIRE_DAT * 1000);

  if(req.cookies && req.cookies[COOKIE_KEY]) {
    COOKIE_VALUE = req.cookies[COOKIE_KEY];
  } else {
    COOKIE_VALUE = uuid();
  }
  
  res.cookie(COOKIE_KEY, COOKIE_VALUE, {expires: d, httpOnly: true });

  const captcha = svgCaptcha.create();

  client.SETEXAsync(COOKIE_VALUE, EXPIRE_DAT, captcha.text).then(x=>{
    req.log.info("getCaptcha is set cookie successfully");
    res.send({
      data: captcha.data
    });
  }).catch(e=>{
    req.log.error("getCaptcha is set cookie error!");
    res.send({
      error: ERRORS["50001"],
    });
  });
}

router.get('/', getCaptcha);


export default router;
