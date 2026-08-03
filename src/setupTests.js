"use strict";

import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

/**
 * React Testing Library configuration
 *
 * Custom configuration for optimal testing setup
 * Following best practices for component testing
 */

// Configure Testing Library for better accessibility
configure({
  testIdAttribute: 'data-testid', // Use data-testid for test selection
  throwErrorsByDefault: true,
});

/**
 * Mock window.matchMedia for responsive testing
 * Required for testing responsive components
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

/**
 * Mock IntersectionObserver for testing components that use it
 * Required for testing components with scroll or visibility detection
 */
Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  value: jest.fn().mockImplementation(callback => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
});

/**
 * Mock ResizeObserver for testing responsive components
 * Required for testing components that observe resize events
 */
Object.defineProperty(global, 'ResizeObserver', {
  writable: true,
  value: jest.fn().mockImplementation(callback => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
});

/**
 * Mock fetch API for testing
 * Provides a clean mock for API calls in tests
 */
global.fetch = jest.fn();

/**
 * Helper function to mock API responses
 *
 * @param {Object} data - Response data to mock
 * @param {boolean} ok - Whether the response should be ok
 * @returns {Promise} Mocked fetch promise
 */
export const mockFetchResponse = (data, ok = true) => {
  return Promise.resolve({\n    ok,\n    json: () => Promise.resolve(data),\n    status: ok ? 200 : 500,\n    text: () => Promise.resolve(JSON.stringify(data)),\n  });\n};

/**
 * Mock console methods to prevent noise in test output
 */
console.error = jest.fn();
console.warn = jest.fn();
console.log = jest.fn();

/**
 * Suppress error boundary test warnings
 */
jest.mock('../src/components/ErrorBoundary', () => ({
  default: ({ children }) => children,\n}));

/**
 * Suppress loading spinner test warnings
 */
jest.mock('../src/components/LoadingSpinner', () => ({
  default: ({ text }) => <div>Loading: {text}</div>,\n}));