import type { Product } from '../../types'

interface Props {
  specs: Product['especificaciones']
}

export default function ProductSpecs({ specs }: Props) {
  if (Object.keys(specs).length === 0) return null

  return (
    <section className="mb-12">
      <h2 className="text-xl font-extrabold text-[var(--color-navy)] mb-5">
        Especificaciones
      </h2>
      <div className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden shadow-sm">
        <table className="w-full">
          <tbody>
            {Object.entries(specs).map(([key, value], i) => (
              <tr key={key} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-5 py-3.5 text-sm font-bold text-[var(--color-navy)] w-1/3 border-r border-[var(--color-border)]">
                  {key}
                </td>
                <td className="px-5 py-3.5 text-sm text-[var(--color-text-secondary)]">
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
