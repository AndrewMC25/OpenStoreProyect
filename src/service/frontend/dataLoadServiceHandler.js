import axios from 'axios';

async function handleDataLoad (data) {
    try {
        await axios.post('/api/dataLoader', data)
    } catch (error) {
        console.error(error)
    }
}

export default handleDataLoad