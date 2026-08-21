import { Package } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Props {
  titulo?: string
  descripcion?: string
  accion?: {
    texto: string
    href: string
  }
}

export default function EmptyState({
  titulo = 'No se encontraron resultados',
  descripcion = 'No hay elementos para mostrar en este momento.',
  accion,
}: Props) {
  return (
    <div className="text-center py-16">
      <Package className="w-16 h-16 mx-auto text-[var(--color-text-muted)] mb-4" />
      <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">{titulo}</h3>
      <p className="text-[var(--color-text-muted)] mb-6 max-w-md mx-auto">{descripcion}</p>
      {accion && (
        <Link
          to={accion.href}
          className="inline-block bg-[var(--color-primary)] text-white px-6 py-3 rounded-[var(--radius-full)] hover:bg-[var(--color-primary-dark)] transition-colors"
        >
          {accion.texto}
        </Link>
      )}
    </div>
  )
}
