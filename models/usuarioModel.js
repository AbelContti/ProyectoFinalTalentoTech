import { db } from '../data/data.js';
import { collection, getDocs, addDoc, query, where} from 'firebase/firestore';
import { NotFoundError } from '../errors/NotFoundError.js';
import { ConflictError } from '../errors/ConflictError.js';
import { AuthError } from '../errors/AuthError.js';
import bcrypt from 'bcrypt';

const usersCollection = collection(db, 'usuarios');

export async function createUser(user) {
    try {
        // Podrías validar si el email ya existe antes de registrar
        const existingUser = await getUserByEmail(user.email);
        
        if (existingUser) {
            throw new ConflictError("El email ya está registrado");
        }

        await addDoc(usersCollection, user);
    } catch (error) {
        throw error;
    }
}

export async function getUserByEmail(email) {
    try {
        const q = query(usersCollection, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) return null;

        // Suponemos que no hay emails duplicados
        return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
    } catch (error) {
        throw error;
    }
}

export async function validateEmail(email) {
    try {
        const user = await getUserByEmail(email);

        if(!user) {
            throw new NotFoundError(`El usuario no existe`);
        }

        return user;
    } catch (error) {
        throw error;
    }
}

export async function validatePassword(password, hashedPassword) {
    try {
        const validPassword = await bcrypt.compare(password, hashedPassword);

        if(!validPassword)
            throw new AuthError("Contraseña incorrecta");
    } catch (error) {
        throw error;
    }
}