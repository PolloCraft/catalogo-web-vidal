import { Link } from 'react-router-dom'
import { ShieldCheck, Truck, Phone, MapPin, Clock, Mail } from 'lucide-react'
import SocialLinks from './footer/SocialLinks'
import PaymentMethods from './footer/PaymentMethods'
import FooterNav from './footer/FooterNav'

export default function Footer() {
  return (
    <footer className="bg-[var(--color-secondary)] text-white border-t-2 border-[var(--color-primary)]">
      {/* Barra de confianza superior */}
      <div className="border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 py-5 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)] flex items-center justify-center shrink-0 shadow-md shadow-[var(--color-primary)]/30">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold tracking-wide">LA CONFIANZA DE NUESTROS CLIENTES NOS RESPALDA</div>
              <div className="text-xs text-white/60">Atención personalizada · Precios al por mayor · Envíos a todo el Perú</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 text-white/80 font-semibold">
              <Truck className="w-3.5 h-3.5" /> Envío 24-72h
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 text-white/80 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> Garantía oficial
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Marca + redes sociales */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-5">
              <img src="/brand/logo.png" alt="Chamo Import S.R.L." className="h-[20px] lg:h-[28px] max-w-[120px] w-auto object-contain" />
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              Importadores y distribuidores mayoristas desde 2013. Ferretería, iluminación, artículos eléctricos, adhesivos, seguridad y campaña escolar.
            </p>
            <SocialLinks />
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-bold text-xs tracking-[0.16em] uppercase text-white mb-4 flex items-center gap-2">
              <span className="w-5 h-px bg-[var(--color-accent)]" />
              Contacto
            </h3>
            <address className="not-italic space-y-3 text-sm text-white/70">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[var(--color-accent)] mt-0.5 shrink-0" />
                Galería Cuzco, Jr. Cusco 716, Lima 15001
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
                <a href="tel:+51963986002" className="hover:text-white font-semibold transition-colors">+51 963 986 002</a>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
                <a href="tel:+51936608583" className="hover:text-white font-semibold transition-colors">+51 936 608 583</a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
                <a href="mailto:@chamoimport.com" className="hover:text-white font-semibold transition-colors">@chamoimport.com</a>
              </p>
              <p className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
                Lun - Sáb 8:00 - 18:00
              </p>
              <p className="flex items-center gap-2.5 pl-6.5 text-white/50 text-xs">
                Domingos: Cerrado
              </p>
            </address>
          </div>

          {/* Navegación */}
          <FooterNav />

          {/* Pagos / confianza */}
          <PaymentMethods />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} Chamo Import S.R.L. — Todos los derechos reservados.</p>
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
            Lima, Perú · Atendemos a todo el país
          </p>
        </div>
      </div>
    </footer>
  )
}
