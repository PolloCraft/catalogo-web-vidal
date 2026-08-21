import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/51999999999?text=Hola,%20quiero%20cotizar%20un%20producto"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-[var(--color-whatsapp)] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      aria-label="Cotizar por WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  )
}
