document.getElementById("wordForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const word = document.getElementById("word").value;
  const translation = document.getElementById("translation").value;
  const usage = document.getElementById("usage").value;

  // Envoi des données pour déclencher GitHub Actions
  const response = await fetch(
    'https://api.github.com/repos/CNKtony/cours-d-anglais/actions/workflows/update-data.yml/dispatches',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer TON_TOKEN_PERSONNEL`, // REMPLACE par ton secret GitHub Actions
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ref: 'main', // Branche cible du workflow
        inputs: { word, translation, usage }, // Données à transmettre au workflow
      }),
    }
  );

  if (response.ok) {
    alert('Mot ajouté avec succès ! Les données seront mises à jour.');
    document.getElementById("wordForm").reset();
  } else {
    alert('Erreur lors de l’ajout du mot.');
  }
});

// Charger les mots existants depuis le fichier JSON
document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/CNKtony/cours-d-anglais/main/data/words.json"
  );

  if (response.ok) {
    const data = await response.json();
    data.forEach(addToList);
  } else {
    console.error("Erreur lors du chargement des données.");
  }
});

// Ajouter un mot à la liste visible
function addToList({ word, translation, usage }) {
  const list = document.getElementById("wordList");
  const listItem = document.createElement("li");
  listItem.textContent = `${word} (${translation}) - ${usage}`;
  list.appendChild(listItem);
}
