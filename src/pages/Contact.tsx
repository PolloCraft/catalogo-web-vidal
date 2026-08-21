import { useState } from 'react'
import { ChevronDown, Send, CheckCircle, Phone, Mail, MapPin, Clock } from 'lucide-react'

const FAQ_DATA = [
  {
    pregunta: '¿Cuál es el pedido mínimo para compra mayorista?',
    respuesta: 'El pedido mínimo para compra mayorista es de S/ 500.00. Para pedidos superiores a S/ 1,000.00 ofrecemos descuentos adicionales. Contáctanos para más información sobre precios especiales.',
  },
  {
    pregunta: '¿Realizan envíos a todo el Perú?',
    respuesta: 'Sí, realizamos envíos a todo el territorio nacional. Los tiempos de entrega varían según la ubicación: Lima Metropolitana 1-2 días hábiles, provinces 3-7 días hábiles. El costo de envío se calcula según el peso y destino del pedido.',
  },
  {
    pregunta: '¿Cuáles son las formas de pago aceptadas?',
    respuesta: 'Aceptamos efectivo, transferencia bancaria, Yape, Plin y tarjetas de crédito/débito. Para pedidos mayoristas también aceptamos pagos a crédito con aprobación previa.',
  },
  {
    pregunta: '¿Ofrecen garantía en los productos?',
    respuesta: 'Sí, todos nuestros productos cuentan con garantía del fabricante. La duración varía según el producto: herramientas 1-2 años, luminarias LED 2-3 años, materiales eléctricos 1 año. Contáctanos para casos específicos.',
  },
  {
    pregunta: '¿Puedo solicitar una cotización personalizada?',
    respuesta: '¡Por supuesto! Puedes solicitar cotizaciones personalizadas a través de WhatsApp o del formulario de contacto. Nuestro equipo te responderá en un máximo de 2 horas hábiles con precios especiales para tu proyecto.',
  },
]

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [enviado, setEnviado] = useState(false)
  const [faqAbierto, setFaqAbierto] = useState<number | null>(null)

  const validar = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo es obligatorio'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Correo electrónico no válido'
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es obligatorio'
    } else if (!/^\d{9}$/.test(formData.telefono.replace(/\s/g, ''))) {
      newErrors.telefono = 'Teléfono debe tener 9 dígitos'
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es obligatorio'
    } else if (formData.mensaje.trim().length < 10) {
      newErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validar()) {
      setEnviado(true)
      setFormData({ nombre: '', email: '', telefono: '', mensaje: '' })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-[var(--color-primary)] mb-1 uppercase tracking-wider">Estamos aqui para ayudarte</p>
        <h1 className="text-[var(--text-2xl)] font-[var(--font-heading)] font-bold text-[var(--color-navy)]">
          Contacto
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Formulario */}
        <div>
          <h2 className="text-[var(--text-xl)] font-[var(--font-heading)] font-semibold text-[var(--color-navy)] mb-4">
            Envianos un mensaje
          </h2>

          {enviado ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-4" />
              <h3 className="text-lg font-semibold text-green-800 mb-2">¡Mensaje enviado!</h3>
              <p className="text-green-600">
                Gracias por contactarnos. Te responderemos en un maximo de 2 horas habiles.
              </p>
              <button
                onClick={() => setEnviado(false)}
                className="mt-4 text-green-700 underline hover:no-underline"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-[var(--color-text)] mb-1">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.nombre ? 'border-red-500' : 'border-[var(--color-border)]'
                  } bg-white text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]`}
                  placeholder="Tu nombre"
                />
                {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text)] mb-1">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email ? 'border-red-500' : 'border-[var(--color-border)]'
                  } bg-white text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]`}
                  placeholder="tu@correo.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-[var(--color-text)] mb-1">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.telefono ? 'border-red-500' : 'border-[var(--color-border)]'
                  } bg-white text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]`}
                  placeholder="936 608 583"
                />
                {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-[var(--color-text)] mb-1">
                  Mensaje *
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.mensaje ? 'border-red-500' : 'border-[var(--color-border)]'
                  } bg-white text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none`}
                  placeholder="Cuentanos en que podemos ayudarte..."
                />
                {errors.mensaje && <p className="text-red-500 text-xs mt-1">{errors.mensaje}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-4 h-4" />
                Enviar mensaje
              </button>
            </form>
          )}
        </div>

        {/* Información de contacto y FAQ */}
        <div>
          {/* Info de contacto */}
          <div className="bg-white rounded-xl border border-[var(--color-border)] p-6 mb-8">
            <h2 className="text-[var(--text-xl)] font-[var(--font-heading)] font-semibold text-[var(--color-navy)] mb-4">
              Informacion de contacto
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[var(--color-primary)]" />
                <div>
                  <p className="font-medium text-[var(--color-text)]">+51 936 608 583</p>
                  <p className="text-sm text-[var(--color-text-muted)]">Lun - Vie: 8:00 - 18:00</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[var(--color-primary)]" />
                <div>
                  <p className="font-medium text-[var(--color-text)]">ventas@chamoimport.com</p>
                  <p className="text-sm text-[var(--color-text-muted)]">Respuesta en 2 horas hábiles</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[var(--color-primary)]" />
                <div>
                  <p className="font-medium text-[var(--color-text)]">Av. Industrial 123, Lima</p>
                  <p className="text-sm text-[var(--color-text-muted)]">Referencia: Jr. Ica cuadra 5</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[var(--color-primary)]" />
                <div>
                  <p className="font-medium text-[var(--color-text)]">Horario de atención</p>
                  <p className="text-sm text-[var(--color-text-muted)]">Lunes a Viernes: 8:00 - 18:00 | Sábados: 9:00 - 13:00</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Preguntas frecuentes */}
          <div>
            <h2 className="text-[var(--text-xl)] font-[var(--font-heading)] font-semibold text-[var(--color-navy)] mb-4">
              Preguntas frecuentes
            </h2>
            <div className="space-y-3">
              {FAQ_DATA.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-[var(--color-border)] overflow-hidden"
                >
                  <button
                    onClick={() => setFaqAbierto(faqAbierto === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-[var(--color-bg)] transition-colors"
                  >
                    <span className="font-medium text-[var(--color-text)] pr-4">{faq.pregunta}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[var(--color-text-muted)] shrink-0 transition-transform duration-300 ${
                        faqAbierto === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      faqAbierto === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="px-4 pb-4 text-sm text-[var(--color-text-muted)] leading-relaxed">
                      {faq.respuesta}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
