import { db } from '../data/data.js';
import { collection, getDocs, addDoc, query, where} from 'firebase/firestore';
import { NotFoundError } from '../errors/NotFoundError.js';
import { ConflictError } from '../errors/ConflictError.js';
import { AuthError } from '../errors/AuthError.js';
import bcrypt from 'bcrypt';

const usersCollection = collection(db, 'usuarios');

export async function createUser(email, password) {
    try {
        if(!email || !password) {
            throw new ConflictError("Error creando usuario: debe ingresar un email y una contraseña");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = {
            email: email,
            password: hashedPassword
        }

        const existingUser = await getUserByEmail(newUser.email);
        
        if (existingUser) {
            throw new ConflictError("Error creando usuario: el email ingresado ya está registrado");
        }

        await addDoc(usersCollection, newUser);
    } catch (error) {
        throw error;
    }
}

export async function loginUser(email, password) {
    try {
        if(!email || !password) {
            throw new ConflictError(`Error al validar usuario: debe ingresar email y contraseña`);
        }
        
        const user = await getUserByEmail(email);

        if(!user) {
            throw new NotFoundError(`Error al validar usuario: no existe un usuario con el email proporcionado`);
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword)
            throw new AuthError("Error al validar usuario: contraseña incorrecta");

        return user;
    } catch (error) {
        throw error;
    }
}

export async function getUserByEmail(email) {
    try {
        const q = query(usersCollection, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) return null;

        return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
    } catch (error) {
        throw error;
    }
}