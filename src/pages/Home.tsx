import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowRight, Truck, ShieldCheck, Clock3, Sparkles, Wrench, Lightbulb, Zap, Hammer, Package } from 'lucide-react'
import { getCategories, getFeaturedProducts, getBrands } from '../services/productService'
import Skeleton from '../components/Skeleton'
import type { Category, Product } from '../types'

const BANNER_SLIDES = [
  {
    id: 1,
    eyebrow: 'Mayorista oficial · Lima · Envíos a todo el Perú',
    titulo: 'Ferretería e iluminación para tu negocio y hogar',
    subtitulo: 'Gran stock, precios al por mayor y atención inmediata por WhatsApp.',
    cta: 'Ver catálogo',
    link: '/catalogo',
  },
  {
    id: 2,
    eyebrow: 'Precios al por mayor',
    titulo: 'Abastece tu ferretería al mejor precio',
    subtitulo: 'Marcas líderes, garantía y despacho rápido a nivel nacional.',
    cta: 'Cotizar ahora',
    link: '/contacto',
  },
  {
    id: 3,
    eyebrow: 'Campaña escolar & temporada',
    titulo: 'Todo para campaña en un solo lugar',
    subtitulo: 'Útiles, mochilas y artículos de temporada con stock garantizado.',
    cta: 'Explorar categorías',
    link: '/catalogo',
  },
]

const CATEGORY_META: Record<string, { icon: typeof Wrench; gradient: string }> = {
  ferreteria: { icon: Hammer, gradient: 'from-[#0D0D0D] to-[#2A2E36]' },
  iluminacion: { icon: Lightbulb, gradient: 'from-[#0057B8] to-[#009DE0]' },
  electricos: { icon: Zap, gradient: 'from-[#003366] to-[#0072CE]' },
  adhesivos: { icon: Wrench, gradient: 'from-[#1A1E26] to-[#4B5563]' },
  seguridad: { icon: ShieldCheck, gradient: 'from-[#0D0D0D] to-[#0057B8]' },
  'campana-escolar': { icon: Package, gradient: 'from-[#0072CE] to-[#66C6FF]' },
}

const WHATSAPP_NUMBER = '51936608583'

