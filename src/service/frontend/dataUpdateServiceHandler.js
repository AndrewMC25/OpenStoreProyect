import axios from 'axios';

async function handleDataUpdate (data) {
    try {
        await axios.post('/api/dataUpdater', data)
    } catch (error) {
        console.error(error)
    }
}

export default handleDataUpdate