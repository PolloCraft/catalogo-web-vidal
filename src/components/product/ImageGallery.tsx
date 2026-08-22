interface Props {
  images: string[]
  activeIndex: number
  onIndexChange: (i: number) => void
  discount: number | null
  productName: string
}

export default function ImageGallery({ images, activeIndex, onIndexChange, discount, productName }: Props) {
  return (
    <div>
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 flex items-center justify-center h-[420px] shadow-sm overflow-hidden relative">
        <img
          src={images[activeIndex] ?? images[0]}
          alt={productName}
          className="max-w-full max-h-full object-contain"
        />
        {discount && (
          <span className="absolute top-4 left-4 bg-[var(--color-primary)] text-white text-sm font-extrabold px-3 py-1.5 rounded-full shadow">
            -{discount}% OFF
          </span>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 mt-4">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => onIndexChange(i)}
              className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center overflow-hidden bg-white transition-all ${
                i === activeIndex
                  ? 'border-[var(--color-primary)] shadow-md'
                  : 'border-[var(--color-border)] hover:border-[var(--color-accent)]'
              }`}
            >
              <img src={img} alt={`Vista ${i + 1}`} loading="lazy" className="w-full h-full object-contain p-1" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
