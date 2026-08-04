// TypeScript version of validation.js

/**
 * Validation utilities for the CRUD application
 *
 * Provides comprehensive validation functions for product data,
 * form inputs, and business rules to ensure data integrity.
 */

export interface ValidationRules {
  NOMIN_LENGTH: { min: number; max: number; message: string };
  MARCA_LENGTH: { min: number; max: number; message: string };
  PRECO_MIN: { min: number; message: string };
  PRECO_MAX: { max: number; message: string };
}

export const VALIDATION_RULES: ValidationRules = {
  NOMIN_LENGTH: { min: 2, max: 100, message: 'Nome must be between 2 and 100 characters' },
  MARCA_LENGTH: { min: 1, max: 50, message: 'Marca must be between 1 and 50 characters' },
  PRECO_MIN: { min: 0, message: 'Price must be positive' },
  PRECO_MAX: { max: 1000000, message: 'Price must be less than 1,000,000' }
};

export interface Validators {
  nome: (value: any) => string | null;
  marca: (value: any) => string | null;
  preco: (value: any) => string | null;
  email: (value: any) => string | null;
}

export const validators: Validators = {
  nome: (value: any): string | null => {
    if (!value || typeof value !== 'string') {
      return 'Nome is required';
    }
    const trimmed = value.trim();
    if (trimmed.length < VALIDATION_RULES.NOMIN_LENGTH.min) {
      return VALIDATION_RULES.NOMIN_LENGTH.message;
    }
    if (trimmed.length > VALIDATION_RULES.NOMIN_LENGTH.max) {
      return VALIDATION_RULES.NOMIN_LENGTH.message;
    }
    return null;
  },

  marca: (value: any): string | null => {
    if (!value || typeof value !== 'string') {
      return 'Marca is required';
    }
    const trimmed = value.trim();
    if (trimmed.length < VALIDATION_RULES.MARCA_LENGTH.min) {
      return VALIDATION_RULES.MARCA_LENGTH.message;
    }
    if (trimmed.length > VALIDATION_RULES.MARCA_LENGTH.max) {
      return VALIDATION_RULES.MARCA_LENGTH.message;
    }
    return null;
  },

  preco: (value: any): string | null => {
    if (value === '' || value === null || value === undefined) {
      return null; // Optional field
    }
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      return 'Preco must be a valid number';
    }
    if (numValue < VALIDATION_RULES.PRECO_MIN.min) {
      return VALIDATION_RULES.PRECO_MIN.message;
    }
    if (numValue > VALIDATION_RULES.PRECO_MAX.max) {
      return VALIDATION_RULES.PRECO_MAX.message;
    }
    return null;
  },

  email: (value: any): string | null => {
    if (value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  }
};

export interface ValidationResult {
  errors: Record<string, string>;
  isValid: boolean;
}

export const validateForm = (formData: any, fieldValidators: any = validators): ValidationResult => {
  const errors: Record<string, string> = {};
  let isValid = true;

  Object.keys(fieldValidators).forEach((field: string) => {
    const error = fieldValidators[field](formData[field]);
    if (error) {
      errors[field] = error;
      isValid = false;
    }
  });

  return { errors, isValid };
};

export const sanitizeInput = (input: any): any => {
  if (typeof input !== 'string') return input;
  return input
    .trim()
    .replace(/[<>"']/g, '')
    .replace(/\s+/g, ' ');
};

export interface Product {
  codigo?: number;
  nome: string;
  marca: string;
  preco?: number;
  timestamp?: string;
}

export const formatProductData = (product: Product): Product => {
  return {
    ...product,
    nome: sanitizeInput(product.nome),
    marca: sanitizeInput(product.marca),
    preco: product.preco ? parseFloat(product.preco as any) : null,
    timestamp: new Date().toISOString()
  };
};