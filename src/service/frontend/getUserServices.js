import axios from "axios"

const getUser = async () => {
    try {
        const res = await axios.get('/api/getUser');
        return(res);
    } catch (error) {
        console.error(error);
    };
};

export default getUser;