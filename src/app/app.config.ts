import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor, loadingInterceptor } from './app.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner'
import { SimpleNotificationsModule } from 'angular2-notifications'
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes), provideAnimationsAsync(),
  provideHttpClient(withInterceptors([jwtInterceptor, loadingInterceptor])),//para usar HHTTPS


  importProvidersFrom(SimpleNotificationsModule.forRoot(), NgxSpinnerModule)//importante 
    //2do paso importar aqui en lugar de modules

  ]
};
