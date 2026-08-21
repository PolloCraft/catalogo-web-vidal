import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowRight, Truck, Shield, Clock, Star } from 'lucide-react'
import { getCategories, getFeaturedProducts, getBrands } from '../services/productService'
import Skeleton from '../components/Skeleton'
import type { Category, Product } from '../types'

const BANNER_SLIDES = [
  {
    id: 1,
    titulo: 'Distribuidores e Importadores',
    subtitulo: 'Ferreteria, escolar y navideño para negocios y hogares',
    cta: 'Ver Catalogo',
    gradient: 'linear-gradient(135deg, var(--color-navy) 0%, #003366 50%, var(--color-primary) 100%)',
  },
  {
    id: 2,
    titulo: 'Precios al Por Mayor',
    subtitulo: 'Gran stock y los mejores precios del mercado peruano',
    cta: 'Cotizar Ahora',
    gradient: 'linear-gradient(135deg, var(--color-primary) 0%, #0072CE 50%, var(--color-accent) 100%)',
  },
  {
    id: 3,
    titulo: 'Calidad que Respalda',
    subtitulo: 'La confianza de nuestros clientes nos respalda',
    cta: 'Contactanos',
    gradient: 'linear-gradient(135deg, #003366 0%, var(--color-navy) 50%, #0D0D0D 100%)',
  },
]

const CATEGORY_ICONS: Record<string, string> = {
  ferreteria: '\u{1F527}',
  iluminacion: '\u{1F4A1}',
  electricos: '\u{26A1}',
  adhesivos: '\u{1F9F4}',
  seguridad: '\u{1F9BA}',
  'campana-escolar': '\u{1F4DA}',
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  ferreteria: 'linear-gradient(135deg, #f97316, #ef4444)',
  iluminacion: 'linear-gradient(135deg, #facc15, #f59e0b)',
  electricos: 'linear-gradient(135deg, #3b82f6, #6366f1)',
  adhesivos: 'linear-gradient(135deg, #22c55e, #10b981)',
  seguridad: 'linear-gradient(135deg, #ef4444, #ec4899)',
  'campana-escolar': 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
}

const WHATSAPP_NUMBER = '51936608583'

