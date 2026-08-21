import { X, Minus, Plus, Trash2, ShoppingBag, ShieldCheck } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function CartSidebar() {
  const { items, isOpen, removeItem, updateCantidad, clearCart, toggleCart, subtotal } = useCart()

  const formatPrecio = (precio: number) =>
    new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(precio)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-[var(--color-dark)]/50 backdrop-blur-[2px]" onClick={toggleCart}>
      <div
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-[var(--shadow-xl)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-[64px] border-b border-[var(--color-border)] bg-[var(--color-dark)] text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-sm leading-none">Cotización</h2>
              <p className="text-[11px] text-white/60">{items.length} productos</p>
            </div>
          </div>
          <button onClick={toggleCart} className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/15 flex items-center justify-center transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 bg-[var(--color-bg)]">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-14 h-14 rounded-2xl bg-white border border-[var(--color-border)] flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-6 h-6 text-[var(--color-metallic)]" />
              </div>
              <p className="font-semibold text-[var(--color-text)]">Tu cotización está vacía</p>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">Agrega productos para cotizar al por mayor</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map(item => (
                <div key={item.product.id} className="flex gap-3 p-3 bg-white rounded-2xl border border-[var(--color-border)]">
                  <div className="w-16 h-16 bg-[var(--color-bg)] rounded-xl flex items-center justify-center text-2xl shrink-0 border border-[var(--color-border)]">
                    🧰
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[13px] font-semibold leading-snug text-[var(--color-text)] line-clamp-2">
                      {item.product.nombre}
                    </h3>
                    <p className="text-[11px] font-bold tracking-wide uppercase text-[var(--color-metallic)]">{item.product.sku} · {item.product.marca}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateCantidad(item.product.id, item.cantidad - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg border border-[var(--color-border)] bg-white hover:bg-[var(--color-bg)] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-bold w-6 text-center">{item.cantidad}</span>
                        <button
                          onClick={() => updateCantidad(item.product.id, item.cantidad + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg border border-[var(--color-border)] bg-white hover:bg-[var(--color-bg)] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-sm font-extrabold text-[var(--color-primary)]">
                        {formatPrecio(item.product.precio * item.cantidad)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="w-8 h-8 rounded-lg hover:bg-red-50 text-[var(--color-text-muted)] hover:text-red-500 transition-colors flex items-center justify-center self-start"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[var(--color-border)] p-4 space-y-3 bg-white">
            <div className="rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] p-3 flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
              <ShieldCheck className="w-4 h-4 text-[var(--color-primary)]" />
              Precios mayoristas sujetos a stock y validación por asesor.
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--color-text-muted)]">Subtotal estimado</span>
              <span className="text-lg font-extrabold text-[var(--color-primary)]">{formatPrecio(subtotal)}</span>
            </div>
            <a
              href={`https://wa.me/51936608583?text=${encodeURIComponent(
                'Hola Chamo Import, quiero cotizar:\n' +
                items.map(item => `• ${item.product.nombre} (x${item.cantidad}) — ${formatPrecio(item.product.precio * item.cantidad)}`).join('\n') +
                '\n\nSubtotal: ' + formatPrecio(subtotal) + '\n¿Me confirman stock y precio mayorista?'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[var(--color-whatsapp)] hover:bg-[#20bd5a] text-white text-center h-11 rounded-xl font-bold transition-colors"
            >
              Cotizar por WhatsApp
            </a>
            <button
              onClick={clearCart}
              className="w-full text-center text-xs font-semibold text-[var(--color-text-muted)] hover:text-red-500 transition-colors py-1"
            >
              Vaciar cotización
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
