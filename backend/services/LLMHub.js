import ollama from 'ollama'
import 'dotenv/config';
import logger from "../services/logger.js";

export async function summarize(text){
  logger.verbose("Le text est en train d'être résumé...");
  const modelname = process.env.DEFAULT_LLM_MODEL;
  const prompt = 'Fait un résumé en français du text suivant :\n'+text;
  
  try {
    const response = await ollama.chat({
      model: modelname,
      messages: [{ role: 'user', content: prompt }],
    })
    return response.message.content;
  } catch (error) {
      logger.error('Erreur lors de la requête :', error);
  }
}