import pool from "../config/db.js";

export const getProperties = async (req, res) => {
    try {
        const properties = await pool.query("SELECT * FROM properties ORDER BY posted_at DESC");
        res.json(properties.rows);
        console.log("response sent on /getProperties endpoint");
    } catch (error) {
        console.error("Error fetching properties:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getPropertyDetail = async (req, res) => {
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
        console.error("Error fetching property detail:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getFeaturedListings = async (req, res) => {
    try {
        const featuredListings = await pool.query("SELECT * FROM properties ORDER BY price DESC LIMIT 3");
        res.json(featuredListings.rows);
        console.log("response sent on /getFeaturedListing endpoint");
    } catch (error) {
        console.error("Error fetching featured listings:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const addProperty = async (req, res) => {
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
        console.error("Error adding property:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateProperty = async (req, res) => {
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
        console.error("Error updating property:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteProperty = async (req, res) => {
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
        console.error("Error deleting property:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};