import type { RefObject } from 'react'
import { Search } from 'lucide-react'
import { formatPrecio } from '../../utils/images'
import type { Product } from '../../types'

interface SearchBarProps {
  busqueda: string
  setBusqueda: (v: string) => void
  sugerencias: Product[]
  showSugerencias: boolean
  setShowSugerencias: (v: boolean) => void
  searchRef: RefObject<HTMLDivElement | null>
  onSearch: (e: React.FormEvent) => void
  onSelectProduct: (id: string) => void
}

export default function SearchBar({
  busqueda,
  setBusqueda,
  sugerencias,
  showSugerencias,
  setShowSugerencias,
  searchRef,
  onSearch,
  onSelectProduct,
}: SearchBarProps) {
  return (
    <>
      {/* Desktop search */}
      <div ref={searchRef} className="flex-1 max-w-[520px] ml-auto hidden sm:flex relative">
        <form onSubmit={onSearch} className="w-full" role="search" aria-label="Buscar productos">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Buscar herramientas, focos, cables..."
              value={busqueda}
              onChange={(e) => { setBusqueda(e.target.value); setShowSugerencias(true) }}
              onFocus={() => sugerencias.length > 0 && setShowSugerencias(true)}
              className="w-full pl-10 pr-4 h-9 rounded-full bg-white/10 border border-white/15 text-white text-sm placeholder:text-white/40 focus:outline-none focus:bg-white/15 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all"
            />
          </div>
        </form>
        {showSugerencias && sugerencias.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-[var(--color-border)] shadow-xl overflow-hidden z-50">
            {sugerencias.map(p => (
              <button
                key={p.id}
                onClick={() => onSelectProduct(p.id)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                  <img src={p.imagenes[0] || ''} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-[var(--color-navy)] truncate">{p.nombre}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">{p.marca} · {formatPrecio(p.precio)}</div>
                </div>
              </button>
            ))}
            <button
              onClick={onSearch}
              className="w-full text-center py-2.5 text-sm font-bold text-[var(--color-primary)] border-t border-[var(--color-border)] hover:bg-gray-50 transition-colors"
            >
              Ver todos los resultados
            </button>
          </div>
        )}
      </div>

      {/* Mobile search */}
      <form onSubmit={onSearch} className="sm:hidden pb-3" role="search" aria-label="Buscar productos">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-10 pr-4 h-9 rounded-full bg-white/10 border border-white/15 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-[var(--color-accent)]"
          />
        </div>
      </form>
    </>
  )
}
