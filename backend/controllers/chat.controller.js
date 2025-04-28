import axios from 'axios';

export const processMessage = async (message) => {
  // Opção 1: Enviar para o n8n processar
  const n8nResponse = await axios.post(process.env.N8N_WEBHOOK_URL, {
    message
  });
  
  return n8nResponse.data.reply;

  // Opção 2: Processar diretamente no backend
  // ... sua lógica com OpenAI/Airtable
};