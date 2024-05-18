const express = require('express');
const fs = require('fs');
const Tesseract = require('tesseract.js');
const upload = require('./middlewares/multerConfig');
const app = express();
const port = 3001;

// Middleware pour gérer le parsing du JSON
app.use(express.json());

// Route pour l'upload de l'image et l'extraction du texte
app.post('/upload', upload.single('photo'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Aucun fichier uploadé.' });
        }

        // Chemin du fichier uploadé
        const filePath = req.file.path;

        // Utiliser Tesseract.js pour extraire le texte de l'image
        const result = await Tesseract.recognize(filePath, 'eng', {
            logger: (m) => console.log(m),
        });

        // Supprimer le fichier après traitement
        fs.unlinkSync(filePath);

        // Envoyer la réponse avec le texte extrait
        res.json({ text: result.data.text });
    } catch (error) {
        console.error('Erreur lors de l\'extraction du texte :', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de l\'extraction du texte.' });
    }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
