import React, { useState, useEffect, useRef } from 'react';

const API_URL = 'https://TU_API_URL';

// Config de test
const DEV_MODE = true;
const MOCK_ONLINE = true;

// Offsets y dimensiones
const NAVBAR_OFFSET = 88;     // alto aprox del Navbar
const BOTTOMBAR_OFFSET = 56;  // alto aprox de la barra inferior
const INPUT_BAR_H = 80;       // alto aprox de la barra de entrada
const INPUT_BOTTOM_GAP = 12;  // separación respecto a la barra inferior

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
  const chatEndRef = useRef(null);

  const mockResponses = [
    'Claro, aquí tienes un ejemplo rápido.',
    'Puedo ayudarte con eso, ¿quieres más detalle?',
    'No tengo datos suficientes en este momento, pero puedo investigar.',
    '¡Perfecto! Esto debería ayudarte a avanzar.'
  ];

  useEffect(() => {
    if (DEV_MODE) {
      setApiStatus(MOCK_ONLINE ? 'online' : 'offline');
      return;
    }
    fetch(`${API_URL}/health`)
      .then(res => res.json())
      .then(data => setApiStatus(data.status === 'ok' ? 'online' : 'offline'))
      .catch(() => setApiStatus('offline'));
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showChat]);

  const handleRate = (index, value) => {
    setRatings(r => ({ ...r, [index]: value ? 'like' : 'dislike' }));
  };

  const sendMessage = async () => {
    if (!input.trim() || !active) return;
    setLoading(true);

    setMessages(msgs => [...msgs, { role: 'user', content: input }]);
    if (!showChat) setShowChat(true);

    try {
      if (DEV_MODE) {
        await new Promise(r => setTimeout(r, 700 + Math.random() * 800));
        const mock = mockResponses[Math.floor(Math.random() * mockResponses.length)];
        setMessages(msgs => [...msgs, { role: 'assistant', content: mock }]);
      } else {
        const res = await fetch(`${API_URL}/query`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: input })
        });
        const data = await res.json();
        setMessages(msgs => [
          ...msgs,
          { role: 'assistant', content: data.results?.[0]?.content || 'No encontré información.' }
        ]);
      }
    } catch {
      setMessages(msgs => [...msgs, { role: 'assistant', content: 'Error al conectar con la API.' }]);
    }
    setInput('');
    setLoading(false);
  };

  // Altura del box de mensajes cuando el chat está visible
  const chatBoxHeight = `calc(100vh - ${NAVBAR_OFFSET + BOTTOMBAR_OFFSET + INPUT_BAR_H + INPUT_BOTTOM_GAP}px)`;

  return (
    <div
      className="relative min-h-screen bg-gradient-to-br from-yellow-100 to-green-50 px-4"
      style={{ paddingTop: NAVBAR_OFFSET, paddingBottom: BOTTOMBAR_OFFSET }}
    >
      {/* Contenedor que respeta navbar y barra inferior */}
      <div
        className={`${showChat ? '' : 'flex items-center'} w-full`}
        style={{ minHeight: `calc(100vh - ${NAVBAR_OFFSET + BOTTOMBAR_OFFSET}px)` }}
      >
        {/* Vista inicial: barra centrada (60% ancho). Desaparece al iniciar chat */}
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

        {/* Chat visible: mensajes en box (60% ancho) con scroll oculto */}
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
                    {msg.role === 'assistant' && (
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

        {/* Barra de entrada fija (60% ancho) cuando el chat está visible */}
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

      {/* Barra inferior fija: oscura y delgada */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-800 py-2 px-6 flex justify-between items-center z-50">
        <span className="flex items-center gap-2 text-xs text-gray-300">
          <span className={`inline-block h-2 w-2 rounded-full ${apiStatus === 'online' ? 'bg-green-400' : 'bg-red-400'}`} />
          {apiStatus === 'online' ? 'API Online' : 'API Offline'}
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
    </div>
  );
}