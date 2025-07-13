import React, { useState, useRef, useEffect } from 'react';
import { Send, Globe, User, Bot, Share2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const BuzzBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch("https://buzzbot-7v59.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userMessage.text })
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.respuesta,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, inténtalo de nuevo más tarde.',
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
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

  const handleShare = () => {
    const shareText = "¡Prueba Buzzness AI! 🚀 Tu asistente inteligente para hacer crecer tu negocio. Consejos, análisis y estrategias personalizadas. 💡";
    const shareUrl = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: 'Buzzness AI - Asistente Inteligente',
        text: shareText,
        url: shareUrl,
      }).catch(console.error);
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`).then(() => {
        alert('¡Enlace copiado al portapapeles!');
      }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = `${shareText} ${shareUrl}`;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('¡Enlace copiado al portapapeles!');
      });
    }
  };

  const BuzznessLogo = () => (
    <img src="/assets/images/icon.webp" alt="Bee Logo" className="h-10 w-10" />
  );

  const TypingIndicator = () => (
    <div className="flex items-center space-x-2">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      </div>
      <span className="text-gray-500 text-sm">Escribiendo...</span>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BuzznessLogo />
              <span className="text-xl font-bold text-gray-800">Buzzness AI</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors"
              >
                <Share2 size={16} />
                <span>Compartir</span>
              </button>
              <button 
                onClick={() => window.open('https://buzzness.cl', '_blank')}
                className="flex items-center space-x-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 rounded-lg transition-colors font-medium"
              >
                <Globe size={16} />
                <span>Ir a Buzzness</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4">
          {messages.length === 0 && (
            <div className="text-center py-20">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
                  <BuzznessLogo />
                </div>
                <h1 className="text-3xl font-semibold text-gray-800 mb-2">
                  ¿En qué puedo ayudarte hoy?
                </h1>
                <p className="text-gray-600 text-lg">
                  Soy tu asistente de Buzzness. Pregúntame lo que necesites.
                </p>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`py-2 flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              {!message.isUser && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-2">
                  <Bot size={16} className="text-white" />
                </div>
              )}
              <div
                className={`max-w-xs px-4 py-3 rounded-2xl shadow-sm ${
                  message.isUser
                    ? 'bg-yellow-400 text-gray-800 rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
              >
                <div className="text-sm font-medium mb-1">
                  {message.isUser ? 'Tú' : 'BuzzBot'}
                </div>
                <div className="leading-relaxed whitespace-pre-wrap">
                  {message.text}
                </div>
                <div className="text-xs text-gray-500 mt-2 text-right">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              {message.isUser && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center ml-2">
                  <User size={16} className="text-gray-800" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="py-6 bg-gray-50">
              <div className="flex space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-800 mb-1">BuzzBot</div>
                  <TypingIndicator />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Container */}
      <div className="border-t border-gray-200 bg-white sticky bottom-0">
        <div className="max-w-4xl mx-auto px-4 py-4">
          {/* Typing Indicator arriba del input */}
          {isLoading && (
            <div className="flex justify-start mb-2">
              <TypingIndicator />
            </div>
          )}
          <div className="relative">
            <input
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Envía un mensaje a BuzzBot..."
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 resize-none"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-800 rounded-lg transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
          {/* Disclaimer */}
          <div className="text-center mt-3">
            <p className="text-xs text-gray-500">
              BuzzBot puede cometer errores. Considera verificar información importante.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuzzBot;