import { verify } from 'jsonwebtoken'

const getUserData = (token) => {
    const secret = process.env.JWT_SECRET;
    if(!token){
        throw new Error('invalid token')
    }
    try {
        const data = verify(token, secret);
        return data
    } catch (error) {
        throw new Error('invalid token')
    }
}

export default getUserData