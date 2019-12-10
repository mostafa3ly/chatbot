const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const messagesController = require('./controllers/MessagesController');

const app = express();

mongoose.connect('mongodb://localhost:27017/chatbotdb',{useNewUrlParser: true, useUnifiedTopology: true},(err)=>{
    if(err) console.log(err);    
})

app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use('/messages',messagesController);


if(process.env.NODE_ENV === "production"){
  app.use(express.static('client/build'));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"client", "build", "index.html"));
  })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=> console.log(`listening to port ${PORT}`));