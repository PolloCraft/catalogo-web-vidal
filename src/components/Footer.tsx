import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, ArrowRight, ShieldCheck, Truck, Award } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[var(--color-dark)] text-white">
      {/* Newsletter / barra de confianza superior */}
      <div className="border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 py-5 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[var(--color-primary)] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold tracking-wide">LA CONFIANZA DE NUESTROS CLIENTES NOS RESPALDA</div>
              <div className="text-xs text-white/60">Atención personalizada · Precios al por mayor · Envíos a todo el Perú</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white/80"><Truck className="w-3.5 h-3.5"/> Envío 24-72h</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white/80"><Award className="w-3.5 h-3.5"/> Garantía oficial</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Marca */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[var(--color-primary)] font-black text-sm">CI</div>
              <div className="leading-none">
                <div className="font-[var(--font-heading)] font-extrabold text-sm tracking-tight">CHAMO IMPORT</div>
                <div className="text-[10px] tracking-[0.18em] font-bold text-white/60">S.R.L. — Desde 2013</div>
              </div>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              Importadores y distribuidores mayoristas. Ferretería, iluminación, artículos eléctricos, adhesivos y campaña escolar para negocios y hogares.
            </p>
            <div className="flex items-center gap-2">
              {[
                { label: 'Facebook', href: 'https://facebook.com/chamoimport' },
                { label: 'Instagram', href: 'https://instagram.com/chamoimportsrl' },
                { label: 'TikTok', href: 'https://tiktok.com/@chamoimportsrl' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[var(--color-primary)] flex items-center justify-center text-xs font-bold transition-colors">
                  {s.label.slice(0,2)}
                </a>
              ))}
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-[var(--font-heading)] font-bold text-xs tracking-[0.16em] uppercase text-white mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[var(--color-accent)] mt-0.5" />
                <div>
                  <a href="tel:+51936608583" className="text-white hover:text-[var(--color-light-blue)] font-semibold">+51 936 608 583</a>
                  <div className="text-xs text-white/50">WhatsApp · Llamadas</div>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[var(--color-accent)]" />
                <a href="mailto:ventas@chamoimport.com" className="hover:text-white transition-colors">ventas@chamoimport.com</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[var(--color-accent)] mt-0.5" />
                <span>Galería Cuzco, Jr. Cusco 716, Lima 15001 — <a href="https://maps.google.com/?q=Galeria+Cuzco+Lima" target="_blank" rel="noopener noreferrer" className="underline decoration-white/20 hover:decoration-white">Ver mapa</a></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[var(--color-accent)]" />
                <span>Lun - Sáb 8:00 - 18:00 · Dom cerrado</span>
              </li>
            </ul>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="font-[var(--font-heading)] font-bold text-xs tracking-[0.16em] uppercase text-white mb-4">Explorar</h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link to="/" className="hover:text-white inline-flex items-center gap-1.5">Inicio <ArrowRight className="w-3 h-3 opacity-60"/></Link></li>
              <li><Link to="/catalogo" className="hover:text-white inline-flex items-center gap-1.5">Catálogo completo <ArrowRight className="w-3 h-3 opacity-60"/></Link></li>
              <li><Link to="/catalogo?categoria=ferreteria" className="hover:text-white">Ferretería</Link></li>
              <li><Link to="/catalogo?categoria=iluminacion" className="hover:text-white">Iluminación</Link></li>
              <li><Link to="/catalogo?categoria=electricos" className="hover:text-white">Artículos eléctricos</Link></li>
              <li><Link to="/contacto" className="hover:text-white">Contacto y cotizaciones</Link></li>
            </ul>
          </div>

          {/* Pagos / confianza */}
          <div>
            <h3 className="font-[var(--font-heading)] font-bold text-xs tracking-[0.16em] uppercase text-white mb-4">Pagos & Garantía</h3>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {['YAPE','PLIN','VISA','MC','Transfer','Efectivo'].map(m => (
                <div key={m} className="h-9 rounded-lg bg-white text-[var(--color-dark)] flex items-center justify-center text-[11px] font-extrabold tracking-wide border border-white/10">
                  {m}
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[var(--color-accent)] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div className="text-xs leading-tight">
                <div className="font-bold">Compra 100% segura</div>
                <div className="text-white/60">Productos con garantía oficial y boleta/factura</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Chamo Import S.R.L. — Todos los derechos reservados.</p>
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
            Lima, Perú · Atendemos a todo el país
          </p>
        </div>
      </div>
    </footer>
  )
}
