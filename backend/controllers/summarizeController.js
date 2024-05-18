import upload from '../middlewares/multerConfig.js';
import { summarize as summarize } from '../services/LLMHub.js';
import 'dotenv/config';
import { extractTextFromImage } from '../services/ocrService.js'
import { revomeUploadFile } from "../middlewares/diskHandler.js";
import logger from "../services/logger.js";

export const summarizePicture = (req, res) => {
    logger.info("Summerize a text through picture")
    logger.verbose("L'analyse de l'image commence...")

    upload.single('photo')(req, res, async (err) => {
        if (err) {
            logger.error('Erreur lors du téléchargement du fichier:', err);
            return res.status(400).json({ message: 'Une erreur est survenue lors du téléchargement du fichier.' });
        }

        logger.verbose("Image bien reçu");

        try {
            const text = await extractTextFromImage((process.env.UPLOAD_DIR || 'uploads')+"/"+req.file.filename);
            const summary = await summarize(text)
            return res.json({ 
                message: 'Photo uploadée avec succès!', 
                filename: req.file.filename, 
                summary: summary});
        } catch (error) {
            logger.error('Erreur lors de la requête :', error);
            return res.status(500).json({ message: 'Une erreur est survenue lors du traitement.' });
        } finally {
            revomeUploadFile(req.file.filename);
        }
        
    });
};
