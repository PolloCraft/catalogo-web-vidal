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
        className="absolute right-0 top-0 h-full w-full max-w-md bg-[var(--color-surface)] shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
          <h2 className="font-[var(--font-heading)] font-semibold text-[var(--color-secondary)]">
            Cotización ({items.length})
          </h2>
          <button onClick={toggleCart} className="p-2 hover:bg-[var(--color-bg)] rounded-full transition-colors">
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
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.product.id} className="flex gap-3 p-3 bg-[var(--color-bg)] rounded-[var(--radius-sm)]">
                  <div className="w-16 h-16 bg-[var(--color-surface)] rounded-[var(--radius-sm)] flex items-center justify-center text-2xl shrink-0">
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
                          className="w-6 h-6 flex items-center justify-center rounded-full border border-[var(--color-border)] hover:bg-[var(--color-surface)] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.cantidad}</span>
                        <button
                          onClick={() => updateCantidad(item.product.id, item.cantidad + 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-full border border-[var(--color-border)] hover:bg-[var(--color-surface)] transition-colors"
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
              href={`https://wa.me/51999999999?text=${encodeURIComponent(
                'Hola, quiero cotizar:\n' +
                items.map(item => `- ${item.product.nombre} (x${item.cantidad}) - ${formatPrecio(item.product.precio * item.cantidad)}`).join('\n') +
                '\n\nSubtotal: ' + formatPrecio(subtotal)
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[var(--color-whatsapp)] text-white text-center py-3 rounded-[var(--radius-full)] font-semibold hover:opacity-90 transition-opacity"
            >
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
