"use client";

class ApiError extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode || 500;
    this.code = code || 'UNKNOWN_ERROR';
  }
}

class ErrorHandler {
  static handle(error, fallbackMessage = 'An unexpected error occurred') {
    console.error('Error caught:', error);

    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message,
        statusCode: error.statusCode,
        code: error.code
      };
    }

    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return {
        success: false,
        message: 'Network error. Please check your connection and try again.',
        statusCode: 503,
        code: 'NETWORK_ERROR'
      };
    }

    return {
      success: false,
      message: fallbackMessage,
      statusCode: 500,
      code: 'INTERNAL_ERROR'
    };
  }
}

export const withRetry = async (operation, maxRetries = 3, delay = 1000) => {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      console.warn(`Attempt ${attempt} failed:`, error.message);

      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }
  }

  throw lastError;
};

export { ApiError, ErrorHandler };