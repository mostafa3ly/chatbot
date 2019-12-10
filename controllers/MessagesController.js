const express = require("express");
const messageModel = require("../models/Message.js")
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const data = await messageModel.find({});
        res.json(data)
    }
    catch{
        res.send("error fetching")
    }
})


router.post('/', async (req, res) => {
    message = new messageModel(
        {
            content:  req.body.content,
            sender:  req.body.sender
        }
    )
    try {
        await message.save();
        res.send("Message sent");
    } catch{
        res.send("error sending");
    }
})

module.exports = router;