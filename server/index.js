import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { existsSync } from 'node:fs';
import db from './db.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const VALID_TYPES = ['entrada', 'saida'];
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function validateTransaction(body) {
  const errors = [];
  const { type, amount, description, category, date } = body;

  if (!VALID_TYPES.includes(type)) {
    errors.push("Campo 'type' deve ser 'entrada' ou 'saida'.");
  }
  if (!Number.isInteger(amount) || amount <= 0) {
    errors.push("Campo 'amount' deve ser um inteiro positivo (em centavos).");
  }
  if (date != null && !DATE_RE.test(date)) {
    errors.push("Campo 'date' deve estar no formato AAAA-MM-DD.");
  }
  if (description != null && typeof description !== 'string') {
    errors.push("Campo 'description' deve ser texto.");
  }
  if (category != null && typeof category !== 'string') {
    errors.push("Campo 'category' deve ser texto.");
  }
  return errors;
}

function buildFilter(query) {
  const clauses = [];
  const params = {};
  if (VALID_TYPES.includes(query.type)) {
    clauses.push('type = @type');
    params.type = query.type;
  }
  if (query.category) {
    clauses.push('category = @category');
    params.category = query.category;
  }
  if (DATE_RE.test(query.from || '')) {
    clauses.push('date >= @from');
    params.from = query.from;
  }
  if (DATE_RE.test(query.to || '')) {
    clauses.push('date <= @to');
    params.to = query.to;
  }
  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  return { where, params };
}

// List transactions (with optional filters)
app.get('/api/transactions', (req, res) => {
  const { where, params } = buildFilter(req.query);
  const rows = db
    .prepare(`SELECT * FROM transactions ${where} ORDER BY date DESC, id DESC`)
    .all(params);
  res.json(rows);
});

// Summary: totals + balance for the (optionally filtered) period
app.get('/api/summary', (req, res) => {
  const { where, params } = buildFilter(req.query);
  const row = db
    .prepare(
      `SELECT
         COALESCE(SUM(CASE WHEN type='entrada' THEN amount ELSE 0 END), 0) AS totalEntrada,
         COALESCE(SUM(CASE WHEN type='saida'   THEN amount ELSE 0 END), 0) AS totalSaida,
         COUNT(*) AS count
       FROM transactions ${where}`
    )
    .get(params);
  res.json({ ...row, saldo: row.totalEntrada - row.totalSaida });
});

// Distinct categories in use
app.get('/api/categories', (_req, res) => {
  const rows = db
    .prepare(`SELECT DISTINCT category FROM transactions ORDER BY category`)
    .all();
  res.json(rows.map((r) => r.category));
});

// Create
app.post('/api/transactions', (req, res) => {
  const errors = validateTransaction(req.body);
  if (errors.length) return res.status(400).json({ errors });

  const { type, amount } = req.body;
  const description = (req.body.description || '').trim();
  const category = (req.body.category || '').trim() || 'Sem categoria';
  const date = req.body.date || new Date().toISOString().slice(0, 10);

  const info = db
    .prepare(
      `INSERT INTO transactions (type, amount, description, category, date)
       VALUES (@type, @amount, @description, @category, @date)`
    )
    .run({ type, amount, description, category, date });

  const created = db
    .prepare('SELECT * FROM transactions WHERE id = ?')
    .get(info.lastInsertRowid);
  res.status(201).json(created);
});

// Update
app.put('/api/transactions/:id', (req, res) => {
  const id = Number(req.params.id);
  const existing = db.prepare('SELECT * FROM transactions WHERE id = ?').get(id);
  if (!existing) return res.status(404).json({ error: 'Lançamento não encontrado.' });

  const merged = { ...existing, ...req.body };
  const errors = validateTransaction(merged);
  if (errors.length) return res.status(400).json({ errors });

  db.prepare(
    `UPDATE transactions
       SET type=@type, amount=@amount, description=@description,
           category=@category, date=@date
     WHERE id=@id`
  ).run({
    id,
    type: merged.type,
    amount: merged.amount,
    description: (merged.description || '').trim(),
    category: (merged.category || '').trim() || 'Sem categoria',
    date: merged.date,
  });

  res.json(db.prepare('SELECT * FROM transactions WHERE id = ?').get(id));
});

// Delete
app.delete('/api/transactions/:id', (req, res) => {
  const id = Number(req.params.id);
  const info = db.prepare('DELETE FROM transactions WHERE id = ?').run(id);
  if (info.changes === 0)
    return res.status(404).json({ error: 'Lançamento não encontrado.' });
  res.status(204).end();
});

// Serve the built frontend in production (single-server deploy)
const distDir = join(__dirname, '..', 'dist');
if (existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get('*', (_req, res) => res.sendFile(join(distDir, 'index.html')));
}

app.listen(PORT, () => {
  console.log(`API e app rodando em http://localhost:${PORT}`);
});
