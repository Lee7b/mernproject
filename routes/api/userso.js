const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// GET all users
router.get('/', (req,res) => {
    User.find({}).then((users) => {
        res.send(users);
    })
})

// GET user by name
router.get('/:name', (req,res) => {
    const query = User.where({name: req.params.name});
    query.findOne((err, user) => {
        if (err) return res.send('Invalid user');
        res.send(user);
    })
})

// POST route create user
router.post('/', (req, res) => {
    
    if (!req.body.name || !req.body.email) {
        return res.status(400).send('Body is missing');
    }

    // Check if email exists
    User.countDocuments({email: req.body.email}, (err, count) => {
        if (count > 0) { res.send({msg: 'Already Exists'}) }
        else {
            // Create new user
              const user = new User(req.body)
              user.save(function (err) {
                  if (err) return res.send('error');
                  res.send('User created');
              })
        }

    })
})

module.exports = router;