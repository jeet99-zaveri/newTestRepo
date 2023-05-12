var express = require('express');
var router = express.Router();
const USERS = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', async function(req, res, next) { 
  const reqBody = req.body;
  
  await USERS.create(reqBody);
});

module.exports = router;
