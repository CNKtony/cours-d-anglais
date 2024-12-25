// Charger le fichier JSON et afficher les données
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.getElementById('tableBody');
    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.mot}</td>
        <td>${item.traduction}</td>
        <td>${item.explication}</td>
      `;
      tableBody.appendChild(row);
    });
  })
  .catch(error => console.error('Erreur de chargement des données:', error));
