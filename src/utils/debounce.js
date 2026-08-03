"use client";

/**
 * Debounce utility for optimizing performance and reducing unnecessary API calls
 *
 * Provides debounce functionality to delay function execution until after a
 * specified wait time has elapsed since the last time it was invoked.
 */

class Debouncer {
  constructor() {
    this.timeout = null;
    this.pending = new Map(); // Track pending debounced functions
  }

  /**
   * Create a debounced version of a function
   *
   * @param {Function} func - Function to debounce
   * @param {number} wait - Delay in milliseconds
   * @param {string} key - Unique key for the debounced function
   * @param {Object} options - Additional options
   * @returns {Function} Debounced function
   */
  debounce(func, wait, key = null, options = {}) {
    const { leading = false, trailing = true } = options;

    return (...args) => {
      const context = this;
      const later = () => {
        if (!leading && this.timeout) {
          this.timeout = null;
        }
        if (trailing) {
          func.apply(context, args);
        }
        if (key && this.pending.has(key)) {
          this.pending.delete(key);
        }
      };

      const shouldCallNow = leading && !this.timeout;

      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      if (shouldCallNow) {
        func.apply(this, args);
      } else {
        this.timeout = setTimeout(later, wait);
        if (key) {
          this.pending.set(key, {
            func,
            timeout: this.timeout,
            args
          });
        }
      }
    };
  }

  /**
   * Cancel all pending debounced functions
   */
  cancelAll() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    this.pending.clear();
  }

  /**
   * Cancel a specific debounced function by key
   *
   * @param {string} key - Key of the debounced function to cancel
   */
  cancel(key) {
    if (key && this.pending.has(key)) {
      const pending = this.pending.get(key);
      clearTimeout(pending.timeout);
      this.pending.delete(key);
    }
  }

  /**
   * Check if there are any pending debounced functions
   *
   * @returns {boolean} True if there are pending functions
   */
  hasPending() {
    return this.pending.size > 0;
  }

  /**
   * Get all pending functions
   *
   * @returns {Array} Array of pending function info
   */
  getPending() {
    return Array.from(this.pending.values());
  }
}

// Singleton debouncer for application-wide use
const debouncer = new Debouncer();

export { Debouncer, debouncer };