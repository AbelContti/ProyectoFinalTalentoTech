import { db } from '../data/data.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { ConflictError } from '../errors/ConflictError.js';

import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    setDoc,
    deleteDoc,
    doc
} from 'firebase/firestore';

const productsCollection = collection(db, 'productos');

export async function getProductById(id) {
    try {
        const productDoc = await getDoc(doc(productsCollection, id));
        if (productDoc.exists()) {
            return productDoc.data();
        } else {
            throw new NotFoundError(`Error obteniendo producto: producto con ID ${id} no encontrado`);
        }
    } catch (error) {
        throw error;
    }
}

export async function getAllProducts() {
    try {
        const querySnapshot = await getDocs(productsCollection);
        const products = [];

        if(querySnapshot.empty) {
            throw new NotFoundError(`Error obteniendo productos: no hay productos para mostrar`);
        }

        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });
        return products;
        
    } catch (error) {
        throw error;
    }
}

export async function saveProduct(product) {
    try {
        const productDoc = await getDoc(doc(productsCollection, product.id));
        
        if (productDoc.exists()) {
            throw new ConflictError('Error creando producto: ya existe un producto con ese ID');
        } else {
            if(product.id) {
                await setDoc(doc(productsCollection, product.id), product);
            } else {
                await addDoc(productsCollection, product);
            }
        }
    
    } catch (error) {
        throw error;
    }
}

export async function deleteProduct(id) {
    try {
        const productDoc = await getDoc(doc(productsCollection, id));
        if (productDoc.exists()) {
            await deleteDoc(doc(productsCollection, id));
        } else {
            throw new NotFoundError(`Error eliminando producto: producto con ID ${id} no encontrado`);
        }
    } catch (error) {
        throw error;
    }
}