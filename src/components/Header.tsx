import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [busqueda, setBusqueda] = useState('')
  const { totalItems, toggleCart } = useCart()

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-secondary)] text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center font-bold text-lg">
            CI
          </div>
          <span className="hidden sm:block font-[var(--font-heading)] font-bold text-lg">
            Chamo Import
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-[var(--color-accent)] transition-colors">Inicio</Link>
          <Link to="/catalogo" className="hover:text-[var(--color-accent)] transition-colors">Catálogo</Link>
          <Link to="/contacto" className="hover:text-[var(--color-accent)] transition-colors">Contacto</Link>
        </nav>

        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-white text-[var(--color-text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <button
            onClick={toggleCart}
            className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[var(--color-primary)] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <a
            href="https://wa.me/51999999999?text=Hola,%20quiero%20cotizar%20un%20producto"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:block bg-[var(--color-whatsapp)] text-white px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Cotiza por WhatsApp
          </a>
        </div>

        <button
          className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-[var(--color-secondary)] px-4 py-4 flex flex-col gap-3 text-sm font-medium border-t border-white/10">
          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-[var(--color-accent)] transition-colors">Inicio</Link>
          <Link to="/catalogo" onClick={() => setMenuOpen(false)} className="hover:text-[var(--color-accent)] transition-colors">Catálogo</Link>
          <Link to="/contacto" onClick={() => setMenuOpen(false)} className="hover:text-[var(--color-accent)] transition-colors">Contacto</Link>
          <a
            href="https://wa.me/51999999999?text=Hola,%20quiero%20cotizar%20un%20producto"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--color-whatsapp)] text-white px-4 py-2 rounded-full text-sm font-semibold text-center hover:opacity-90 transition-opacity"
          >
            Cotiza por WhatsApp
          </a>
        </nav>
      )}
    </header>
  )
}
