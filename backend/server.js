// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// Serve static files from the parent directory
app.use(express.static('..')); // Adjust the path if necessary

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to handle signup
app.post('/api/wishlist', (req, res) => {
    const { name, email, comments, product } = req.body;

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service
        auth: {
            user: process.env.EMAIL_USER, // Your email
            pass: process.env.EMAIL_PASS // Your email password or app password
        }
    });

    // Email options
    const mailOptions = {
        from: email,
        to: 'ghighlights031@gmail.com, fakeriftgg@gmail.com', // Recipient emails
        subject: 'New Wishlist Signup',
        text: `The following person is interested in ${product}!\n\nName: ${name}\nEmail: ${email}\nComments: ${comments}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Error sending email.');
        }
        console.log('Email sent:', info.response);
        res.status(200).send('Signup successful!');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
