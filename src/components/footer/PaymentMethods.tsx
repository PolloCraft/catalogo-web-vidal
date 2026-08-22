import { ShieldCheck } from 'lucide-react'

const PAYMENT_METHODS = [
  { id: 'visa', label: 'Visa' },
  { id: 'mastercard', label: 'Mastercard' },
  { id: 'amex', label: 'Amex' },
  { id: 'paypal', label: 'PayPal' },
]

export default function PaymentMethods() {
  return (
    <div>
      <h3 className="font-bold text-xs tracking-[0.16em] uppercase text-white mb-4 flex items-center gap-2">
        <span className="w-5 h-px bg-[var(--color-accent)]" />
        Pagos &amp; Garantía
      </h3>
      <div className="grid grid-cols-2 gap-2 mb-5">
        {PAYMENT_METHODS.map(m => (
          <div key={m.id} className="h-12 rounded-xl bg-white flex items-center justify-center px-3 shadow-sm" title={`Aceptamos ${m.label}`}>
            <img
              src={`/payments/${m.id}.svg`}
              alt={`${m.label} — método de pago aceptado`}
              width="64"
              height="24"
              loading="lazy"
              className="object-contain max-h-6 w-auto"
              onError={(e) => {
                const img = e.target as HTMLImageElement
                const parent = img.parentElement
                img.style.display = 'none'
                if (parent && !parent.textContent?.trim()) {
                  parent.textContent = m.label.toUpperCase()
                  parent.classList.add('text-[var(--color-navy)]', 'text-xs', 'font-extrabold')
                }
              }}
            />
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-white/5 border border-white/10 p-4 flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)] flex items-center justify-center shrink-0 shadow-md shadow-[var(--color-accent)]/30">
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>
        <div className="text-xs leading-tight">
          <div className="font-bold text-white">Compra 100% segura</div>
          <div className="text-white/60 mt-0.5">Garantía oficial y boleta/factura</div>
        </div>
      </div>
    </div>
  )
}
