import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { noCacheInterceptor } from './core/interceptors/no-cache.interceptor';
import { MAT_DATE_FORMATS_BR } from './shared/mat-date-formats-br';

registerLocaleData(ptBr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([noCacheInterceptor])),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FORMATS_BR },
    provideAnimationsAsync(),
  ],
};
