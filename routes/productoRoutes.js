import express from 'express';
import { getProductos, getProducto, createProducto, deleteProducto } from '../controllers/productoController.js';

const router = express.Router();

/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos
 *       404:
 *         description: No hay productos para mostrar
 *
*/

/** 
 * @swagger
 * /api/productos/create:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - nombre
 *               - precio
 *             properties:
 *               id:
 *                 type: string
 *                 example: "1"
 *               nombre:
 *                 type: string
 *                 example: "family"
 *               precio:
 *                 type: number
 *                 example: 2700
 *               categoria:
 *                 type: string
 *                 example: "videojuegos"
 *     responses:
 *       201:
 *         description: Producto creado correctamente
 *       409:
 *         description: El ID del producto ya existe o es inválido / Falta ID, nombre o precio
*/

/**
 * @swagger
 * /api/productos/{id}:
 *   get:
 *     summary: Obtiene un producto por su ID
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 *       409:
 *         description: El ID es inválido
 *
 *   delete:
 *     summary: Elimina un producto por su ID
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto a eliminar
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *       404:
 *         description: Producto no encontrado
 *       409:
 *         description: el ID debe ser un valor númerico válido
 */


router.get('/', getProductos);
router.get('/:id', getProducto);
router.post('/create', createProducto);
router.delete('/:id', deleteProducto);

export default router;