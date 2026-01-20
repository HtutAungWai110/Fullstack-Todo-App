import jwt from 'jsonwebtoken';

export default function generateToken(payload) {
    const secret = process.env.JWT_SECRET;
    const expires = process.env.JWT_EXPIRES || '7d';
    const token = jwt.sign({...payload}, secret, {
        expiresIn: expires
    })

    return token;
    
}