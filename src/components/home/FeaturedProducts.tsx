import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Skeleton from '../Skeleton'
import { getProductImage } from '../../utils/images'
import type { Product } from '../../types'

function formatPrecio(precio: number): string {
  return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN', minimumFractionDigits: 2 }).format(precio)
}

interface FeaturedProductsProps {
  products: Product[]
  loading: boolean
}

export default function FeaturedProducts({ products, loading }: FeaturedProductsProps) {
  return (
    <section className="py-12 bg-[var(--color-bg)]">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="flex items-center justify-between gap-4 mb-8">
          <h2 className="font-[var(--font-heading)] font-extrabold text-[24px] tracking-tight text-[var(--color-navy)]">Productos Destacados</h2>
          <Link to="/catalogo" className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors">
            Ver todos <ArrowRight className="w-4.5 h-4.5" />
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-[300px] rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {products.slice(0, 8).map(product => {
              const descuento = product.precioAnterior
                ? Math.round((1 - product.precio / product.precioAnterior) * 100)
                : null
              return (
              <Link key={product.id} to={`/producto/${product.id}`} className="group rounded-2xl overflow-hidden bg-white border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 hover:shadow-lg transition-all flex flex-col shadow-sm">
                <div className="h-[180px] bg-white relative overflow-hidden border-b border-[var(--color-border)]">
                  <img src={getProductImage(product)} alt={product.nombre} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-2 left-2 bg-[var(--color-navy)]/80 text-white text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-md backdrop-blur-sm">
                    {product.sku}
                  </div>
                  {descuento && (
                    <span className="absolute top-2 right-2 bg-[var(--color-primary)] text-white text-[11px] font-extrabold tracking-wide px-2.5 py-1 rounded-full shadow">
                      -{descuento}%
                    </span>
                  )}
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
                      <span className="bg-[var(--color-navy)] text-white text-xs font-bold px-4 py-2 rounded-full shadow">AGOTADO</span>
                    </div>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="text-[10px] font-extrabold tracking-[0.16em] uppercase text-[var(--color-metallic)] mb-1">{product.marca}</div>
                  <div className="font-bold text-[14px] leading-snug text-[var(--color-navy)] line-clamp-2 min-h-[40px] group-hover:text-[var(--color-primary)] transition-colors">{product.nombre}</div>
                  <div className="mt-auto pt-3 flex items-baseline gap-2">
                    <span className="font-extrabold text-[18px] text-[var(--color-primary)]">{formatPrecio(product.precioMayorista ?? product.precio)}</span>
                    {product.precioAnterior && <span className="text-[12px] line-through text-[var(--color-text-muted)]">{formatPrecio(product.precioAnterior)}</span>}
                  </div>
                </div>
              </Link>
            )})}
          </div>
        )}
      </div>
    </section>
  )
}
