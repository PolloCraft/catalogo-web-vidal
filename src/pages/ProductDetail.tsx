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
          <div className="bg-white rounded-xl border border-[var(--color-border)] p-8 flex items-center justify-center h-96 mb-4">
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
                  className={`w-16 h-16 rounded-lg border-2 flex items-center justify-center transition-colors ${
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
          <p className="text-sm text-[var(--color-text-muted)] mb-2 uppercase tracking-wide">
            {producto.marca} · {producto.sku}
          </p>
          <h1 className="text-[var(--text-2xl)] font-[var(--font-heading)] font-bold text-[var(--color-navy)] mb-4">
            {producto.nombre}
          </h1>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {descuento && (
              <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-lg">
                -{descuento}% OFF
              </span>
            )}
            {producto.etiquetas.includes('nuevo') && (
              <span className="bg-[var(--color-accent)] text-white text-sm font-bold px-3 py-1 rounded-lg">
                Nuevo
              </span>
            )}
            {producto.etiquetas.includes('mas vendido') && (
              <span className="bg-[var(--color-primary)] text-white text-sm font-bold px-3 py-1 rounded-lg">
                Mas vendido
              </span>
            )}
          </div>

          {/* Precios */}
          <div className="bg-[var(--color-bg-alt)] rounded-xl p-4 mb-6">
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
            <h2 className="font-[var(--font-heading)] font-semibold text-[var(--color-navy)] mb-2">
              Descripcion
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
              className="flex-1 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] disabled:opacity-50 disabled:cursor-not-allowed text-white text-center py-3 rounded-lg font-semibold transition-colors"
            >
              Agregar a cotizacion
            </button>
          </div>
          <a
            href={`https://wa.me/51936608583?text=Hola,%20quiero%20cotizar%20el%20producto:%20${encodeURIComponent(producto.nombre)}%20(SKU:%20${producto.sku})`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[var(--color-whatsapp)] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#20bd5a] transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Cotizar por WhatsApp
          </a>
        </div>
      </div>

      {/* Especificaciones */}
      {Object.keys(producto.especificaciones).length > 0 && (
        <section className="mb-12">
          <h2 className="text-[var(--text-xl)] font-[var(--font-heading)] font-bold text-[var(--color-navy)] mb-4">
            Especificaciones
          </h2>
          <div className="bg-white rounded-xl border border-[var(--color-border)] overflow-hidden">
            <table className="w-full">
              <tbody>
                {Object.entries(producto.especificaciones).map(([key, value], i) => (
                  <tr key={key} className={i % 2 === 0 ? 'bg-[var(--color-bg)]' : 'bg-white'}>
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
          <h2 className="text-[var(--text-xl)] font-[var(--font-heading)] font-bold text-[var(--color-navy)] mb-6">
            Productos Relacionados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relacionados.map(prod => (
              <Link
                key={prod.id}
                to={`/producto/${prod.id}`}
                className="group bg-white rounded-xl overflow-hidden border border-[var(--color-border)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-40 bg-gradient-to-br from-[var(--color-bg)] to-[var(--color-bg-alt)] flex items-center justify-center text-4xl">
                  📦
                </div>
                <div className="p-4">
                  <p className="text-xs text-[var(--color-text-muted)] mb-1 uppercase tracking-wide">{prod.marca}</p>
                  <h3 className="font-semibold text-sm text-[var(--color-text)] mb-2 line-clamp-2 min-h-[40px] group-hover:text-[var(--color-primary)] transition-colors">
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
