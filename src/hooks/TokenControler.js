import axios from "axios"

const TokenControler = async (credential) => {
    const url = "https://www.googleapis.com/drive/v2/files?access_token=";
    try {
        const response = await axios.get(url + credential);
        console.log(response.data)
    } catch (error) {
        console.error(error)
    }
    console.log(url + credential, 111)
}
export default TokenControler