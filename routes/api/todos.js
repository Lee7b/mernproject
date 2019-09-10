const express = require('express');
const router = express.Router();
const Todo = require('../../models/Todo');

// GET all Todos
router.get('/', (req,res) => {
    Todo.find({}).then((item) => {
        res.send(item);
    })
})

// POST route create todo
router.post('/', (req, res) => {
    
    if (!req.body.todoitem) {
        return res.status(400).send('Body is missing');
    }

    // Create new item
    const todoitem = new Todo(req.body)
              todoitem.save(function (err) {
                  if (err) return res.send('error');
                  res.send('Todo item created');
              })
})

router.get('/delete/:todoitem', (req, res) => {
    Todo.findOneAndDelete({todoitem: req.params.todoitem}, (err, todoitem) => {
        if (err) res.send(err)
        res.send('Deleted')
    })
console.log(req.params.todoitem)
})


module.exports = router;