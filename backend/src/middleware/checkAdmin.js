import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const checkAdmin = (req, res, next) => {
    const token = req.cookies.admin_token;
    if (!token) {
        return res.status(401).json({ message: "Access Denied: No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role === 'admin') {
            return next();
        }

        return res.status(403).json({ message: "Access Denied: Not an admin" });
    } catch (error) {
        return res.status(401).json({ message: "Access Denied: Invalid token" });
    }
}