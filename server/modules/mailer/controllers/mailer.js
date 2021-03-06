const nodemailer = require('nodemailer');
const googleOAuth2 = require('../../google_oauth2/google_oauth2');

/**
 * We simply check if the email given contains the @ symbol
 * 
 * THIS JUST FOR NOW, MIGHT BE CHANGED IN LATER ITERATIONS
 * 
 * @param email to be validated
 * 
 * @return true if the email is valid, false otherwise
 */
const isEmailValid = (email) => {
    const regex = /\S+@\S+/;
    return regex.test(email) && email.length !== 0 && email[0]!== '@';
}

/**
 * Sends an email to my personal gmail with the full name, email, subject and content 
 * from the sender.
 * 
 * Using nodemailer, we authenticate using OAuth2 through gmail which was setup from 
 * the Google cloud console.
 * 
 * @param emailContent object containing the information about the email such as:
 * - Sender's full name
 * - Sender's email address
 * - Email subject
 * - Email message
 * 
 * @param callback function that is called once the email has been sent. Takes 2 paramaters, an error if the email
 * was not sent successfully and a messageSentInfo if the email was sent successfully.
 * 
 * @return object containing the response with a successful message if the email was sent successfully.
 *          Otherwise, returns an object with and error property and a message indicating that something went wrong
 */
const sendMail = (emailContent, callback) => {

    if (typeof callback != 'function') {
        return console.log('sendmail: \"callback\" must be a function');
    }

    const smtpTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: googleOAuth2.auth
    });

    const mailOptions = {
        from: process.env.MY_EMAIL,
        to: process.env.MY_EMAIL,
        subject: 'Sent from Nodemailer',
        generateTextFromHTML: true,
        html: `
        <h2>Contact Info</h2>
        <ul>
            <li>Name: ${emailContent.fullName}</li>
            <li>Email: ${emailContent.email}</li>
        </ul>
        <h2>Email Content</h2>
        <h3>Subject: ${emailContent.subject}</h3>
        <p>${emailContent.message}</p>
        `
    };

    smtpTransporter.sendMail(mailOptions, (err, messageInfo) => {
        callback(err, messageInfo);
        smtpTransporter.close();
    });

};


// Post request handler
exports.send = (req, res) => {

    if (!isEmailValid(req.body.email)) {
        return res.status(400).json({
            error: {
                message: 'Invalid email address.',
                sent: false
            }
        });
    }

    if (req.body.fullName.length === 0) {
        return res.status(400).json({
            error: {
                message: 'Full name is required.',
                sent: false
            }
        });
    }

    if (req.body.message.length === 0) {
        return res.status(400).json({
            error: {
                message: 'Message is required.',
                sent: false
            }
        });
    }

    const emailContent = {
        fullName: req.body.fullName,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    };

    if (emailContent.fullName === 'pechocha' &&
        emailContent.email === 'lorianne.boilie@hotmail.com') {
        res.status(200).json({
            emailInfo: {
                message: '<a href="/secret.html">secret</a>',
                sent: true,
                details: 'none'
            }
        });

        return;
    }

    sendMail(emailContent, (err, messageInfo) => {
        if (err) {
            res.status(500).json({
                error: {
                    message: 'Oops! Could not send the email',
                    sent: false,
                    details: err
                }
            });
        } else {
            res.status(200).json({
                emailInfo: {
                    message: 'Email was sent successfully',
                    sent: true,
                    details: messageInfo
                }
            })
        }
    });
}
