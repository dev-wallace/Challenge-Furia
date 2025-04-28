import express from 'express';
import { processMessage } from '../controllers/chat.controller.js';

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body; // Recebe o texto digitado
    
    if (!message) {
      return res.status(400).json({ error: "Mensagem é obrigatória" });
    }

    // Processa via n8n ou diretamente
    const response = await processMessage(message);
    
    res.json({ reply: response });
  } catch (error) {
    console.error('Erro no chat:', error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

export default router;