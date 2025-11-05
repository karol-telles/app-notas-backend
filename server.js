const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Login básico
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "1234") {
    return res.json({ success: true });
  }
  res.status(401).json({ success: false, message: "Credenciales incorrectas" });
});

// Rutas de notas
const notesRouter = require("./routes/notes");
app.use("/notes", notesRouter);

// Puerto dinámico (Render o local)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ API lista en puerto ${PORT}`));
