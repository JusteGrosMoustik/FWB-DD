const POIS = [
    "ringmouth", "beach", "cave", "station", "bridge", "elevator", "tunnel",
    "lab", "hatch", "vent", "supply", "power", "security", "medical", "admin",
    "hydroponics", "observation", "fuel", "escape", "quarantine", "landing",
    "containment", "transit", "generator", "reactor", "workshop", "storage",
    "dormitory", "communications", "drill", "command", "engineering", "access",
    "garage", "lobby", "atrium", "shaft", "turret", "fan", "mineshaft", "control"
  ];
  
  const gridContainer = document.getElementById("grid-container");
  const message = document.getElementById("message");
  
  const letters = "ABCDEFGHI";
  for (let row = 9; row >= 1; row--) {
    for (let col = 0; col < 9; col++) {
      const cellId = letters[col] + row;
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.id = cellId;
  
      const label = document.createElement("div");
      label.className = "cell-label";
      label.textContent = cellId;
  
      const value = document.createElement("div");
      value.className = "cell-value";
      value.textContent = localStorage.getItem(cellId) || "";
  
      cell.appendChild(label);
      cell.appendChild(value);
      gridContainer.appendChild(cell);
    }
  }
  
  function handlePrompt() {
    const input = document.getElementById("prompt").value.trim();
    const parts = input.split(" ");
    if (parts.length !== 2) {
      message.textContent = "Format invalide. Ex: F2 ringmouth";
      return;
    }
    const [cellId, poi] = parts;
    const cell = document.getElementById(cellId);
    if (!cell) {
      message.textContent = "Case invalide.";
      return;
    }
    if (!POIS.includes(poi.toLowerCase())) {
      message.textContent = "POI invalide.";
      return;
    }
  
    const valueDiv = cell.querySelector(".cell-value");
    valueDiv.textContent = poi;
    localStorage.setItem(cellId, poi);
    message.textContent = "";
    document.getElementById("prompt").value = "";
  }
  
  // Réinitialisation automatique tous les lundis
  const now = new Date();
  const lastReset = localStorage.getItem("lastReset");
  const currentWeek = now.getFullYear() + "-W" + getWeekNumber(now);
  if (lastReset !== currentWeek && now.getDay() === 1 && now.getHours() < 6) {
    resetGrid();
    localStorage.setItem("lastReset", currentWeek);
  }
  
  function resetGrid() {
    for (let row = 1; row <= 9; row++) {
      for (let col = 0; col < 9; col++) {
        const cellId = letters[col] + row;
        localStorage.removeItem(cellId);
        const cell = document.getElementById(cellId);
        if (cell) {
          const valueDiv = cell.querySelector(".cell-value");
          if (valueDiv) valueDiv.textContent = "";
        }
      }
    }
  }
  
  function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  }

  function handleCommand(input) {
    const [command, action, ...args] = input.split(' ');

    if (command === 'F1' || command === 'F2') {
        const caseId = command === 'F1' ? 'case1' : 'case2';
        const caseElement = document.getElementById(caseId);

        if (action === 'clear') {
            caseElement.innerHTML = ''; // Efface le contenu de la case
        } else {
            const newContent = args.join(' ');
            caseElement.innerHTML += (caseElement.innerHTML ? '<br>' : '') + newContent; // Ajoute avec un retour à la ligne
        }
    }
}

document.querySelector('.command-input').addEventListener('input', (event) => {
    if (event.inputType === 'insertText' && event.data === '\n') {
        handleCommand(event.target.value.trim());
        event.target.value = ''; // Réinitialise l'entrée
    }
});
