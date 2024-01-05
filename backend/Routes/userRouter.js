
import express from 'express';
import UsersController from '../Controllers/userController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register/user', UsersController.createUser);
router.post('/register/creator', UsersController.createCreator);
router.post('/login', UsersController.loginUser);
router.get('/creators', UsersController.getCreators); // Placed before the generic user ID route
router.get('/:id', UsersController.getOneUser);
router.get('/', UsersController.getAllUsers); // Placed after specific routes to avoid conflicts
router.put('/:id', verifyToken, UsersController.editUser);
router.delete('/:id', verifyToken, UsersController.deleteUser);

export default router;
