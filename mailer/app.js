const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sendMail = require('./mailer');
require('dotenv').config()

// Setup middleware
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

// Post request to root directory
app.post('/', (req, res, next) => {
    sendMail(req.body.fullName, req.body.email, req.body.subject, req.body.content);
    res.status(200).json({
        message: 'Email sent successfully!'
    });
});

module.exports = app;