/* eslint-disable import/extensions */
import express from 'express';
// eslint-disable-next-line import/extensions
import PropertiesController from '../controllers/PropertiesController.js';

const router = express.Router();

/**
 * @swagger
 * components:
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
 *     description: List all existent properties
 *     tags:
 *       - Property
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
 *     tags:
 *       - Property
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
router.post('/', PropertiesController.create);

/**
 * @swagger
 * /api/properties/{id}:
 *   put:
 *     summary: Edit property data.
 *     tags:
 *       - Property
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
router.put('/:id', PropertiesController.editData);

/**
 * @swagger
 * /api/properties/{id}:
 *   delete:
 *     summary: Delete property.
 *     tags:
 *       - Property
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
router.delete('/:id', PropertiesController.deleteData);

/**
 * @openapi
 * /api/properties/{id}:
 *   get:
 *     summary: Get property by id
 *     description: List property with input id
 *     tags:
 *       - Property
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
router.get('/:id', PropertiesController.getOne);

export default router;
