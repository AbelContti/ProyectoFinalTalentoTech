import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secretKey = process.env.JWT_SECRET_KEY;

export function generateToken(userData) {
    const user = {id: userData.id, email: userData.email};
    const expiration = { expiresIn: '1h' };

    return jwt.sign(user, secretKey, expiration);
}