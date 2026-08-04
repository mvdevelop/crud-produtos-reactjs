"use client";

import { withRetry } from '../utils/errorHandler';
import { validateForm } from '../utils/validation';
import { Produto, FormData, ApiResponse } from '../types';

const API_BASE_URL = 'http://localhost:8080';

export class ProductService {
  static async getAllProducts(): Promise<Produto[]> {
    return withRetry(async () => {
      const response = await fetch(`${API_BASE_URL}/listar`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
  }

  static async createProduct(productData: Produto): Promise<ApiResponse<Produto>> {
    return withRetry(async () => {
      const response = await fetch(`${API_BASE_URL}/cadastrar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(productData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensagem || `HTTP error! status: ${response.status}`);
      }

      return response.json();
    });
  }

  static async updateProduct(productData: Produto): Promise<ApiResponse<Produto>> {
    return withRetry(async () => {
      const response = await fetch(`${API_BASE_URL}/alterar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(productData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensagem || `HTTP error! status: ${response.status}`);
      }

      return response.json();
    });
  }

  static async deleteProduct(productId: number): Promise<ApiResponse> {
    return withRetry(async () => {
      const response = await fetch(`${API_BASE_URL}/remover/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensagem || `HTTP error! status: ${response.status}`);
      }

      return response.json();
    });
  }

  static validateProductData(productData: Partial<Produto>): { errors: Record<string, any>; isValid: boolean } {
    const { errors, isValid } = validateForm(productData as FormData);
    return { errors, isValid };
  }

  static async ensureConnection(): Promise<{ connected: boolean; error?: string }> {
    try {
      await this.getAllProducts();
      return { connected: true };
    } catch (error) {
      return { connected: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
}

export { ProductService };