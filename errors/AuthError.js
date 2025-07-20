export class AuthError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthError';
        this.code = 'UNAUTHORIZED';
    }
}