import fs from 'fs';
import 'dotenv/config';
import logger from "../services/logger.js";

export const revomeUploadFile = (name) =>{
    const filePath = process.env.UPLOAD_DIR + "/" + name;
    fs.unlink(filePath, (err) => {
        if (err) {
            logger.error('Erreur lors de la suppression du fichier :', err);
          return;
        }
        logger.verbose('Le fichier a été supprimé avec succès !');
      });
}