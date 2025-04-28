import { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import { FaComment, FaTimes, FaPaperPlane, FaSpinner } from 'react-icons/fa';
import FuriaLogo from '../../assets/FURIA_Esports_full_darkmode.png';
import React from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Fala meu mano, o que você quer saber hoje?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Configuração do Webhook (substitua pela sua URL do n8n)
  const WEBHOOK_URL = 'http://localhost:5678/webhook/furia-chat';
  

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    // Adiciona mensagem do usuário
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputMessage })
      });

      if (!response.ok) {
        throw new Error('Erro na resposta do servidor');
      }

      const data = await response.json();
      
      // Adiciona resposta do bot (assumindo que o n8n retorna { reply: string })
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: data.reply,
        sender: 'bot',
        timestamp: new Date()
      }]);

    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: 'Putz, deu ruim na conexão! Tenta de novo...',
        sender: 'bot',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <div 
        className={`${styles.chatBubble} ${isOpen ? styles.hidden : ''}`}
        onClick={() => setIsOpen(true)}
        aria-label="Abrir chat"
      >
        <FaComment size={24} />
      </div>

      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <div className={styles.logoHeader}>
              <img src={FuriaLogo} className={styles.logo} alt="FURIA Logo" />
              <span className={styles.headerText}>FALE COM A PANTERA</span>
            </div>
            <button 
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label="Fechar chat"
            >
              <FaTimes />
            </button>
          </div>
          
          <div className={styles.chatMessages}>
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`${styles.message} ${
                  message.sender === 'user' ? styles.userMessage : styles.botMessage
                }`}
              >
                <div className={styles.messageText}>
                  {message.text.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
                <div className={styles.messageTime}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.message} ${styles.botMessage}`}>
                <FaSpinner className={styles.spinner} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className={styles.chatInput}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Digite sua mensagem..."
              aria-label="Digite sua mensagem"
              disabled={isLoading}
            />
            <button 
              className={styles.sendButton}
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              aria-label="Enviar mensagem"
            >
              <FaPaperPlane size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBubble;