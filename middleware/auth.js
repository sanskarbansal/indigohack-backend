// middleware/auth.js
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/user.model");

dotenv.config();

const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"]?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const _user = (user = await User.findById(user.userId));
        if (!_user) return res.status(401).json({ message: "Unauthorized" });
        req.user = _user;
        next();
    });
};

const authorizeRoles = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.sendStatus(403);
        }
        next();
    };
};

module.exports = { authenticateToken, authorizeRoles };
