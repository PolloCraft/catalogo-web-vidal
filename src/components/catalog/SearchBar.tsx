import { Search, SlidersHorizontal, X } from 'lucide-react'
import type { SortOption } from '../../types'

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'destacados', label: 'Destacados' },
  { value: 'menor-precio', label: 'Menor precio' },
  { value: 'mayor-precio', label: 'Mayor precio' },
  { value: 'az', label: 'A - Z' },
]

interface SearchBarProps {
  busqueda: string
  orden: SortOption
  onBusquedaChange: (value: string) => void
  onOrdenChange: (value: SortOption) => void
  onToggleFilters: () => void
}

export default function SearchBar({
  busqueda,
  orden,
  onBusquedaChange,
  onOrdenChange,
  onToggleFilters,
}: SearchBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
        <input
          type="text"
          placeholder="Buscar por nombre, SKU o marca..."
          value={busqueda}
          onChange={(e) => onBusquedaChange(e.target.value)}
          className="w-full pl-12 pr-10 py-3.5 rounded-xl border border-[var(--color-border)] bg-white shadow-sm text-[var(--color-text)] text-[15px] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10 transition-all"
        />
        {busqueda && (
          <button
            onClick={() => onBusquedaChange('')}
            aria-label="Limpiar búsqueda"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-navy)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex gap-3">
        <select
          value={orden}
          onChange={(e) => onOrdenChange(e.target.value as SortOption)}
          className="px-5 py-3.5 rounded-xl border border-[var(--color-border)] bg-white shadow-sm text-[var(--color-text)] text-[14px] font-semibold focus:outline-none focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10 transition-colors cursor-pointer"
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value} className="bg-white">{opt.label}</option>
          ))}
        </select>

        <button
          onClick={onToggleFilters}
          className="md:hidden flex items-center gap-2 px-5 py-3.5 rounded-xl border border-[var(--color-border)] bg-white shadow-sm text-[var(--color-navy)] text-[14px] font-bold hover:bg-gray-50 transition-colors"
        >
          <SlidersHorizontal className="w-4.5 h-4.5" />
          Filtros
        </button>
      </div>
    </div>
  )
}
