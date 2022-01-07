const dotenv = require('dotenv');
const express = require('express');
const app = express();

dotenv.config({path:'./config.env'});
const mongoose = require("mongoose");

//storing port
const PORT = process.env.PORT;
// connecting to the database
require('./db/conn');
//const User = require('./model/userSchema');

app.use(express.json());

//linking the router 
app.use(require('./router/auth'));

/* Middleware - what to show to login user and new user 
const middleware = (req, res , next) =>{
    console.log("Hello my middleware");
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

*/

app.listen(PORT , () =>{
    console.log(`Server is running at port ${PORT}`);
});