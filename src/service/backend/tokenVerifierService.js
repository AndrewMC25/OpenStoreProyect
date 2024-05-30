import VerifyGoogleAuthentication from '../../lib/google'
import * as userOptions from './usersCrudService';
const jwt = require('jsonwebtoken');

async function verify(googleToken) {
    const secret = process.env.JWT_SECRET
    try {
        const response = await VerifyGoogleAuthentication(googleToken);
        const rule = {
            condition: 'email',
            conditionValue: response.email
        };
        const fetchUser = await userOptions.readUser(rule);
        const userData = fetchUser[0];

        if(fetchUser.length) {
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 15,
                email: userData.email,
                username: userData.name,
                id: userData.id
            }, secret);

            return token;
        } else {
            await userOptions.createUser(response);
            const fetchUser = await userOptions.readUser(rule);
            const userData = fetchUser[0];
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 15,
                email: userData.email,
                username: userData.name,
                id: userData.id
            }, secret);
            
            return token;
        }
    } catch (error) {
        throw new Error(error);
    }
}

export default verify;