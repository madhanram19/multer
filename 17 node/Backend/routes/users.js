var express = require('express');
var router = express.Router();


const todos = [{ "id": 1, "todo": "Do something nice for someone I care about", "completed": true, "userId": 26 }, { "id": 2, "todo": "Memorize the fifty states and their capitals", "completed": false, "userId": 48 }, { "id": 3, "todo": "Watch a classic movie", "completed": false, "userId": 4 }, { "id": 4, "todo": "Contribute code or a monetary donation to an open-source software project", "completed": false, "userId": 48 }, { "id": 5, "todo": "Solve a Rubik's cube", "completed": false, "userId": 31 }]


router.get('/', (req, res) => {
  res.send(todos)
})

router.get('/:id', (req, res) => {
  res.send(todos.find((todo) => todo.id == req.params.id))
})

module.exports = router;
