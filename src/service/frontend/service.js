import axios from "axios"

const service = async () => {
    try {
        const res = await axios.post('/api/dataReader', rule)
    } catch (error) {
        console.error(error)
    }
}