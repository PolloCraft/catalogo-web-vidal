import { useState, useEffect } from 'react'
import { AlertTriangle, RefreshCw, Truck, ShieldCheck, Clock3, Sparkles } from 'lucide-react'
import { getCategories, getFeaturedProducts, getBrands } from '../services/productService'
import type { ServiceError } from '../services/productService'
import HeroBanner from '../components/home/HeroBanner'
import CategoryGrid from '../components/home/CategoryGrid'
import FeaturedProducts from '../components/home/FeaturedProducts'
import BrandsStrip from '../components/home/BrandsStrip'
import CtaSection from '../components/home/CtaSection'
import type { Category, Product } from '../types'

const BANNER_SLIDES_COUNT = 3

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [categories, setCategories] = useState<Category[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [brands, setBrands] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const [cats, products, b] = await Promise.all([getCategories(), getFeaturedProducts(), getBrands()])
        setCategories(cats)
        setFeaturedProducts(products)
        setBrands(b)
      } catch (err) {
        const serviceErr = err as ServiceError
        setError(serviceErr.message || 'Ocurrió un error inesperado')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES_COUNT), 3500)
    return () => clearInterval(timer)
  }, [isPaused])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES_COUNT)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + BANNER_SLIDES_COUNT) % BANNER_SLIDES_COUNT)

  return (
    <div className="bg-[var(--color-bg)]">
      <HeroBanner
        currentSlide={currentSlide}
        onPrev={prevSlide}
        onNext={nextSlide}
        onDotClick={setCurrentSlide}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      />

      {error && (
        <section className="bg-red-50 border-b border-red-200">
          <div className="max-w-[1280px] mx-auto px-4 py-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
            <button onClick={() => window.location.reload()} className="text-red-700 hover:text-red-900 font-bold text-sm inline-flex items-center gap-1.5 shrink-0">
              <RefreshCw className="w-4 h-4" /> Reintentar
            </button>
          </div>
        </section>
      )}

      <section className="bg-white border-b border-[var(--color-border)]">
        <div className="max-w-[1280px] mx-auto px-4 py-5 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {[
            { icon: Truck, title: 'Envíos a todo el Perú', desc: 'Lima 24h · Provincia 48-72h' },
            { icon: ShieldCheck, title: 'Compra segura', desc: 'Garantía en todos los productos' },
            { icon: Clock3, title: 'Atención ágil', desc: 'Cotiza en minutos por WhatsApp' },
            { icon: Sparkles, title: 'Calidad industrial', desc: 'Precisión y durabilidad garantizada' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-red-50 text-[var(--color-primary)] flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <div className="text-[14px] font-bold text-[var(--color-navy)]">{title}</div>
                <div className="text-[12px] text-[var(--color-text-muted)] mt-0.5">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <BrandsStrip brands={brands} loading={loading} />
      <CategoryGrid categories={categories} loading={loading} />
      <FeaturedProducts products={featuredProducts} loading={loading} />
      <CtaSection />
    </div>
  )
}
