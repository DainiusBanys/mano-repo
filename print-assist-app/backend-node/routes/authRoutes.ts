import express from 'express';
// We can now import the TS controller directly!
import { register, login, getMe } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();


// Define routes
router.post('/register', register);
router.post('/login', login);

// This is the line that your AuthContext.tsx needs to refresh the state!
router.get('/me', protect, getMe);

export = router;