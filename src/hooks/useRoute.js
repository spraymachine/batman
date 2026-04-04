import { useState, useEffect, useCallback } from 'react';

const VALID_ROUTES = ['/', '/space', '/max', '/min'];

export function useRoute() {
  const [route, setRoute] = useState(() => {
    const path = window.location.pathname;
    return VALID_ROUTES.includes(path) ? path : '/';
  });

  useEffect(() => {
    function onPopState() {
      const path = window.location.pathname;
      setRoute(VALID_ROUTES.includes(path) ? path : '/');
    }
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((path) => {
    if (!VALID_ROUTES.includes(path)) path = '/';
    window.history.pushState({}, '', path);
    setRoute(path);
    window.scrollTo(0, 0);
  }, []);

  return { route, navigate };
}
