'use server'

const TokenVerifier = (token) => {
    const client_id = '504897621923-epbrurgigh04jv448bnit08lh1nnifoa.apps.googleusercontent.com'
    const {OAuth2Client} = require('google-auth-library');
    const client = new OAuth2Client();
    async function verify() {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: client_id
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    }
    verify().catch(console.error);
}

export default TokenVerifier