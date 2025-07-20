import { NotFoundError } from '../errors/NotFoundError.js';
import { ConflictError } from '../errors/ConflictError.js';
import { AuthError } from '../errors/AuthError.js';
import { ForbiddenError } from '../errors/ForbiddenError.js';
 
export function errorHandler(err, req, res, next) {
    console.error(`[ERROR] ${err.name}: ${err.message}`);

    if (err instanceof NotFoundError) {
        return res.status(404).json({ mensaje: err.message });
    }

    if (err instanceof ConflictError) {
        return res.status(409).json({ mensaje: err.message });
    }

    if (err instanceof AuthError) {
        return res.status(401).json({ mensaje: err.message });
    }

    if (err instanceof ForbiddenError) {
        return res.status(403).json({ mensaje: err.message });
    }

    // Error genérico (500)
    res.status(500).json({ mensaje: 'Error interno del servidor' });
}