/* eslint-disable import/extensions */
import { Router } from 'express';
import usersController from '../controllers/user.js';

import authenticateToken from '../middlewares/authenticateToken.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: El email del usuario.
 *         password:
 *           type: string
 *           description: La contraseña del usuario.
 *       example:
 *         email: email
 *         password: contraseña
 */

router.get('/me', [authenticateToken], usersController.get);

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Get all Users
 *     description: Get all Users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get('/', usersController.getAll);
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Logs user into the system
 *     tags:
 *       - Users
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Login'
 *     responses:
 *        200:
 *         description: Success
 *        401:
 *         description: Unauthorized
 *
 */
router.post('/login', usersController.login);
/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Create user
 *     tags:
 *       - Users
 *     parameters:
 *       - name: name
 *         required: true
 *         schema:
 *           type: string
 *       - name: lastname
 *         required: true
 *         schema:
 *           type: string
 *       - name: address
 *         required: true
 *         schema:
 *           type: string
 *       - name: email
 *         required: true
 *         schema:
 *           type: string
 *       - name: password
 *         required: true
 *         schema:
 *           type: string
 *       - name: tel
 *         required: true
 *         schema:
 *           type: string
 *       - name: role
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.post('/', usersController.create);

router.put('/', [authenticateToken], usersController.edit);

router.delete('/', [authenticateToken], usersController.remove);

export default router;
