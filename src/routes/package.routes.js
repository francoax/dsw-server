/* eslint-disable import/extensions */
import { Router } from 'express';
import packageController from '../controllers/package.js';
import verifyMongoId from '../middlewares/mongoIdField.js';

const router = Router();

/**
 * @openapi
 * components:
 *  schemas:
 *    CreatePackage:
 *      type: object
 *      properties:
 *        type:
 *          type: string
 *          description: Type of package. "completo" or "custom" only
 *        property:
 *          type: string
 *        car:
 *          type: string
 *        reserve:
 *          type: string
 *          description: Only if it's custom
 *        medicalAssistance:
 *          type: string
 *        nameImage:
 *          type: string
 *    UpdatePackage:
 *      type: object
 *      properties:
 *        property:
 *          type: string
 *          description: Id of the property
 *        car:
 *          type: string
 *        medicalAssistance:
 *          type: string
 *        nameImage:
 *          type: string
 */

/**
 * @openapi
 * /api/packages:
 *  get:
 *    summary: Get packages list
 *    parameters:
 *      - in: query
 *        name: type
 *        schema:
 *          type: string
 *        required: false
 *        description: Find those packages depending on type
 *    tags:
 *      - Packages
 *    responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not found
 */
router.get('/', packageController.listConcept);

/**
 * @openapi
 * /api/packages/{id}:
 *  get:
 *    summary: Get a package by id
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: MongoID of the package to get
 *    tags:
 *      - Packages
 *    responses:
 *      200:
 *        description:
 *      400:
 *        description:
 *      404:
 *        description:
 */
router.get('/:id', [verifyMongoId], packageController.getPackage);

/**
 * @openapi
 * /api/packages:
 *  post:
 *    summary: Create a complet or custom package
 *    tags:
 *      - Packages
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreatePackage'
 *    responses:
 *      200:
 *        description: Package created
 *      400:
 *        description: Error during creation
 */
router.post('/', packageController.createPackage);

/**
 * @openapi
 * /api/packages/{id}:
 *  put:
 *    summary: Update package
 *    tags:
 *      - Packages
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: PackageId to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UpdatePackage'
 *    responses:
 *      200:
 *        description: Package updated
 *      400:
 *        description: Error during update
 */
router.put('/:id', [verifyMongoId], packageController.updatePackage);

/**
 * @openapi
 * /api/packages/{id}:
 *  delete:
 *    summary: Delete a package
 *    tags:
 *      - Packages
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: PackageId to delete
 *    responses:
 *      204:
 *        description: Package deleted
 *      500:
 *        description: Error at delete
 */
router.delete('/:id', [verifyMongoId], packageController.deletePackage);

export default router;
