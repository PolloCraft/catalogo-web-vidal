# Catálogo Web Frontend - Chamo Import

Interfaz completa de un catálogo mayorista construida sobre datos simulados, respetando la identidad de marca existente.

## Descripción

Catálogo web para una empresa importadora y distribuidora de ferretería, iluminación, artículos eléctricos, adhesivos y campaña escolar. Toda la información proviene de archivos locales que simulan la respuesta de una API.

## Stack Tecnológico

- **Base:** React 18, TypeScript, Vite, React Router
- **Estilos:** Tailwind CSS v4
- **Íconos:** Lucide React
- **Estado:** Context API + useState
- **Datos:** Mock data en JSON

## Capturas

### Escritorio
![Escritorio](capturas/escritorio.png)

### Móvil
![Móvil](capturas/movil.png)

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/PolloCraft/catalogo-web-import.git

# Entrar al directorio
cd catalogo-web-import

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## Estructura de Carpetas

```
src/
├── components/     # Componentes reutilizables
├── context/        # Estado global (React Context)
├── data/           # Datos mock (JSON)
├── pages/          # Páginas/rutas
├── services/       # Capa de servicio aislada
├── styles/         # Tokens CSS y estilos globales
├── types/          # Definiciones TypeScript
└── utils/          # Funciones auxiliares
```

## Decisiones de Diseño

- **Paleta de colores:** Basada en la identidad visual de Chamo Import
- **Tipografía:** Poppins para títulos, Inter para cuerpo
- **Espaciado:** Sistema de 4px (4, 8, 12, 16, 24, 32, 48, 64)
- **Responsive:** Diseño adaptable a 360px, 768px, 1024px y 1440px

## Dificultades Encontradas

- (Por completar durante el desarrollo)

## Autor

PolloCraft

## Licencia

MIT
