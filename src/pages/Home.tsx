import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getCategories, getFeaturedProducts, getBrands } from '../services/productService'
import Skeleton from '../components/Skeleton'
import type { Category, Product } from '../types'

const BANNER_IMAGES = [
  { id: 1, color: '#1D3557', texto: 'Ferretería Profesional', subtitulo: 'Herramientas de calidad para cada proyecto' },
  { id: 2, color: '#D62828', texto: 'Iluminación LED', subtitulo: 'Ahorra hasta 80% en energía' },
  { id: 3, color: '#F4A300', texto: 'Artículos Eléctricos', subtitulo: 'Todo para tu instalación eléctrica' },
]

export default function Home() {
  const [bannerActual, setBannerActual] = useState(0)
  const [categorias, setCategorias] = useState<Category[]>([])
  const [destacados, setDestacados] = useState<Product[]>([])
  const [marcas, setMarcas] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const cargarDatos = async () => {
      const [cats, dest, marks] = await Promise.all([
        getCategories(),
        getFeaturedProducts(),
        getBrands(),
      ])
      setCategorias(cats)
      setDestacados(dest)
      setMarcas(marks)
      setLoading(false)
    }
    cargarDatos()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerActual(prev => (prev + 1) % BANNER_IMAGES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const anterior = () => setBannerActual(prev => (prev - 1 + BANNER_IMAGES.length) % BANNER_IMAGES.length)
  const siguiente = () => setBannerActual(prev => (prev + 1) % BANNER_IMAGES.length)

  const formatPrecio = (precio: number) =>
    new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(precio)

  return (
    <div>
      {/* Banner */}
      <section className="relative h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden">
        {BANNER_IMAGES.map((banner, i) => (
          <div
            key={banner.id}
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
            style={{
              backgroundColor: banner.color,
              opacity: i === bannerActual ? 1 : 0,
            }}
          >
            <div className="text-center text-white px-4">
              <h2 className="text-[var(--text-2xl)] sm:text-[var(--text-3xl)] font-[var(--font-heading)] font-bold mb-2">
                {banner.texto}
              </h2>
              <p className="text-lg opacity-90">{banner.subtitulo}</p>
            </div>
          </div>
        ))}
        <button
          onClick={anterior}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={siguiente}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {BANNER_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setBannerActual(i)}
              className={`w-3 h-3 rounded-full transition-colors ${
                i === bannerActual ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Categorías */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-[var(--text-xl)] sm:text-[var(--text-2xl)] font-[var(--font-heading)] font-bold text-[var(--color-secondary)] mb-8 text-center">
          Nuestras Categorías
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-[var(--color-surface)] rounded-[var(--radius-sm)] p-4 text-center border border-[var(--color-border)]">
                  <Skeleton className="w-16 h-16 mx-auto mb-3 rounded-full" />
                  <Skeleton className="h-4 w-20 mx-auto" />
                </div>
              ))
            : categorias.map(cat => (
                <Link
                  key={cat.id}
                  to={`/catalogo?categoria=${cat.id}`}
                  className="group bg-[var(--color-surface)] rounded-[var(--radius-sm)] p-4 text-center hover:shadow-[var(--shadow-md)] transition-shadow border border-[var(--color-border)]"
                >
                  <div className="w-16 h-16 mx-auto mb-3 bg-[var(--color-bg)] rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {cat.id === 'ferreteria' && '🔧'}
                    {cat.id === 'iluminacion' && '💡'}
                    {cat.id === 'electricos' && '⚡'}
                    {cat.id === 'adhesivos' && '🧴'}
                    {cat.id === 'seguridad' && '🦺'}
                    {cat.id === 'campana-escolar' && '📚'}
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--color-text)]">{cat.nombre}</h3>
                </Link>
              ))}
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="bg-[var(--color-bg)] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-[var(--text-xl)] sm:text-[var(--text-2xl)] font-[var(--font-heading)] font-bold text-[var(--color-secondary)] mb-8 text-center">
            Productos Destacados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-[var(--color-surface)] rounded-[var(--radius-sm)] overflow-hidden border border-[var(--color-border)]">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-4 space-y-3">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                  </div>
                ))
              : destacados.map(producto => (
                  <Link
                    key={producto.id}
                    to={`/producto/${producto.id}`}
                    className="bg-[var(--color-surface)] rounded-[var(--radius-sm)] overflow-hidden border border-[var(--color-border)] hover:shadow-[var(--shadow-lg)] transition-shadow"
                  >
                    <div className="h-48 bg-[var(--color-bg)] flex items-center justify-center text-4xl">
                      📦
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-[var(--color-text-muted)] mb-1">{producto.marca} · {producto.sku}</p>
                      <h3 className="font-semibold text-[var(--color-text)] mb-2 line-clamp-2">{producto.nombre}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-[var(--color-primary)]">
                          {formatPrecio(producto.precio)}
                        </span>
                        {producto.precioAnterior && (
                          <span className="text-sm text-[var(--color-text-muted)] line-through">
                            {formatPrecio(producto.precioAnterior)}
                          </span>
                        )}
                      </div>
                      {producto.etiquetas.includes('oferta') && (
                        <span className="inline-block mt-2 bg-[var(--color-primary)] text-white text-xs px-2 py-1 rounded-[var(--radius-full)]">
                          Oferta
                        </span>
                      )}
                      {producto.etiquetas.includes('nuevo') && (
                        <span className="inline-block mt-2 bg-[var(--color-accent)] text-white text-xs px-2 py-1 rounded-[var(--radius-full)]">
                          Nuevo
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      </section>

      {/* Franja de Marcas */}
      <section className="py-12 border-t border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-[var(--text-xl)] sm:text-[var(--text-2xl)] font-[var(--font-heading)] font-bold text-[var(--color-secondary)] mb-8 text-center">
            Marcas que Distribuimos
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-4 items-center">
            {marcas.map(marca => (
              <div
                key={marca}
                className="flex items-center justify-center p-4 bg-[var(--color-surface)] rounded-[var(--radius-sm)] border border-[var(--color-border)] grayscale hover:grayscale-0 transition-all cursor-pointer"
              >
                <span className="text-sm font-semibold text-[var(--color-text-muted)]">{marca}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
