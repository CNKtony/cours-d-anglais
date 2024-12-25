document.getElementById("wordForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const word = document.getElementById("word").value;
  const translation = document.getElementById("translation").value;
  const usage = document.getElementById("usage").value;

  // Appeler le workflow GitHub Action pour ajouter le mot
  const response = await fetch(
    "https://api.github.com/repos/CNKtony/cours-d-anglais/actions/workflows/update-data.yml/dispatches",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${YOUR_GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ref: "main", // Branche sur laquelle tu veux déclencher l'action
        inputs: {
          word,
          translation,
          usage,
        },
      }),
    }
  );

  if (response.ok) {
    console.log("Mot ajouté avec succès !");
  } else {
    console.log("Erreur lors de l’ajout du mot.");
  }
});
