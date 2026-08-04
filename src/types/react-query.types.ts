// React Query types for the CRUD application

import { UseQueryResult, UseMutationResult, QueryKey } from '@tanstack/react-query';
import { Produto } from './product.types';

// Query key factories
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: any) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
} as const;

// Query result types
export type ProductsQueryResult = UseQueryResult<Produto[], Error>;
export type ProductQueryResult = UseQueryResult<Produto, Error>;

// Mutation result types
export interface CreateProductVariables {
  product: Omit<Produto, 'codigo'>;
}

export interface UpdateProductVariables {
  product: Produto;
}

export interface DeleteProductVariables {
  id: number;
}

export type CreateProductMutationResult = UseMutationResult<Produto, Error, CreateProductVariables>;
export type UpdateProductMutationResult = UseMutationResult<Produto, Error, UpdateProductVariables>;
export type DeleteProductMutationResult = UseMutationResult<void, Error, DeleteProductVariables>;

// API response types for React Query
export interface ApiResponse<T> {
  data?: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Query options types
export interface ProductsQueryOptions {
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
  refetchOnWindowFocus?: boolean;
  onSuccess?: (data: Produto[]) => void;
  onError?: (error: Error) => void;
}

export interface ProductQueryOptions {
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
  refetchOnWindowFocus?: boolean;
  onSuccess?: (data: Produto) => void;
  onError?: (error: Error) => void;
}

// Mutation options types
export interface CreateProductOptions {
  onSuccess?: (data: Produto) => void;
  onError?: (error: Error) => void;
  onSettled?: (data?: Produto, error?: Error) => void;
}

export interface UpdateProductOptions {
  onSuccess?: (data: Produto) => void;
  onError?: (error: Error) => void;
  onSettled?: (data?: Produto, error?: Error) => void;
}

export interface DeleteProductOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onSettled?: (data?: void, error?: Error) => void;
}

// Infinite query types (for future pagination)
export interface InfiniteProductsVariables {
  page?: number;
  limit?: number;
  search?: string;
}

export interface InfiniteProductsResult {
  pages: Produto[][];
  pageParams: number[];
}