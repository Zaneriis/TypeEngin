import winston from 'winston';
import 'dotenv/config';

// Création d'un logger
const logger = winston.createLogger({
  level: process.env.log, // Niveau de log minimal
  format: winston.format.simple(), // Format de log JSON : .colorize() .json() .simple()
  transports: [
    new winston.transports.Console(), // Envoi des logs à la console
    //new winston.transports.File({ filename: 'logfile.log' }) // Envoi des logs dans un fichier
  ]
});

export default logger;