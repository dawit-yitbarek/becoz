import express from 'express';
import { checkAdmin } from '../middleware/checkAdmin.js';
import { getTestimonials, addFeedback } from '../controllers/feedbackController.js';

const router = express.Router();

router.get('/getTestimonials', getTestimonials);
router.post('/addFeedback', checkAdmin, addFeedback);

export default router;