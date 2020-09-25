const sequelize = require('../models/index').sequelize;
const express = require('express');
const router = express.Router();
const User = require('../models/index').User;
const Todo = require('../models/index').Todo;
const path = require('path')

module.exports = class HomeController {

    getHomesHomePage(req, res, next) {
        Todo.findAll({
            order: [
                ['id', 'desc']
            ]
        }).then(todos => {
            res.render(path.join('todos', 'todos'), { todos: JSON.parse(JSON.stringify(todos)), path: '/todos', login: req.session.logIn })
        }).catch(error => {
            console.log(error)
        })
    }

    // create new init from class
    static build() {
        return new HomeController;
    }
}