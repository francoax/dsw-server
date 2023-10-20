/* eslint-disable import/extensions */
import { Router } from 'express';
import usersController from '../controllers/user.js';

import authenticateToken from '../middlewares/authenticateToken.js';

const router = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
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
 *     Create:
 *       type: object
 *       required:
 *         - name
 *         - lastname
 *         - address
 *         - email
 *         - password
 *         - tel
 *         - role
 *       properties:
 *         name:
 *           type: string
 *         lastname:
 *           type: string
 *         address:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         tel:
 *           type: string
 *         role:
 *           type: string
 *       example:
 *         name: tomas
 *         lastname: lopez
 *         address: email
 *         email: email@gmail.com
 *         password: contraseña         
 *         tel: "1234567"
 *         role: "1"
 *     Update:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - lastname
 *         - address
 *         - email
 *         - password
 *         - tel
 *         - role
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         lastname:
 *           type: string
 *         address:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         tel:
 *           type: string
 *         role:
 *           type: string
 *       example:
 *         id: "1"
 *         name: tomas
 *         lastname: lopez
 *         address: email
 *         email: email@gmail.com
 *         password: contraseña         
 *         tel: "1234567"
 *         role: "1"
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
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Create'
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 */
router.post('/', usersController.create);
/**
 * @openapi
 * /api/users:
 *   put:
 *     summary: Edit user
 *     tags:
 *       - Users
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Update'
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *
 */
router.put('/', [authenticateToken], usersController.edit);

router.delete('/', [authenticateToken], usersController.remove);

export default router;
