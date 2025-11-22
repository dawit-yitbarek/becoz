import upload from "../middleware/upload.js";
import express from "express";
import { uploadSingleImage, uploadMultipleImages } from "../controllers/uploadController.js";

const router = express.Router();

router.post('/upload-single', upload.single('image'), uploadSingleImage);
router.post('/upload-multiple', upload.array('images'), uploadMultipleImages);

export default router;