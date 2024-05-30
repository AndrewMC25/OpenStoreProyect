const {OAuth2Client} = require('google-auth-library');

async function VerifyGoogleAuthentication (token) {
    const client_id = '504897621923-epbrurgigh04jv448bnit08lh1nnifoa.apps.googleusercontent.com'
    const client = new OAuth2Client();
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: client_id
    });
    const userCredentials = {name: ticket.payload.name, email: ticket.payload.email}
    return userCredentials
}

export default VerifyGoogleAuthentication;