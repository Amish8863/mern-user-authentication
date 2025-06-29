const express = require('express');
const router = express.Router();
const { signupController, loginController } = require('../controller/authController');


//signup route
router.post('/signup', signupController);

//login route
router.post('/login', loginController);

// router.post('/signup', (req, res) => {
//     res.json({ mssg: "Successfully signedUP" });
// })

// router.post('/login', (req, res) => {
//     res.json({ mssg: "Login successful" });
// })



module.exports = router;