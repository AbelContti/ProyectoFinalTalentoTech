import {validateEmail, validatePassword, createUser} from '../models/usuarioModel.js';

export async function auth(email, password) {
    const user = await validateEmail(email);
    await validatePassword(password, user.password);
    return user;
}

export async function register(newUser) {
    return await createUser(newUser);
}