function formatPrecio(precio: number): string {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2,
  }).format(precio)
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [categories, setCategories] = useState<Category[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [brands, setBrands] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const [cats, products, b] = await Promise.all([
        getCategories(),
        getFeaturedProducts(),
        getBrands(),
      ])
      setCategories(cats)
      setFeaturedProducts(products)
      setBrands(b)
      setLoading(false)
    }
    load()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length)

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      {/* Banner Carousel */}
      <section
        style={{
          position: 'relative',
          height: '420px',
          overflow: 'hidden',
          background: 'var(--color-navy)',
        }}
      >
        {BANNER_SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            style={{
              position: 'absolute',
              inset: 0,
              background: slide.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              textAlign: 'center',
              padding: '2rem',
              opacity: i === currentSlide ? 1 : 0,
              transition: 'opacity 0.6s ease-in-out',
              pointerEvents: i === currentSlide ? 'auto' : 'none',
            }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.8rem',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '1rem',
              }}
            >
              {slide.titulo}
            </h1>
            <p
              style={{
                fontSize: '1.25rem',
                color: 'rgba(255,255,255,0.85)',
                marginBottom: '2rem',
                maxWidth: '600px',
              }}
            >
              {slide.subtitulo}
            </p>
            <Link
              to='/catalogo'
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'var(--color-accent)',
                color: '#fff',
                padding: '0.875rem 2rem',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '1rem',
                textDecoration: 'none',
                boxShadow: 'var(--shadow-lg)',
                transition: 'transform 0.2s',
              }}
            >
              {slide.cta}
              <ArrowRight size={18} />
            </Link>
          </div>
        ))}

        <button
          onClick={prevSlide}
          aria-label='Slide anterior'
          style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.15)',
            border: 'none',
            color: '#fff',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
          }}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          aria-label='Siguiente slide'
          style={{
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.15)',
            border: 'none',
            color: '#fff',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
          }}
        >
          <ChevronRight size={24} />
        </button>

        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '0.5rem',
          }}
        >
          {BANNER_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Ir a slide ${i + 1}`}
              style={{
                width: i === currentSlide ? '24px' : '10px',
                height: '10px',
                borderRadius: '5px',
                border: 'none',
                background: i === currentSlide ? '#fff' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section
        style={{
          background: 'var(--color-bg-alt)',
          borderBottom: '1px solid var(--color-border)',
          padding: '2rem 0',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            padding: '0 1.5rem',
          }}
        >
          {[
            { icon: Truck, label: 'Envios a todo el Peru', desc: 'Despacho rapido y seguro' },
            { icon: Shield, label: 'Compra Segura', desc: 'Garantia en todos los productos' },
            { icon: Clock, label: 'Atencion 24/7', desc: 'Soporte cuando lo necesites' },
            { icon: Star, label: 'Productos Certificados', desc: 'Calidad garantizada' },
          ].map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                borderRadius: '8px',
                background: 'var(--color-bg)',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  flexShrink: 0,
                }}
              >
                <Icon size={24} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    fontSize: '0.95rem',
                  }}
                >
                  {label}
                </div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section style={{ padding: '3rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.75rem',
              fontWeight: 700,
              color: 'var(--color-text)',
              textAlign: 'center',
              marginBottom: '2rem',
            }}
          >
            Nuestras Categorias
          </h2>
          {loading ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
                gap: '1rem',
              }}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} height={140} />
              ))}
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
                gap: '1rem',
              }}
            >
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/catalogo?categoria=${cat.id}`}
                  style={{
                    textDecoration: 'none',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: 'var(--color-bg)',
                    boxShadow: 'var(--shadow-lg)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      height: '100px',
                      background: CATEGORY_GRADIENTS[cat.id] || 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.5rem',
                    }}
                  >
                    {CATEGORY_ICONS[cat.id] || '\u{1F4E6}'}
                  </div>
                  <div
                    style={{
                      padding: '0.875rem 0.5rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      fontSize: '0.9rem',
                    }}
                  >
                    {cat.nombre}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: '3rem 0', background: 'var(--color-bg-alt)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.75rem',
                fontWeight: 700,
                color: 'var(--color-text)',
              }}
            >
              Productos Destacados
            </h2>
            <Link
              to='/catalogo'
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                color: 'var(--color-primary)',
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: '0.95rem',
              }}
            >
              Ver todos <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1.5rem',
              }}
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} height={260} />
              ))}
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/producto/${product.id}`}
                  style={{
                    textDecoration: 'none',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: 'var(--color-bg)',
                    boxShadow: 'var(--shadow-lg)',
                    transition: 'transform 0.2s',
                  }}
                >
                  <div
                    style={{
                      height: '180px',
                      background: 'var(--color-bg-alt)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-text-muted)',
                      fontSize: '0.85rem',
                      padding: '1rem',
                      overflow: 'hidden',
                    }}
                  >
                    {product.imagenes && product.imagenes.length > 0 ? (
                      <img
                        src={product.imagenes[0]}
                        alt={product.nombre}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    ) : (
                      'Sin imagen'
                    )}
                  </div>
                  <div style={{ padding: '1rem' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 600,
                        color: 'var(--color-text)',
                        fontSize: '0.9rem',
                        marginBottom: '0.375rem',
                        lineHeight: 1.3,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {product.nombre}
                    </div>
                    <div
                      style={{
                        color: 'var(--color-text-muted)',
                        fontSize: '0.8rem',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {product.marca}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontWeight: 700,
                          color: 'var(--color-primary)',
                          fontSize: '1.1rem',
                        }}
                      >
                        {formatPrecio(product.precioMayorista)}
                      </span>
                      {product.precioAnterior && (
                        <span
                          style={{
                            textDecoration: 'line-through',
                            color: 'var(--color-text-muted)',
                            fontSize: '0.8rem',
                          }}
                        >
                          {formatPrecio(product.precioAnterior)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Brands */}
      <section style={{ padding: '3rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.75rem',
              fontWeight: 700,
              color: 'var(--color-text)',
              textAlign: 'center',
              marginBottom: '2rem',
            }}
          >
            Marcas que Confiamos
          </h2>
          {loading ? (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                justifyContent: 'center',
              }}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} height={50} width={140} />
              ))}
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                justifyContent: 'center',
              }}
            >
              {brands.map((brand) => (
                <Link
                  key={brand}
                  to={`/catalogo?marca=${encodeURIComponent(brand)}`}
                  style={{
                    textDecoration: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    background: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    transition: 'all 0.2s',
                  }}
                >
                  {brand}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section
        style={{
          padding: '3rem 0',
          background: 'linear-gradient(135deg, var(--color-navy) 0%, var(--color-primary) 100%)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1.5rem',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.75rem',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '1rem',
            }}
          >
            Cotiza al Por Mayor
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: '1.1rem',
              marginBottom: '2rem',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Contactanos para obtener los mejores precios para tu negocio. Atencion personalizada y envios a todo el Peru.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20me%20interesa%20cotizar%20al%20por%20mayor`}
            target='_blank'
            rel='noopener noreferrer'
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'var(--color-whatsapp)',
              color: '#fff',
              padding: '0.875rem 2rem',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '1rem',
              textDecoration: 'none',
              boxShadow: 'var(--shadow-lg)',
              transition: 'transform 0.2s',
            }}
          >
            <svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
              <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' />
            </svg>
            Cotizar por WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
