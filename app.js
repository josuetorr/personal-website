const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const path = require('path');

// Setup of routers
const mailerRouter = require('./modules/mailer/routes/mailer');

// Setup middleware
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));


app.get('/', (req, res, next) => {
    res.status(200).render('public/index.html');
});

app.use('/sendemail', mailerRouter);

module.exports = app;