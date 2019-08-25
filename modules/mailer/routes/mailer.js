const express = require('express');
const router = express.Router();
const sendEmail = require('../controllers/mailer');

router.post('/', async (req, res, next) => {
    const returnStatus = await sendEmail(req.body.fullName, req.body.email, req.body.subject, req.body.content);
    
    console.log(returnStatus, 'return status');
    if (returnStatus.error) {
        res.status(500).json(returnStatus);
    } else {
        res.status(200).json(returnStatus);
    }
});

module.exports = router;