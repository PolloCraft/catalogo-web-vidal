import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Skeleton from '../Skeleton'

interface BrandsStripProps {
  brands: string[]
  loading: boolean
}

function BrandItem({ brand, onClick }: { brand: string; onClick: () => void }) {
  const slug = brand.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-')
  const [imgError, setImgError] = useState(false)
  const showImg = !imgError
  return (
    <button
      onClick={onClick}
      className="shrink-0 px-6 h-14 rounded-none bg-transparent flex items-center justify-center grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all cursor-pointer"
    >
      {showImg && (
        <img
          src={`/distributors/${slug}.png`}
          alt={brand}
          className="h-8 max-w-[140px] object-contain"
          onError={() => setImgError(true)}
        />
      )}
      {(!showImg || imgError) && brand}
    </button>
  )
}

export default function BrandsStrip({ brands, loading }: BrandsStripProps) {
  const [isPaused, setIsPaused] = useState(false)
  const navigate = useNavigate()

  const visible = brands.slice(0, 10)

  return (
    <section className="py-8 bg-[var(--color-bg)]">
      <div className="max-w-[1280px] mx-auto px-4 mb-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-[var(--font-heading)] font-extrabold tracking-tight text-[14px] uppercase text-[var(--color-metallic)]">Marcas distribuidoras</h2>
        </div>
      </div>

      {loading ? (
        <div className="max-w-[1280px] mx-auto px-4 flex gap-3 flex-wrap">
          {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-10 w-[110px] rounded-full" />)}
        </div>
      ) : (
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="overflow-hidden"
        >
          <div className="flex gap-6 w-max brands-track px-4" style={{ animationPlayState: isPaused ? 'paused' : 'running' }}>
            <div className="flex gap-6" aria-hidden="true">
              {visible.map((brand, i) => <BrandItem key={`a-${i}`} brand={brand} onClick={() => navigate(`/catalogo?marca=${encodeURIComponent(brand)}`)} />)}
            </div>
            <div className="flex gap-6" aria-hidden="true">
              {visible.map((brand, i) => <BrandItem key={`b-${i}`} brand={brand} onClick={() => navigate(`/catalogo?marca=${encodeURIComponent(brand)}`)} />)}
            </div>
            <div className="flex gap-6">
              {visible.map((brand, i) => <BrandItem key={`c-${i}`} brand={brand} onClick={() => navigate(`/catalogo?marca=${encodeURIComponent(brand)}`)} />)}
            </div>
            <div className="flex gap-6">
              {visible.map((brand, i) => <BrandItem key={`d-${i}`} brand={brand} onClick={() => navigate(`/catalogo?marca=${encodeURIComponent(brand)}`)} />)}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
