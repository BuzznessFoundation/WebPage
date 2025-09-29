import React, { useState, useEffect, useRef } from 'react';
import PromptLimitModal from '../components/PromptLimitModal';
import { checkHealth, getStats, askQuestion, sendFeedback } from '../utils/Api';
import Toast from '../components/Toast';

const API_BASE = import.meta.env.VITE_API_URL

const NAVBAR_OFFSET = 88;
const BOTTOMBAR_OFFSET = 56;
const INPUT_BAR_H = 80;
const INPUT_BOTTOM_GAP = 12;

export default function BuzzBot() {
  const [messages, setMessages] = useState([
    { role: 'system', content: '¡Hola! Soy BuzzBot. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState('checking');
  const [showChat, setShowChat] = useState(false);
  const [active, setActive] = useState(true);
  const [ratings, setRatings] = useState({});
  const [promptCount, setPromptCount] = useState(0);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [toastMsg, setToastMsg] = useState(""); // Estado para el toast

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
      try {
        const stats = await getStats();
        if (stats) {
          setPromptCount(stats.used);
          setActive(stats.used < stats.limit);
          setShowLimitModal(stats.show_form);
        } else {
          setToastMsg("La API no está disponible, intente más tarde.");
        }
      } catch {
        setToastMsg("Error interno, refresque la página.");
      }
    };
    fetchStats();
  }, []);

  // ⬇️ Manejar éxito del registro
  const handleRegistrationSuccess = ({ stats }) => {
    if (stats) {
      setPromptCount(stats.used);
      setActive(stats.used < stats.limit);
    } else {
      setActive(true);
    }
    setShowLimitModal(false);
  };

  // ⬇️ Manejar error del registro  
  const handleRegistrationError = () => {
    setToastMsg("Error interno, intente más tarde.");
  };

  // ⬇️ Enviar mensaje
  const sendMessage = async () => {
    if (!input.trim() || !active) return;
    setLoading(true);

    setMessages(msgs => [...msgs, { role: 'user', content: input }]);
    if (!showChat) setShowChat(true);

    // Llamada al backend
    let data;
    try {
      data = await askQuestion(input);
    } catch {
      setToastMsg("La API no está disponible, intente más tarde.");
      setLoading(false);
      return;
    }

    // Si la respuesta es error, mostrar toast y NO agregar al chat
    if (!data || !data.answer_text || data.answer_text === 'Error al conectar con la API.') {
      setToastMsg("La API no está disponible, intente más tarde.");
    } else {
      setMessages(msgs => [
        ...msgs,
        { role: 'assistant', content: data.answer_text, question_id: data.id }
      ]);
    }

    // Actualizar estadísticas
    try {
      const stats = await getStats();
      if (stats) {
        setPromptCount(stats.used);
        setActive(stats.used < stats.limit);
        setShowLimitModal(stats.show_form);
      } else {
        setToastMsg("La API no está disponible, intente más tarde.");
      }
    } catch {
      setToastMsg("Error interno, refresque la página.");
    }

    setInput('');
    setLoading(false);
  };

  // ⬇️ Enviar feedback
  const handleRate = async (index, value) => {
    const msg = messages[index];
    if (!msg.question_id) return;

    setRatings(r => ({ ...r, [index]: value ? 'like' : 'dislike' }));
    try {
      const result = await sendFeedback(msg.question_id, value ? 'like' : 'dislike');
      if (!result) {
        setToastMsg("No se pudo enviar el feedback, intente más tarde.");
      }
    } catch {
      setToastMsg("Error interno, refresque la página.");
    }
  };

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
          <div className="w-3/5 mx-auto animate-fadein">
            <div className="w-full flex items-center gap-2">
              <input
                className="flex-1 border-2 border-primary rounded-full px-8 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                disabled={loading || apiStatus !== 'online' || !active}
                placeholder={
                  !active ? 'Chat desactivado...' : apiStatus !== 'online' ? 'API no disponible...' : '¿Qué quieres preguntar?'
                }
                autoFocus
              />
              <button
                className={`px-7 py-4 rounded-full font-bold shadow transition-all text-lg ${
                  active && apiStatus === 'online' ? 'bg-primary text-white hover:scale-105' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                onClick={sendMessage}
                disabled={loading || apiStatus !== 'online' || !active}
              >
                {loading ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
            <div className="mt-3 text-sm text-gray-700">
              <span className="italic">BuzzBot puede cometer errores.</span>
            </div>
          </div>
        )}

        {/* Chat visible */}
        {showChat && (
          <div className="w-3/5 mx-auto animate-slideup">
            <div
              className="overflow-y-auto no-scrollbar pr-1"
              style={{ height: chatBoxHeight }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`my-3 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-chatmsg`}
                >
                  <div className="bg-white text-gray-900 px-4 py-3 rounded-xl shadow max-w-full break-words">
                    <div>{msg.content}</div>
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
            className="fixed left-1/2 -translate-x-1/2 w-3/5"
            style={{ bottom: BOTTOMBAR_OFFSET + INPUT_BOTTOM_GAP, height: INPUT_BAR_H }}
          >
            <div className="w-full flex items-center gap-2">
              <input
                className="flex-1 border-2 border-primary rounded-full px-8 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                disabled={loading || apiStatus !== 'online' || !active}
                placeholder={
                  !active ? 'Chat desactivado...' : apiStatus !== 'online' ? 'API no disponible...' : 'Escribe tu pregunta...'
                }
                autoFocus
              />
              <button
                className={`px-7 py-4 rounded-full font-bold shadow transition-all text-lg ${
                  active && apiStatus === 'online' ? 'bg-primary text-white hover:scale-105' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                onClick={sendMessage}
                disabled={loading || apiStatus !== 'online' || !active}
              >
                {loading ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
            <div className="mt-2 text-sm text-gray-700">
              <span className="italic">BuzzBot puede cometer errores.</span>
            </div>
          </div>
        )}
      </div>

      {/* Barra inferior */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-800 py-2 px-6 flex justify-between items-center z-50">
        <span className="flex items-center gap-2 text-xs text-gray-300">
          <span className={`inline-block h-2 w-2 rounded-full ${apiStatus === 'online' ? 'bg-green-400' : 'bg-red-400'}`} />
          {apiStatus === 'online' ? 'API Online' : 'API Offline'}
          <span className="ml-4 text-yellow-300">Prompts hoy: {promptCount}</span>
        </span>
        <div className="flex gap-5 items-center">
          <button
            className="text-yellow-300 underline text-xs"
            onClick={() => alert('Explora cómo opera: busca en los documentos procesados y usa prompts claros.')}
          >
            Explora cómo opera
          </button>
          <button
            className="text-yellow-300 underline text-xs"
            onClick={() => alert('Consulta las condiciones: aviso legal y política de privacidad.')}
          >
            Consulta las condiciones
          </button>
        </div>
      </div>

      {/* Modal límite de prompts con tu implementación mejorada */}
      <PromptLimitModal
        show={showLimitModal}
        promptCount={promptCount}
        threshold={15}
        onSuccess={handleRegistrationSuccess}
        onError={handleRegistrationError}
      />

      <Toast message={toastMsg} onClose={() => setToastMsg("")} />
    </div>
  );
}
