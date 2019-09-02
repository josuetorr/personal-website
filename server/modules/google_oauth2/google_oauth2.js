const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const OAuth2Client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URL);
OAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
const accessToken = OAuth2Client.getAccessToken()

exports.auth = {
    type: 'OAuth2',
    user: process.env.MY_EMAIL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: accessToken
}