import type { Product } from '../types'

const CATEGORY_IMAGES: Record<string, string> = {
  ferreteria: '/categories/ferreteria.svg',
  iluminacion: '/categories/iluminacion.svg',
  electricos: '/categories/electricos.svg',
  adhesivos: '/categories/adhesivos.svg',
  seguridad: '/categories/seguridad.svg',
  'campana-escolar': '/categories/campana-escolar.svg',
}

const GENERIC_IMAGE = '/products/generico.svg'

/**
 * Obtiene la imagen del producto, priorizando:
 * 1. Las imágenes del producto en el array de imagenes
 * 2. Imagen local en /images/ con el id del producto
 * 3. Imagen de categoría por defecto
 * 4. Imagen genérica
 */
export function getProductImage(product: Product): string {
  // Si tiene imágenes asignadas, usar la primera
  if (product.imagenes.length > 0 && product.imagenes[0]) {
    return product.imagenes[0]
  }
  // Fallback a imagen de categoría
  return CATEGORY_IMAGES[product.categoria] ?? GENERIC_IMAGE
}

export function getCategoryImage(categoryId: string): string {
  return CATEGORY_IMAGES[categoryId] ?? GENERIC_IMAGE
}

export function formatPrecio(precio: number): string {
  return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN', minimumFractionDigits: 2 }).format(precio)
}
