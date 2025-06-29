const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/authRoutes')
const requireAuth = require('./middleware/authMIddleware');

const PORT = process.env.PORT || 8080;

//middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

//route
app.use('/api/v1', authRoutes);

//protected route example
app.get('/api/v1/dashboard', requireAuth, (req, res) => {
    res.json({ mssg: "This is a protected route", user: req.user });
})

app.get('/', (req, res) => {
    res.json({ mssg: "Welcome to the login dashboard" });
})

//connecting mongodb database
mongoose.connect(process.env.URI)
    .then(() => {
        console.log("connected to database");
        app.listen(PORT, () => {
            console.log("listening on port :", PORT);
        })
    }).catch((err) => {
        console.log("error while connecting to database: ", err);
    })