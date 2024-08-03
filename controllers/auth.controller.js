const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, role: user.role }); // Return the user's role along with the token
    } catch (err) {
        res.status(500).json({ error: "Error logging in" });
    }
};

const register = async (req, res) => {
    const { email, phone, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, phone, password: hashedPassword, role });
        await user.save();
        res.status(201).send("User registered");
    } catch (err) {
        res.status(400).send("Error registering user");
    }
};

const profile = async (req, res) => {
    res.json({ role: req.user.role, userId: req.user.id });
};

module.exports = { login, register, profile };
