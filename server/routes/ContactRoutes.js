import express from 'express';
import multer from 'multer';

import ContactController from '../controllers/ContactController.js';
import {userAuth} from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 

// Middleware to protect routes requiring authentication
router.use(userAuth);


router.post('/', ContactController.createContact); 
router.get('/', ContactController.getAllContacts);
router.get('/:id', ContactController.getContactById);
router.put('/:id', ContactController.updateContact);    
router.delete('/:id', ContactController.deleteContact);

router.post('/import', upload.single('csvFile'), ContactController.importContactsFromCSV);

export default router;
