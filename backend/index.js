const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Configurações básicas
app.use(cors());
app.use(bodyParser.json({ limit: '15mb' }));

// Rota principal do chat
app.post('/chat', async (req, res) => {
  try {
    const { message, userId } = req.body;

    if (!message) {
      return res.status(400).json({ 
        status: 'error',
        error: "Message is required" 
      });
    }

    // Envia para o n8n
    const n8nResponse = await axios.post('http://localhost:5678/webhook/furia-tweet', {
      message,
      userId: userId || 'anonymous'
    }, {
      timeout: 20000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    // Retorna a resposta formatada
    res.json({
      status: 'success',
      reply: n8nResponse.data.message || n8nResponse.data.reply
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      status: 'error',
      error: error.message,
      reply: 'Erro ao processar sua mensagem'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});