import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function CartSidebar() {
  const { items, isOpen, removeItem, updateCantidad, clearCart, toggleCart, subtotal } = useCart()

  const formatPrecio = (precio: number) =>
    new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(precio)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={toggleCart}>
      <div
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)] bg-[var(--color-navy)] text-white">
          <h2 className="font-[var(--font-heading)] font-semibold">
            Cotizacion ({items.length})
          </h2>
          <button onClick={toggleCart} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-12 h-12 mx-auto text-[var(--color-text-muted)] mb-4" />
              <p className="text-[var(--color-text-muted)]">Tu carrito de cotización está vacío</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map(item => (
                <div key={item.product.id} className="flex gap-3 p-3 bg-[var(--color-bg)] rounded-xl">
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-2xl shrink-0 border border-[var(--color-border)]">
                    📦
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-[var(--color-text)] line-clamp-2">
                      {item.product.nombre}
                    </h3>
                    <p className="text-xs text-[var(--color-text-muted)]">{item.product.sku}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCantidad(item.product.id, item.cantidad - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg border border-[var(--color-border)] hover:bg-white transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.cantidad}</span>
                        <button
                          onClick={() => updateCantidad(item.product.id, item.cantidad + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg border border-[var(--color-border)] hover:bg-white transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-[var(--color-primary)]">
                        {formatPrecio(item.product.precio * item.cantidad)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="p-1 text-[var(--color-text-muted)] hover:text-red-500 transition-colors self-start"
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
          <div className="border-t border-[var(--color-border)] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[var(--color-text-muted)]">Subtotal</span>
              <span className="text-lg font-bold text-[var(--color-primary)]">{formatPrecio(subtotal)}</span>
            </div>
            <a
              href={`https://wa.me/51936608583?text=${encodeURIComponent(
                'Hola, quiero cotizar:\n' +
                items.map(item => `- ${item.product.nombre} (x${item.cantidad}) - ${formatPrecio(item.product.precio * item.cantidad)}`).join('\n') +
                '\n\nSubtotal: ' + formatPrecio(subtotal)
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[var(--color-whatsapp)] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#20bd5a] transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Cotizar por WhatsApp
            </a>
            <button
              onClick={clearCart}
              className="w-full text-center text-sm text-[var(--color-text-muted)] hover:text-red-500 transition-colors py-2"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
