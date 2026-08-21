import type { Product, Category } from '../types';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';

const PRODUCTS: Product[] = productsData as unknown as Product[];
const CATEGORIES: Category[] = categoriesData as Category[];

const simulateDelay = (): Promise<void> => {
  const delay = Math.random() * 300 + 500;
  return new Promise(resolve => setTimeout(resolve, delay));
};

export const getProducts = async (): Promise<Product[]> => {
  await simulateDelay();
  return PRODUCTS;
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  await simulateDelay();
  return PRODUCTS.find(p => p.id === id);
};

export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  await simulateDelay();
  return PRODUCTS.filter(p => p.categoria === categoryId);
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  await simulateDelay();
  const normalizedQuery = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return PRODUCTS.filter(p =>
    p.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalizedQuery) ||
    p.sku.toLowerCase().includes(normalizedQuery) ||
    p.marca.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalizedQuery)
  );
};

export const getCategories = async (): Promise<Category[]> => {
  await simulateDelay();
  return CATEGORIES;
};

export const getCategoryById = async (id: string): Promise<Category | undefined> => {
  await simulateDelay();
  return CATEGORIES.find(c => c.id === id);
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  await simulateDelay();
  return PRODUCTS.filter(p => p.destacado);
};

export const getBrands = async (): Promise<string[]> => {
  await simulateDelay();
  const brands = new Set(PRODUCTS.map(p => p.marca));
  return Array.from(brands).sort();
};
