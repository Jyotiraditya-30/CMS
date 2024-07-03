import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/ContactRoutes.js'
import userRoutes from './routes/UserRoutes.js'
import userAdminRoutes from './routes/UserAdminRoutes.js'

dotenv.config();

const app = express();

connectDB();

// Middleware
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes); 
app.use('/api/user', userRoutes)
app.use('/api/Admin', userAdminRoutes)

// Route to handle root request
app.get('/', (req, res) => {
    res.send('Hello world');
});

// Start the server
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

export default app;
