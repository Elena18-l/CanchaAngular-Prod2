/// <reference types="@angular/localize" />
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { firebaseConfig } from './app/config/firebase-setup';
import { appRoutes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideHttpClient } from '@angular/common/http';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideFirebaseApp(() => {
      const app = initializeApp(firebaseConfig);
      console.log("✅ Firebase app initialized:", app);
      return app;
    }),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()),
    provideHttpClient(),
    provideMessaging(() => getMessaging()),
  ],
}).catch(err => console.error(err));

// 🔔 Cloud Messaging manual
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('✅ Service Worker registrado:', registration);
    })
    .catch((err) => {
      console.error('❌ Error al registrar el Service Worker:', err);
    });
}