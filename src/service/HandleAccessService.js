import axios from 'axios';

async function HandleAccess (token) {
    try {
        const res = await axios.post('/api/userVerify', {token})
        const statusCode = res.status
        console.log(statusCode)
    } catch (error) {
        console.error(error)
    }
}

export default HandleAccess