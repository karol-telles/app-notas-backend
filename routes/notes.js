const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Archivo donde se guardarán las notas
const filePath = path.join(__dirname, "../data/notes.json");

// Asegurar que el archivo existe
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([]));
}

// --- Obtener todas las notas ---
router.get("/", (req, res) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const notes = JSON.parse(data);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Error al leer las notas" });
  }
});

// --- Agregar una nueva nota ---
router.post("/", (req, res) => {
  try {
    const { text } = req.body;
    const data = fs.readFileSync(filePath, "utf8");
    const notes = JSON.parse(data);

    const newNote = {
      id: Date.now(),
      text,
      created_at: new Date().toISOString()
    };

    notes.push(newNote);

    fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));
    res.json(newNote);
  } catch (error) {
    res.status(500).json({ error: "Error al guardar la nota" });
  }
});

module.exports = router;
