const express = require('express');
const fetch = require('node-fetch');  // Pour faire des requêtes à l'API GitHub
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const GITHUB_REPO = "CNKtony/cours-d-anglais";
const GITHUB_FILE = "data/words.json";
const TOKEN = process.env.GITHUB_TOKEN;

app.use(express.static('public'));  // Dossier pour ton frontend

// Route pour récupérer les données depuis GitHub
app.get('/api/words', async (req, res) => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE}`,
      {
        headers: { Authorization: `Bearer ${TOKEN}` },
      }
    );
    const content = await response.json();
    const data = JSON.parse(Buffer.from(content.content, 'base64').toString());
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data from GitHub');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
