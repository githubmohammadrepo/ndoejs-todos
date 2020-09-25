var express = require('express');
var router = express.Router();
const AuthController = require('./../controller/auth');
const initAuthController = AuthController.build();

/* GET users listing. */
router.get('/login', initAuthController.getLogin);
router.post('/login', initAuthController.postLogin);

router.get('/register', initAuthController.getRegister);

router.post('/register', initAuthController.postRegister);
router.get('/login', initAuthController.getLogin);


router.post('/logout', initAuthController.postLogout);


module.exports = router;