import { formatCents } from '../format.js';

export default function SummaryCards({ summary }) {
  const { totalEntrada = 0, totalSaida = 0, saldo = 0, count = 0 } = summary || {};
  return (
    <div className="summary">
      <div className="card stat entrada">
        <span className="stat-label">Entradas</span>
        <span className="stat-value">{formatCents(totalEntrada)}</span>
      </div>
      <div className="card stat saida">
        <span className="stat-label">Saídas</span>
        <span className="stat-value">{formatCents(totalSaida)}</span>
      </div>
      <div className={`card stat saldo ${saldo < 0 ? 'negative' : 'positive'}`}>
        <span className="stat-label">Saldo</span>
        <span className="stat-value">{formatCents(saldo)}</span>
      </div>
      <div className="card stat">
        <span className="stat-label">Lançamentos</span>
        <span className="stat-value">{count}</span>
      </div>
    </div>
  );
}
