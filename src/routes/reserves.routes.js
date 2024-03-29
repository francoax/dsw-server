/* eslint-disable import/extensions */
import { Router } from 'express';
import reserveController from '../controllers/reserve.js';
import verifyMongoId from '../middlewares/mongoIdField.js';
import authenticateToken from '../middlewares/authenticateToken.js';
import authenticateRole from '../middlewares/authenticateRole.js';
import { ROLE_USER } from '../utils/constants.js';

const router = Router();
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @openapi
 * /api/reserves:
 *   get:
 *     summary: Get all Reserves
 *     description: Get all Reserves
 *     tags:
 *       - Reserves
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 */
router.get('/', reserveController.getAll);

router.get('/validate-dates', [authenticateToken, authenticateRole([ROLE_USER])], reserveController.validateCarDates);
router.get('/property-reserves/:id', [verifyMongoId, authenticateToken, authenticateRole([ROLE_USER])], reserveController.propertyReserves);

/**
 * @openapi
 * /api/reserves/user:
 *   get:
 *     summary: Get Reserves by User
 *     security:
 *      - bearerAuth: []
 *     description: Get Reserves by User
 *     tags:
 *       - Reserves
 *     responses:
 *       200:
 *         description: Success
 *
 */

router.get('/user', [authenticateToken, authenticateRole([ROLE_USER])], reserveController.getByUser);
/**
 * @openapi
 * /api/reserves/{id}:
 *   get:
 *     summary: Get the reserve by his id
 *     security:
 *      - bearerAuth: []
 *     description: Get the reserve by his id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     tags:
 *       - Reserves
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get('/:id', [verifyMongoId, authenticateToken, authenticateRole([ROLE_USER])], reserveController.get);
/**
 * @swagger
 * /api/reserves:
 *   post:
 *     summary: Create Reserve.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Reserves
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                -date_start
 *                -date_end
 *                -user
 *                -packageReserved
 *              properties:
 *                 date_start:
 *                  type: date
 *                 date_end:
 *                  type: date
 *                 user:
 *                  type: string
 *                 packageReserved:
 *                  type:string
 *              example:
 *                date_start: 2024-01-20
 *                date_end : 2024-01-24
 *                user: 656f40d9c4b971717e5e8b6e
 *                packageReserved: 65553e5c8483bcb1dda7d61f
 *
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *
 */
router.post('/', [authenticateToken, authenticateRole([ROLE_USER])], reserveController.post);
/**
 * @swagger
 * /api/reserves/{id}:
 *   put:
 *     summary: Edit Reserve data.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     tags:
 *       - Reserves
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                -date_start
 *                -date_end
 *                -user
 *                -packageReserved
 *              properties:
 *                 date_start:
 *                  type: date
 *                 date_end:
 *                  type: date
 *                 user:
 *                  type: string
 *                 packageReserved:
 *                  type:string
 *              example:
 *                date_start: 2024-01-20
 *                date_end : 2024-01-24
 *                user: 656f40d9c4b971717e5e8b6e
 *                packageReserved: 65553e5c8483bcb1dda7d61f
 *
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *
 */
router.put('/:id', [verifyMongoId, authenticateToken, authenticateRole([ROLE_USER])], reserveController.put);
/**
 * @swagger
 * /api/reserves/{id}:
 *   delete:
 *     summary: Delete Reserve.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     tags:
 *       - Reserves
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *
 */
router.delete('/:id', [verifyMongoId, authenticateToken, authenticateRole([ROLE_USER])], reserveController.remove);

export default router;
