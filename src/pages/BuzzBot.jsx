import React, { useState, useEffect, useRef } from 'react';
import PromptLimitModal from '../components/PromptLimitModal';
import { checkHealth, getStats, askQuestion, sendFeedback } from '../utils/Api';
import Toast from '../components/Toast';

// Configuración desde variables de entorno
const NAVBAR_OFFSET = parseInt(import.meta.env.VITE_BUZZBOT_NAVBAR_OFFSET) || 88;
const BOTTOMBAR_OFFSET = parseInt(import.meta.env.VITE_BUZZBOT_BOTTOMBAR_OFFSET) || 56;
const INPUT_BAR_H = parseInt(import.meta.env.VITE_BUZZBOT_INPUT_BAR_HEIGHT) || 80;
const INPUT_BOTTOM_GAP = parseInt(import.meta.env.VITE_BUZZBOT_INPUT_BOTTOM_GAP) || 12;
const PROMPT_THRESHOLD = parseInt(import.meta.env.VITE_BUZZBOT_PROMPT_THRESHOLD) || 15;

export default function BuzzBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState('checking');
  const [showChat, setShowChat] = useState(false);
  const [active, setActive] = useState(true);
  const [ratings, setRatings] = useState({});
  const [promptCount, setPromptCount] = useState(0);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [toast, setToast] = useState(null);

  const chatEndRef = useRef(null);

  // ⬇️ Verificar estado de la API
  useEffect(() => {
    checkHealth().then(status => setApiStatus(status));
  }, []);

  // ⬇️ Scroll automático al final del chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showChat]);

  // ⬇️ Obtener stats iniciales del usuario
  useEffect(() => {
    const fetchStats = async () => {
      const response = await getStats();
      
      // Si hay toast (error o success), mostrarlo
      if (response.toast) {
        setToast(response.toast);
      }
      
      // Si tiene data válida (nueva estructura), usarla
      if (response.success && response.data) {
        setPromptCount(response.data.used || 0);
        setActive(response.data.used < response.data.limit);
        setShowLimitModal(response.data.show_form || false);
      }
      // Si es la estructura antigua (compatibilidad)
      else if (response.used !== undefined) {
        setPromptCount(response.used);
        setActive(response.used < response.limit);
        setShowLimitModal(response.show_form || false);
      }
    };
    fetchStats();
  }, []);

  // ⬇️ Manejar éxito del registro
  const handleRegistrationSuccess = async (response) => {
    console.log('Registration success:', response);
    
    // Mostrar toast de éxito si viene del backend
    if (response.toast) {
      setToast(response.toast);
    }
    
    // Actualizar estado local si hay stats en la respuesta
    if (response.success && response.data && response.data.stats) {
      setPromptCount(response.data.stats.used);
      setActive(response.data.stats.used < response.data.stats.limit);
    }
    // Estructura antigua (compatibilidad)
    else if (response.stats) {
      setPromptCount(response.stats.used);
      setActive(response.stats.used < response.stats.limit);
    }
    else {
      
      // ⚠️ Si no hay stats claros, obtenerlos del servidor
      console.log('No stats in registration response, fetching fresh stats...');
      const freshStats = await getStats();
      
      if (freshStats.success && freshStats.data) {
        setPromptCount(freshStats.data.used || 0);
        setActive(freshStats.data.used < freshStats.data.limit);
      } else if (freshStats.used !== undefined) {
        setPromptCount(freshStats.used);
        setActive(freshStats.used < freshStats.limit);
      } else {
        // Solo como último recurso
        setPromptCount(0);
        setActive(true);
      }
    }
    
    setShowLimitModal(false);
  };

  // ⬇️ Manejar error del registro  
  const handleRegistrationError = (error) => {
    console.log('Registration error:', error);
    
    if (error.toast) {
      setToast(error.toast);
    } else {
      setToast({
        type: 'error',
        title: 'Error en el registro',
        message: 'No se pudo completar el registro. Intente nuevamente.'
      });
    }
    
    // ⚠️ IMPORTANTE: NO cerrar el modal en caso de error
    // El usuario debe poder intentar de nuevo
    // setShowLimitModal permanece true
  };

  // Añadir este componente helper para renderizar HTML seguro
  const FormattedMessage = ({ content, isFormatted }) => {
    if (isFormatted && content.html) {
      return (
        <div 
          className="formatted-content"
          dangerouslySetInnerHTML={{ __html: content.html }}
        />
      );
    }
    
    // Fallback a texto plano
    return <div>{content.text || content}</div>;
  };

  // ⬇️ Enviar mensaje
  const sendMessage = async () => {
    if (!input.trim() || !active || apiStatus !== 'online') return;
    setLoading(true);

    setMessages(msgs => [...msgs, { role: 'user', content: input }]);
    if (!showChat) setShowChat(true);

    // Llamada al backend con formato
    const response = await askQuestion(input, "markdown"); // Pasar formato
    
    // Si la respuesta es exitosa y tiene answer_text
    if (response.success && response.data && response.data.answer_text) {
      setMessages(msgs => [
        ...msgs,
        { 
          role: 'assistant', 
          content: response.data.answer_text,
          formatted_content: response.data.formatted_answer, // Nueva propiedad
          question_id: response.data.id 
        }
      ]);
    }
    // Si es una respuesta de límite alcanzado (warning), no agregar mensaje al chat
    // porque answer_text será null pero es un warning válido
    else if (response.success && response.toast && response.toast.type === 'warning') {
      // Solo mostrar toast, no agregar mensaje al chat
      console.log('Límite alcanzado, solo mostrando toast');
    }
    // Estructura antigua (compatibilidad) - solo si no hay toast de error
    else if (response.answer_text && !response.toast) {
      setMessages(msgs => [
        ...msgs,
        { 
          role: 'assistant', 
          content: response.answer_text, 
          question_id: response.id 
        }
      ]);
    }

    // Actualizar estadísticas solo si la respuesta incluye stats
    if (response.data && response.data.stats) {
      setPromptCount(response.data.stats.used);
      setActive(response.data.stats.used < response.data.stats.limit);
      setShowLimitModal(response.data.stats.show_form || false);
    } else {
      // Si no hay stats en la respuesta, obtenerlas por separado
      const statsResponse = await getStats();
      if (statsResponse.toast && !response.toast) { // Solo mostrar si no hay toast previo
        console.log('Stats toast:', statsResponse.toast);
        setToast(statsResponse.toast);
      }
      if (statsResponse.success && statsResponse.data) {
        setPromptCount(statsResponse.data.used);
        setActive(statsResponse.data.used < statsResponse.data.limit);
        setShowLimitModal(statsResponse.data.show_form);
      }
      // Estructura antigua (compatibilidad)
      else if (statsResponse.used !== undefined) {
        setPromptCount(statsResponse.used);
        setActive(statsResponse.used < statsResponse.limit);
        setShowLimitModal(statsResponse.show_form);
      }
    }

    setInput('');
    setLoading(false);
  };

  // ⬇️ Enviar feedback
  const handleRate = async (index, value) => {
    const msg = messages[index];
    if (!msg.question_id) return;

    // Actualizar UI inmediatamente
    setRatings(r => ({ ...r, [index]: value ? 'like' : 'dislike' }));
    
    // Enviar feedback al backend
    const response = await sendFeedback(msg.question_id, value ? 'like' : 'dislike');
    
    // Mostrar toast de confirmación
    if (response.toast) {
      console.log('Feedback toast:', response.toast);
      setToast(response.toast);
    }
    
    // Si hay error, revertir el rating visual
    if (!response.success) {
      setRatings(r => ({ ...r, [index]: undefined }));
    }
  };

  // Debug para el estado del toast
  useEffect(() => {
    console.log('Toast state changed:', toast);
  }, [toast]);

  const chatBoxHeight = `calc(100vh - ${NAVBAR_OFFSET + BOTTOMBAR_OFFSET + INPUT_BAR_H + INPUT_BOTTOM_GAP}px)`;

  return (
    <div
      className="relative min-h-screen bg-gradient-to-br from-yellow-100 to-green-50 px-4"
      style={{ paddingTop: NAVBAR_OFFSET, paddingBottom: BOTTOMBAR_OFFSET }}
    >
      {/* Contenedor principal */}
      <div
        className={`${showChat ? '' : 'flex items-center'} w-full`}
        style={{ minHeight: `calc(100vh - ${NAVBAR_OFFSET + BOTTOMBAR_OFFSET}px)` }}
      >
        {/* Vista inicial */}
        {!showChat && (
          <div className="w-full max-w-4xl mx-auto px-4 animate-fadein">
            <div className="w-full">
              <input
                id="initial-input"
                name="initial-input"
                className="w-full border-2 border-primary rounded-full px-6 py-4 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                disabled={loading || apiStatus !== 'online' || !active}
                placeholder={
                  !active ? 'Chat desactivado...' : apiStatus !== 'online' ? 'API no disponible...' : '¿Qué quieres preguntar? (Presiona Enter para enviar)'
                }
                autoFocus
              />
            </div>
            <div className="mt-3 text-sm text-gray-700 text-center">
              <span className="italic">BuzzBot puede cometer errores.</span>
              {loading && <span className="block mt-1 text-primary font-medium">Enviando...</span>}
            </div>
          </div>
        )}

        {/* Chat visible */}
        {showChat && (
          <div className="w-full max-w-4xl mx-auto px-4 animate-slideup">
            <div
              className="overflow-y-auto no-scrollbar pr-1"
              style={{ height: chatBoxHeight }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`my-3 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-chatmsg`}
                >
                  <div className="bg-white text-gray-900 px-3 md:px-4 py-3 rounded-xl shadow max-w-[90%] md:max-w-full break-words">
                    <FormattedMessage 
                      content={msg.formatted_content || msg.content} 
                      isFormatted={!!msg.formatted_content}
                    />
                    {msg.role === 'assistant' && msg.question_id && (
                      <div className="mt-2 flex gap-2 items-center">
                        <button
                          onClick={() => handleRate(i, true)}
                          className={`px-3 py-1 rounded-full text-sm ${ratings[i] === 'like' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}
                        >
                          👍
                        </button>
                        <button
                          onClick={() => handleRate(i, false)}
                          className={`px-3 py-1 rounded-full text-sm ${ratings[i] === 'dislike' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-700'}`}
                        >
                          👎
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>
        )}

        {/* Barra de entrada fija */}
        {showChat && (
          <div
            className="fixed left-1/2 -translate-x-1/2 w-full max-w-4xl px-4"
            style={{ bottom: BOTTOMBAR_OFFSET + INPUT_BOTTOM_GAP, height: INPUT_BAR_H }}
          >
            <div className="w-full">
              <input
                id="chat-input"
                name="chat-input"
                className="w-full border-2 border-primary rounded-full px-6 py-4 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                disabled={loading || apiStatus !== 'online' || !active}
                placeholder={
                  !active ? 'Chat desactivado...' : apiStatus !== 'online' ? 'API no disponible...' : 'Escribe tu pregunta... (Enter para enviar)'
                }
                autoFocus
              />
            </div>
            <div className="mt-2 text-sm text-gray-700 text-center">
              <span className="italic">BuzzBot puede cometer errores.</span>
              {loading && <span className="block text-primary font-medium">Enviando...</span>}
            </div>
          </div>
        )}
      </div>

      {/* Barra inferior */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-800 py-2 px-4 md:px-6 flex flex-col md:flex-row justify-between items-center z-50 gap-2 md:gap-0">
        <span className="flex items-center gap-2 text-xs text-gray-300">
          <span className={`inline-block h-2 w-2 rounded-full ${apiStatus === 'online' ? 'bg-green-400' : 'bg-red-400'}`} />
          {apiStatus === 'online' ? 'API Online' : 'API Offline'}
          <span className="ml-2 md:ml-4 text-yellow-300">Prompts hoy: {promptCount}</span>
        </span>
        <div className="flex gap-3 md:gap-5 items-center">
          <a
            href="/documentation"
            className="text-yellow-300 hover:text-yellow-200 underline text-xs transition-colors duration-200"
          >
            Explora cómo opera
          </a>
          <a
            href="/terms"
            className="text-yellow-300 hover:text-yellow-200 underline text-xs transition-colors duration-200"
          >
            Consulta las condiciones
          </a>
        </div>
      </div>

      {/* Modal límite de prompts */}
        <PromptLimitModal
        show={showLimitModal}
        promptCount={promptCount}
        threshold={PROMPT_THRESHOLD}
        onSuccess={handleRegistrationSuccess}
        onError={handleRegistrationError}
      />      {/* Toast - DEBE estar al final, fuera de otros contenedores */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
