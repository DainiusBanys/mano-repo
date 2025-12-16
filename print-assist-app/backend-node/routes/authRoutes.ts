import express from 'express';
// We can now import the TS controller directly!
import { register, login } from '../controllers/authController';

const router = express.Router();

// Define routes
router.post('/register', register);
router.post('/login', login);

export default router;