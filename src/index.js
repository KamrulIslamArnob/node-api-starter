// import express
const express = require('express');

// import server
const app = require('./server');

// import express-session
const session = require('express-session');

// import connectDB
const connectDB = require('./configs/db.config');

// configure dotenv
require('dotenv').config();


// Middleware
app.use(express.json());


// Use session
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
);


// connect to the database
connectDB();


// Routes
app.use('/studentcourse', require('./student_course.routes.js'));


// get the port from the environment
const PORT = process.env.PORT || 3000;


// start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);   
});