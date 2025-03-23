// import modules via require
const express = require('express');
const path = require('path');
require('dotenv').config();

// initialize express and port listen
const app = express();
const PORT = process.env.PORT;

// TODO: change later: sample app routing for testing
// FYI, ORDER MATTERS
app.get('/api', (req, res) => {
  res.json( { message: "Hello from express" } );
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Serve the frontend index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

// configure port to listen
app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});