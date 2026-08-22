import type { Product, Category } from '../types';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';

const PRODUCTS: Product[] = productsData as unknown as Product[];
const CATEGORIES: Category[] = categoriesData as Category[];

const simulateDelay = (): Promise<void> => {
  const delay = Math.random() * 300 + 500;
  return new Promise(resolve => setTimeout(resolve, delay));
};

function createServiceError(message: string, code: string = 'UNKNOWN'): Error & { code: string } {
  const err = new Error(message) as Error & { code: string };
  err.code = code;
  err.name = 'ServiceError';
  return err;
}

export type ServiceError = Error & { code: string };

export const getProducts = async (): Promise<Product[]> => {
  try {
    await simulateDelay();
    if (!PRODUCTS || PRODUCTS.length === 0) {
      throw createServiceError('No se pudieron cargar los productos', 'EMPTY_DATA');
    }
    return PRODUCTS;
  } catch (error) {
    if ((error as ServiceError).code) throw error;
    throw createServiceError('Error al conectar con el servidor', 'NETWORK_ERROR');
  }
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  try {
    await simulateDelay();
    return PRODUCTS.find(p => p.id === id);
  } catch (error) {
    if ((error as ServiceError).code) throw error;
    throw createServiceError('Error al buscar el producto', 'NETWORK_ERROR');
  }
};

export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  try {
    await simulateDelay();
    return PRODUCTS.filter(p => p.categoria === categoryId);
  } catch (error) {
    if ((error as ServiceError).code) throw error;
    throw createServiceError('Error al cargar productos por categoría', 'NETWORK_ERROR');
  }
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    await simulateDelay();
    const normalizedQuery = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    return PRODUCTS.filter(p =>
      p.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalizedQuery) ||
      p.sku.toLowerCase().includes(normalizedQuery) ||
      p.marca.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalizedQuery)
    );
  } catch (error) {
    if ((error as ServiceError).code) throw error;
    throw createServiceError('Error al buscar productos', 'NETWORK_ERROR');
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    await simulateDelay();
    return CATEGORIES;
  } catch (error) {
    if ((error as ServiceError).code) throw error;
    throw createServiceError('Error al cargar categorías', 'NETWORK_ERROR');
  }
};

export const getCategoryById = async (id: string): Promise<Category | undefined> => {
  try {
    await simulateDelay();
    return CATEGORIES.find(c => c.id === id);
  } catch (error) {
    if ((error as ServiceError).code) throw error;
    throw createServiceError('Error al buscar la categoría', 'NETWORK_ERROR');
  }
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    await simulateDelay();
    return PRODUCTS.filter(p => p.destacado);
  } catch (error) {
    if ((error as ServiceError).code) throw error;
    throw createServiceError('Error al cargar productos destacados', 'NETWORK_ERROR');
  }
};

export const getBrands = async (): Promise<string[]> => {
  try {
    await simulateDelay();
    const brands = new Set(PRODUCTS.map(p => p.marca));
    return Array.from(brands).sort();
  } catch (error) {
    if ((error as ServiceError).code) throw error;
    throw createServiceError('Error al cargar marcas', 'NETWORK_ERROR');
  }
};
