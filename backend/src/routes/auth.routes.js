import { authController } from '../controllers/auth.controllers.js';
import express from 'express';

const router = express.Router();

router.post('/sign-up', authController.register);
router.post('/sign-in', authController.login);

export default router;
