import express from 'express'
import UserAdminController from '../controllers/UserAdminController.js';
import {adminAuth} from '../middleware/authMiddleware.js';

const router = express.Router();

// Middleware to protect routes requiring authentication for Admin
router.use(adminAuth)

router.get('/users', UserAdminController.getAllUsers);
router.delete('/userDelete/:id', UserAdminController.deleteUser )   

export default router;