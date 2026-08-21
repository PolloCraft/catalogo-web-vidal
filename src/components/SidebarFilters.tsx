import type { Filters } from '../types'

interface Props {
  filters: Filters
  marcas: string[]
  precioMax: number
  onChange: (filters: Filters) => void
  onClear: () => void
}

export default function SidebarFilters({ filters, marcas, precioMax, onChange, onClear }: Props) {
  const toggleCategoria = (catId: string) => {
    const updated = filters.categorias.includes(catId)
      ? filters.categorias.filter(c => c !== catId)
      : [...filters.categorias, catId]
    onChange({ ...filters, categorias: updated })
  }

  const toggleMarca = (marca: string) => {
    const updated = filters.marcas.includes(marca)
      ? filters.marcas.filter(m => m !== marca)
      : [...filters.marcas, marca]
    onChange({ ...filters, marcas: updated })
  }

  const handlePrecioMin = (value: string) => {
    onChange({ ...filters, precioMin: Number(value) || 0 })
  }

  const handlePrecioMax = (value: string) => {
    onChange({ ...filters, precioMax: Number(value) || precioMax })
  }

  const handleDisponibilidad = () => {
    onChange({ ...filters, disponible: !filters.disponible })
  }

  const hasActiveFilters =
    filters.categorias.length > 0 ||
    filters.marcas.length > 0 ||
    filters.precioMin > 0 ||
    filters.precioMax < precioMax ||
    filters.disponible

  return (
    <aside className="bg-[var(--color-surface)] rounded-[var(--radius-sm)] border border-[var(--color-border)] p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-[var(--font-heading)] font-semibold text-[var(--color-secondary)]">Filtros</h3>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="text-xs text-[var(--color-primary)] hover:underline"
          >
            Limpiar todo
          </button>
        )}
      </div>

      {/* Categorías */}
      <div>
        <h4 className="text-sm font-semibold text-[var(--color-text)] mb-2">Categoría</h4>
        <div className="space-y-1">
          {['ferreteria', 'iluminacion', 'electricos', 'adhesivos', 'seguridad', 'campana-escolar'].map(cat => (
            <label key={cat} className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] cursor-pointer hover:text-[var(--color-text)]">
              <input
                type="checkbox"
                checked={filters.categorias.includes(cat)}
                onChange={() => toggleCategoria(cat)}
                className="w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              />
              <span className="capitalize">{cat.replace('-', ' ')}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Marcas */}
      <div>
        <h4 className="text-sm font-semibold text-[var(--color-text)] mb-2">Marca</h4>
        <div className="space-y-1 max-h-40 overflow-y-auto">
          {marcas.map(marca => (
            <label key={marca} className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] cursor-pointer hover:text-[var(--color-text)]">
              <input
                type="checkbox"
                checked={filters.marcas.includes(marca)}
                onChange={() => toggleMarca(marca)}
                className="w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              />
              <span>{marca}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Precio */}
      <div>
        <h4 className="text-sm font-semibold text-[var(--color-text)] mb-2">Rango de precio</h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            value={filters.precioMin}
            onChange={(e) => handlePrecioMin(e.target.value)}
            className="w-full px-3 py-1.5 text-sm border border-[var(--color-border)] rounded-[var(--radius-sm)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            placeholder="Min"
          />
          <span className="text-[var(--color-text-muted)]">-</span>
          <input
            type="number"
            min={0}
            value={filters.precioMax}
            onChange={(e) => handlePrecioMax(e.target.value)}
            className="w-full px-3 py-1.5 text-sm border border-[var(--color-border)] rounded-[var(--radius-sm)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            placeholder="Max"
          />
        </div>
      </div>

      {/* Disponibilidad */}
      <div>
        <label className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] cursor-pointer hover:text-[var(--color-text)]">
          <input
            type="checkbox"
            checked={filters.disponible}
            onChange={handleDisponibilidad}
            className="w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
          />
          <span>Solo disponibles</span>
        </label>
      </div>
    </aside>
  )
}
