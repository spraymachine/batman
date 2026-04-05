import { useState, useEffect, useCallback } from 'react';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, ''); // e.g. "/batman" or ""
const VALID_ROUTES = ['/', '/space', '/max', '/min'];

function getRoute() {
  const path = window.location.pathname;
  // Strip the base prefix to get the logical route
  const stripped = path.startsWith(BASE) ? path.slice(BASE.length) || '/' : '/';
  return VALID_ROUTES.includes(stripped) ? stripped : '/';
}

export function useRoute() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    function onPopState() {
      setRoute(getRoute());
    }
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((path) => {
    if (!VALID_ROUTES.includes(path)) path = '/';
    const full = BASE + (path === '/' ? '/' : path);
    window.history.pushState({}, '', full);
    setRoute(path);
    window.scrollTo(0, 0);
  }, []);

  return { route, navigate };
}
