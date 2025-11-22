import pool from '../config/db.js';

export const getTestimonials = async (req, res) => {
    try {
        const testimonials = await pool.query("SELECT * FROM feedback");
        res.json(testimonials.rows);
        console.log("response sent on /getTestimonials endpoint");
    } catch (error) {
        console.error("Error fetching testimonials:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const addFeedback = async (req, res) => {
    const { name, message } = req.body;

    try {
        const query = `INSERT INTO feedback (author, comment) VALUES ($1, $2)`;
        const values = [name, message];

        await pool.query(query, values);
        res.status(201).json({ message: "Feedback added successfully" });
        console.log("Feedback added successfully");
    } catch (error) {
        console.error("Error adding feedback:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};