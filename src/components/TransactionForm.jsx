import { useEffect, useState } from 'react';
import { parseToCents, todayISO } from '../format.js';

const SUGGESTED_CATEGORIES = [
  'Vendas',
  'Serviços',
  'Salários',
  'Fornecedores',
  'Aluguel',
  'Impostos',
  'Marketing',
  'Outros',
];

const empty = { type: 'entrada', amount: '', description: '', category: '', date: todayISO() };

export default function TransactionForm({ initial, categories = [], onSubmit, onCancel }) {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initial) {
      setForm({
        type: initial.type,
        amount: (initial.amount / 100).toFixed(2).replace('.', ','),
        description: initial.description || '',
        category: initial.category === 'Sem categoria' ? '' : initial.category,
        date: initial.date,
      });
    } else {
      setForm(empty);
    }
    setError('');
  }, [initial]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    const cents = parseToCents(form.amount);
    if (cents == null) {
      setError('Informe um valor válido maior que zero.');
      return;
    }
    setError('');
    onSubmit({
      type: form.type,
      amount: cents,
      description: form.description.trim(),
      category: form.category.trim(),
      date: form.date,
    });
    if (!initial) setForm({ ...empty, type: form.type, date: form.date });
  }

  const options = [...new Set([...categories, ...SUGGESTED_CATEGORIES])].sort();

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>{initial ? 'Editar lançamento' : 'Novo lançamento'}</h2>

      <div className="type-toggle">
        <button
          type="button"
          className={form.type === 'entrada' ? 'toggle active entrada' : 'toggle'}
          onClick={() => setForm((f) => ({ ...f, type: 'entrada' }))}
        >
          Entrada
        </button>
        <button
          type="button"
          className={form.type === 'saida' ? 'toggle active saida' : 'toggle'}
          onClick={() => setForm((f) => ({ ...f, type: 'saida' }))}
        >
          Saída
        </button>
      </div>

      <div className="field-row">
        <label className="field">
          <span>Valor (R$)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="0,00"
            value={form.amount}
            onChange={set('amount')}
            autoFocus
          />
        </label>
        <label className="field">
          <span>Data</span>
          <input type="date" value={form.date} onChange={set('date')} required />
        </label>
      </div>

      <label className="field">
        <span>Descrição</span>
        <input
          type="text"
          placeholder="Ex: Pagamento cliente X"
          value={form.description}
          onChange={set('description')}
        />
      </label>

      <label className="field">
        <span>Categoria</span>
        <input
          type="text"
          list="categories"
          placeholder="Ex: Vendas"
          value={form.category}
          onChange={set('category')}
        />
        <datalist id="categories">
          {options.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </label>

      {error && <p className="error">{error}</p>}

      <div className="form-actions">
        <button type="submit" className="btn primary">
          {initial ? 'Salvar' : 'Adicionar'}
        </button>
        {initial && (
          <button type="button" className="btn ghost" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
