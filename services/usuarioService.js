import {createUser, loginUser} from '../models/usuarioModel.js';

export async function auth(email, password) {
    return await loginUser(email, password);
}

export async function register(email, password) {
    return await createUser(email, password);
}