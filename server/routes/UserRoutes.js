import express from 'express';
import UserController from '../controllers/UserController.js';
import  {userAuth}  from '../middleware/authMiddleware.js';

const router = express.Router();

// Middleware to protect routes requiring authentication
router.use(userAuth);

router.get('/profile',  UserController.UserProfile);
router.put('/profile',  UserController.updateUser); 
router.delete('/profile', UserController.deleteUser);

export default router;  