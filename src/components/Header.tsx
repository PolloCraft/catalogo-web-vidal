import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Search, ShoppingCart, Menu, X, Phone, MapPin, Clock } from 'lucide-react'
import { useCart } from '../context/CartContext'

const NAV_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [busqueda, setBusqueda] = useState('')
  const { totalItems, toggleCart } = useCart()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (busqueda.trim()) {
      navigate(`/catalogo?q=${encodeURIComponent(busqueda.trim())}`)
      setBusqueda('')
      setMenuOpen(false)
    }
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="sticky top-0 z-50">
      {/* Top industrial bar — Negro de marca con acentos metálicos */}
      <div className="bg-[var(--color-dark)] border-b border-white/[0.08]">
        <div className="max-w-[1280px] mx-auto px-4 h-9 flex items-center justify-between text-[11px] tracking-wide">
          <div className="flex items-center gap-5">
            <a href="tel:+51936608583" className="flex items-center gap-1.5 text-white/85 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              <span className="font-semibold">+51 936 608 583</span>
            </a>
            <span className="hidden md:flex items-center gap-1.5 text-white/55">
              <span className="w-px h-3 bg-white/15" />
              <MapPin className="w-3 h-3" />
              Av. Industrial 123, Lima — Galería Cuzco
            </span>
            <span className="hidden lg:flex items-center gap-1.5 text-white/55">
              <Clock className="w-3 h-3" />
              Lun - Sáb 8:00 - 18:00
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-white/45 text-[10px] uppercase tracking-[0.14em] font-semibold">Síguenos</span>
            <div className="flex items-center gap-1.5">
              {[
                { label: 'FB', href: 'https://facebook.com/chamoimport' },
                { label: 'IG', href: 'https://instagram.com/chamoimportsrl' },
                { label: 'TT', href: 'https://tiktok.com/@chamoimportsrl' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="w-6 h-6 rounded-md bg-white/10 hover:bg-[var(--color-primary)] text-white/75 hover:text-white flex items-center justify-center text-[10px] font-bold transition-colors">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main header — blanco industrial con línea metálica superior */}
      <div className="bg-white border-b border-[var(--color-border)] shadow-[var(--shadow-sm)]">
        <div className="max-w-[1280px] mx-auto px-4">
          {/* franja superior azul primaria (detalle de marca) */}
          <div className="h-[3px] bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-primary)] -mx-4 mb-0" />
          <div className="flex items-center gap-4 py-3">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <img src="/brand/logo.svg" alt="Chamo Import" className="h-11 w-auto hidden sm:block" onError={(e)=>{ (e.target as HTMLImageElement).style.display='none' }} />
              {/* fallback textual si no carga svg */}
              <div className="flex items-center gap-2 sm:hidden">
                <div className="w-9 h-9 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white font-extrabold text-sm">CI</div>
                <div className="leading-none">
                  <div className="font-[var(--font-heading)] font-extrabold text-[13px] tracking-tight text-[var(--color-dark)]">CHAMO<span className="text-[var(--color-primary)]"> IMPORT</span></div>
                  <div className="text-[10px] tracking-[0.18em] font-bold text-[var(--color-metallic)] -mt-0.5">S.R.L.</div>
                </div>
              </div>
              <div className="hidden sm:block leading-none">
                <div className="font-[var(--font-heading)] font-extrabold text-[15px] tracking-tight text-[var(--color-dark)]">CHAMO<span className="text-[var(--color-primary)]"> IMPORT</span></div>
                <div className="text-[11px] tracking-[0.22em] font-bold text-[var(--color-metallic)]">S.R.L.</div>
              </div>
              <span className="hidden lg:flex items-center ml-3 pl-3 border-l border-[var(--color-border)] text-[11px] leading-tight text-[var(--color-text-muted)]">
                Ferretería<br/>e Iluminación
              </span>
            </Link>

            {/* Nav desktop */}
            <nav className="hidden md:flex items-center gap-1 ml-6">
              {NAV_LINKS.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`px-3.5 py-2 rounded-lg text-[13px] font-semibold tracking-wide uppercase transition-colors ${isActive(l.to) ? 'bg-[var(--color-primary)] text-white shadow-[var(--shadow-sm)]' : 'text-[var(--color-text)] hover:bg-[var(--color-bg)]'}`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-[520px] ml-auto relative hidden sm:flex">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                <input
                  type="text"
                  placeholder="Buscar herramientas, focos, cables…"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full pl-10 pr-4 h-10 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] text-sm placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 transition-all"
                />
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={toggleCart}
                className="relative w-10 h-10 rounded-xl border border-[var(--color-border)] bg-white hover:border-[var(--color-primary)] hover:bg-[var(--color-bg-alt)] flex items-center justify-center transition-colors"
                aria-label="Ver cotización"
              >
                <ShoppingCart className="w-[18px] h-[18px] text-[var(--color-dark)]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[var(--color-accent)] text-white text-[11px] min-w-5 h-5 px-1 rounded-full flex items-center justify-center font-bold shadow-[var(--shadow-sm)]">
                    {totalItems}
                  </span>
                )}
              </button>
              <a
                href="https://wa.me/51936608583?text=Hola,%20quiero%20cotizar%20un%20producto"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white h-10 px-5 rounded-xl text-[13px] font-bold tracking-wide uppercase shadow-[var(--shadow-sm)] transition-colors"
              >
                Cotizar
              </a>
              <button
                className="md:hidden w-10 h-10 rounded-xl border border-[var(--color-border)] bg-white flex items-center justify-center"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menú"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile search */}
          <form onSubmit={handleSearch} className="sm:hidden pb-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-10 pr-4 h-10 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10"
              />
            </div>
          </form>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="md:hidden border-t border-[var(--color-border)] bg-white">
            <nav className="px-4 py-3 flex flex-col gap-1">
              {NAV_LINKS.map(l => (
                <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)} className={`px-3 py-3 rounded-xl text-sm font-semibold ${isActive(l.to) ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-text)] hover:bg-[var(--color-bg)]'}`}>{l.label}</Link>
              ))}
              <a href="https://wa.me/51936608583?text=Hola,%20quiero%20cotizar%20un%20producto" target="_blank" rel="noopener noreferrer" className="mt-2 bg-[var(--color-whatsapp)] text-white px-4 py-3 rounded-xl text-sm font-bold text-center">Cotizar por WhatsApp</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
