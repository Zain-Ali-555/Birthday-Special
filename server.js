const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Add CSP headers
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self' 'unsafe-inline' blob:; style-src 'self' 'unsafe-inline';"
    );
    next();
});

// In-memory array to store comments
const comments = [];

// Endpoint to fetch all comments
app.get('/comments', (req, res) => {
    res.json(comments); // Return all comments
});

// Endpoint to add a new comment
app.post('/comments', (req, res) => {
    const { name, message } = req.body;

    // Validate the input
    if (name && message) {
        comments.push({ name, message }); // Add the new comment to the array
        res.status(201).json({ message: 'Comment added successfully!' });
    } else {
        res.status(400).json({ message: 'Name and message are required!' });
    }
});

// Optional: Root route to prevent "Cannot GET /" error
app.get('/', (req, res) => {
    res.send('Welcome to the Birthday Comments API!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Clear all comments
app.delete('/comments', (req, res) => {
    comments.length = 0; // Clear the array
    res.status(200).json({ message: 'All comments have been cleared!' });
});
