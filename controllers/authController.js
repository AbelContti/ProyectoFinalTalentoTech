import { generateToken } from "../utils/tockenGenerator.js";
import { auth, register } from '../services/usuarioService.js';
import bcrypt from 'bcrypt';

export async function registerUser(req, res, next) {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = {
            email: email,
            password: hashedPassword
        }
        
        await register(newUser);
        res.status(201).json({ mensaje: "Usuario registrado correctamente" });
    } catch (error) {
        next(error);
    }
}

export async function loginUser(req, res, next) {
    try {
        if(!req.body) {
            res.status(404).json({ mensaje: "El cuerpo del mensaje está vacio" });
        }
        
        const { email, password } = req.body;
        const user = await auth(email, password);

        const token = generateToken({ id: user.id, email: user.email });
        res.json({ token });
    } catch (error) {
        next(error);
    }
}