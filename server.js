const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Use the CORS middleware to allow requests from different origins
app.use(cors());

// Use body-parser to parse JSON request bodies
app.use(bodyParser.json());

// Define the path to the data file
const filePath = path.join(__dirname, 'data.json');

// POST endpoint to save data
app.post('/save', (req, res) => {
    const { name, rat } = req.body;

    // Read existing data from the file
    let data = [];
    if (fs.existsSync(filePath)) {
        data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    // Add new data to the array
    data.push({ name, rat });

    // Write updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

    // Log data and send response
    console.log(`Name: ${name}, Rating: ${rat}`);
    res.status(200).send('Data saved');
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
