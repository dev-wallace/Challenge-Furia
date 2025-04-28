const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Banco de dados simples em memória
const messagesDB = [];

app.use(cors());
app.use(express.json());

// Rota POST para receber mensagens
app.post('/chat', (req, res) => {
  const { message } = req.body;
  console.log("Mensagem recebida:", message);
  
  // Salva no "banco de dados"
  messagesDB.push({
    id: Date.now(),
    text: message,
    sender: 'user',
    timestamp: new Date()
  });

  res.json({ 
    reply: `Mensagem recebida: "${message}"` 
  });
});

// Rota GET para visualizar todas as mensagens
app.get('/chat', (req, res) => {
  res.json({
    messages: messagesDB
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});