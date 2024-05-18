import express from 'express';
import { summarizePicture } from '../controllers/summarizeController.js';
import logger from "../services/logger.js";

const router = express.Router();
// Route pour recevoir le fichier uploadé
router.post('/summarize/picture', (req, res) => {
    logger.verbose('Requête POST /summarize/picture reçue.');
    summarizePicture(req, res);
});

export default router;
