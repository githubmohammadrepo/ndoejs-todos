const sequelize = require('../models/index').sequelize;
const express = require('express');
const router = express.Router();
const User = require('../models/index').User;
const Todo = require('../models/index').Todo;
const path = require('path')

module.exports = class TodoController {
    getTodosHomePage(req, res, next) {
        const id = req.params.id;
        const perPage = 3;
        if (!id) {
            id = 1;
        }
        Todo.findAndCountAll({
            offset: (id) * perPage,
            limit: perPage,
            order: [
                ['id', 'desc']
            ],
        }).then(result => {
            const { count, rows } = result
            const prettyCount = Math.ceil(count / perPage);
            console.log('id: ' + id + 'prettyCount: ' + prettyCount)
            if (Number(id) > Number(prettyCount) - 1) {
                res.redirect('/todos/' + 1)
            }
            res.render(path.join('todos', 'todos'), {
                todos: rows,
                path: '/todos',
                perPage: perPage,
                paginate: [...Array(prettyCount).keys()],
                currentPage: Number(id),
                count: prettyCount,
                login: req.session.logIn
            })
        }).catch(error => {
            console.log(error)
        })
    }

    getNewTodo(req, res, next) {
        // find default user and send it to newTodo
        //default user with id 1 just for now
        User.findOne({ where: { id: 1 } }).then(user => {
            res.render(path.join('todos', 'newTodo'), { user: JSON.parse(JSON.stringify(user)), path: '/todos', login: req.session.logIn })
        }).catch(error => {
            console.log(error)
                // res.redirect('/todos')
        })
    }

    postNewTodo(req, res, next) {
        const title = req.body.title;
        const description = req.body.description;
        const userId = req.body.userId;
        let outUser;
        //save all informations  
        const result = sequelize.transaction((t) => {
            // With CLS enabled, the user will be created inside the transaction
            return User.findOne({
                where: { id: userId }
            }, { transaction: t }).then(user => {
                outUser = user;
                console.log(user)
                return Todo.create({
                    title: title,
                    description: description,
                    userId: user.id
                }, { transaction: t })

            })

        })

        result.then(data => {
            console.log(data)
            res.redirect('/')
        }).catch(error => {
            console.log(error)
            res.redirect('/todos/newTodo')
        })

        //redirect to some link


    }

    // create new init from class
    static build() {
        return new TodoController;
    }
}