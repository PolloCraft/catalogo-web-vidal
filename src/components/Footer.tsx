import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[var(--color-secondary)] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center font-bold text-lg">
              CI
            </div>
            <span className="font-[var(--font-heading)] font-bold text-lg">
              Chamo Import
            </span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            Importadores y distribuidores de ferretería, iluminación, artículos eléctricos, adhesivos y campaña escolar.
          </p>
        </div>

        <div>
          <h3 className="font-[var(--font-heading)] font-semibold text-lg mb-4">Contacto</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[var(--color-accent)]" />
              <span>+51 999 999 999</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[var(--color-accent)]" />
              <span>ventas@chamoimport.com</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[var(--color-accent)]" />
              <span>Av. Industrial 123, Lima</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[var(--color-accent)]" />
              <span>Lun - Vie: 8:00 - 18:00</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-[var(--font-heading)] font-semibold text-lg mb-4">Enlaces</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/" className="hover:text-[var(--color-accent)] transition-colors">Inicio</Link></li>
            <li><Link to="/catalogo" className="hover:text-[var(--color-accent)] transition-colors">Catálogo</Link></li>
            <li><Link to="/contacto" className="hover:text-[var(--color-accent)] transition-colors">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-[var(--font-heading)] font-semibold text-lg mb-4">Métodos de Pago</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Efectivo</li>
            <li>Transferencia bancaria</li>
            <li>Yape / Plin</li>
            <li>Tarjeta de crédito/débito</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} Chamo Import. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
