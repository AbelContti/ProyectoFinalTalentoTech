import express from 'express';
import { getProductos, getProducto, createProducto, deleteProducto } from '../controllers/productoController.js';

const router = express.Router();

router.get('/', getProductos);
router.get('/:id', getProducto);
router.post('/create', createProducto);
router.delete('/:id', deleteProducto);

export default router;