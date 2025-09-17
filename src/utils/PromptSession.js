const SESSION_KEY = 'buzzbot_session';
const DAILY_LIMIT = 30;
const MODAL_THRESHOLD = 15;

function todayKey() {
  const d = new Date();
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

function createSession() {
  return {
    id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : Math.random().toString(36).slice(2),
    date: todayKey(),
    count: 0
  };
}

function saveSession(sess) {
  try { localStorage.setItem(SESSION_KEY, JSON.stringify(sess)); } catch {}
}

export function initSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) {
      const s = createSession();
      saveSession(s);
      return s;
    }
    const s = JSON.parse(raw);
    if (!s.date || s.date !== todayKey()) {
      const ns = createSession();
      saveSession(ns);
      return ns;
    }
    return s;
  } catch {
    const s = createSession();
    saveSession(s);
    return s;
  }
}

/**
 * Incrementa el contador y lo guarda.
 * Retorna { allowed: boolean, session: object }.
 * allowed = false cuando se supera DAILY_LIMIT.
 */

export function incrementPromptCount() {
  const s = initSession();
  if (s.count >= DAILY_LIMIT) {
    return { allowed: false, session: s };
  }
  s.count = (s.count || 0) + 1;
  saveSession(s);
  return { allowed: true, session: s };
}

export { DAILY_LIMIT, MODAL_THRESHOLD };