import { Component } from 'react';

/**
 * Error Boundary for 3D scene
 * Catches errors from Three.js / model loading
 * and prevents them from crashing the entire app
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('3D Scene Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Silently fail - don't show anything if 3D scene crashes
      // The rest of the site (starfield, sections) will still work
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

