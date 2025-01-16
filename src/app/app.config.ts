import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // Importa withInterceptors
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { authInterceptor } from './auth/interceptors/auth.interceptor'; // Asegúrate de que la ruta sea correcta

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])), // Agregar el interceptor funcional aquí
    importProvidersFrom(FormsModule),
    BrowserModule
  ]
};
