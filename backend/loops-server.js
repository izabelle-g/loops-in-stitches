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

// TODO: remove later: close server (for my purposes) after 10 seconds during testing
setTimeout( () => {
    server.close(() => {
      console.log('Server stopped listening');
    });
  }, 10000 );