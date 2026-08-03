"use client";

/**
 * TypeScript type definitions for the CRUD Products application
 *
 * Provides comprehensive type safety for all product-related operations
 * and component props/interfaces
 */

// Base product interface
export interface Product {
  codigo?: number;
  nome: string;
  marca: string;
  preco?: number;
  categoria?: string;
  descricao?: string;
  imagem?: string;
  estoque?: number;
  precoCusto?: number;
  dataCriacao?: string;
  dataAtualizacao?: string;
}

// Form data type (subset of Product for form inputs)
export type ProductFormData = Partial<Product> & {
  nome: string;
  marca: string;
};

// Product API response type
export interface ProductApiResponse {
  success: boolean;
  data: Product[];
  message?: string;
  total?: number;
  page?: number;
  limit?: number;
}

// Component props interfaces
export interface ProductFormProps {
  product?: Product;
  onSave: (product: Product) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export interface ProductTableProps {
  products: Product[];
  onSelect: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => Promise<void>;
  isLoading?: boolean;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
}

export interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

// Hook return types
export interface UseProductFormReturn {
  formData: ProductFormData;
  errors: FormErrors;
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
}

export interface UseProductListReturn {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
  selectedProduct: Product | null;
  selectProduct: (product: Product) => void;
  refreshProducts: () => Promise<void>;
}

// Form validation types
export type FormFieldName = 'nome' | 'marca' | 'preco' | 'categoria';

export interface FormErrors {
  nome?: string;
  marca?: string;
  preco?: string;
  categoria?: string;
}

// API service types
export interface ProductService {
  getAllProducts(): Promise<Product[]>;
  createProduct(product: Product): Promise<Product>;
  updateProduct(product: Product): Promise<Product>;
  deleteProduct(id: number): Promise<void>;
  validateProduct(product: Partial<Product>): FormErrors;
}

// Component state types
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Event handler types
export type ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;
export type SubmitHandler = (e: React.FormEvent) => Promise<void>;
export type CancelHandler = () => void;
export type SelectHandler = (item: any) => void;

// Utility types
export type Optional<T> = T | undefined;
export type Required<T> = T & {};
export type Nullable<T> = T | null;

// Route types (if using React Router)
export interface RouteParams {
  id?: string;
}

// Context types
export interface ProductContextType {
  products: Product[];
  selectedProduct: Product | null;
  isLoading: boolean;
  error: Error | null;
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  selectProduct: (product: Product) => void;
  refreshProducts: () => Promise<void>;
}

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Filter and search types
export interface ProductFilters {
  search: string;
  categoria: string;
  precoMin?: number;
  precoMax?: number;
}

export interface SortOptions {
  field: keyof Product;
  direction: 'asc' | 'desc';
}

// Analytics types
export interface ProductAnalytics {
  totalProducts: number;
  uniqueBrands: number;
  averagePrice: number;
  mostExpensive: Product | null;
  leastExpensive: Product | null;
  stockLevels: {
    inStock: number;
    lowStock: number;
    outOfStock: number;
  };
}