/**
 * Title: Messenger
 * Description: Messenger app with nodeJs
 * Author: Anik Hossain || Inspired by Learn With Sumit
 * Date: 7/25/2021
 */

// External Dependencies
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

// Internal Dependencies
const { errorHandler, notFound } = require('./middlewares/common/errorHandler');
const loginRouter = require('./routers/loginRouter');
const usersRouter = require('./routers/usersRouter');
const inboxRouter = require('./routers/inboxRouter');

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
app.use('/', loginRouter);
app.use('/signup', usersRouter);
app.use('/users', usersRouter);
app.use('/messeges', inboxRouter);

/** **********Error Handling********** */

// Not found
app.use(notFound);

// Common error handler
app.use(errorHandler);

// Run the applocatin
app.listen(process.env.PORT, () => {
    console.log(`Application started on port ${process.env.PORT}`);
});
