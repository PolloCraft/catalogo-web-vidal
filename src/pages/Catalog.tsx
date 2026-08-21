import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { getProducts, getBrands } from '../services/productService'
import { useDebounce } from '../hooks/useDebounce'
import ProductCard from '../components/ProductCard'
import SidebarFilters from '../components/SidebarFilters'
import { ProductCardSkeleton } from '../components/Skeleton'
import type { Product, Filters, SortOption } from '../types'

const ITEMS_PER_PAGE = 12

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'destacados', label: 'Destacados' },
  { value: 'menor-precio', label: 'Menor precio' },
  { value: 'mayor-precio', label: 'Mayor precio' },
  { value: 'az', label: 'A - Z' },
]

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [productos, setProductos] = useState<Product[]>([])
  const [marcas, setMarcas] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [busqueda, setBusqueda] = useState(searchParams.get('q') || '')
  const [orden, setOrden] = useState<SortOption>((searchParams.get('orden') as SortOption) || 'destacados')
  const [pagina, setPagina] = useState(Number(searchParams.get('page')) || 1)
  const [filtros, setFiltros] = useState<Filters>({
    categorias: searchParams.get('categoria') ? [searchParams.get('categoria')!] : [],
    marcas: [],
    precioMin: 0,
    precioMax: 9999,
    disponible: false,
  })
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const busquedaDebounced = useDebounce(busqueda, 300)

  useEffect(() => {
    const cargarDatos = async () => {
      const [prods, marks] = await Promise.all([
        getProducts(),
        getBrands(),
      ])
      setProductos(prods)
      setMarcas(marks)
      setFiltros(prev => ({
        ...prev,
        precioMax: Math.max(...prods.map(p => p.precio)),
      }))
      setLoading(false)
    }
    cargarDatos()
  }, [])

  useEffect(() => {
    const params = new URLSearchParams()
    if (busquedaDebounced) params.set('q', busquedaDebounced)
    if (orden !== 'destacados') params.set('orden', orden)
    if (pagina > 1) params.set('page', String(pagina))
    if (filtros.categorias.length === 1) params.set('categoria', filtros.categorias[0])
    setSearchParams(params, { replace: true })
  }, [busquedaDebounced, orden, pagina, filtros.categorias, setSearchParams])

  const productosFiltrados = useMemo(() => {
    let result = [...productos]

    if (busquedaDebounced) {
      const q = busquedaDebounced.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      result = result.filter(p =>
        p.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.marca.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(q)
      )
    }

    if (filtros.categorias.length > 0) {
      result = result.filter(p => filtros.categorias.includes(p.categoria))
    }

    if (filtros.marcas.length > 0) {
      result = result.filter(p => filtros.marcas.includes(p.marca))
    }

    if (filtros.precioMin > 0) {
      result = result.filter(p => p.precio >= filtros.precioMin)
    }

    if (filtros.precioMax < 9999) {
      result = result.filter(p => p.precio <= filtros.precioMax)
    }

    if (filtros.disponible) {
      result = result.filter(p => p.stock > 0)
    }

    switch (orden) {
      case 'menor-precio':
        result.sort((a, b) => a.precio - b.precio)
        break
      case 'mayor-precio':
        result.sort((a, b) => b.precio - a.precio)
        break
      case 'az':
        result.sort((a, b) => a.nombre.localeCompare(b.nombre))
        break
      case 'destacados':
        result.sort((a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0))
        break
    }

    return result
  }, [productos, busquedaDebounced, filtros, orden])

  const totalPaginas = Math.ceil(productosFiltrados.length / ITEMS_PER_PAGE)
  const productosPagina = productosFiltrados.slice(
    (pagina - 1) * ITEMS_PER_PAGE,
    pagina * ITEMS_PER_PAGE
  )

  const handleBusquedaChange = (value: string) => {
    setBusqueda(value)
    setPagina(1)
  }

  const handleOrdenChange = (value: SortOption) => {
    setOrden(value)
    setPagina(1)
  }

  const handleFiltrosChange = (newFiltros: Filters) => {
    setFiltros(newFiltros)
    setPagina(1)
  }

  const limpiarFiltros = () => {
    setFiltros({
      categorias: [],
      marcas: [],
      precioMin: 0,
      precioMax: Math.max(...productos.map(p => p.precio)),
      disponible: false,
    })
    setBusqueda('')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-[var(--text-2xl)] font-[var(--font-heading)] font-bold text-[var(--color-secondary)] mb-6">
        Catálogo de Productos
      </h1>

      {/* Barra de búsqueda y controles */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="Buscar por nombre, SKU o marca..."
            value={busqueda}
            onChange={(e) => handleBusquedaChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
          {busqueda && (
            <button
              onClick={() => setBusqueda('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex gap-3">
          <select
            value={orden}
            onChange={(e) => handleOrdenChange(e.target.value as SortOption)}
            className="px-4 py-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="md:hidden flex items-center gap-2 px-4 py-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] text-sm"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar filtros - desktop */}
        <div className="hidden md:block w-64 shrink-0">
          <SidebarFilters
            filters={filtros}
            marcas={marcas}
            precioMax={Math.max(...productos.map(p => p.precio))}
            onChange={handleFiltrosChange}
            onClear={limpiarFiltros}
          />
        </div>

        {/* Sidebar filtros - mobile */}
        {mobileFiltersOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setMobileFiltersOpen(false)}>
            <div className="absolute right-0 top-0 h-full w-80 bg-[var(--color-surface)] p-4 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Filtros</h3>
                <button onClick={() => setMobileFiltersOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <SidebarFilters
                filters={filtros}
                marcas={marcas}
                precioMax={Math.max(...productos.map(p => p.precio))}
                onChange={handleFiltrosChange}
                onClear={limpiarFiltros}
              />
            </div>
          </div>
        )}

        {/* Resultados */}
        <div className="flex-1">
          <p className="text-sm text-[var(--color-text-muted)] mb-4">
            {loading ? 'Cargando...' : `${productosFiltrados.length} productos encontrados`}
          </p>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : productosFiltrados.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[var(--color-text-muted)] text-lg mb-4">No se encontraron productos</p>
              <button
                onClick={limpiarFiltros}
                className="bg-[var(--color-primary)] text-white px-6 py-2 rounded-[var(--radius-full)] hover:bg-[var(--color-primary-dark)] transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {productosPagina.map(producto => (
                  <ProductCard key={producto.id} product={producto} />
                ))}
              </div>

              {/* Paginación */}
              {totalPaginas > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => setPagina(p => Math.max(1, p - 1))}
                    disabled={pagina === 1}
                    className="px-3 py-2 text-sm rounded-[var(--radius-sm)] border border-[var(--color-border)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--color-bg)] transition-colors"
                  >
                    Anterior
                  </button>
                  {Array.from({ length: totalPaginas }, (_, i) => i + 1)
                    .filter(p => p === 1 || p === totalPaginas || Math.abs(p - pagina) <= 2)
                    .map((p, idx, arr) => (
                      <span key={p} className="flex items-center">
                        {idx > 0 && arr[idx - 1] !== p - 1 && (
                          <span className="px-1 text-[var(--color-text-muted)]">...</span>
                        )}
                        <button
                          onClick={() => setPagina(p)}
                          className={`w-10 h-10 text-sm rounded-[var(--radius-sm)] transition-colors ${
                            p === pagina
                              ? 'bg-[var(--color-primary)] text-white'
                              : 'border border-[var(--color-border)] hover:bg-[var(--color-bg)]'
                          }`}
                        >
                          {p}
                        </button>
                      </span>
                    ))}
                  <button
                    onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))}
                    disabled={pagina === totalPaginas}
                    className="px-3 py-2 text-sm rounded-[var(--radius-sm)] border border-[var(--color-border)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--color-bg)] transition-colors"
                  >
                    Siguiente
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
