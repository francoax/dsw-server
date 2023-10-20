/* eslint-disable import/extensions */
import { Router } from 'express';
import usersController from '../controllers/user.js';

import authenticateToken from '../middlewares/authenticateToken.js';

const router = Router();

router.get('/me', [authenticateToken], usersController.get);

/**
 * @openapi
 * /api/users:
 *   get:
 *     description: Get all Users
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get('/', usersController.getAll);

router.post('/login', usersController.login);

router.post('/', usersController.create);

router.put('/', [authenticateToken], usersController.edit);

router.delete('/', [authenticateToken], usersController.remove);

export default router;
