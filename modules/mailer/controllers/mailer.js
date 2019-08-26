const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const clientID = process.env.CLIENTID;
const clientSecret = process.env.CLIENTSECRET;
const redirectUrl = process.env.REDIRECTURL;
const myEmail = process.env.EMAIL;
const refreshToken = process.env.REFRESHTOKEN;

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
 * @return an object containing the response with a successful message if the email was sent successfully.
 *          Otherwise, returns an object with and error property and a message indicating that something went wrong
 */
const sendMail = (emailContent, callback) => {

    if (typeof callback != 'function') {
        return console.log('sendmail: \"callback\" must be a function');
    }

    const OAuth2Client = new OAuth2(clientID, clientSecret, redirectUrl);
    OAuth2Client.setCredentials({ refresh_token: refreshToken });
    const accessToken = OAuth2Client.getAccessToken();

    const smtpTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: myEmail,
            clientId: clientID,
            clientSecret: clientSecret,
            refreshToken: refreshToken,
            accessToken: accessToken
        }
    });

    const mailOptions = {
        from: myEmail,
        to: myEmail,
        subject: 'Sent from Nodemailer',
        generateTextFromHTML: true,
        html: `
        <h2>Contact Info</h2>
        <ul>
            <li>Name: ${emailContent.fullName}</li>
            <li>Email: ${emailContent.emailFrom}</li>
        </ul>
        <h2>Email Content</h2>
        <h3>Subject: ${emailContent.subject}</h3>
        <p>${emailContent.content}</p>
        `
    };

    // NEED TO FIGURE OUT HOW TO SEND THE RESPONSE FROM THIS FONCTION 
    smtpTransporter.sendMail(mailOptions, (err, messageInfo) => {

        callback(err, messageInfo);

        smtpTransporter.close();
    });

};

module.exports = sendMail;