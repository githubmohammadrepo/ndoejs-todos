var express = require('express');
var router = express.Router();
const User = require('../models/index').User;
const Image = require('../models/index').Image;

/* GET users listing. */
router.get('/', function(req, res, next) {
    Image.findAll().then(images => {
        // res.send(images)
        // res.render('images',)
        res.render('images', { images: JSON.parse(JSON.stringify(images)), path: '/images' })
    }).catch(error => {
        console.log(error)
    })


});

module.exports = router;