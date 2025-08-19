// server/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

// Use your secret key from env
const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_key";

module.exports = function (req, res, next) {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];
    try {
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = { id: decoded.id }; // Assuming your payload has .id
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};
