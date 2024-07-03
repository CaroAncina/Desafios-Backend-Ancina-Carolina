import { Router } from 'express';
import { getUserByEmail, createUser, updateUser, deleteUser } from '../controllers/userController.js';

const router = Router();

router.get('/:email', getUserByEmail);
router.post('/', createUser);
router.put('/:uid', updateUser);
router.delete('/:uid', deleteUser);

export default router;
