import { HttpInterceptorFn } from '@angular/common/http';
import { isDevMode } from '@angular/core';

const API_PREFIXES = ['/api/', 'http://localhost:8080/api/'];

export const noCacheInterceptor: HttpInterceptorFn = (req, next) => {
  if (!isDevMode()) return next(req);

  const isApi = API_PREFIXES.some((p) => req.url.startsWith(p));
  if (req.method !== 'GET' || !isApi) return next(req);

  const cloned = req.clone({
    setHeaders: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  });
  return next(cloned);
};
