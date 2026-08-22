import { Link } from 'react-router-dom'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="bg-[var(--color-bg)] min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="text-8xl font-extrabold text-[var(--color-primary)] mb-4 font-[var(--font-heading)] tracking-tighter">404</div>
        <h1 className="text-2xl font-extrabold text-[var(--color-navy)] mb-3">
          Página no encontrada
        </h1>
        <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed">
          Lo sentimos, la página que buscas no existe o fue movida a otra ubicación.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-7 py-3 rounded-full hover:bg-[var(--color-primary-dark)] transition-all font-bold shadow-md active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            Volver al inicio
          </Link>
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 bg-white text-[var(--color-primary)] px-7 py-3 rounded-full border border-[var(--color-border-strong)] hover:bg-gray-50 transition-all font-bold shadow-sm active:scale-[0.98]"
          >
            <Search className="w-4 h-4" />
            Ver catálogo
          </Link>
        </div>
      </div>
    </div>
  )
}
