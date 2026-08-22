import { Link } from 'react-router-dom'
import { ArrowRight, Truck, ShieldCheck, Clock3 } from 'lucide-react'
import { whatsappGeneral } from '../../utils/whatsapp'

const BENEFITS = [
  { icon: Truck, title: 'Envíos a todo el Perú', desc: 'Seguimiento y seguridad en cada ruta' },
  { icon: ShieldCheck, title: 'Asesoría especializada', desc: 'Te ayudamos a armar tu pedido ideal' },
  { icon: Clock3, title: 'Atención inmediata', desc: 'Cotizaciones en tiempo récord' },
]

export default function CtaSection() {
  return (
    <section className="py-12 bg-white border-t border-[var(--color-border)]">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="rounded-3xl overflow-hidden bg-[var(--color-primary-dark)] grid lg:grid-cols-[1.2fr_0.8fr] gap-0 shadow-2xl shadow-[var(--color-primary)]/20">
          <div className="p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute right-0 top-0 opacity-10 text-[var(--color-accent)] -mt-10 -mr-10">
              <Truck className="w-64 h-64" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 text-[11px] font-extrabold tracking-[0.2em] uppercase text-[var(--color-accent)]">
                <span className="w-6 h-px bg-[var(--color-accent)]" /> Venta al por mayor
              </div>
              <h2 className="mt-3 font-[var(--font-heading)] font-extrabold text-[32px] leading-tight text-white">¿Listo para abastecer<br/>tu proyecto o negocio?</h2>
              <p className="mt-4 text-white/80 leading-relaxed text-[15px] max-w-[500px]">
                Generamos tu cotización mayorista en minutos. Te brindamos stock inmediato, excelentes condiciones comerciales y despacho ágil a nivel nacional.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href={whatsappGeneral()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[var(--color-whatsapp)] hover:opacity-90 text-white px-7 h-12 rounded-full font-bold text-sm shadow-lg transition-all active:scale-[0.98]">
                  Cotizar por WhatsApp <ArrowRight className="w-4 h-4" />
                </a>
                <Link to="/contacto" className="inline-flex items-center gap-2 bg-white text-[var(--color-navy)] hover:bg-gray-100 px-7 h-12 rounded-full font-bold text-sm shadow-md transition-all active:scale-[0.98]">
                  Ir a contacto
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 lg:p-12 flex flex-col justify-center">
            <div className="grid grid-cols-1 gap-5">
              {BENEFITS.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <div className="font-extrabold text-[var(--color-navy)] text-[15px]">{title}</div>
                    <div className="text-[13px] text-[var(--color-text-secondary)] mt-0.5">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
