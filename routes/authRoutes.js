import express from 'express';
import { loginUser, registerUser } from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@email.com
 *               password:
 *                 type: string
 *                 example: Pass123
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       409:
 *         description: El email ya está registrado / Falta email o contraseña
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión y obtiene un JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - email
 *              - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@email.com
 *               password:
 *                 type: string
 *                 example: Pass123
 *     responses:
 *       200:
 *         description: JWT generado correctamente
 *       401:
 *         description: Contraseña incorrecta
 *       403:
 *         description: No existe un usuario con el email proporcionado
 *       409:
 *         description: Falta email o contraseña
 */

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;