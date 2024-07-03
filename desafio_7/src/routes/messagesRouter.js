import { Router } from 'express';
import messagesController from '../controllers/messagesController.js';

const router = Router();

router.get('/', messagesController.getMessages);
router.post('/', messagesController.createMessage);

export default router;
