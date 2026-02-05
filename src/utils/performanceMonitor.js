/**
 * Performance Monitoring Utility
 * Use in development to track FPS and performance issues
 * Remove or disable in production
 */

class PerformanceMonitor {
  constructor() {
    this.fps = 0;
    this.lastTime = performance.now();
    this.frames = 0;
    this.enabled = false;
  }

  start() {
    if (this.enabled) return;
    this.enabled = true;
    this.loop();
    console.log('🎯 Performance Monitor Started');
  }

  stop() {
    this.enabled = false;
    console.log('⏹️ Performance Monitor Stopped');
  }

  loop() {
    if (!this.enabled) return;

    const currentTime = performance.now();
    this.frames++;

    if (currentTime >= this.lastTime + 1000) {
      this.fps = Math.round((this.frames * 1000) / (currentTime - this.lastTime));
      this.frames = 0;
      this.lastTime = currentTime;

      // Log warnings for low FPS
      if (this.fps < 30) {
        console.warn(`⚠️ Low FPS detected: ${this.fps}fps`);
      } else if (this.fps < 50) {
        console.log(`⚡ Moderate FPS: ${this.fps}fps`);
      } else {
        console.log(`✅ Good FPS: ${this.fps}fps`);
      }
    }

    requestAnimationFrame(() => this.loop());
  }

  getCurrentFPS() {
    return this.fps;
  }
}

// Export singleton instance
export const perfMonitor = new PerformanceMonitor();

// Usage:
// import { perfMonitor } from './utils/performanceMonitor';
// perfMonitor.start(); // Start monitoring
// perfMonitor.stop();  // Stop monitoring

/**
 * Additional Performance Tips:
 * 
 * 1. Check paint flashing in Chrome DevTools:
 *    - Open DevTools > More Tools > Rendering
 *    - Enable "Paint flashing"
 *    - Green flashes = repaints (minimize these)
 * 
 * 2. Profile with Chrome DevTools:
 *    - Performance tab > Record > Scroll
 *    - Look for long tasks (>50ms)
 *    - Check for layout thrashing
 * 
 * 3. Use Lighthouse:
 *    - Run audit on build
 *    - Target: 90+ on Performance
 * 
 * 4. Mobile testing:
 *    - Use CPU throttling (4x slowdown)
 *    - Use Network throttling (Fast 3G)
 *    - Test on real devices when possible
 */


