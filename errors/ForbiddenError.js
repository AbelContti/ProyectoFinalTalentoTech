export class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ForbiddenError';
        this.code = 'FORBIDDEN';
    }
}

//'Acceso prohibido. Token no válido o expirado'