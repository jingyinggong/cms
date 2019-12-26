var express = require('express');
var router = express.Router();

import loginRoute from './login'; 
import registerRoute from './register';

import captchaRoute from './captcha';

import rolesRoute from './roles';

/* GET home page. */
router.get('/', function(req, res, next) {
  req.log.info('GOOD');
  res.send({
    index: true
  });
});

router.use('/login', loginRoute);

router.use('/register', registerRoute);

router.use('/captcha', captchaRoute);

router.use('/roles', rolesRoute);

module.exports = router;
