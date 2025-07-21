import { getAll, getById, save, remove } from '../services/productoService.js';

export async function getProductos(req, res, next) {
  try {
    const productos = await getAll();
    res.json(productos);
  
  } catch (error) {
    next(error);
  }
}

export async function getProducto(req, res, next) {
  try {
    const { id } = req.params;
    
    const producto = await getById(id.trim());
    res.json(producto);
  
  } catch (error) {
    next(error);
  }
}

export async function createProducto(req, res, next) {
  try {
    if(!req.body) {
      res.status(404).json({ mensaje: "El cuerpo del mensaje está vacio" });
    }
    
    const nuevoProducto = req.body;
    await save(nuevoProducto);
    res.status(201).json({ mensaje: 'Producto creado exitosamente' });
  
  } catch (error) {
    next(error);
  }
}

export async function deleteProducto(req, res, next) {
  try {
    const { id } = req.params;
    await remove(id.trim());
    res.json({ mensaje: 'Producto eliminado correctamente' });

  } catch (error) {
    next(error);
  }
}