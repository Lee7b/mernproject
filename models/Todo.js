const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema ({
    todoitem: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Todo', TodoSchema);