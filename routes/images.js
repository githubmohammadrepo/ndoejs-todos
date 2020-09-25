var express = require('express');
var router = express.Router();
const ImageController = require('./../controller/images');
const initImageController = ImageController.build();

/* GET users listing. */
router.get('/', initImageController.getImagesHomePage);

module.exports = router;