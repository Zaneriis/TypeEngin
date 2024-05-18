import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import uploadRoutes from './routes/summarizeRoutes.js';
import 'dotenv/config';
import { errorHandler } from './middlewares/errorHandler.js';
import logger from "./services/logger.js";

const app = express();
const port = process.env.PORT || 3000;

// Obtient le nom de fichier et le répertoire actuels
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Vérifiez si le répertoire 'uploads' existe, sinon créez-le
const uploadDir = path.join(__dirname, process.env.UPLOAD_DIR);
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Utiliser CORS pour permettre les requêtes depuis le frontend
app.use(cors());
// Routes
app.use('/', uploadRoutes);

//Gestion des erreurs
app.use(errorHandler);

app.listen(port, () => {
    logger.info(`Serveur démarré sur http://localhost:${port}`);
});