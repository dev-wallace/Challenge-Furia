
import { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import { FaComment, FaTimes, FaPaperPlane, FaSpinner } from 'react-icons/fa';
import FuriaLogo from '../../assets/FURIA_Esports_full_darkmode.png';
import React from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot' | 'system';
  timestamp: Date;
}

interface PartialMessage {
  message_id: string;
  chunks: string[];
  total_chunks: number;
  received_chunks: number;
  original_length: number;
}

interface ApiResponse {
  status: 'success' | 'partial' | 'error';
  message?: string;
  reply?: string;
  chunk?: number;
  total_chunks?: number;
  message_id?: string;
  original_length?: number;
}

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Fala meu mano, o que você quer saber hoje?',
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [partialMessages, setPartialMessages] = useState<Record<string, PartialMessage>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialOptions = [
    'Quando a FURIA CS:GO joga?',
    'Qual é o próximo jogo da FURIA R6?',
    'Que tipo de fã da FURIA você é?',
    'Qual é o último tweet da FURIA?',
    'Bora conversar'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, partialMessages]);

  const handleOptionClick = (option: string) => {
    setInputMessage(option);
  };

  const fetchAllChunks = async (messageId: string, totalChunks: number) => {
    const chunks: string[] = [];
    for (let i = 1; i <= totalChunks; i++) {
      try {
        const response = await fetch(`http://localhost:3001/get-chunk/${messageId}/${i}`);
        if (!response.ok) throw new Error(`Failed to fetch chunk ${i}`);
        const chunkData = await response.json();
        chunks.push(chunkData.message);

        setPartialMessages(prev => ({
          ...prev,
          [messageId]: {
            ...prev[messageId],
            received_chunks: i,
            chunks: [...chunks]
          }
        }));

      } catch (error) {
        console.error(`Erro ao buscar chunk ${i}:`, error);
        chunks.push(`[parte ${i} faltando]`);
      }
    }
    return chunks.join('');
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

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
      const response = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: inputMessage,
          userId: 'user1010'
        })
      });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro na resposta do servidor');
      }

      if (data.status === 'partial' && data.message_id && data.total_chunks) {
        if (data.message_id) {
          setPartialMessages(prev => ({
                    ...prev,
                    [data.message_id]: {
                      message_id: data.message_id,
                      chunks: [data.message || data.reply || ''],
                      total_chunks: data.total_chunks,
                      received_chunks: 1,
                      original_length: data.original_length || 0
                    }
                  }));
        }

        const fullMessage = await fetchAllChunks(data.message_id, data.total_chunks);

        setMessages(prev => [...prev, {
          id: data.message_id,
          text: fullMessage,
          sender: 'bot',
          timestamp: new Date()
        }]);

        setPartialMessages(prev => {
          const newState = { ...prev };
          delete newState[data.message_id!];
          return newState;
        });

      } else if (data.reply || data.message) {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: data.reply || data.message!,
          sender: 'bot',
          timestamp: new Date()
        }]);
      } else {
        throw new Error('Resposta inválida do servidor');
      }

    } catch (error) {
      console.error('Erro:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: error instanceof Error ? error.message : 'Erro ao conectar com o serviço',
        sender: 'system',
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

                  {message.id === '1' && message.sender === 'bot' && (
                    <div className={styles.optionsContainer}>
                      {initialOptions.map((option, index) => (
                        <button
                          key={index}
                          className={styles.optionButton}
                          onClick={() => handleOptionClick(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className={styles.messageTime}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}

            {Object.values(partialMessages).map(msg => (
              <div key={msg.message_id} className={`${styles.message} ${styles.botMessage}`}>
                <div className={styles.messageText}>
                  {msg.chunks.map((chunk, i) => (
                    <React.Fragment key={i}>
                      {chunk.split('\n').map((line, j) => (
                        <p key={j}>{line}</p>
                      ))}
                    </React.Fragment>
                  ))}
                  <div className={styles.progress}>
                    <div 
                      className={styles.progressBar} 
                      style={{ width: `${(msg.received_chunks / msg.total_chunks) * 100}%` }}
                    />
                    <span>
                      Carregando ({msg.received_chunks}/{msg.total_chunks})
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && !Object.keys(partialMessages).length && (
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
