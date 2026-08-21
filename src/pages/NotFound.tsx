import { Link } from 'react-router-dom'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <div className="text-8xl font-bold text-[var(--color-primary)] mb-4">404</div>
      <h1 className="text-[var(--text-2xl)] font-[var(--font-heading)] font-bold text-[var(--color-secondary)] mb-2">
        Página no encontrada
      </h1>
      <p className="text-[var(--color-text-muted)] mb-8 max-w-md mx-auto">
        Lo sentimos, la página que buscas no existe o fue movida a otra ubicación.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-3 rounded-[var(--radius-full)] hover:bg-[var(--color-primary-dark)] transition-colors"
        >
          <Home className="w-4 h-4" />
          Volver al inicio
        </Link>
        <Link
          to="/catalogo"
          className="inline-flex items-center gap-2 bg-[var(--color-secondary)] text-white px-6 py-3 rounded-[var(--radius-full)] hover:opacity-90 transition-opacity"
        >
          <Search className="w-4 h-4" />
          Ver catálogo
        </Link>
      </div>
    </div>
  )
}
