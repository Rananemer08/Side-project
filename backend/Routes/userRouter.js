import express from 'express';
import UsersController from '../Controllers/userController.js';

const router = express.Router();

// Define routes for different UserController methods
router.get('/', UsersController.getAllUsers);
router.get('/:id', UsersController.getOneUser);
router.post('/', UsersController.createUser);
router.put('/:id', UsersController.editUser);
router.delete('/:id', UsersController.deleteUser);
router.get('/creators', UsersController.getCreators);

export default router;
