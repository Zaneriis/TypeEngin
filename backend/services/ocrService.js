import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import logger from "../services/logger.js";
import 'dotenv/config';

export async function extractTextFromImage(imagePath) {
    logger.verbose("Extraction du text...")
    try {
        // Lire l'image en tant que stream
        const imageStream = fs.createReadStream(imagePath);

        // Créer un objet FormData pour l'envoi du fichier
        const formData = new FormData();
        formData.append('photo', imageStream);

        // Envoyer la requête POST à l'API d'extraction de texte
        const response = await axios.post(process.env.OCR_API_URL+'/upload', formData, {
            headers: {
                ...formData.getHeaders()
            }
        });

        // Afficher le texte extrait
        return response.data.text;
    } catch (error) {
        logger.error('Erreur lors de l\'extraction du texte :', {error});
    }
}