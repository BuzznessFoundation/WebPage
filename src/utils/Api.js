const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, '');

const headers = {
  'Content-Type': 'application/json',
};

export async function checkHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    const data = await res.json();
    return data.status === 'ok' ? 'online' : 'offline';
  } catch {
    return 'offline';
  }
}

export async function getStats() {
  try {
    const res = await fetch(`${API_BASE}/stats/`, { credentials: 'include' });
    return await res.json();
  } catch {
    // Solo error de conexión/red
    return {
      success: false,
      toast: {
        type: 'error',
        title: 'Conexión',
        message: 'La API no está disponible, intente más tarde.'
      }
    };
  }
}

export async function askQuestion(questionText, format = "markdown") {
  try {
    const res = await fetch(`${API_BASE}/query`, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify({ 
        question_text: questionText,
        format: format  // Añadir parámetro de formato
      }),
    });
    return await res.json();
  } catch {
    return {
      success: false,
      toast: {
        type: 'error',
        title: 'Conexión',
        message: 'La API no está disponible, intente más tarde.'
      }
    };
  }
}

export async function registerUser(formData) {
  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify(formData),
    });
    return await res.json();
  } catch {
    // Solo error de conexión/red
    return {
      success: false,
      toast: {
        type: 'error',
        title: 'Conexión',
        message: 'La API no está disponible, intente más tarde.'
      }
    };
  }
}

export async function sendFeedback(questionId, feedback) {
  try {
    const params = new URLSearchParams();
    params.append('feedback', feedback);
    
    const res = await fetch(`${API_BASE}/feedback/${questionId}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });
    
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    
    return await res.json();
  } catch {
    return {
      success: false,
      toast: {
        type: 'error',
        title: 'Conexión',
        message: 'No se pudo enviar el feedback, intente más tarde.'
      }
    };
  }
}

export function resetSession() {
  document.cookie = 'buzzgate_user=; Max-Age=0; path=/;';
}
