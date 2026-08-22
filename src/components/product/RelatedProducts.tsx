import ProductCard from '../ProductCard'
import type { Product } from '../../types'

interface Props {
  products: Product[]
}

export default function RelatedProducts({ products }: Props) {
  if (products.length === 0) return null

  return (
    <section>
      <h2 className="text-xl font-extrabold text-[var(--color-navy)] mb-6">
        Productos Relacionados
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map(prod => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  )
}
