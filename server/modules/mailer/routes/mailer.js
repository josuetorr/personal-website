const express = require('express');
const router = express.Router();
const mailer = require('../controllers/mailer');

router.post('/', mailer.send);

module.exports = router;