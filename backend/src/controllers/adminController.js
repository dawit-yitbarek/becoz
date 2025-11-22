import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const verifyAdmin = async (req, res) => {
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
        console.error("Error verifying admin:", error.message);
    }
};

export const changeAdminPassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const AdminPassword = await pool.query("SELECT password FROM admin");

        const isMatch = await bcrypt.compare(currentPassword, AdminPassword.rows[0].password);
        if (!isMatch) {
            return res.status(401).json({ message: "Password is incorrect" });
        }

        const newHashedPassword = await bcrypt.hash(newPassword, 10);

        await pool.query("UPDATE admin SET password = $1", [newHashedPassword]);

        res.json({ message: "Password changed successfully" });
    } catch (error) {
        console.error("Error changing admin password:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const checkAdminAuth = (req, res) => {
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
        console.error("Error during admin authentication check:", err.message);
        return res.status(401).json({ authenticated: false });
    }
};

export const adminLogout = (req, res) => {
    try {
        res.clearCookie('admin_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        res.json({ message: "Logged out successfully" });
        console.log("Admin logged out successfully");
    } catch (error) {
        console.error("Error during admin logout:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};