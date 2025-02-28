/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';  // Asegúrate de que este archivo contiene tus rutas
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(appRoutes)],  // Proveemos las rutas para la aplicación
}).catch((err) => console.error(err));
