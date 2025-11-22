import express from 'express';
import { sendEmail } from '../utils/sendEmail.js';
const router = express.Router();

router.post('/sendMessage', sendEmail);

export default router;