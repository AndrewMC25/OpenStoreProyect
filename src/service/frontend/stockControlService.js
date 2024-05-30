import axios from "axios"

const stockControl = async (data) => {
    try {
        await axios.post('/api/stockControl', data)
    } catch (error) {
        console.error(error)
    }
}

export default stockControl