import express from 'express';
import { checkAdmin } from '../middleware/checkAdmin.js';
import { verifyAdmin, changeAdminPassword, checkAdminAuth, adminLogout } from '../controllers/adminController.js';

const router = express.Router();

router.post('/verify-admin', verifyAdmin);
router.post('/change-admin-password', checkAdmin, changeAdminPassword);
router.get('/check-admin-auth', checkAdminAuth);
router.post('/admin-logout', adminLogout);

export default router;