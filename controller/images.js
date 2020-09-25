var express = require('express');
var router = express.Router();
const User = require('../models/index').User;
const Image = require('../models/index').Image;
const path = require('path')

module.exports = class ImageController {

    getImagesHomePage(req, res, next) {
        Image.findAll().then(images => {
            res.render(path.join('images', 'images'), { images: JSON.parse(JSON.stringify(images)), path: '/images', login: req.session.logIn })
        }).catch(error => {
            console.log(error)
        })
    }

    // create new init from class
    static build() {
        return new ImageController;
    }
}