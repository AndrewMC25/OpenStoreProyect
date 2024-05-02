import axios from 'axios';

async function handleAccess (token) {
    try {
        await axios.post('/api/userVerify', {token})
    } catch (error) {
        console.error(error)
    }
}

export default handleAccess