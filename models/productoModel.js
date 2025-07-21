import { db } from '../data/data.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { ConflictError } from '../errors/ConflictError.js';

import { collection, getDocs, getDoc, setDoc, deleteDoc, doc } from 'firebase/firestore';

const productsCollection = collection(db, 'productos');

export async function getProductById(id) {
    try {
        if(id === "" || isNaN(Number(id)) || Number(id) < 0) {
            throw new ConflictError('Error obteniendo producto: el id debe ser un valor númerico válido');
        }
        
        const productDoc = await getDoc(doc(productsCollection, id));

        if (productDoc.exists()) {
            return productDoc.data();
        } else {
            throw new NotFoundError(`Error obteniendo producto: producto con id ${id} no encontrado`);
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
        if(!product.id || !product.nombre || !product.precio) {
            throw new ConflictError("Error creando producto: debe ingresar el ID, nombre y precio del producto");
        }

        const productDoc = await getDoc(doc(productsCollection, product.id));
        
        if (productDoc.exists()) {
            throw new ConflictError('Error creando producto: El ID del producto ya existe o es inválido');
        } else {
            await setDoc(doc(productsCollection, product.id), product);
        }
    } catch (error) {
        throw error;
    }
}

export async function deleteProduct(id) {
    try {
        const productDoc = await getDoc(doc(productsCollection, id));
        
        if(id === "" || isNaN(Number(id)) || Number(id) < 0) {
            throw new ConflictError('Error obteniendo producto: el ID debe ser un valor númerico válido');
        }

        if (productDoc.exists()) {
            await deleteDoc(doc(productsCollection, id));
        } else {
            throw new NotFoundError(`Error eliminando producto: producto con ID ${id} no encontrado`);
        }
    } catch (error) {
        throw error;
    }
}