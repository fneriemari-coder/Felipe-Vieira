export default function Filters({ filters, categories, onChange, onClear }) {
  const set = (key) => (e) => onChange({ ...filters, [key]: e.target.value });
  const hasFilters = filters.type || filters.category || filters.from || filters.to;

  return (
    <div className="card filters">
      <label className="field">
        <span>Tipo</span>
        <select value={filters.type} onChange={set('type')}>
          <option value="">Todos</option>
          <option value="entrada">Entradas</option>
          <option value="saida">Saídas</option>
        </select>
      </label>

      <label className="field">
        <span>Categoria</span>
        <select value={filters.category} onChange={set('category')}>
          <option value="">Todas</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>De</span>
        <input type="date" value={filters.from} onChange={set('from')} />
      </label>

      <label className="field">
        <span>Até</span>
        <input type="date" value={filters.to} onChange={set('to')} />
      </label>

      {hasFilters && (
        <button type="button" className="btn ghost" onClick={onClear}>
          Limpar filtros
        </button>
      )}
    </div>
  );
}
