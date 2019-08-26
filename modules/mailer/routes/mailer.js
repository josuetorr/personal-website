const express = require('express');
const router = express.Router();
const sendEmail = require('../controllers/mailer');

router.post('/', (req, res, next) => {
    const emailContent = {
        fullName: req.body.fullName,
        email: req.body.fullName,
        subject: req.body.subject,
        message: req.body.message
    };

    sendEmail(emailContent, (err, messageInfo) => {
        if (err) {
            res.status(500).json({
                error: err,
                status: 'Oops! Something went wrong.'
            });
        } else {
            res.status(200).json({
                emailInfo: messageInfo,
                status: 'Email was sent successfully.' 
            })
        }
    });
});

module.exports = router;