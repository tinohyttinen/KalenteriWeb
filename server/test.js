const express = require("express");

const app = express();
const PORT = 3001;

const events = [
  { id: 1, title: "Lukupiiri", date: "2025-05-16" },
  { id: 2, title: "JS työpaja", date: "2025-05-18" },
];

app.get("/api/events", (req, res) => {
  res.json(events);
});

app.listen(PORT, () => {
  console.log(`Testiserveri käynnissä: http://localhost:${PORT}`);
});