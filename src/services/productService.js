"use client";

import { withRetry } from '../utils/errorHandler';
import { validateForm } from '../utils/validation';

const API_BASE_URL = 'http://localhost:8080';

export class ProductService {
  static async getAllProducts() {
    return withRetry(async () => {
      const response = await fetch(`${API_BASE_URL}/listar`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
  }

  static async createProduct(productData) {
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

  static async updateProduct(productData) {
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

  static async deleteProduct(productId) {
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

  static validateProductData(productData) {
    const { errors, isValid } = validateForm(productData);
    return { errors, isValid };
  }

  static async ensureConnection() {
    try {
      await this.getAllProducts();
      return { connected: true };
    } catch (error) {
      return { connected: false, error: error.message };
    }
  }
}

export { ProductService };