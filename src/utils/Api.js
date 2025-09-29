const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, ''); // Quitar barra final si existe

// Encabezados comunes
const headers = {
  'Content-Type': 'application/json',
};

// Check health de la API
export async function checkHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    const data = await res.json();
    return data.status === 'ok' ? 'online' : 'offline';
  } catch {
    return 'offline';
  }
}

// Obtener estadísticas del usuario (prompts usados, límite, formulario)
export async function getStats() {
  try {
    const res = await fetch(`${API_BASE}/stats/`, { credentials: 'include' });
    return await res.json();
  } catch {
    return null; // No log, no detalles
  }
}

// Enviar una pregunta al backend y obtener respuesta
export async function askQuestion(questionText) {
  try {
    const res = await fetch(`${API_BASE}/query`, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify({ question_text: questionText }),
    });
    const data = await res.json();
    return data;
  } catch {
    return { answer_text: 'Error al conectar con la API.' };
  }
}

// Registrar usuario del Modal de 15 prompts
export async function registerUser(formData) {
  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      throw new Error("Error interno");
    }
    const data = await res.json();
    return data;
  } catch {
    throw new Error("Error interno");
  }
}

// Enviar feedback (like/dislike) para una respuesta
export async function sendFeedback(questionId, feedback) {
  try {
    const res = await fetch(`${API_BASE}/feedback/${questionId}`, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify({ feedback }),
    });
    return await res.json();
  } catch {
    return null;
  }
}

// Función para reiniciar sesión local (funcion para devs, si lees esto, usalo!)
export function resetSession() {
  document.cookie = 'buzzgate_user=; Max-Age=0; path=/;';
}
