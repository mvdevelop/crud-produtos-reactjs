"use client";

/**
 * Validation utilities for the CRUD application
 *
 * Provides comprehensive validation functions for product data,
 * form inputs, and business rules to ensure data integrity.
 */

export const VALIDATION_RULES = {
  NOMIN_LENGTH: { min: 2, max: 100, message: 'Nome must be between 2 and 100 characters' },
  MARCA_LENGTH: { min: 1, max: 50, message: 'Marca must be between 1 and 50 characters' },
  PRECO_MIN: { min: 0, message: 'Price must be positive' },
  PRECO_MAX: { max: 1000000, message: 'Price must be less than 1,000,000' }
};

export const validators = {
  nome: (value) => {
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

  marca: (value) => {
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

  preco: (value) => {
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

  email: (value) => {
    if (value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  }
};

export const validateForm = (formData, fieldValidators = validators) => {
  const errors = {};
  let isValid = true;

  Object.keys(fieldValidators).forEach(field => {
    const error = fieldValidators[field](formData[field]);
    if (error) {
      errors[field] = error;
      isValid = false;
    }
  });

  return { errors, isValid };
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .trim()
    .replace(/[<>"']/g, '')
    .replace(/\s+/g, ' ');
};

export const formatProductData = (product) => {
  return {
    ...product,
    nome: sanitizeInput(product.nome),
    marca: sanitizeInput(product.marca),
    preco: product.preco ? parseFloat(product.preco) : null,
    timestamp: new Date().toISOString()
  };
};