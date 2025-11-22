import express from 'express';
import { checkAdmin } from '../middleware/checkAdmin.js';
import { getProperties, getPropertyDetail, getFeaturedListings, addProperty, updateProperty, deleteProperty } from '../controllers/propertiesController.js';

const router = express.Router();

router.get('/getProperties', getProperties);
router.get('/getPropertyDetail', getPropertyDetail);
router.get('/getFeaturedListing', getFeaturedListings);
router.post('/addProperty', checkAdmin, addProperty);
router.put('/update-property', checkAdmin, updateProperty);
router.delete('/deleteProperty', checkAdmin, deleteProperty);

export default router;