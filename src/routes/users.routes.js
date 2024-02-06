/* eslint-disable import/extensions */
import { Router } from 'express';
import usersController from '../controllers/user.js';

import authenticateToken from '../middlewares/authenticateToken.js';
import authenticateRole from '../middlewares/authenticateRole.js';
import { ROLE_ADMIN, ROLE_SUPER_ADMIN, ROLE_USER } from '../utils/constants.js';
import verifyMongoId from '../middlewares/mongoIdField.js';

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
 */

/**
 * @openapi
 * /api/users/me:
 *   get:
 *     summary: Get logged user
 *     security:
 *      - bearerAuth: []
 *     description: Get logged user
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Success
 *
 */

router.get('/me', [authenticateToken, authenticateRole([ROLE_USER, ROLE_ADMIN, ROLE_SUPER_ADMIN])], usersController.get);

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
 *       401:
 *         description: Unauthorized
 *
 */
router.get('/', usersController.getAll);

// Routes for password recovery
router.post('/password-reset', usersController.recoverPassword);
router.get('/password-reset/:token', usersController.redirectForRecoverPassword);
router.put('/password-reset/:id', [verifyMongoId], usersController.setNewPassword);

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
 * @swagger
 * /api/users:
 *   put:
 *     summary: Edit user data.
 *     security:
 *       - bearerAuth: []
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
router.put('/', [authenticateToken, authenticateRole([ROLE_USER, ROLE_SUPER_ADMIN])], usersController.edit);
/**
 * @swagger
 * /api/users:
 *   delete:
 *     summary: Delete user.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *
 */
router.delete('/', [authenticateToken, authenticateRole([ROLE_USER])], usersController.remove);
router.delete('/:id', [authenticateToken, authenticateRole([ROLE_SUPER_ADMIN])], usersController.remove);

export default router;
