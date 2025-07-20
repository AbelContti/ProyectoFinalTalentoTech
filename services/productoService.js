// import {
//   getAllProducts as getAll,
//   getProductById as getById,
//   saveProduct as save,
//   deleteProduct as remove
// } from '../models/productoModel.js';

import { getAllProducts, getProductById, saveProduct, deleteProduct } from '../models/productoModel.js';

export async function getAll() {
  return await getAllProducts();
}

export async function getById(id) {
  return await getProductById(id);
}

export async function save(producto) {
  return await saveProduct(producto);
}

export async function remove(id) {
  return await deleteProduct(id);
}