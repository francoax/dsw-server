/* eslint-disable import/extensions */
import Router from 'express';
import chatbotController from '../controllers/chatbot.js';

const router = Router();
router.post('/', chatbotController.getAnswer);

export default router;
