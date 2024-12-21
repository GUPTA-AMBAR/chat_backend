import { Router } from 'express';
import protectRoute from '../middleware/protectRoute.js';
import sendMessage, { getMessage } from '../controllers/message.controller.js';

const router = Router();

// Routes
router.get('/:id', protectRoute, getMessage);           // POST /api/messages/:id
router.post('/send/:id', protectRoute, sendMessage);     // POST /api/messages/send/:id
export { router };
