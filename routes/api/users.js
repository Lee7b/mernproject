const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// GET all users
router.get('/', (req,res) => {
    User.find({}).then((users) => {
        res.send(users);
    })
})

// Create new user
router.post('/', (req,res) => {
    const user = new User(req.body)
    user.save(function (err) {
        if (err) return res.send('error');
        res.send('User created');
    })
})

// Update User
router.put('/:id', (req, res) => {
    let id = req.params.id;
    User.findById(id, (err, user) => {
        if (!user) res.status(404).send(err);
        else {
            user.name = req.body.name;
            user.email = req.body.email;

            user.save().then(user => {
                res.send('Updated');
            })
            .catch(err => {
                res.status(400).send('Unable to update');
            })
        }
    })
})

// Delete by ID
router.delete('/:id', (req,res) => {
    User.remove({
        _id: req.params.id
    }, (err, user) => {
        if (err) return res.status(404).send(err)
        else res.send("Deleted");
    })
})

module.exports = router;