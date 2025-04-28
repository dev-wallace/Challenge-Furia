const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configuração básica
app.use(cors()); // Permite todas as origens (apenas para desenvolvimento!)
app.use(express.json());

// Rota do chat
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Mensagem é obrigatória" });
    }

   

    res.json({ reply });

  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

// Rota de teste
app.get('/', (req, res) => {
  res.send('Backend do Chat está funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});