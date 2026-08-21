import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[var(--color-navy)] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo + Descripcion */}
          <div>
            <img src="/brand/logo-white.svg" alt="Chamo Import" className="h-10 mb-4" />
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Importadores y distribuidores de ferretería, iluminación, artículos eléctricos, adhesivos y campaña escolar. Precios al por mayor.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://facebook.com/chamoimport" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[var(--color-primary)] transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://instagram.com/chamoimportsrl" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[var(--color-primary)] transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://tiktok.com/@chamoimportsrl" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[var(--color-primary)] transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.43v-7.15a8.16 8.16 0 005.58 2.18V11.2a4.85 4.85 0 01-5.58-2.32V6.69h5.58z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-[var(--font-heading)] font-semibold text-base mb-4 text-white">Contacto</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
                <a href="tel:+51936608583" className="hover:text-white transition-colors">+51 936 608 583</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
                <a href="mailto:ventas@chamoimport.com" className="hover:text-white transition-colors">ventas@chamoimport.com</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[var(--color-accent)] shrink-0 mt-0.5" />
                <span>Av. Industrial 123, Lima</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
                <span>Lun - Vie: 8:00 - 18:00</span>
              </li>
            </ul>
          </div>

          {/* Enlaces */}
          <div>
            <h3 className="font-[var(--font-heading)] font-semibold text-base mb-4 text-white">Enlaces</h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-[var(--color-accent)] transition-colors">Inicio</Link></li>
              <li><Link to="/catalogo" className="hover:text-[var(--color-accent)] transition-colors">Catálogo</Link></li>
              <li><Link to="/contacto" className="hover:text-[var(--color-accent)] transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Metodos de pago */}
          <div>
            <h3 className="font-[var(--font-heading)] font-semibold text-base mb-4 text-white">Métodos de Pago</h3>
            <div className="grid grid-cols-2 gap-2">
              {['Efectivo', 'Transferencia', 'Yape', 'Plin', 'Tarjeta', 'Crédito'].map(metodo => (
                <div key={metodo} className="bg-white/5 rounded-lg px-3 py-2 text-sm text-gray-400 text-center">
                  {metodo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Chamo Import. Todos los derechos reservados.</p>
          <p className="text-xs">La confianza de nuestros clientes nos respalda</p>
        </div>
      </div>
    </footer>
  )
}
