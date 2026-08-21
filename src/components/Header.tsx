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
      {/* Top bar — Negro marca #0D0D0D */}
      <div className="bg-[#0D0D0D] border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 h-[32px] flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-4">
            <a href="tel:+51936608583" className="flex items-center gap-1.5 text-white hover:text-[var(--color-light-blue)] transition-colors">
              <Phone className="w-3 h-3 text-[var(--color-accent)]" />
              <span className="font-semibold tracking-wide">+51 936 608 583</span>
            </a>
            <span className="hidden md:flex items-center gap-1.5 text-white/60">
              <span className="w-px h-3 bg-white/15" />
              <MapPin className="w-3 h-3" />
              Galería Cuzco, Jr. Cusco 716, Lima 15001
            </span>
            <span className="hidden lg:flex items-center gap-1.5 text-white/60">
              <Clock className="w-3 h-3" />
              Lun - Sáb 8:00 - 18:00
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-white/45 text-[10px] uppercase tracking-[0.14em] font-bold">Síguenos</span>
            <div className="flex items-center gap-1">
              {[
                { label: 'FB', href: 'https://facebook.com/chamoimport' },
                { label: 'IG', href: 'https://instagram.com/chamoimportsrl' },
                { label: 'TT', href: 'https://tiktok.com/@chamoimportsrl' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="w-6 h-6 rounded-md bg-white/10 hover:bg-[var(--color-primary)] text-white/80 hover:text-white flex items-center justify-center text-[10px] font-bold transition-colors">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main header — oscuro industrial como en screenshot corregido */}
      <div className="bg-[#141518] border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-4">
          {/* línea acero superior */}
          <div className="h-[2px] bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-metallic)] -mx-4" />
          <div className="flex items-center gap-3 lg:gap-6 py-2.5">
            {/* LOGO OFICIAL — imagen real de chamoimport.com, sin texto duplicado */}
            <Link to="/" className="shrink-0 flex items-center">
              <img
                src="/brand/logo-oficial.png"
                alt="CHAMO IMPORT S.R.L."
                className="h-[36px] lg:h-[42px] w-auto object-contain"
                onError={(e) => {
                  const img = e.target as HTMLImageElement
                  img.style.display = 'none'
                  const fallback = document.getElementById('logo-fallback')
                  if (fallback) fallback.style.display = 'flex'
                }}
              />
              {/* fallback solo si falla la imagen */}
              <span id="logo-fallback" className="hidden items-center gap-2">
                <span className="w-9 h-9 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white font-black text-sm">CI</span>
                <span className="leading-none">
                  <span className="block font-[var(--font-heading)] font-extrabold text-sm text-white tracking-tight">CHAMO IMPORT</span>
                  <span className="block text-[10px] tracking-[0.18em] font-bold text-white/50">S.R.L.</span>
                </span>
              </span>
            </Link>

            {/* Nav desktop — centrado, píldoras */}
            <nav className="hidden md:flex items-center gap-1.5 ml-2">
              {NAV_LINKS.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`px-4 h-8 rounded-full inline-flex items-center text-[13px] font-bold tracking-wide uppercase transition-colors ${isActive(l.to) ? 'bg-[var(--color-primary)] text-white' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Search — oscuro como screenshot */}
            <form onSubmit={handleSearch} className="flex-1 max-w-[520px] ml-auto hidden sm:flex">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Buscar herramientas, focos, cables..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full pl-10 pr-4 h-9 rounded-full bg-white/10 border border-white/15 text-white text-sm placeholder:text-white/40 focus:outline-none focus:bg-white/15 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all"
                />
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={toggleCart}
                className="relative w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-colors"
                aria-label="Ver cotización"
              >
                <ShoppingCart className="w-4 h-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[var(--color-accent)] text-white text-[11px] min-w-5 h-5 px-1 rounded-full flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
              <a
                href="https://wa.me/51936608583?text=Hola,%20quiero%20cotizar%20un%20producto"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center justify-center bg-[var(--color-primary)] hover:bg-[#004599] text-white h-9 px-5 rounded-full text-[13px] font-bold tracking-wide uppercase transition-colors"
              >
                Cotizar
              </a>
              <button
                className="md:hidden w-9 h-9 rounded-full bg-white/10 border border-white/10 text-white flex items-center justify-center"
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
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-10 pr-4 h-9 rounded-full bg-white/10 border border-white/15 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-[var(--color-accent)]"
              />
            </div>
          </form>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#0F1115]">
            <nav className="px-4 py-3 flex flex-col gap-1">
              {NAV_LINKS.map(l => (
                <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)} className={`px-4 h-11 rounded-xl inline-flex items-center text-sm font-bold ${isActive(l.to) ? 'bg-[var(--color-primary)] text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}>{l.label}</Link>
              ))}
              <a href="https://wa.me/51936608583?text=Hola,%20quiero%20cotizar%20un%20producto" target="_blank" rel="noopener noreferrer" className="mt-2 bg-[var(--color-whatsapp)] text-white h-11 rounded-xl inline-flex items-center justify-center text-sm font-bold">Cotizar por WhatsApp</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