function formatPrecio(precio: number): string {
  return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN', minimumFractionDigits: 2 }).format(precio)
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [categories, setCategories] = useState<Category[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [brands, setBrands] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const [cats, products, b] = await Promise.all([getCategories(), getFeaturedProducts(), getBrands()])
      setCategories(cats)
      setFeaturedProducts(products)
      setBrands(b)
      setLoading(false)
    }
    load()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length), 6000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length)

  return (
    <div className="bg-[var(--color-bg)]">
      {/* HERO — industrial, con banda metálica y engranaje sutil */}
      <section className="relative overflow-hidden bg-[var(--color-dark)]">
        {/* trama industrial sutil */}
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `repeating-linear-gradient(90deg, #A6A8AB 0 1px, transparent 1px 40px), repeating-linear-gradient(0deg, #A6A8AB 0 1px, transparent 1px 40px)` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/20 via-transparent to-[var(--color-accent)]/15" />
        {/* engranaje decorativo */}
        <div className="pointer-events-none absolute -right-16 -top-16 w-[520px] h-[520px] rounded-full border border-white/10 opacity-20 hidden lg:block" />
        <div className="pointer-events-none absolute -right-24 -top-24 w-[520px] h-[520px] rounded-full border border-white/5 opacity-30 hidden lg:block" />

        <div className="relative max-w-[1280px] mx-auto px-4 py-10 lg:py-14">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-center">
            {/* Carousel text */}
            <div className="relative min-h-[280px] lg:min-h-[340px] flex">
              {BANNER_SLIDES.map((slide, i) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ${i === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
                >
                  <div className="inline-flex items-center gap-2 text-[11px] font-extrabold tracking-[0.18em] uppercase text-[var(--color-light-blue)] mb-3">
                    <span className="w-6 h-px bg-[var(--color-light-blue)]" />
                    {slide.eyebrow}
                  </div>
                  <h1 className="font-[var(--font-heading)] font-extrabold leading-[0.95] text-white text-[32px] sm:text-[42px] lg:text-[48px] tracking-tight">
                    {slide.titulo}
                  </h1>
                  <p className="mt-3 text-white/70 text-[15px] lg:text-[17px] max-w-[560px] leading-relaxed">
                    {slide.subtitulo}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link to={slide.link} className="inline-flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[#07a8ef] text-white px-6 h-11 rounded-xl font-bold text-sm shadow-[var(--shadow-md)] transition-colors">
                      {slide.cta} <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20quiero%20cotizar%20al%20por%20mayor`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-[var(--color-dark)] hover:bg-white/90 px-6 h-11 rounded-xl font-bold text-sm transition-colors">
                      Cotizar por WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Pill stats / garantía rápida — lado derecho */}
            <div className="hidden lg:block">
              <div className="rounded-2xl bg-white border border-[var(--color-border)] p-5 shadow-[var(--shadow-lg)]">
                <div className="text-xs font-bold tracking-[0.16em] uppercase text-[var(--color-metallic)] mb-3">Chamo Import S.R.L.</div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { k: '+1.2k', l: 'Productos' },
                    { k: '6', l: 'Categorías' },
                    { k: '24-72h', l: 'Despacho' },
                  ].map(s => (
                    <div key={s.l} className="rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] p-3 text-center">
                      <div className="font-extrabold text-[var(--color-primary)] leading-none text-lg">{s.k}</div>
                      <div className="text-[11px] font-bold tracking-wide uppercase text-[var(--color-text-muted)]">{s.l}</div>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl bg-[var(--color-dark)] text-white p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[var(--color-primary)] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="text-sm leading-tight">
                    <div className="font-bold">Garantía oficial + boleta/factura</div>
                    <div className="text-white/60 text-xs">Atención personalizada para mayoristas</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* controls */}
          <div className="mt-6 flex items-center gap-3">
            <button onClick={prevSlide} aria-label="Anterior" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 text-white flex items-center justify-center backdrop-blur transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={nextSlide} aria-label="Siguiente" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 text-white flex items-center justify-center backdrop-blur transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="ml-2 flex items-center gap-1.5">
              {BANNER_SLIDES.map((_, i) => (
                <button key={i} onClick={() => setCurrentSlide(i)} aria-label={`Ir a slide ${i+1}`} className={`h-1.5 rounded-full transition-all ${i===currentSlide ? 'w-7 bg-white' : 'w-3 bg-white/35 hover:bg-white/60'}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-white border-y border-[var(--color-border)]">
        <div className="max-w-[1280px] mx-auto px-4 py-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: Truck, title: 'Envíos a todo el Perú', desc: 'Lima 24h · Provincia 48-72h' },
            { icon: ShieldCheck, title: 'Compra segura', desc: 'Garantía en todos los productos' },
            { icon: Clock3, title: 'Atención ágil', desc: 'Cotiza en minutos por WhatsApp' },
            { icon: Sparkles, title: 'Calidad industrial', desc: 'Precisión y durabilidad' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-3">
              <div className="w-9 h-9 rounded-lg bg-[var(--color-primary)] text-white flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <div className="text-[13px] font-bold text-[var(--color-text)]">{title}</div>
                <div className="text-[11px] text-[var(--color-text-muted)]">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Marcas distribuidoras — banda */}
      <section className="py-6 bg-white">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="flex items-center justify-between gap-4 mb-3">
            <h2 className="font-[var(--font-heading)] font-extrabold tracking-tight text-[13px] uppercase text-[var(--color-metallic)]">Marcas distribuidoras</h2>
            <span className="text-[11px] text-[var(--color-text-muted)] hidden sm:inline">Construye tu sueño con marcas que inspiran confianza</span>
          </div>
          {loading ? (
            <div className="flex gap-3 flex-wrap">
              {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-11 w-[120px]" />)}
            </div>
          ) : (
            <div className="flex gap-2.5 flex-wrap">
              {brands.slice(0, 10).map(brand => (
                <Link key={brand} to={`/catalogo?marca=${encodeURIComponent(brand)}`} className="px-4 h-9 rounded-full bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 hover:bg-[var(--color-bg-alt)] text-sm font-semibold text-[var(--color-text)] transition-colors">
                  {brand}
                </Link>
              ))}
              <Link to="/catalogo" className="px-4 h-9 rounded-full bg-[var(--color-dark)] text-white inline-flex items-center gap-1.5 text-sm font-bold">
                Ver todo <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Categorías */}
      <section className="py-8">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="flex items-end justify-between gap-4 mb-4">
            <div>
              <div className="text-[11px] font-extrabold tracking-[0.18em] uppercase text-[var(--color-accent)]">Construye tu sueño</div>
              <h2 className="font-[var(--font-heading)] font-extrabold text-2xl tracking-tight text-[var(--color-dark)]">Nuestras categorías</h2>
            </div>
            <Link to="/catalogo" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]">
              Ver todo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-[148px]" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {categories.map(cat => {
                const meta = CATEGORY_META[cat.id] ?? { icon: Package, gradient: 'from-[var(--color-primary)] to-[var(--color-accent)]' }
                const Icon = meta.icon
                return (
                  <Link key={cat.id} to={`/catalogo?categoria=${cat.id}`} className="group rounded-2xl overflow-hidden bg-white border border-[var(--color-border)] hover:border-[var(--color-primary)]/20 hover:shadow-[var(--shadow-md)] transition-all">
                    <div className={`h-[88px] bg-gradient-to-br ${meta.gradient} flex items-center justify-center relative`}>
                      <Icon className="w-7 h-7 text-white drop-shadow" />
                      <span className="absolute bottom-1.5 right-2 text-[10px] font-bold tracking-wide uppercase text-white/85">{cat.id.replace('-', ' ')}</span>
                    </div>
                    <div className="p-3">
                      <div className="font-bold text-sm leading-tight text-[var(--color-text)] group-hover:text-[var(--color-primary)] line-clamp-1">{cat.nombre}</div>
                      <div className="text-[11px] text-[var(--color-text-muted)] line-clamp-2 leading-snug mt-0.5">{cat.descripcion}</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Productos destacados */}
      <section className="py-8 bg-white border-y border-[var(--color-border)]">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h2 className="font-[var(--font-heading)] font-extrabold text-xl tracking-tight text-[var(--color-dark)]">Productos destacados</h2>
            <Link to="/catalogo" className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]">
              Ver catálogo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-[260px]" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredProducts.slice(0, 8).map(product => (
                <Link key={product.id} to={`/producto/${product.id}`} className="group rounded-2xl overflow-hidden bg-white border border-[var(--color-border)] hover:border-[var(--color-primary)]/20 hover:shadow-[var(--shadow-md)] transition-all">
                  <div className="h-[160px] bg-[radial-gradient(ellipse_at_top,_var(--color-bg-alt),_#fff_65%)] flex items-center justify-center text-5xl border-b border-[var(--color-border)]">🧰</div>
                  <div className="p-3.5">
                    <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--color-metallic)]">{product.marca}</div>
                    <div className="font-semibold text-[13px] leading-snug text-[var(--color-text)] line-clamp-2 min-h-[36px] group-hover:text-[var(--color-primary)]">{product.nombre}</div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-extrabold text-[15px] text-[var(--color-primary)]">{formatPrecio(product.precioMayorista ?? product.precio)}</span>
                      {product.precioAnterior && <span className="text-xs line-through text-[var(--color-text-muted)]">{formatPrecio(product.precioAnterior)}</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA cotización */}
      <section className="py-8">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="rounded-2xl overflow-hidden bg-[var(--color-navy)] border border-white/10 grid lg:grid-cols-[1.2fr_0.8fr] gap-0">
            <div className="p-6 lg:p-8">
              <div className="inline-flex items-center gap-2 text-[11px] font-extrabold tracking-[0.16em] uppercase text-[var(--color-light-blue)]">
                <span className="w-5 h-px bg-[var(--color-light-blue)]" /> Solicita una cotización
              </div>
              <h2 className="mt-2 font-[var(--font-heading)] font-extrabold text-2xl leading-tight text-white">¿Listo para abastecer tu proyecto?</h2>
              <p className="mt-2 text-white/70 leading-relaxed text-sm max-w-[560px]">
                Creamos tu cotización al por mayor en minutos. Confirmamos stock, condiciones de pago y coordinamos envío a todo el Perú.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20quiero%20cotizar%20al%20por%20mayor`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[#07a8ef] text-white px-6 h-11 rounded-xl font-bold text-sm transition-colors">
                  Cotizar por WhatsApp <ArrowRight className="w-4 h-4" />
                </a>
                <Link to="/contacto" className="inline-flex items-center gap-2 bg-white text-[var(--color-dark)] hover:bg-white/90 px-6 h-11 rounded-xl font-bold text-sm transition-colors">
                  Ir a contacto
                </Link>
              </div>
            </div>
            <div className="bg-white p-6 lg:p-8 flex flex-col justify-center">
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-3">
                  <Truck className="w-5 h-5 text-[var(--color-primary)]" />
                  <div><div className="font-bold">Envíos a todo el Perú</div><div className="text-xs text-[var(--color-text-muted)]">Costo y tiempo según destino</div></div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-3">
                  <ShieldCheck className="w-5 h-5 text-[var(--color-primary)]" />
                  <div><div className="font-bold">Asesoría especializada</div><div className="text-xs text-[var(--color-text-muted)]">Armamos tu pedido mayorista</div></div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-3">
                  <Clock3 className="w-5 h-5 text-[var(--color-primary)]" />
                  <div><div className="font-bold">Respuesta rápida</div><div className="text-xs text-[var(--color-text-muted)]">En horario de atención</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
