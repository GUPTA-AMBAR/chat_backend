import { Router } from 'express';
import { login, logout, signup } from '../controllers/auth.controllers.js';

const router = Router();

router.post('/login', login);   // POST /api/auth/login
router.post('/logout', logout); // POST /api/auth/logout
router.post('/signup', signup); // POST /api/auth/signup

export { router };
