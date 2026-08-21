import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import type { Product } from '../types'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart()

  const formatPrecio = (precio: number) =>
    new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(precio)

  const descuento = product.precioAnterior
    ? Math.round((1 - product.precio / product.precioAnterior) * 100)
    : null

  return (
    <Link
      to={/producto/}
      className="group bg-white rounded-xl overflow-hidden border border-[var(--color-border)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative h-48 bg-gradient-to-br from-[var(--color-bg)] to-[var(--color-bg-alt)] flex items-center justify-center overflow-hidden">
        <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
          {product.imagenes.length > 0 ? '📦' : '📷'}
        </span>

        {descuento && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
            -{descuento}%
          </span>
        )}

        {product.etiquetas.includes('nuevo') && (
          <span className="absolute top-3 right-3 bg-[var(--color-accent)] text-white text-xs font-bold px-2.5 py-1 rounded-lg">
            Nuevo
          </span>
        )}

        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-[var(--color-text)] text-sm font-semibold px-4 py-2 rounded-lg">
              Agotado
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs text-[var(--color-text-muted)] mb-1.5 uppercase tracking-wide">
          {product.marca}
        </p>
        <h3 className="font-semibold text-[var(--color-text)] text-sm mb-2 line-clamp-2 min-h-[40px] group-hover:text-[var(--color-primary)] transition-colors">
          {product.nombre}
        </h3>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-lg font-bold text-[var(--color-primary)]">
            {formatPrecio(product.precio)}
          </span>
          {product.precioAnterior && (
            <span className="text-xs text-[var(--color-text-muted)] line-through">
              {formatPrecio(product.precioAnterior)}
            </span>
          )}
        </div>

        {product.precioMayorista && (
          <p className="text-xs text-[var(--color-text-muted)] mb-2">
            Mayorista: <span className="font-semibold text-[var(--color-secondary)]">{formatPrecio(product.precioMayorista)}</span>
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className={`text-xs font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {product.stock > 0 ? `En stock (${product.stock})` : 'Sin stock'}
          </span>
          <button
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
            onClick={(e) => {
              e.preventDefault()
              addItem(product)
            }}
            disabled={product.stock === 0}
          >
            Cotizar
          </button>
        </div>
      </div>
    </Link>
  )
}
