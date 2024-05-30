import axios from 'axios';

async function handleDataDelete (data) {
    try {
        await axios.post('/api/dataDeleter', data);
    } catch (error) {
        console.error(error);
    };
};

export default handleDataDelete;