// Dependencies
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

// Application Setup
const app = express();
dotenv.config();

// Database Connection
mongoose
    .connect(process.env.MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Databases connected successfully');
    })
    .catch((err) => console.log(err));

// Request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set template engine
app.set('view engine', 'ejs');

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routing setup

// Error Handling

// Run the applocatin
app.listen(process.env.PORT, () => {
    console.log('Application started on port 3000');
});
