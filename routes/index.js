var express = require('express');
const { json } = require('body-parser');
var router = express.Router();
const User = require('./../models/index').User

/* GET home page. */
router.get('/', function(req, res, next) {
    User.findAll().then(users => {
        console.log(JSON.parse(JSON.stringify(users)))
    }).catch(error => {
        console.log(error)
    })
    res.render('index', { title: 'Express', path: '/' });
});

module.exports = router;