import cloudinary from '../models/cloudinary.js';
import streamifier from 'streamifier';

export const uploadSingleImage = async (req, res) => {
    try {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'Becoz images' },
            (error, result) => {
                if (error) return res.status(500).json({ error });
                console.log('Image uploaded successfully on /upload-single endpoint');
                return res.status(200).json({ url: result.secure_url });
            }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream); // Pipe buffer to cloudinary stream
    } catch (err) {
        console.error('Upload failed:', err.message);
        res.status(500).json({ message: 'Upload failed', error: err });
    }
};

export const uploadMultipleImages = async (req, res) => {
    try {
        const uploadPromises = req.files.map(file => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'Becoz images' },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result.secure_url);
                    }
                );
                streamifier.createReadStream(file.buffer).pipe(stream);
            });
        });

        const imageUrls = await Promise.all(uploadPromises);
        res.status(200).json({ urls: imageUrls });
        console.log('Images uploaded successfully on /upload-multiple endpoint');
    } catch (err) {
        console.error('Upload failed:', err.message);
        res.status(500).json({ message: 'Upload failed', err });
    }
};