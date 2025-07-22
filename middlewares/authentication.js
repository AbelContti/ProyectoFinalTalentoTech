import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { ForbiddenError } from '../errors/ForbiddenError.js';
import { AuthError } from '../errors/AuthError.js';

const secretKey = process.env.JWT_SECRET_KEY;

export function authentication(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return next(new AuthError('Token no proporcionado'));
    }

    jwt.verify(token, secretKey, (err, user) => {

        if (err) {
            return next(new ForbiddenError('Token inválido o expirado'));
        }
        
        req.user = user;
        next();
    });
}