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
  
  // Créer la grille 9x9 (A1 en bas à gauche, I9 en haut à droite)
  const letters = "ABCDEFGHI";
  for (let row = 9; row >= 1; row--) {
    for (let col = 0; col < 9; col++) {
      const cellId = letters[col] + row;
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.id = cellId;
      cell.textContent = localStorage.getItem(cellId) || "";
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
    if (!document.getElementById(cellId)) {
      message.textContent = "Case invalide.";
      return;
    }
    if (!POIS.includes(poi.toLowerCase())) {
      message.textContent = "POI invalide.";
      return;
    }
    document.getElementById(cellId).textContent = poi;
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
        document.getElementById(cellId).textContent = "";
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
  