// Import database driver
const dbDriver = require('better-sqlite3');

// Connect to db
const db = dbDriver('bands.sqlite3');

// Import express
const express = require('express');

// Create express app
const app = express();

// Configure express
app.use(express.static('frontend')); // Serve frontend
app.use(express.json());             // Use JSON

/* Building the REST API */

// Get all
app.get('/bands', (req, res) => {
    // Query all bands
    const bands = db.prepare('SELECT * FROM bands').all();

    // Return bands in JSON
    res.json(bands);
});

// Get one
app.get('/bands/:id', (req, res) => {
    const band = db.prepare('SELECT * FROM bands WHERE id = ?').get(req.params.id);
    res.json(band || {error: 'No such band'});
})