const express = require('express');
const app = express();
const mongoose = require("mongoose");
// connecting to the database
const DB = 'mongodb+srv://praveen:Dehradun@cluster0.hns7t.mongodb.net/blogDB?retryWrites=true&w=majority';
mongoose.connect(DB).then(() => {
    console.log('connection successful');
}).catch((err)=> console.log("no connection"));


// Middleware - what to show to login user and new user 
const middleware = (req, res , next) =>{
    console.log("Hello my middlewre");
    next();
}



app.get('/', (req , res) => {
    res.send("Hello world from the server");
});

app.get('/about',middleware , (req , res) => {
    res.send("Hello world from the server");
});

app.get('/contact', (req , res) => {
    res.send("Hello world from the server");
});

app.get('/signin', (req , res) => {
    res.send("Hello world from the server");
});

app.get('/signup', (req , res) => {
    res.send("Hello world from the server");
});



app.listen(3000 , () =>{
    console.log("Server is running at port 3000");
});