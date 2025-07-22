import { db } from '../data/data.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { ConflictError } from '../errors/ConflictError.js';

import { collection, getDocs, getDoc, setDoc, deleteDoc, doc } from 'firebase/firestore';

const productsCollection = collection(db, 'productos');

export async function getProductById(id) {
    try {
        if(id === "" || isNaN(Number(id)) || Number(id) < 0) { // Valida que el id ingresado sea un valor númerico mayor a 0
            throw new ConflictError('Error obteniendo producto: el id debe ser un valor númerico válido');
        }
        
        const productDoc = await getDoc(doc(productsCollection, id));

        if (productDoc.exists()) { // Busca el producto por su id. Si lo encuentra lo retorna, si no se produce un error
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

        if(querySnapshot.empty) { // Retorna los productos almacenados en la base de datos. En caso de no existir ninguno, se produce un error
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
        if(!product.id || !product.nombre || !product.precio) { // Valida que existan los campos del producto dentro del cuerpo del mensaje
            throw new ConflictError("Error creando producto: debe ingresar el ID, nombre y precio del producto");
        }

        const productDoc = await getDoc(doc(productsCollection, product.id));
        
        if (productDoc.exists()) { // Si un producto dentro de la base de datos posee el mismo id que el ingresado, se produce un error
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
        
        if(id === "" || isNaN(Number(id)) || Number(id) < 0) { // Valida que el id ingresado sea un valor númerico mayor a 0
            throw new ConflictError('Error obteniendo producto: el ID debe ser un valor númerico válido');
        }

        if (productDoc.exists()) { // Busca el producto por su id. Si lo encuentra lo elimina, si no se produce un error
            await deleteDoc(doc(productsCollection, id));
        } else {
            throw new NotFoundError(`Error eliminando producto: producto con ID ${id} no encontrado`);
        }
    } catch (error) {
        throw error;
    }
}