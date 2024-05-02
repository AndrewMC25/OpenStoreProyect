import axios from 'axios';

async function handleDataUpdate (data) {
    try {
        const res = await axios.post('/api/dataUpdater', data)
    } catch (error) {
        console.error(error)
    }
}

export default handleDataUpdate