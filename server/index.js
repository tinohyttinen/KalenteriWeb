const express = require("express");
const path = require("path");

const app = express();
const PORT = 3001;

const events = [
  { id: 1, title: "Lukupiiri", date: "2025-05-16" },
  { id: 2, title: "JS työpaja", date: "2025-05-18" },
];

// API-reitti tapahtumille
app.get("/api/events", (req, res) => {
  res.json(events);
});

// Staattisten tiedostojen palvelu
app.use(express.static(path.resolve(__dirname, "..", "client", "build")));

// Universaali reitti, joka ohjaa React-sovelluksen pääsivuun
app.get("/*", (req, res) => {
  const filePath = path.resolve(__dirname, "..", "client", "build", "index.html");
  
  if (!filePath) {
    console.error("Virhe: index.html ei löydy polusta:", filePath);
    return res.status(500).send("Virhe: Tiedostoa ei löydy!");
  }

  res.sendFile(filePath);
});

// Käynnistä palvelin
app.listen(PORT, () => {
  console.log(`Serveri käynnissä: http://localhost:${PORT}`);
});