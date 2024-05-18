// server.js

const express = require('express');
const multer = require('multer');
const { createWorker } = require('tesseract.js');

const app = express();
const worker = createWorker('fra');

// Configuration de multer pour gérer les fichiers entrants
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Point de terminaison pour l'upload de l'image
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    console.log(req.file);

    // Utiliser Tesseract.js pour extraire le texte de l'image
    const result = await worker.recognize(req.file.buffer);

    // Envoyer le texte extrait en réponse
    res.json(result.data.text);
  } catch (error) {
    console.error('Erreur lors de la reconnaissance OCR :', error);
    res.status(500).json({ error: 'Erreur lors de la reconnaissance OCR' });
  } finally {
    // Terminer le worker Tesseract.js
    await worker.terminate();
  }
});

// Démarrer le serveur sur le port 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
