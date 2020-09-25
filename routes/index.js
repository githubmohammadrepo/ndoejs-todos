var express = require('express');
const { json } = require('body-parser');
var router = express.Router();
const User = require('./../models/index').User
const HomeController = require('./../controller/index')
const InitHomeContorller = HomeController.build();
/* GET home page. */
router.get('/', InitHomeContorller.getHomesHomePage);

module.exports = router;