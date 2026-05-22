import { formatCents, formatDate } from '../format.js';

export default function TransactionList({ transactions, onEdit, onDelete }) {
  if (!transactions.length) {
    return (
      <div className="card empty">
        <p>Nenhum lançamento encontrado.</p>
        <p className="muted">Adicione uma entrada ou saída para começar.</p>
      </div>
    );
  }

  return (
    <div className="card list">
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th className="num">Valor</th>
            <th aria-label="Ações" />
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{formatDate(t.date)}</td>
              <td>{t.description || <span className="muted">—</span>}</td>
              <td>
                <span className="tag">{t.category}</span>
              </td>
              <td className={`num ${t.type}`}>
                {t.type === 'saida' ? '- ' : '+ '}
                {formatCents(t.amount)}
              </td>
              <td className="actions">
                <button className="icon-btn" title="Editar" onClick={() => onEdit(t)}>
                  Editar
                </button>
                <button
                  className="icon-btn danger"
                  title="Excluir"
                  onClick={() => onDelete(t)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
