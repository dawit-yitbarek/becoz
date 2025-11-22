import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import cors from 'cors';
import cookieParser from "cookie-parser";
import adminRoute from "./routes/adminRoute.js";
import propertiesRoute from "./routes/propertiesRoute.js";
import feedbackRoute from "./routes/feedbackRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
import emailRoute from "./routes/emailRoute.js";

const app = express();
const port = process.env.PORT;

// Middleware to handle CORS
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  credentials: true
}));

// handle preflight requests
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.sendStatus(204);
  }
  next();
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/admin", adminRoute);
app.use("/api/properties", propertiesRoute);
app.use("/api/feedback", feedbackRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/email", emailRoute);


// health check endpoint to confirm backend is running
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});


app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});