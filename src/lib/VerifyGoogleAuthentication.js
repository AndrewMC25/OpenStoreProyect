const {OAuth2Client} = require('google-auth-library');

async function VerifyGoogleAuthentication () {
    const client_id = '504897621923-epbrurgigh04jv448bnit08lh1nnifoa.apps.googleusercontent.com'
    const client = new OAuth2Client();
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: client_id
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    return userid
}

export default VerifyGoogleAuthentication;