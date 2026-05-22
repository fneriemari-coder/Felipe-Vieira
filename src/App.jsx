import { useCallback, useEffect, useState } from 'react';
import { api } from './api.js';
import SummaryCards from './components/SummaryCards.jsx';
import Filters from './components/Filters.jsx';
import TransactionForm from './components/TransactionForm.jsx';
import TransactionList from './components/TransactionList.jsx';

const emptyFilters = { type: '', category: '', from: '', to: '' };

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState(emptyFilters);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setError('');
      const [tx, sum, cats] = await Promise.all([
        api.listTransactions(filters),
        api.getSummary(filters),
        api.listCategories(),
      ]);
      setTransactions(tx);
      setSummary(sum);
      setCategories(cats);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleCreate(body) {
    try {
      await api.createTransaction(body);
      await load();
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleUpdate(body) {
    try {
      await api.updateTransaction(editing.id, body);
      setEditing(null);
      await load();
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleDelete(t) {
    if (!confirm(`Excluir o lançamento "${t.description || t.category}"?`)) return;
    try {
      await api.deleteTransaction(t.id);
      await load();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="app">
      <header className="topbar">
        <h1>Gestão Financeira</h1>
        <p className="muted">Fluxo de caixa e lançamentos da empresa</p>
      </header>

      <main className="layout">
        <section className="sidebar">
          <TransactionForm
            initial={editing}
            categories={categories}
            onSubmit={editing ? handleUpdate : handleCreate}
            onCancel={() => setEditing(null)}
          />
        </section>

        <section className="content">
          <SummaryCards summary={summary} />
          <Filters
            filters={filters}
            categories={categories}
            onChange={setFilters}
            onClear={() => setFilters(emptyFilters)}
          />
          {error && <p className="error banner">{error}</p>}
          {loading ? (
            <div className="card empty">Carregando…</div>
          ) : (
            <TransactionList
              transactions={transactions}
              onEdit={setEditing}
              onDelete={handleDelete}
            />
          )}
        </section>
      </main>
    </div>
  );
}
