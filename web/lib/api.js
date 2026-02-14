const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '';

async function request(path, { method = 'GET', token, language, body } = {}) {
  const headers = {
    'Accept-Language': language || 'en'
  };

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: 'no-store'
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const error = new Error(payload?.message || payload?.error || `Request failed (${response.status})`);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}

export function register(payload, language) {
  return request('/api/auth/register', { method: 'POST', body: payload, language });
}

export function login(payload, language) {
  return request('/api/auth/login', { method: 'POST', body: payload, language });
}

export function me(token, language) {
  return request('/api/auth/me', { token, language });
}

export function acceptLegalConsent(payload, token, language) {
  return request('/api/auth/legal-consent', { method: 'POST', body: payload, token, language });
}

export function createDivination(payload, token, language) {
  return request('/api/divinations/read', { method: 'POST', body: payload, token, language });
}

export function getDivinationHistory(token, language) {
  return request('/api/divinations/history', { token, language });
}

export function deleteDivinationHistoryItem(recordId, token, language) {
  return request(`/api/divinations/history/${recordId}`, { method: 'DELETE', token, language });
}

export function clearDivinationHistory(token, language) {
  return request('/api/divinations/history', { method: 'DELETE', token, language });
}
