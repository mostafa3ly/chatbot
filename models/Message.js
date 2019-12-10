const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content: {type: String, required: true},
    sender: {type: String, required: true},
 });

 const message = mongoose.model('message', messageSchema);

 module.exports = message;