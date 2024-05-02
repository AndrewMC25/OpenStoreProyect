import axios from "axios"

const handleItemReader = async (rule) => {
    try {
        const res = await axios.post('/api/dataReader', rule)
        return(res.data)
    } catch (error) {
        console.error(error)
    }
}

export default handleItemReader