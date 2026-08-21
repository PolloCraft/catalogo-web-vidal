import { X, Minus, Plus, Trash2, ShoppingBag, ShieldCheck } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function CartSidebar() {
  const { items, isOpen, removeItem, updateCantidad, clearCart, toggleCart, subtotal } = useCart()

  const formatPrecio = (precio: number) =>
    new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(precio)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay opaco/transparente — NO oscuro sólido, blur suave */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
        onClick={toggleCart}
        aria-hidden="true"
      />
      {/* Drawer — claro para contraste, respeta paleta (blanco para cotización legible) */}
      <div
        className="relative h-full w-full max-w-md bg-white shadow-2xl flex flex-col border-l border-black/10 animate-[slideIn_220ms_ease]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header oscuro marca */}
        <div className="flex items-center justify-between px-4 h-[56px] bg-[#0D0D0D] text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-sm leading-none">Cotización</h2>
              <p className="text-[11px] text-white/60">{items.length} productos</p>
            </div>
          </div>
          <button onClick={toggleCart} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" aria-label="Cerrar">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#F5F7FA]">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-14 h-14 rounded-2xl bg-white border border-[var(--color-border)] flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-6 h-6 text-[#A6A8AB]" />
              </div>
              <p className="font-bold text-[#0D0D0D]">Tu cotización está vacía</p>
              <p className="text-sm text-[#6B7280] mt-1">Agrega productos para cotizar al por mayor</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map(item => (
                <div key={item.product.id} className="flex gap-3 p-3 bg-white rounded-2xl border border-[#E6E8EB] shadow-sm">
                  <div className="w-16 h-16 bg-[#F5F7FA] rounded-xl flex items-center justify-center text-2xl shrink-0 border border-[#E6E8EB]">
                    🧰
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[13px] font-bold leading-snug text-[#0D0D0D] line-clamp-2">
                      {item.product.nombre}
                    </h3>
                    <p className="text-[11px] font-bold tracking-wide uppercase text-[#A6A8AB]">{item.product.sku} · {item.product.marca}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateCantidad(item.product.id, item.cantidad - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#E6E8EB] bg-white hover:bg-[#F5F7FA] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-bold w-6 text-center text-[#0D0D0D]">{item.cantidad}</span>
                        <button
                          onClick={() => updateCantidad(item.product.id, item.cantidad + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#E6E8EB] bg-white hover:bg-[#F5F7FA] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-sm font-extrabold text-[#0057B8]">
                        {formatPrecio(item.product.precio * item.cantidad)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="w-8 h-8 rounded-lg hover:bg-red-50 text-[#A6A8AB] hover:text-red-500 transition-colors flex items-center justify-center self-start"
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
          <div className="border-t border-[#E6E8EB] p-4 space-y-3 bg-white">
            <div className="rounded-xl bg-[#EEF4FF] border border-[#D1D3D4] p-3 flex items-center gap-2 text-xs text-[#4b4f58]">
              <ShieldCheck className="w-4 h-4 text-[#0057B8] shrink-0" />
              Precios mayoristas sujetos a stock y validación por asesor.
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6B7280]">Subtotal estimado</span>
              <span className="text-lg font-extrabold text-[#0057B8]">{formatPrecio(subtotal)}</span>
            </div>
            <a
              href={`https://wa.me/51936608583?text=${encodeURIComponent(
                'Hola Chamo Import, quiero cotizar:\n' +
                items.map(item => `• ${item.product.nombre} (x${item.cantidad}) — ${formatPrecio(item.product.precio * item.cantidad)}`).join('\n') +
                '\n\nSubtotal: ' + formatPrecio(subtotal) + '\n¿Me confirman stock y precio mayorista?'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-center h-11 rounded-xl font-bold transition-colors"
            >
              Cotizar por WhatsApp
            </a>
            <button
              onClick={clearCart}
              className="w-full text-center text-xs font-bold tracking-wide uppercase text-[#A6A8AB] hover:text-red-500 transition-colors py-1"
            >
              Vaciar cotización
            </button>
          </div>
        )}
      </div>
      <style>{`@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}`}</style>
    </div>
  )
}
