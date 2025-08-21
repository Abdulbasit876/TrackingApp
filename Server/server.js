const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

// Basic GET API
app.get('/', (req, res) => {
    res.send('Welcome to the Express server!');
});

// Example GET API
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello, world!' });
});

// Example POST API
app.post('/api/data', (req, res) => {
    const data = req.body;
    res.json({ received: data });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});