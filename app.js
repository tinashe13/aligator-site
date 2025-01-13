const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const nodemailer = require('nodemailer');
require('dotenv').config(); // For environment variables (optional but recommended)

// Get environment variables
const PORT = process.env.PORT || 4000;
const EMAIL_USER = process.env.EMAIL_USER; // Add your email
const EMAIL_PASS = process.env.EMAIL_PASS; // Add your email password

// Logging
app.use(morgan(':method :url :status'));

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // This should be the app password or your Gmail password
    },
});


// Routes
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/index.html'));
});

app.get('/eco-barrier-primer', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/seascape-villa-2.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/contact-us.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/about-us.html'));
});



app.get('/sunscreen', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/sunscreen.html'));
});

// Route to handle form submission
app.post('/submit-contact-form', async (req, res) => {
    const { name, phone, email, message } = req.body;

    // Simple server-side validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    // Prepare email data
    const mailOptions = {
        from: EMAIL_USER,
        to: EMAIL_USER, // You can use another recipient email here
        subject: 'New Contact Us Form Submission',
        text: `You have received a new message:
        
        Name: ${name}
        Phone: ${phone || 'Not provided'}
        Email: ${email}
        Message: ${message}`,
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        res.status(200).json({ success: 'Thank you for your message. We will get back to you soon!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send your message. Please try again later.' });
    }
});

// Handle other undefined routes
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, './public/404.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} ...`);
});
