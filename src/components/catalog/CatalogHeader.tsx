export default function CatalogHeader() {
  return (
    <div className="bg-white border-b border-[var(--color-border)]">
      <div className="max-w-[1280px] mx-auto px-4 py-8 lg:py-10">
        <div className="text-[11px] font-extrabold tracking-[0.18em] uppercase text-[var(--color-accent)] mb-2 flex items-center gap-2">
          <span className="w-6 h-px bg-[var(--color-accent)]" />
          Catálogo mayorista
        </div>
        <h1 className="font-extrabold text-3xl lg:text-4xl tracking-tight text-[var(--color-navy)]">
          Catálogo de Productos
        </h1>
      </div>
    </div>
  )
}
