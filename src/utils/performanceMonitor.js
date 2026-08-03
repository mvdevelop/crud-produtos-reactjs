"use client";

/**
 * Performance monitoring utilities for the React.js CRUD application
 *
 * Provides performance measurement, profiling, and analytics tracking
 * to ensure optimal application performance and user experience
 */

class PerformanceMonitor {
  constructor() {
    this.metrics = {
      renderTimes: [],
      apiCalls: [],
      memoryUsage: [],
      fps: [],
      errors: []
    };
    this.isMonitoring = false;
    this.startTime = Date.now();
  }

  /**
   * Start monitoring application performance
   */
  startMonitoring() {
    if (this.isMonitoring) return;

    this.isMonitoring = true;
    this.startTime = Date.now();
    this.setupFrameRateMonitoring();
    this.setupMemoryMonitoring();
    console.log('Performance monitoring started');
  }

  /**
   * Stop monitoring and return aggregated metrics
   */
  stopMonitoring() {
    this.isMonitoring = false;
    console.log('Performance monitoring stopped');
    return this.getAggregatedMetrics();
  }

  /**
   * Setup frame rate monitoring
   */
  setupFrameRateMonitoring() {
    let lastTime = performance.now();

    const measureFPS = (currentTime) => {
      if (!this.isMonitoring) return;

      const delta = currentTime - lastTime;
      lastTime = currentTime;
      const fps = 1000 / delta;

      this.metrics.fps.push({
        timestamp: Date.now(),
        fps: Math.round(fps),
        delta: delta
      });

      requestAnimationFrame(measureFPS);
    };

    requestAnimationFrame(measureFPS);
  }

  /**
   * Setup memory monitoring
   */
  setupMemoryMonitoring() {
    if ('memory' in performance) {
      setInterval(() => {
        this.metrics.memoryUsage.push({
          timestamp: Date.now(),
          used: performance.memory.usedJSHeapSize,
          total: performance.memory.totalJSHeapSize,
          limit: performance.memory.jsHeapSizeLimit
        });
      }, 5000);
    }
  }

  /**
   * Record render time for components
   *
   * @param {string} componentName - Name of the component being rendered
   * @param {number} renderTime - Time taken to render (in ms)
   */
  recordRenderTime(componentName, renderTime) {
    this.metrics.renderTimes.push({
      timestamp: Date.now(),
      componentName,
      renderTime,
      duration: renderTime
    });
  }

  /**
   * Record API call performance
   *
   * @param {string} endpoint - API endpoint called
   * @param {number} duration - Time taken (in ms)
   * @param {number} timestamp - Request timestamp
   */
  recordApiCall(endpoint, duration, timestamp) {
    this.metrics.apiCalls.push({
      timestamp,
      endpoint,
      duration,
      success: duration < 5000 // Consider calls > 5s as slow
    });
  }

  /**
   * Record errors for error tracking
   *
   * @param {Error} error - The error object
   * @param {string} context - Context where error occurred
   */
  recordError(error, context) {
    this.metrics.errors.push({
      timestamp: Date.now(),
      error: error.message,
      stack: error.stack,
      context
    });
  }

  /**
   * Get aggregated performance metrics
   */
  getAggregatedMetrics() {
    const metrics = {
      sessionDuration: Date.now() - this.startTime,
      renderStats: this.getRenderStats(),
      apiStats: this.getApiStats(),
      performanceStats: this.getPerformanceStats(),
      errorStats: this.getErrorStats(),
      memoryStats: this.getMemoryStats()
    };

    return metrics;
  }

  /**
   * Get render performance statistics
   */
  getRenderStats() {
    if (this.metrics.renderTimes.length === 0) {
      return { average: 0, slowest: 0, fastest: 0, count: 0 };
    }

    const times = this.metrics.renderTimes.map(m => m.renderTime);
    return {
      average: times.reduce((a, b) => a + b, 0) / times.length,
      slowest: Math.max(...times),
      fastest: Math.min(...times),
      count: times.length
    };
  }

  /**
   * Get API call statistics
   */
  getApiStats() {
    if (this.metrics.apiCalls.length === 0) {
      return { average: 0, slowest: 0, count: 0, errorRate: 0 };
    }

    const durations = this.metrics.apiCalls.map(c => c.duration);
    const errors = this.metrics.apiCalls.filter(c => !c.success);

    return {
      average: durations.reduce((a, b) => a + b, 0) / durations.length,
      slowest: Math.max(...durations),
      count: durations.length,
      errorRate: (errors.length / durations.length) * 100
    };
  }

  /**
   * Get performance statistics
   */
  getPerformanceStats() {
    if (this.metrics.fps.length === 0) {
      return { averageFPS: 0, minFPS: 0, maxFPS: 0, drops: 0 };
    }

    const fps = this.metrics.fps.map(m => m.fps);
    const drops = fps.filter(f => f < 30).length;

    return {
      averageFPS: fps.reduce((a, b) => a + b, 0) / fps.length,
      minFPS: Math.min(...fps),
      maxFPS: Math.max(...fps),
      drops
    };
  }

  /**
   * Get error statistics
   */
  getErrorStats() {
    return {
      count: this.metrics.errors.length,
      byContext: this.metrics.errors.reduce((acc, error) => {
        acc[error.context] = (acc[error.context] || 0) + 1;
        return acc;
      }, {})
    };
  }

  /**
   * Get memory usage statistics
   */
  getMemoryStats() {
    if (this.metrics.memoryUsage.length === 0) {
      return { current: 0, peak: 0, average: 0 };
    }

    const used = this.metrics.memoryUsage.map(m => m.used);
    return {
      current: used[used.length - 1] || 0,
      peak: Math.max(...used),
      average: used.reduce((a, b) => a + b, 0) / used.length
    };
  }

  /**
   * Log metrics to console for debugging
   */
  logMetrics() {
    const metrics = this.getAggregatedMetrics();
    console.group('📊 Performance Metrics');
    console.log('Session Duration:', metrics.sessionDuration, 'ms');
    console.log('Render Performance:', metrics.renderStats);
    console.log('API Performance:', metrics.apiStats);
    console.log('Frame Rate:', metrics.performanceStats);
    console.log('Errors:', metrics.errorStats);
    console.log('Memory Usage:', metrics.memoryStats);
    console.groupEnd();
  }
}

// Singleton instance for application-wide use
const performanceMonitor = new PerformanceMonitor();

export { PerformanceMonitor, performanceMonitor };