import VerifyGoogleAuthentication from '../../lib/google'

async function verify(token) {
    const responce = await VerifyGoogleAuthentication(token);
    return responce;
}

export default verify;