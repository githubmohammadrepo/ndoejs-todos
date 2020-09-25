var express = require('express');
var router = express.Router();
const TodoController = require('./../controller/todos');
const initTodoController = TodoController.build();

/* GET users listing. */

/* GET users listing. */
router.get('/newTodo', initTodoController.getNewTodo);


/* POSt users listing. */
router.post('/newTodo', initTodoController.postNewTodo);

router.get('/:id', initTodoController.getTodosHomePage);

module.exports = router;