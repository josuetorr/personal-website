const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

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
 */
const sendMail = async (fullName, emailFrom, subject, content) => {

    const clientID = process.env.CLIENTID;
    const clientSecret = process.env.CLIENTSECRET;
    const redirectUrl = process.env.REDIRECTURL;
    const myEmail = process.env.EMAIL;
    const refreshToken = process.env.REFRESHTOKEN;

    const OAuth2Client = new OAuth2(clientID, clientSecret, redirectUrl);
    OAuth2Client.setCredentials({ refresh_token: process.env.REFRESHTOKEN });
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
        from: process.env.EMAIL,
        to: process.env.EMAIL,
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


    smtpTransporter.sendMail(mailOptions, (err, resp) => {
        if (err) { console.log(err, 'here is the err'); }
        else { console.log(resp); }
        smtpTransporter.close();
    });

};

module.exports = sendMail;