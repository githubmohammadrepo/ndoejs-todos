var express = require('express');
var router = express.Router();
const User = require('../models/index').User;
const path = require('path')

module.exports = class AuthController {

    getLogin(req, res, next) {
        if (req.session.logIn) {
            res.redirect('/todos/0');
        }
        res.render(path.join('auth', 'login'), { path: '/login', login: req.session.logIn })
    }

    postLogin(req, res, next) {
        const email = req.body.email;
        const password = req.body.password;

        if (req.session.logIn) {
            res.redirect('/todos/0');
        }
        User.findOne({ email: email, password: password }).then(user => {
            req.session.logIn = true;
            res.redirect('/todos/0');
        }).catch(error => {
            console.log(error)
            res.redirect(req.originalUrl.toString());
        })
    }

    getRegister(req, res, next) {
        if (req.session.logIn) {
            res.redirect('/todos/0');
        }
        res.render(path.join('auth', 'register'), { path: '/register', login: req.session.logIn })

    }

    postRegister(req, res, next) {
        //if user is logIn redirect to home page
        if (req.session.logIn) {
            res.redirect('/');
        }
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let email = req.body.email;
        let password = req.body.password;
        let rePassword = req.body.repassword;

        //if password does not confirmed
        if (password === rePassword) {
            User.create({
                firstName,
                lastName,
                email,
                password
            }).then(user => {
                req.session.logIn = true;
                res.redirect('/todos/0')
            }).catch(error => {
                console.log(error)
                res.redirect(req.originalUrl.toString())
            })

        } else {
            //redirect back
            res.redirect(req.originalUrl.toString())
        }
    }

    postLogout(req, res, next) {
        //if user is logIn redirect to home page
        if (req.session.logIn) {
            res.redirect('/todos/0');
        }

        req.session.destroy((err) => {
            if (err) {
                console.log(err)
                res.redirect(req.originalUrl.toString())
            } else {
                res.redirect('/todos/0')
            }
        })

        //if password does not confirmed

    }

    // create new init from class
    static build() {
        return new AuthController;
    }
}