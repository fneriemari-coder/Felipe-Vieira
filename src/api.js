const BASE = '/api';

async function request(path, options = {}) {
  const res = await fetch(BASE + path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data.errors?.join(' ') || data.error || 'Erro na requisição.';
    throw new Error(msg);
  }
  return data;
}

function toQuery(filters = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => {
    if (v) params.set(k, v);
  });
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

export const api = {
  listTransactions: (filters) => request(`/transactions${toQuery(filters)}`),
  getSummary: (filters) => request(`/summary${toQuery(filters)}`),
  listCategories: () => request('/categories'),
  createTransaction: (body) =>
    request('/transactions', { method: 'POST', body: JSON.stringify(body) }),
  updateTransaction: (id, body) =>
    request(`/transactions/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteTransaction: (id) =>
    request(`/transactions/${id}`, { method: 'DELETE' }),
};
