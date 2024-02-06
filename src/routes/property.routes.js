/* eslint-disable import/extensions */
import express from 'express';
// eslint-disable-next-line import/extensions
import PropertiesController from '../controllers/PropertiesController.js';
import authenticateRole from '../middlewares/authenticateRole.js';
import authenticateToken from '../middlewares/authenticateToken.js';
import { ROLE_ADMIN, ROLE_SUPER_ADMIN, ROLE_USER } from '../utils/constants.js';
import verifyMongoId from '../middlewares/mongoIdField.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *   schemas:
 *     Create:
 *       type: object
 *       required:
 *         - capacity
 *         - address
 *         - pricePerNight
 *         - propertyType
 *         - location
 *         - image
 *         - status
 *       properties:
 *         capacity:
 *           type: number
 *         address:
 *           type: string
 *         pricePerNight:
 *           type: number
 *         propertyType:
 *           type: string
 *         location:
 *           type: string
 *         image:
 *           type: string
 *         status:
 *           type: string
 *       example:
 *         capacity: 3
 *         address: 'Avenida 15'
 *         pricePerNight: 5000
 *         propertyType: 'apartamento'
 *         location: 'Rosario'
 *         image: 'imagen'
 *         status: 'available'
 *     Update:
 *       type: object
 *       required:
 *         - capacity
 *         - address
 *         - pricePerNight
 *         - propertyType
 *         - location
 *         - image
 *         - status
 *       properties:
 *         capacity:
 *           type: number
 *         address:
 *           type: string
 *         pricePerNight:
 *           type: number
 *         propertyType:
 *           type: string
 *         location:
 *           type: string
 *         image:
 *           type: string
 *         status:
 *           type: string
 *       example:
 *         capacity: 3
 *         address: 'Avenida 15'
 *         pricePerNight: 5000
 *         propertyType: 'apartamento'
 *         location: 'Rosario'
 *         image: 'imagen'
 *         status: 'available'
 */

/**
 * @openapi
 * /api/properties:
 *   get:
 *     summary: Get all properties
 *     security:
 *      - bearerAuth: []
 *     description: List all existent properties
 *     tags:
 *       - Properties
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 *
 */
router.get('/', PropertiesController.getAll);

/**
 * @openapi
 * /api/properties:
 *   post:
 *     summary: creates a new property
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Properties
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Create'
 *     responses:
 *        200:
 *         description: Success
 *        400:
 *         description: Bad request
 *
 */
router.post('/', [authenticateToken, authenticateRole([ROLE_ADMIN])], PropertiesController.create);

/**
 * @swagger
 * /api/properties/{id}:
 *   put:
 *     summary: Edit property data.
 *     security:
 *      - bearerAuth: []
 *     tags:
 *       - Properties
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: PropertyId to update
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Update'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 *
 */
router.put('/:id', [verifyMongoId, authenticateToken, authenticateRole([ROLE_ADMIN])], PropertiesController.editData);

/**
 * @swagger
 * /api/properties/{id}:
 *   delete:
 *     summary: Delete property.
 *     security:
 *      - bearerAuth: []
 *     tags:
 *       - Properties
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: PropertyId to delete
 *     responses:
 *       204:
 *         description: Success
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 *
 */
router.delete('/:id', [verifyMongoId, authenticateToken, authenticateRole([ROLE_ADMIN])], PropertiesController.deleteData);

/**
 * @openapi
 * /api/properties/{id}:
 *   get:
 *     summary: Get property by id
 *     security:
 *      - bearerAuth: []
 *     description: List property with input id
 *     tags:
 *       - Properties
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: PropertyId to get
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 *
 */
router.get('/:id', [verifyMongoId, authenticateToken, authenticateRole([ROLE_USER, ROLE_ADMIN])], PropertiesController.getOne);

export default router;
