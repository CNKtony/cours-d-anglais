// Utiliser la variable d'environnement définie par GitHub Actions
const TOKEN = process.env.GITHUB_TOKEN;  // Récupérer le token directement

const GITHUB_REPO = "CNKtony/cours-d-anglais";
const GITHUB_FILE = "data/words.json";

// Fonction pour ajouter un mot
document.getElementById("wordForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const word = document.getElementById("word").value;
  const translation = document.getElementById("translation").value;
  const usage = document.getElementById("usage").value;

  const newEntry = { word, translation, usage };
  const data = await fetchFromGitHub();
  data.push(newEntry);

  if (await saveToGitHub(data)) {
    addToList(newEntry);
    document.getElementById("wordForm").reset();
  }
});

// Charger les données depuis GitHub
async function fetchFromGitHub() {
  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE}`,
    {
      headers: { Authorization: `Bearer ${TOKEN}` },  // Utiliser le token
    }
  );
  const content = await response.json();
  return JSON.parse(atob(content.content));
}

// Enregistrer les données sur GitHub
async function saveToGitHub(data) {
  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Update words list",
        content: btoa(JSON.stringify(data)),
        sha: await getCurrentSha(),
      }),
    }
  );
  return response.ok;
}

// Récupérer le SHA actuel du fichier
async function getCurrentSha() {
  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE}`,
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }
  );
  const content = await response.json();
  return content.sha;
}

// Ajouter un mot à la liste visible
function addToList({ word, translation, usage }) {
  const list = document.getElementById("wordList");
  const listItem = document.createElement("li");
  listItem.textContent = `${word} (${translation}) - ${usage}`;
  list.appendChild(listItem);
}

// Charger les mots existants
document.addEventListener("DOMContentLoaded", async () => {
  const data = await fetchFromGitHub();
  data.forEach(addToList);
});
