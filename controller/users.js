const sequelize = require('../models/index').sequelize;
const { hashPassword } = require('../helpers/helper');
const User = require('../models/index').User;
const Image = require('../models/index').Image;
const Role = require('../models/index').Role;
const User_Role = require('../models/index').User_Role;
const path = require('path')

module.exports = class UserController {

    postNewUser(req, res, next) {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const imageUrl = req.body.imageUrl
        const imageTitle = req.body.imageTitle;
        const roleId = req.body.roleId;
        //save all informations  
        const result = sequelize.transaction((t) => {
            // With CLS enabled, the user will be created inside the transaction
            let outUser;
            let outRole;
            return User.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashPassword('mohammad'),
            }, { transaction: t }).then(user => {
                outUser = user;
                //find role by id
                return Role.findOne({
                    where: { id: roleId }
                }, { transaction: t }).then(role => {
                    return outUser.addRoles(
                        roleId, {
                            throught: 'user_roles'
                        }, { transaction: t }).then(role => {
                        return Image.create({
                                userId: outUser.id,
                                title: imageTitle,
                                src: imageUrl
                            }, { transaction: t })
                            //redirect to users page
                    })

                })

            }).catch(error => {})
        })

        result.then(data => {
            console.log(data)
            res.redirect('/users')
        }).catch(error => {
            console.log(error)
            res.redirect('/users/newUser')
        })

        //redirect to some link

    }

    getEditUser(req, res, next) {
        const userId = req.params.userId;
        User.findOne({
            where: { id: userId },
            include: [Image]
        }).then(user => {
            res.render(path.join('users', 'editUser'), {
                path: '/newUser',
                login: req.session.logIn,
                user: JSON.parse(JSON.stringify(user))
            })
        }).catch(error => {
            console.log(error)
        })
    }

    postUpdateUser(req, res, next) {
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

    }

    getDeleteUser(req, res, next) {
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
            res.redirect('/users')
        }).catch(error => {
            console.log(error)
            res.redirect('/users')
        })

        //redirect to some link

    }

    getNewUser(req, res, next) {
        //find all roles and set to new user form for choose in select box on there
        Role.findAll().then(roles => {
            res.render(path.join('users', 'newUser'), { path: '/newUser', roles: JSON.parse(JSON.stringify(roles)), login: req.session.logIn })
        }).catch(error => {
            res.redirect('/users')
        })
    }

    getUsersHomePage(req, res, next) {
        User.findAll({ include: [Image, Role] }).then(users => {
            console.log(JSON.parse(JSON.stringify(users)))
            res.render(path.join('users', 'users'), { users: JSON.parse(JSON.stringify(users)), path: '/users', login: req.session.logIn })
        }).catch(error => {
            console.log(error)
        })
    }

    // build init from class
    static build() {
        return new UserController;
    }
}