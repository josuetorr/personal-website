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
 * @param fullName  sender's full name
 * @param emailFrom sender's email
 * @param subject   email's subject 
 * @param content   email content 
 * 
 * @return an object containing the response with a successful message if the email was sent successfully.
 *          Otherwise, returns an object with and error property and a message indicating that something went wrong
 */
const sendMail = async (fullName, emailFrom, subject, content) => {

    // Object to be returned
    const exitStatus = {};

    const OAuth2Client = new OAuth2(clientID, clientSecret, redirectUrl);
    OAuth2Client.setCredentials({ refresh_token: refreshToken });
    const accessToken = await OAuth2Client.getAccessToken();

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
            <li>Name: ${fullName}</li>
            <li>Email: ${emailFrom}</li>
        </ul>
        <h2>Email Content</h2>
        <h3>Subject: ${subject}</h3>
        <p>${content}</p>
        `
    };

    // NEED TO FIGURE OUT HOW TO SEND THE RESPONSE FROM THIS FONCTION 
    smtpTransporter.sendMail(mailOptions, (err, resp) => {

        if (err) {
            exitStatus.error = err;
            exitStatus.message = 'Oops! Something went wrong.';
        } else {
            exitStatus.response = resp;
            exitStatus.message = 'Email sent successfully.';
        }

        smtpTransporter.close();
    });

    console.log(exitStatus);
    return exitStatus;
};

module.exports = sendMail;