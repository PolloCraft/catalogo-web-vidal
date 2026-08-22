import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, AlertTriangle, RefreshCw, Package, ShoppingCart, Minus, Plus } from 'lucide-react'
import { getProductById, getProductsByCategory } from '../services/productService'
import type { ServiceError } from '../services/productService'
import { useCart } from '../context/CartContext'
import { getProductImage, formatPrecio } from '../utils/images'
import { whatsappCotizarProducto } from '../utils/whatsapp'
import ImageGallery from '../components/product/ImageGallery'
import RelatedProducts from '../components/product/RelatedProducts'
import type { Product } from '../types'

const TIPOS_VENTA = ['UNIDAD', 'DOCENA']

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const { addItem } = useCart()
  const [producto, setProducto] = useState<Product | null>(null)
  const [relacionados, setRelacionados] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [imagenActiva, setImagenActiva] = useState(0)
  const [tipoVenta, setTipoVenta] = useState('UNIDAD')
  const [cantidad, setCantidad] = useState(1)

  useEffect(() => {
    const cargarProducto = async () => {
      if (!id) return
      setLoading(true)
      setError(null)
      try {
        const prod = await getProductById(id)
        setProducto(prod || null)
        if (prod) {
          const mismasCategoria = await getProductsByCategory(prod.categoria)
          setRelacionados(mismasCategoria.filter(p => p.id !== prod.id).slice(0, 4))
        }
      } catch (err) {
        const serviceErr = err as ServiceError
        setError(serviceErr.message || 'Ocurrió un error inesperado')
      } finally {
        setLoading(false)
      }
    }
    cargarProducto()
  }, [id])

  if (loading) {
    return (
      <div className="bg-[var(--color-bg)] min-h-screen">
        <div className="max-w-[1280px] mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-5 bg-[var(--color-border)] rounded w-48 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="h-[420px] bg-white rounded-2xl border border-[var(--color-border)]" />
              <div className="space-y-4">
                <div className="h-4 bg-[var(--color-border)] rounded w-1/3" />
                <div className="h-8 bg-[var(--color-border)] rounded w-3/4" />
                <div className="h-4 bg-[var(--color-border)] rounded w-1/2" />
                <div className="h-16 bg-[var(--color-border)] rounded w-full mt-6" />
                <div className="h-12 bg-[var(--color-border)] rounded w-full mt-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-[var(--color-bg)] min-h-screen">
        <div className="max-w-[1280px] mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--color-navy)] mb-2">Error al cargar producto</h1>
          <p className="text-[var(--color-text-secondary)] mb-8">{error}</p>
          <div className="flex items-center justify-center gap-3">
            <button onClick={() => window.location.reload()} className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-8 py-3 rounded-full hover:bg-[var(--color-primary-dark)] font-bold shadow-md transition-all active:scale-[0.98]">
              <RefreshCw className="w-4 h-4" /> Reintentar
            </button>
            <Link to="/catalogo" className="inline-flex items-center gap-2 bg-white text-[var(--color-navy)] border border-[var(--color-border)] px-8 py-3 rounded-full hover:bg-gray-50 font-bold shadow-sm transition-all">
              <ChevronLeft className="w-4 h-4" /> Volver al catálogo
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!producto) {
    return (
      <div className="bg-[var(--color-bg)] min-h-screen">
        <div className="max-w-[1280px] mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-white border border-[var(--color-border)] flex items-center justify-center mx-auto mb-5">
            <Package className="w-10 h-10 text-[var(--color-metallic)]" />
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--color-navy)] mb-2">Producto no encontrado</h1>
          <p className="text-[var(--color-text-secondary)] mb-8">El producto que buscas no existe o fue removido.</p>
          <Link to="/catalogo" className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-8 py-3 rounded-full hover:bg-[var(--color-primary-dark)] font-bold shadow-md transition-all active:scale-[0.98]">
            <ChevronLeft className="w-4 h-4" /> Volver al catálogo
          </Link>
        </div>
      </div>
    )
  }

  const descuento = producto.precioAnterior
    ? Math.round((1 - producto.precio / producto.precioAnterior) * 100)
    : null

  const imageSrc = getProductImage(producto)

  const handleAddToCart = () => {
    for (let i = 0; i < cantidad; i++) {
      addItem(producto)
    }
  }

  const whatsappUrl = whatsappCotizarProducto(producto.nombre, producto.sku, tipoVenta, cantidad)

  return (
    <div className="bg-[var(--color-bg)] min-h-screen">
      <div className="bg-white border-b border-[var(--color-border)]">
        <div className="max-w-[1280px] mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] flex-wrap">
            <Link to="/catalogo" className="hover:text-[var(--color-primary)] transition-colors font-medium">Catálogo</Link>
            <span className="text-[var(--color-border-strong)]">/</span>
            <Link to={`/catalogo?categoria=${producto.categoria}`} className="hover:text-[var(--color-primary)] capitalize transition-colors font-medium">
              {producto.categoria.replace('-', ' ')}
            </Link>
            <span className="text-[var(--color-border-strong)]">/</span>
            <span className="text-[var(--color-text)] font-semibold truncate max-w-[200px]">{producto.nombre}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          <ImageGallery
            images={[imageSrc, ...producto.imagenes.slice(1)]}
            activeIndex={imagenActiva}
            onIndexChange={setImagenActiva}
            discount={descuento}
            productName={producto.nombre}
          />

          <div>
            <p className="text-[11px] font-extrabold tracking-[0.16em] uppercase text-[var(--color-metallic)] mb-2">
              {producto.marca} · {producto.sku}
            </p>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-[var(--color-navy)] mb-4 tracking-tight leading-tight">
              {producto.nombre}
            </h1>

            <div className="flex flex-wrap gap-2 mb-5">
              {producto.etiquetas.includes('nuevo') && (
                <span className="bg-[var(--color-accent)] text-white text-xs font-extrabold px-3 py-1.5 rounded-full">NUEVO</span>
              )}
              {producto.etiquetas.includes('mas vendido') && (
                <span className="bg-[var(--color-primary)] text-white text-xs font-extrabold px-3 py-1.5 rounded-full">MÁS VENDIDO</span>
              )}
              {producto.stock > 0 ? (
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1.5 rounded-full">En stock ({producto.stock} uds)</span>
              ) : (
                <span className="bg-red-50 text-red-600 border border-red-200 text-xs font-bold px-3 py-1.5 rounded-full">Agotado</span>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 mb-6 shadow-sm">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-extrabold text-[var(--color-primary)]">{formatPrecio(producto.precio)}</span>
                {producto.precioAnterior && (
                  <span className="text-lg text-[var(--color-text-muted)] line-through">{formatPrecio(producto.precioAnterior)}</span>
                )}
              </div>
              {producto.precioMayorista && (
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Precio mayorista: <span className="font-bold text-[var(--color-accent)]">{formatPrecio(producto.precioMayorista)}</span>
                </p>
              )}
            </div>

            <div className="mb-6">
              <h2 className="font-extrabold text-[var(--color-navy)] mb-2 text-[15px]">Descripción</h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed text-[15px]">{producto.descripcion}</p>
            </div>

            {/* Tipo de venta */}
            <div className="mb-6">
              <label className="block text-[13px] font-bold text-[var(--color-navy)] mb-2 uppercase tracking-wide">Tipo de venta</label>
              <select
                value={tipoVenta}
                onChange={(e) => setTipoVenta(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-white border border-[var(--color-border)] rounded-xl text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all"
              >
                {TIPOS_VENTA.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>

            {/* Cantidad + botones */}
            <div className="mb-6">
              <label className="block text-[13px] font-bold text-[var(--color-navy)] mb-2 uppercase tracking-wide">Cantidad</label>
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={() => setCantidad(q => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-full border border-[var(--color-border)] bg-white hover:bg-gray-50 flex items-center justify-center transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-lg font-bold text-[var(--color-navy)]">{cantidad}</span>
                <button
                  onClick={() => setCantidad(q => Math.min(producto.stock, q + 1))}
                  className="w-10 h-10 rounded-full border border-[var(--color-border)] bg-white hover:bg-gray-50 flex items-center justify-center transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={producto.stock === 0}
                  className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] disabled:opacity-50 disabled:cursor-not-allowed text-white flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold shadow-md transition-all active:scale-[0.98]"
                >
                  <ShoppingCart className="w-5 h-5" /> Añadir al carrito
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[var(--color-whatsapp)] hover:opacity-90 text-white py-3.5 rounded-xl font-bold shadow-md transition-all active:scale-[0.98]"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Cotizar por WhatsApp
                </a>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="font-extrabold text-[var(--color-navy)] mb-2 text-[15px]">Especificaciones</h2>
              <div className="text-[var(--color-text-secondary)] leading-relaxed text-[15px] space-y-1">
                {producto.especificaciones ? Object.entries(producto.especificaciones).map(([k, v]) => <p key={k}><strong>{k}</strong>: {v}</p>) : 'No hay especificaciones'}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="font-extrabold text-[var(--color-navy)] mb-2 text-[15px]">Envío y garantía</h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed text-[15px]">
                Envíos a todo el Perú · Lima 24h · Provincia 48-72h · Garantía oficial del fabricante · Boleta/Factura
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
              <span>SKU: {producto.sku}</span>
              <span>·</span>
              <span className="capitalize">Categoría: {producto.categoria.replace('-', ' ')}</span>
            </div>
          </div>
        </div>

        <RelatedProducts products={relacionados} />
      </div>
    </div>
  )
}