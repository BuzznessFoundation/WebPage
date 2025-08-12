import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Globe, User, Bot, Share2, X, CheckCircle, AlertCircle, Info, ChevronDown, BookOpen, Users, FileText, PlusCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

interface Mode {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const BuzzBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [selectedMode, setSelectedMode] = useState<string>('normativas');
  const [isModeDropdownOpen, setIsModeDropdownOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const modeDropdownRef = useRef<HTMLDivElement>(null);

  const modes: Mode[] = [
    {
      id: 'normativas',
      name: 'Normativas',
      icon: <BookOpen size={16} />,
      description: 'Consultas sobre normativas y reglamentos'
    },
    {
      id: 'curriculum',
      name: 'Currículum',
      icon: <FileText size={16} />,
      description: 'Preguntas sobre contenido curricular'
    },
    {
      id: 'convivencia',
      name: 'Convivencia',
      icon: <Users size={16} />,
      description: 'Temas de convivencia escolar'
    },
    {
      id: 'crear-documento',
      name: 'Crear Documento',
      icon: <PlusCircle size={16} />,
      description: 'Generar documentos personalizados'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modeDropdownRef.current && !modeDropdownRef.current.contains(event.target as Node)) {
        setIsModeDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const showToast = useCallback((message: string, type: Toast['type'] = 'info', duration = 5000) => {
    const id = Date.now().toString();
    const newToast: Toast = { id, message, type, duration };
    
    setToasts(prev => [...prev, newToast]);
    
    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleModeSelect = (modeId: string) => {
    setSelectedMode(modeId);
    setIsModeDropdownOpen(false);
    const selectedModeObj = modes.find(mode => mode.id === modeId);
    showToast(`Modo cambiado a: ${selectedModeObj?.name}`, 'info', 2000);
  };

  const getCurrentMode = () => {
    return modes.find(mode => mode.id === selectedMode) || modes[0];
  };

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
      const response = await fetch(import.meta.env.VITE_API_URL || "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_API_KEY || "",
        },
        body: JSON.stringify({
          question: userMessage.text,
          top_k: 5,
          modo: getCurrentMode().description
        }),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.answer,  // ✅ esto es lo que entrega tu API
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      showToast('Respuesta recibida exitosamente', 'success', 3000);
    } catch (error) {
      console.error('Error:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, inténtalo de nuevo más tarde.',
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
      showToast('Error al procesar el mensaje. Inténtalo nuevamente.', 'error');
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
      }).then(() => {
        showToast('¡Contenido compartido exitosamente!', 'success');
      }).catch(() => {
        showToast('Error al compartir el contenido', 'error');
      });
    } else {
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`).then(() => {
        showToast('¡Enlace copiado al portapapeles!', 'success');
      }).catch(() => {
        showToast('Error al copiar el enlace', 'error');
      });
    }
  };

  const BuzznessLogo = () => (
    <img src="/assets/images/icon.webp" alt="Bee Logo" className="h-10 w-10" />
  );

  const LoadingDots = () => (
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
    </div>
  );

  const ToastIcon = ({ type }: { type: Toast['type'] }) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'info': return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const ToastContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            flex items-start space-x-3 p-4 rounded-lg shadow-lg backdrop-blur-sm border animate-in slide-in-from-right
            ${toast.type === 'success' ? 'bg-green-50/90 border-green-200' : ''}
            ${toast.type === 'error' ? 'bg-red-50/90 border-red-200' : ''}
            ${toast.type === 'info' ? 'bg-blue-50/90 border-blue-200' : ''}
          `}
        >
          <ToastIcon type={toast.type} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );

  const ModeSelector = () => {
    const currentMode = getCurrentMode();
    
    return (
      <div className="relative" ref={modeDropdownRef}>
        <button
          onClick={() => setIsModeDropdownOpen(!isModeDropdownOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <div className="text-yellow-500">
            {currentMode.icon}
          </div>
          <span className="font-medium">{currentMode.name}</span>
          <ChevronDown 
            size={16} 
            className={`transition-transform duration-200 ${isModeDropdownOpen ? 'rotate-180' : ''}`}
          />
        </button>
        
        {isModeDropdownOpen && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-10 animate-in fade-in slide-in-from-top-2 duration-200">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => handleModeSelect(mode.id)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 flex items-start space-x-3 ${
                  selectedMode === mode.id ? 'bg-yellow-50 border-r-2 border-yellow-400' : ''
                }`}
              >
                <div className={`mt-0.5 ${selectedMode === mode.id ? 'text-yellow-500' : 'text-gray-400'}`}>
                  {mode.icon}
                </div>
                <div className="flex-1">
                  <div className={`font-medium ${selectedMode === mode.id ? 'text-yellow-700' : 'text-gray-900'}`}>
                    {mode.name}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {mode.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <ToastContainer />
      
      {/* Main Container */}
      <div className="flex flex-col h-screen mx-auto">
        
        {/* Header */}
        <div className="border-b border-gray-200">
          <div className="mx-auto py-3">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <div className="flex items-center space-x-2">
                <BuzznessLogo />
                <span className="text-xl font-bold text-gray-800">BuzzBot</span>
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

        {/* Mode Selector Bar */}
        <div className="bg-white/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto py-3">
            <ModeSelector />
          </div>
        </div>

        {/* Messages Container */}
        <main className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
            
            {/* Welcome Screen */}
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
                <div className="space-y-5">
                  <div className="relative items-center justify-center flex">
                    <div className="relative">
                      <BuzznessLogo/>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent">
                      ¡Hola! Soy BuzzBot
                    </h1>
                    <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
                      Tu asistente inteligente de Buzzness. Pregúntame lo que necesites para tu escuela.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="space-y-6 max-w-4xl mx-auto">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 animate-in fade-in slide-in-from-bottom duration-500 ${
                    message.isUser ? 'justify-end' : 'justify-start'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {!message.isUser && (
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center shadow-md">
                      <Bot size={18} className="text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`group max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl p-4 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md ${
                      message.isUser
                        ? 'bg-yellow-400 border text-gray-800 rounded-br-md'
                        : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold opacity-70">
                        {message.isUser ? 'Tú' : 'BuzzBot'}
                      </span>
                      <span className="text-xs opacity-50">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="leading-relaxed whitespace-pre-wrap">
                      {message.text}
                    </div>
                  </div>

                  {message.isUser && (
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-md">
                      <User size={18} className="text-gray-800" />
                    </div>
                  )}
                </div>
              ))}

              {/* Loading State */}
              {isLoading && (
                <div className="flex items-start space-x-3 animate-in fade-in slide-in-from-bottom">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center shadow-md">
                    <Bot size={18} className="text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <LoadingDots />
                      <span className="text-sm text-gray-600">Pensando...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Input Container */}
        <div className="border-t border-gray-200 bg-white sticky bottom-0 w-full">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="relative">
              <input
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Envía un mensaje en modo ${getCurrentMode().name}...`}
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
    </div>
  );
};

export default BuzzBot;