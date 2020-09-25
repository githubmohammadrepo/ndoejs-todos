var express = require('express');
var router = express.Router();

const userController = require('../controller/users')
const UserInitController = userController.build();
/* GET users listing. */
router.get('/', UserInitController.getUsersHomePage);

/* GET create new user listing. */
router.get('/newUser', UserInitController.getNewUser);


/* POST create new user listing. */
router.post('/newUser', UserInitController.postNewUser);


/* Get delete a user and delete image associate to him/her too, listing. */
router.get('/:userId/delete', UserInitController.getDeleteUser);

/* Post delete a user and delete image associate to him/her too, listing. */
router.post('/:userId/update', UserInitController.postUpdateUser);

router.get('/:userId/edit', UserInitController.getEditUser);


module.exports = router;