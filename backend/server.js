import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import cors from 'cors';
import pkg from "pg";
import { v2 as cloudinary } from 'cloudinary';
import multer from "multer";
import streamifier from "streamifier";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import nodemailer from "nodemailer";
import generateEmail from './emailTemplate.js'
const { Pool } = pkg;

const app = express();
const port = process.env.PORT;

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage(); // Store file in memory temporarily
const upload = multer({ storage });

// database configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect((err) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
  } else {
    console.log('Database connection successful!');
  }
});

app.use(cors({
  origin: [process.env.FRONTEND_URL],
  credentials: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});


// Endpoint to send contact messages
app.post('/sendMessage', async (req, res) => {
  const { name, email, phone, message } = req.body;
  const html = generateEmail({ name, email, phone, message });

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.BROKER_EMAIL,
      replyTo: email,
      subject: 'New Contact Message',
      text: `Phone: ${phone}\n\nMessage:\n${message}`,
      html: html,
    });

    res.status(200).json({ success: true, message: 'Message sent successfully.' });
    console.log('Contact form submitted successfully on /sendMessage endpoint');
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Something went wrong. Try again later.' });
  }
})


// Endpoint to get all properties
app.get("/getProperties", async (req, res) => {
  try {
    const properties = await pool.query("SELECT * FROM properties ORDER BY posted_at DESC");
    res.json(properties.rows);
    console.log("response sent on /getProperties endpoint");
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Endpoint to get a detail of a specific property
app.get("/getPropertyDetail", async (req, res) => {
  const { id } = req.query;

  try {
    const propertyDetail = await pool.query("SELECT * FROM properties WHERE id = $1", [id]);
    if (propertyDetail.rows.length > 0) {
      res.json(propertyDetail.rows[0]);
      console.log("response sent on /getPropertyDetail endpoint");
    } else {
      res.status(404).json({ error: "Property not found" });
      console.error("Property not found");
    }
  } catch (error) {
    console.error("Error fetching property detail:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Endpoint to get featured listings
app.get("/getFeaturedListing", async (req, res) => {
  try {
    const featuredListings = await pool.query("SELECT * FROM properties ORDER BY price DESC LIMIT 3");
    res.json(featuredListings.rows);
    console.log("response sent on /getFeaturedListing endpoint");
  } catch (error) {
    console.error("Error fetching featured listings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

app.get("/getTestimonials", async (req, res) => {
  try {
    const testimonials = await pool.query("SELECT * FROM feedback");
    res.json(testimonials.rows);
    console.log("response sent on /getTestimonials endpoint");
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Endpoint to add a new property
app.post("/addProperty", async (req, res) => {
  const { title, description, type, price, address, features, main_img, img_collection } = req.body;

  try {
    const query = `
      INSERT INTO properties (title, description, type, price, address, features, main_img, img_collection)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;
    const values = [title, description, type, price, address, features, main_img, img_collection];

    await pool.query(query, values);
    res.status(201).json({ message: "Property added successfully" });
    console.log("Property added successfully");
  } catch (error) {
    console.error("Error adding property:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Endpoint to upload a single image to Cloudinary
app.post('/upload-single', upload.single('image'), async (req, res) => {
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
    console.error('Upload failed:', err);
    res.status(500).json({ message: 'Upload failed', error: err });
  }
});


// Endpoint to upload multiple images to Cloudinary
app.post('/upload-multiple', upload.array('images'), async (req, res) => {
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
    console.error('Upload failed:', err);
    res.status(500).json({ message: 'Upload failed', err });
  }
});


// Endpoint to update a property
app.put("/update-property", async (req, res) => {
  const { id } = req.query;
  const { title, description, type, price, address, features, main_img, img_collection } = req.body;

  try {
    const query = `
      UPDATE properties
      SET title = $1, description = $2, type = $3, price = $4, address = $5, features = $6, main_img = $7, img_collection = $8
      WHERE id = $9
    `;
    const values = [title, description, type, price, address, features, main_img, img_collection, id];

    const result = await pool.query(query, values);
    if (result.rowCount > 0) {
      res.json(result.rows[0]);
      console.log("Property updated successfully");
    } else {
      res.status(404).json({ error: "Property not found" });
      console.error("Property not found");
    }
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Endpoint to delete a property
app.delete("/deleteProperty", async (req, res) => {
  const { id } = req.query;

  try {
    const result = await pool.query("DELETE FROM properties WHERE id = $1", [id]);
    if (result.rowCount > 0) {
      res.json({ message: "Property deleted successfully" });
      console.log("Property deleted successfully");
    } else {
      res.status(404).json({ error: "Property not found" });
      console.error("Property not found");
    }
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Endpoint to verify admin password and set JWT cookie
app.post('/verify-admin', async (req, res) => {
  try {
    const { password } = req.body;
    const AdminPassword = await pool.query("SELECT password FROM admin");
    const isMatch = await bcrypt.compare(password, AdminPassword.rows[0].password);
    if (isMatch) {
      const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '5d' });
      res.cookie('admin_token', token, {
        httpOnly: true,
        secure: true,
        maxAge: 5 * 24 * 60 * 60 * 1000,
        sameSite: 'none'
      });
      res.sendStatus(200);
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error verifying admin:", error);
  }
});


// Endpoint to change admin password
app.post('/change-admin-password', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const AdminPassword = await pool.query("SELECT password FROM admin");

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, AdminPassword.rows[0].password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password is incorrect" });
    }

    // Hash the new password
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query("UPDATE admin SET password = $1", [newHashedPassword]);

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing admin password:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Endpoint to check if admin is authenticated
app.get('/check-admin-auth', (req, res) => {
  const token = req.cookies.admin_token;
  if (!token) return res.status(401).json({ authenticated: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role === 'admin') {
      return res.json({ authenticated: true });
    } else {
      return res.status(403).json({ authenticated: false });
    }
  } catch (err) {
    return res.status(401).json({ authenticated: false });
  }
});


// Endpoint to log out admin by clearing the JWT cookie
app.post('/admin-logout', (req, res) => {
  try {
    res.clearCookie('admin_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });
    res.json({ message: "Logged out successfully" });
    console.log("Admin logged out successfully");
  } catch (error) {
    console.error("Error during admin logout:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Endpoint to add feedback
app.post('/addFeedback', async (req, res) => {
  const { name, message } = req.body;

  try {
    const query = `INSERT INTO feedback (author, comment) VALUES ($1, $2)`;
    const values = [name, message];

    await pool.query(query, values);
    res.status(201).json({ message: "Feedback added successfully" });
    console.log("Feedback added successfully");
  } catch (error) {
    console.error("Error adding feedback:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Add a health check endpoint to confirm backend is running
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});


app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});