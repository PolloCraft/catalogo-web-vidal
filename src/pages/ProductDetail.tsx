import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, Package, Truck } from 'lucide-react'
import { getProductById, getProductsByCategory } from '../services/productService'
import { useCart } from '../context/CartContext'
import type { Product } from '../types'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const { addItem } = useCart()
  const [producto, setProducto] = useState<Product | null>(null)
  const [relacionados, setRelacionados] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [imagenActiva, setImagenActiva] = useState(0)

  useEffect(() => {
    const cargarProducto = async () => {
      if (!id) return
      setLoading(true)
      const prod = await getProductById(id)
      setProducto(prod || null)

      if (prod) {
        const mismasCategoria = await getProductsByCategory(prod.categoria)
        setRelacionados(
          mismasCategoria.filter(p => p.id !== prod.id).slice(0, 4)
        )
      }
      setLoading(false)
    }
    cargarProducto()
  }, [id])

  const formatPrecio = (precio: number) =>
    new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(precio)

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-6 bg-[var(--color-border)] rounded w-48 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-[var(--color-border)] rounded-[var(--radius-sm)]" />
            <div className="space-y-4">
              <div className="h-8 bg-[var(--color-border)] rounded w-3/4" />
              <div className="h-4 bg-[var(--color-border)] rounded w-1/2" />
              <div className="h-10 bg-[var(--color-border)] rounded w-1/3" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!producto) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <Package className="w-16 h-16 mx-auto text-[var(--color-text-muted)] mb-4" />
        <h1 className="text-[var(--text-2xl)] font-[var(--font-heading)] font-bold text-[var(--color-secondary)] mb-2">
          Producto no encontrado
        </h1>
        <p className="text-[var(--color-text-muted)] mb-6">
          El producto que buscas no existe o fue removido.
        </p>
        <Link
          to="/catalogo"
          className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-3 rounded-[var(--radius-full)] hover:bg-[var(--color-primary-dark)] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Volver al catálogo
        </Link>
      </div>
    )
  }

  const descuento = producto.precioAnterior
    ? Math.round((1 - producto.precio / producto.precioAnterior) * 100)
    : null

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-6">
        <Link to="/" className="hover:text-[var(--color-primary)]">Inicio</Link>
        <span>/</span>
        <Link to="/catalogo" className="hover:text-[var(--color-primary)]">Catálogo</Link>
        <span>/</span>
        <Link to={`/catalogo?categoria=${producto.categoria}`} className="hover:text-[var(--color-primary)] capitalize">
          {producto.categoria.replace('-', ' ')}
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text)] truncate">{producto.nombre}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Galería de imágenes */}
        <div>
          <div className="bg-[var(--color-surface)] rounded-[var(--radius-sm)] border border-[var(--color-border)] p-8 flex items-center justify-center h-96 mb-4">
            {producto.imagenes.length > 0 ? (
              <span className="text-8xl">📦</span>
            ) : (
              <div className="text-center">
                <Package className="w-16 h-16 mx-auto text-[var(--color-text-muted)] mb-2" />
                <p className="text-sm text-[var(--color-text-muted)]">Sin imagen</p>
              </div>
            )}
          </div>
          {producto.imagenes.length > 1 && (
            <div className="flex gap-2">
              {producto.imagenes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImagenActiva(i)}
                  className={`w-16 h-16 rounded-[var(--radius-sm)] border-2 flex items-center justify-center transition-colors ${
                    i === imagenActiva
                      ? 'border-[var(--color-primary)]'
                      : 'border-[var(--color-border)] hover:border-[var(--color-text-muted)]'
                  }`}
                >
                  <span className="text-xl">📦</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div>
          <p className="text-sm text-[var(--color-text-muted)] mb-2">
            {producto.marca} · {producto.sku}
          </p>
          <h1 className="text-[var(--text-2xl)] font-[var(--font-heading)] font-bold text-[var(--color-text)] mb-4">
            {producto.nombre}
          </h1>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {descuento && (
              <span className="bg-[var(--color-primary)] text-white text-sm font-bold px-3 py-1 rounded-[var(--radius-full)]">
                -{descuento}% OFF
              </span>
            )}
            {producto.etiquetas.includes('nuevo') && (
              <span className="bg-[var(--color-accent)] text-white text-sm font-bold px-3 py-1 rounded-[var(--radius-full)]">
                Nuevo
              </span>
            )}
            {producto.etiquetas.includes('mas vendido') && (
              <span className="bg-[var(--color-secondary)] text-white text-sm font-bold px-3 py-1 rounded-[var(--radius-full)]">
                Más vendido
              </span>
            )}
          </div>

          {/* Precios */}
          <div className="bg-[var(--color-bg)] rounded-[var(--radius-sm)] p-4 mb-6">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-[var(--text-2xl)] font-bold text-[var(--color-primary)]">
                {formatPrecio(producto.precio)}
              </span>
              {producto.precioAnterior && (
                <span className="text-lg text-[var(--color-text-muted)] line-through">
                  {formatPrecio(producto.precioAnterior)}
                </span>
              )}
            </div>
            {producto.precioMayorista && (
              <p className="text-sm text-[var(--color-text-muted)]">
                Precio mayorista:{' '}
                <span className="font-semibold text-[var(--color-secondary)]">
                  {formatPrecio(producto.precioMayorista)}
                </span>
              </p>
            )}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2 mb-6">
            <Truck className="w-5 h-5" />
            <span className={`text-sm font-medium ${producto.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
              {producto.stock > 0
                ? `En stock (${producto.stock} unidades disponibles)`
                : 'Agotado'}
            </span>
          </div>

          {/* Descripción */}
          <div className="mb-6">
            <h2 className="font-[var(--font-heading)] font-semibold text-[var(--color-secondary)] mb-2">
              Descripción
            </h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              {producto.descripcion}
            </p>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3 mb-4">
            <button
              onClick={() => addItem(producto)}
              disabled={producto.stock === 0}
              className="flex-1 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] disabled:opacity-50 disabled:cursor-not-allowed text-white text-center py-3 rounded-[var(--radius-full)] font-semibold transition-colors"
            >
              Agregar a cotización
            </button>
          </div>
          <a
            href={`https://wa.me/51936608583?text=Hola,%20quiero%20cotizar%20el%20producto:%20${encodeURIComponent(producto.nombre)}%20(SKU:%20${producto.sku})`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[var(--color-whatsapp)] text-white text-center py-3 rounded-[var(--radius-full)] font-semibold hover:opacity-90 transition-opacity"
          >
            Cotizar por WhatsApp
          </a>
        </div>
      </div>

      {/* Especificaciones */}
      {Object.keys(producto.especificaciones).length > 0 && (
        <section className="mb-12">
          <h2 className="text-[var(--text-xl)] font-[var(--font-heading)] font-bold text-[var(--color-secondary)] mb-4">
            Especificaciones
          </h2>
          <div className="bg-[var(--color-surface)] rounded-[var(--radius-sm)] border border-[var(--color-border)] overflow-hidden">
            <table className="w-full">
              <tbody>
                {Object.entries(producto.especificaciones).map(([key, value], i) => (
                  <tr key={key} className={i % 2 === 0 ? 'bg-[var(--color-bg)]' : 'bg-[var(--color-surface)]'}>
                    <td className="px-4 py-3 text-sm font-medium text-[var(--color-text)] w-1/3">
                      {key}
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--color-text-muted)]">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Productos relacionados */}
      {relacionados.length > 0 && (
        <section>
          <h2 className="text-[var(--text-xl)] font-[var(--font-heading)] font-bold text-[var(--color-secondary)] mb-6">
            Productos Relacionados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relacionados.map(prod => (
              <Link
                key={prod.id}
                to={`/producto/${prod.id}`}
                className="bg-[var(--color-surface)] rounded-[var(--radius-sm)] overflow-hidden border border-[var(--color-border)] hover:shadow-[var(--shadow-lg)] transition-shadow"
              >
                <div className="h-40 bg-[var(--color-bg)] flex items-center justify-center text-4xl">
                  📦
                </div>
                <div className="p-4">
                  <p className="text-xs text-[var(--color-text-muted)] mb-1">{prod.marca}</p>
                  <h3 className="font-semibold text-sm text-[var(--color-text)] mb-2 line-clamp-2 min-h-[40px]">
                    {prod.nombre}
                  </h3>
                  <span className="text-lg font-bold text-[var(--color-primary)]">
                    {formatPrecio(prod.precio)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
