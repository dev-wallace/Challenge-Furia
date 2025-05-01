const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;

// Configuração do webhook
app.use(bodyParser.json());

// "Banco de dados" em memória
const messageHistory = [];

// Rota do webhook
app.post('/webhook', (req, res) => {
  const { message } = req.body;
  
  console.log('Mensagem recebida via webhook:', message);
  
  // Armazena a mensagem
  messageHistory.push({
    id: Date.now(),
    text: message,
    timestamp: new Date()
  });

  // Resposta simulada da IA
  const iaResponse = `Resposta para: "${message}"`;
  
  res.json({ 
    status: 'success',
    reply: iaResponse
  });
});

// Rota para ver histórico (opcional)
app.get('/messages', (req, res) => {
  res.json(messageHistory);
});

app.listen(PORT, () => {
  console.log(`Webhook rodando em http://localhost:${PORT}/webhook`);
});