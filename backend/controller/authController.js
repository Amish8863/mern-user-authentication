const user = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//signup controller
const signupController = async (req, res) => {
    console.log("signup route hitt")
    const { name, email, password } = req.body;

    try {
        //checking if user already exists
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        //hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //creating new user
        const newUser = new user({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ error: "Internal server error" });
    }

};

//login controller
const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        //checking if user exists
        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ error: "User does not exist" });
        };

        //checking if password is correct
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid password" });
        }

        //creating JWT token
        const genratingToken = jwt.sign({ id: existingUser._id, email: existingUser.email }, process.env.JWT_SECRET, { expiresIn: '1y' });
        res.status(200).json({ message: "Login successful", token: genratingToken });


    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = {
    signupController,
    loginController
};