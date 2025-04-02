const express = require('express');
const path = require('path');
const { HfInference } = require('@huggingface/inference');
require('dotenv').config();

// initialize express and port listen
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

const hf = new HfInference(process.env.TESTKEY);

// FYI, ORDER MATTERS
app.get('/api', (req, res) => {
  res.json( { message: "Hello from express" } );
});

app.post('/api/analysis', async (req, res) => { // res goes back to frontend
  // TODO: Jochen Hartmann, "Emotion English DistilRoBERTa-base". https://huggingface.co/j-hartmann/emotion-english-distilroberta-base/, 2022.
  const { text } = req.body; 

  // debugging
  if(!text) return res.status(400).json({ error: "No text provided" });

  const response = await hf.textClassification({
    model: 'j-hartmann/emotion-english-distilroberta-base',
    inputs: text
  });

  res.json({response});
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