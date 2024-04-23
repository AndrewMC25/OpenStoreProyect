import VerifyGoogleAuthentication from '../lib/VerifyGoogleAuthentication'

async function verify(token) {
    const responce = await VerifyGoogleAuthentication(token);
    return responce;
}

export default verify;