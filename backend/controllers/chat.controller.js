import axios from 'axios';

export const processMessage = async (message) => {
  try {
    const n8nResponse = await axios.post(process.env.N8N_WEBHOOK_URL, {
      message
    });
    
    return n8nResponse.data.reply || "Não foi possível obter uma resposta";
  } catch (error) {
    console.error('Erro ao processar mensagem:', error);
    return "Desculpe, ocorreu um erro ao processar sua mensagem";
  }
};