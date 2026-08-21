import { Link } from 'react-router-dom'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <div className="text-8xl font-bold text-[var(--color-primary)] mb-4 font-[var(--font-heading)]">404</div>
      <h1 className="text-[var(--text-2xl)] font-[var(--font-heading)] font-bold text-[var(--color-navy)] mb-2">
        Pagina no encontrada
      </h1>
      <p className="text-[var(--color-text-muted)] mb-8 max-w-md mx-auto">
        Lo sentimos, la pagina que buscas no existe o fue movida a otra ubicacion.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors font-semibold"
        >
          <Home className="w-4 h-4" />
          Volver al inicio
        </Link>
        <Link
          to="/catalogo"
          className="inline-flex items-center gap-2 bg-white text-[var(--color-primary)] px-6 py-3 rounded-lg border border-[var(--color-primary)] hover:bg-[var(--color-bg-alt)] transition-colors font-semibold"
        >
          <Search className="w-4 h-4" />
          Ver catalogo
        </Link>
      </div>
    </div>
  )
}
