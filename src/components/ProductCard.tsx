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
      to={`/producto/${product.id}`}
      className="group bg-white rounded-2xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-primary)]/20 hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      <div className="relative h-[180px] bg-[radial-gradient(ellipse_at_top,_var(--color-bg-alt),_#fff_60%)] flex items-center justify-center overflow-hidden border-b border-[var(--color-border)]">
        {/* sutil trama metálica */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `repeating-linear-gradient(90deg, var(--color-metallic) 0 1px, transparent 1px 24px)` }} />
        <span className="text-[56px] group-hover:scale-[1.06] transition-transform duration-300 drop-shadow-sm">
          {product.imagenes.length > 0 ? '🧰' : '📦'}
        </span>

        {descuento && (
          <span className="absolute top-3 left-3 bg-[#E11D48] text-white text-[11px] font-extrabold tracking-wide px-2.5 py-1 rounded-full shadow-sm">
            -{descuento}%
          </span>
        )}
        {product.etiquetas.includes('nuevo') && (
          <span className="absolute top-3 right-3 bg-[var(--color-accent)] text-white text-[11px] font-extrabold tracking-wide px-2.5 py-1 rounded-full">
            NUEVO
          </span>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-[var(--color-dark)]/55 backdrop-blur-[1px] flex items-center justify-center">
            <span className="bg-white text-[var(--color-dark)] text-xs font-bold px-4 py-2 rounded-full shadow">AGOTADO</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--color-metallic)] mb-1">
          {product.marca}
        </p>
        <h3 className="font-semibold text-[13.5px] leading-snug text-[var(--color-text)] line-clamp-2 min-h-[38px] group-hover:text-[var(--color-primary)] transition-colors">
          {product.nombre}
        </h3>
        <div className="flex items-end gap-2 mt-2">
          <span className="text-[18px] font-extrabold tracking-tight text-[var(--color-primary)]">
            {formatPrecio(product.precio)}
          </span>
          {product.precioAnterior && (
            <span className="text-xs text-[var(--color-text-muted)] line-through mb-1">
              {formatPrecio(product.precioAnterior)}
            </span>
          )}
        </div>
        {product.precioMayorista && (
          <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
            Mayorista <span className="font-bold text-[var(--color-secondary)]">{formatPrecio(product.precioMayorista)}</span>
          </p>
        )}
        <div className="h-px bg-[var(--color-border)] my-3" />
        <div className="flex items-center justify-between mt-auto">
          <span className={`text-[11px] font-bold tracking-wide uppercase ${product.stock > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            {product.stock > 0 ? `Stock ${product.stock}` : 'Sin stock'}
          </span>
          <button
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-xs font-bold tracking-wide uppercase px-3.5 py-2 rounded-xl shadow-[var(--shadow-sm)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
