import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  titulo?: string
  descripcion?: string
  onRetry?: () => void
}

export default function ErrorState({
  titulo = 'Algo salió mal',
  descripcion = 'Ocurrió un error inesperado. Por favor, intenta de nuevo.',
  onRetry,
}: Props) {
  return (
    <div className="text-center py-16">
      <AlertTriangle className="w-16 h-16 mx-auto text-[var(--color-primary)] mb-4" />
      <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">{titulo}</h3>
      <p className="text-[var(--color-text-muted)] mb-6 max-w-md mx-auto">{descripcion}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-3 rounded-[var(--radius-full)] hover:bg-[var(--color-primary-dark)] transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Intentar de nuevo
        </button>
      )}
    </div>
  )
}
