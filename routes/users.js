var express = require('express');
const sequelize = require('../models/index').sequelize;
const { hashPassword } = require('../helpers/helper');
var router = express.Router();
const User = require('./../models/index').User;
const Image = require('./../models/index').Image;

/* GET users listing. */
router.get('/', function(req, res, next) {
    User.findAll({ include: [Image] }).then(users => {
        res.render('users', { users: JSON.parse(JSON.stringify(users)), path: '/users' })

    }).catch(error => {
        console.log(error)
    })
});

/* GET create new user listing. */
router.get('/newUser', function(req, res, next) {
    res.render('newUser', { path: '/newUser' })
});

/* POST create new user listing. */
router.post('/newUser', function(req, res, next) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const imageUrl = req.body.imageUrl
    const imageTitle = req.body.imageTitle;

    //save all informations  
    const result = sequelize.transaction((t) => {
        // With CLS enabled, the user will be created inside the transaction
        return User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashPassword('mohammad'),
        }, { transaction: t }).then(user => {
            console.log('user id here => => =>' + user.id)
            return Image.create({
                    userId: user.id,
                    title: imageTitle,
                    src: imageUrl
                }, { transaction: t })
                //redirect to users page
        })
    })

    result.then(data => {
        console.log(data)
        res.redirect('/users', { path: '/users' })
    }).catch(error => {
        console.log(error)
        res.redirect('/users/newUser')
    })

    //redirect to some link

});


/* Get delete a user and delete image associate to him/her too, listing. */
router.get('/:userId/delete', function(req, res, next) {
    const userId = req.params.userId;

    const result = sequelize.transaction((t) => {
        // With CLS enabled, the user will be created inside the transaction
        return User.findOne({
            where: { id: userId }
        }, { transaction: t }).then(user => {
            return Image.destroy({
                    where: { userId: userId }
                }, { transaction: t }).then(user => {
                    return User.destroy({
                            where: { id: userId }
                        }, { transaction: t })
                        //redirect to users page
                })
                //redirect to users page
        })
    })

    result.then(data => {
        console.log(data)
        res.redirect('/users', { path: '/users' })
    }).catch(error => {
        console.log(error)
        res.redirect('/users')
    })

    //redirect to some link

});

/* Post delete a user and delete image associate to him/her too, listing. */
router.post('/:userId/update', function(req, res, next) {
    const userId = req.params.userId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const imageUrl = req.body.imageUrl
    const imageTitle = req.body.imageTitle;

    const result = sequelize.transaction((t) => {
        // With CLS enabled, the user will be created inside the transaction
        return User.findOne({
            where: { id: userId }
        }, { transaction: t }).then(user => {
            return user.update({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hashPassword('mohammad')
                }, { transaction: t }).then(user => {
                    return Image.update({
                            userId: user.id,
                            title: imageTitle,
                            src: imageUrl
                        }, { where: { userId: user.id } }, { transaction: t })
                        //redirect to users page
                })
                //redirect to users page
        })
    })

    result.then(data => {
            console.log('data' + data)
            res.redirect('/users')
        }).catch(error => {
            console.log(error)
            res.redirect('/users' + userId + '/update')
        })
        //redirect to some link

});
router.get('/:userId/edit', function(req, res, next) {
    const userId = req.params.userId;
    User.findOne({
        where: { id: userId },
        include: [Image]
    }).then(user => {
        res.render('editUser', {
            path: '/newUser',
            user: JSON.parse(JSON.stringify(user))
        })
    }).catch(error => {
        console.log('*********************************************')
        console.log(error)
    })
});
module.exports = router;