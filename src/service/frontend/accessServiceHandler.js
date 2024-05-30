import axios from 'axios';

async function handleAccess (token) {
    try {
        const accessToken = await axios.post('/api/userVerify', {token})
        return accessToken
    } catch (error) {
        console.error(error)
    }
}

export default handleAccess