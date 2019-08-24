const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sendMail = require('./mailer');

// Setup middleware
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

// There is only one route for this app.
// We receive the post request @ / and send the email
app.post('/', (req, res, next) => {
    sendMail(req.body.fullName, req.body.email, req.body.subject, req.body.content);
    res.status(200).json({
        message: 'Email sent successfully!'
    });
});

module.exports = app;