const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

// Setup of routers
const mailerRouter = require('./modules/mailer/routes/mailer');

// Setup middleware
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

app.use('/sendemail', mailerRouter);
app.use(express.static(path.join(__dirname, '../public')));

if (process.env.NODE_ENV != 'production') {
	const morgan = require('morgan');
	app.use(morgan('dev'));
}

// Error handling
app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
    console.log(error);
});

module.exports = app;
