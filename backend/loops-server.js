// import modules via require
const express = require('express');
require('dotenv').config();

// initialize express and port listen
const app = express();
const PORT = process.env.PORT;

// TODO: change later: sample app routing for testing 
app.get( '/api', (req, res) => {
    res.json( { message: "Hello from express" } );
});

// configure port to listen
app.listen( PORT, () => {
    console.log("Listening on port " + PORT);
});