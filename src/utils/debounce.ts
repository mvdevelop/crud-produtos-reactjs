// TypeScript version of debounce.js

/**
 * Debounce utility for optimizing performance and reducing unnecessary API calls
 *
 * Provides debounce functionality to delay function execution until after a
 * specified wait time has elapsed since the last time it was invoked.
 */

export interface DebounceOptions {
  leading?: boolean;
  trailing?: boolean;
}

export interface PendingFunction<T extends (...args: any[]) => any> {
  func: T;
  timeout: NodeJS.Timeout;
  args: Parameters<T>;
}

class Debouncer {
  private timeout: NodeJS.Timeout | null = null;
  private pending = new Map<string, PendingFunction<any>>();

  /**
   * Create a debounced version of a function
   *
   * @param {T} func - Function to debounce
   * @param {number} wait - Delay in milliseconds
   * @param {string} key - Unique key for the debounced function
   * @param {DebounceOptions} options - Additional options
   * @returns {(...args: Parameters<T>) => void} Debounced function
   */
  debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
    key: string | null = null,
    options: DebounceOptions = {}
  ): (...args: Parameters<T>) => void {
    const { leading = false, trailing = true } = options;

    return (...args: Parameters<T>) => {
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
  cancelAll(): void {
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
  cancel(key: string): void {
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
  hasPending(): boolean {
    return this.pending.size > 0;
  }

  /**
   * Get all pending functions
   *
   * @returns {Array} Array of pending function info
   */
  getPending(): PendingFunction<any>[] {
    return Array.from(this.pending.values());
  }
}

// Singleton debouncer for application-wide use
const debouncer = new Debouncer();

export { Debouncer, debouncer };