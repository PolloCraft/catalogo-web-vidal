import { Phone, MapPin, Clock, Mail } from 'lucide-react'

const MAPS_EMBED = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.890479155267!2d-77.03450942416752!3d-12.051016842065842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8c6f3db13b1%3A0xc3b5e408d132646c!2sGaler%C3%ADa%20Cuzco!5e0!3m2!1ses-419!2spe!4v1700000000000!5m2!1ses-419!2spe'
const MAPS_LINK = 'https://www.google.com/maps/search/Galeria+Cuzco+Jr+Cusco+716+Lima+15001'

export default function ContactInfo() {
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 lg:p-8 mb-8 shadow-sm">
      <h2 className="text-[var(--text-xl)] font-[var(--font-heading)] font-semibold text-[var(--color-navy)] mb-6">
        Información de contacto
      </h2>
      <ul className="space-y-5">
        <li className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[var(--color-bg-alt)] flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5 text-[var(--color-primary)]" />
          </div>
          <div className="pt-0.5">
            <p className="font-bold text-[var(--color-navy)] text-[15px]">+51 963 986 002</p>
            <p className="font-bold text-[var(--color-navy)] text-[15px] mt-1">+51 936 608 583</p>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">Atención vía WhatsApp y llamadas</p>
          </div>
        </li>
        <li className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[var(--color-bg-alt)] flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-[var(--color-primary)]" />
          </div>
          <div className="pt-0.5">
            <p className="font-bold text-[var(--color-navy)] text-[15px]">Galería Cuzco, Jr. Cusco 716, Lima 15001</p>
            <p className="text-sm text-[var(--color-text-muted)] mt-0.5">Referencia: Cercado de Lima</p>
          </div>
        </li>
        <li className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[var(--color-bg-alt)] flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5 text-[var(--color-primary)]" />
          </div>
          <div className="pt-0.5">
            <p className="font-bold text-[var(--color-navy)] text-[15px]">@chamoimport.com</p>
            <p className="text-sm text-[var(--color-text-muted)] mt-0.5">Consultas y cotizaciones</p>
          </div>
        </li>
        <li className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[var(--color-bg-alt)] flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-[var(--color-primary)]" />
          </div>
          <div className="pt-0.5">
            <p className="font-bold text-[var(--color-navy)] text-[15px]">Horario de atención</p>
            <p className="text-sm text-[var(--color-text-muted)] mt-0.5">Lunes a Sábado: 8:00 - 18:00</p>
          </div>
        </li>
      </ul>

      <div className="mt-8 rounded-xl overflow-hidden border border-[var(--color-border)] h-[280px] shadow-inner relative bg-gray-100">
        <iframe
          src={MAPS_EMBED}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación Galería Cuzco"
          className="absolute inset-0"
        />
      </div>
      <a
        href={MAPS_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-sm font-bold shadow-sm transition-all active:scale-[0.98]"
      >
        <MapPin className="w-4 h-4" /> Abrir en Google Maps
      </a>
    </div>
  )
}
