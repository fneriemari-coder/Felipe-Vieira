const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

// cents (integer) -> "R$ 1.234,56"
export function formatCents(cents) {
  return brl.format((cents || 0) / 100);
}

// "1.234,56" or "1234.56" or "1234" -> integer cents (or null if invalid)
export function parseToCents(input) {
  if (typeof input === 'number') return Math.round(input * 100);
  if (typeof input !== 'string') return null;

  let s = input.trim();
  if (!s) return null;

  // Normalize Brazilian formatting: remove thousands separators, use '.' as decimal
  if (s.includes(',')) {
    s = s.replace(/\./g, '').replace(',', '.');
  }
  s = s.replace(/[^0-9.]/g, '');

  const value = Number(s);
  if (!Number.isFinite(value) || value <= 0) return null;
  return Math.round(value * 100);
}

// "2026-05-22" -> "22/05/2026"
export function formatDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.slice(0, 10).split('-');
  return `${d}/${m}/${y}`;
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}
