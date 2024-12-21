import { Router } from 'express';
import protectRoute from '../middleware/protectRoute.js';
import getUserFromSidebar from '../controllers/user.controller.js';

const router = Router();

// User routes
router.get('/', protectRoute, getUserFromSidebar); 

export { router };
