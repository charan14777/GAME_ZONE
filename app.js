const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth'); // Assuming you have a separate auth route file
const path = require('path');
require('dotenv').config();
require('./config/passport');


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(
    session({
        secret: process.env.SESSION_SECRET || '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', // Use a secure key in production
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Set secure: true for HTTPS
    })
);

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());
// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Database', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/users', userRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Application!');
});
// Example route for /home
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});
// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});